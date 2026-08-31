// Client-side Razorpay orchestration.
// -------------------------------------------------------------------------
// Flow: Auth -> createOrder (Cloud Function) -> Razorpay Checkout ->
// server-verified webhook -> Firestore paid:true.
//
// IMPORTANT: this file never trusts the client to mark payment as
// successful. The Razorpay `handler` callback below is used only for UX
// (closing the modal, showing a "processing" state) — the actual
// students/{uid}.paid flip happens server-side in functions/index.js after
// independently verifying the payment signature (or, more robustly, via the
// Razorpay webhook, which cannot be spoofed by the client at all).
// -------------------------------------------------------------------------

import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { getApp } from 'firebase/app'

const RAZORPAY_CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${RAZORPAY_CHECKOUT_SRC}"]`)) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = RAZORPAY_CHECKOUT_SRC
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout script'))
    document.body.appendChild(script)
  })
}

/**
 * Kicks off the full pay flow for the currently authenticated user.
 * Assumes the caller has already ensured `auth.currentUser` is set (i.e.
 * the "Sign in" step in the journey has completed).
 */
export async function startEnrolmentPayment({ onSuccess, onError, onDismiss } = {}) {
  const auth = getAuth(getApp())
  const user = auth.currentUser
  if (!user) {
    onError?.(new Error('User must be signed in before payment can start.'))
    return
  }

  await loadRazorpayScript()

  const functions = getFunctions(getApp())
  const createOrder = httpsCallable(functions, 'createOrder')

  // Server decides the amount/currency — never trust a client-supplied amount.
  const { data: order } = await createOrder({ purpose: 'codivia_enrolment' })

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // public key id only — never the key secret
    amount: order.amount,
    currency: order.currency,
    name: 'CODIVIA',
    description: 'Full platform enrolment — all 22 departments',
    order_id: order.id,
    prefill: {
      name: user.displayName || '',
      email: user.email || '',
    },
    theme: { color: '#F26722' },
    handler: function (response) {
      // UX only: tell the user we're confirming. The Cloud Function webhook
      // (razorpayWebhook) is the source of truth for paid:true, triggered
      // independently by Razorpay's servers once payment clears.
      onSuccess?.(response)
    },
    modal: {
      ondismiss: () => onDismiss?.(),
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.on('payment.failed', (resp) => onError?.(resp.error))
  rzp.open()
}
