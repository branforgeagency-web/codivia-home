import { createBackendOrder, verifyBackendPayment, getStoredUser } from './api.js'

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
 * Kicks off the full pay flow for the currently authenticated user using MERN backend.
 */
export async function startEnrolmentPayment({ user: currentUser, onSuccess, onError, onDismiss } = {}) {
  const user = currentUser || getStoredUser()
  if (!user) {
    onError?.(new Error('User must be signed in before payment can start.'))
    return
  }

  await loadRazorpayScript()

  try {
    // 1. Create order on MERN backend
    const orderData = await createBackendOrder()

    const options = {
      key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      name: 'CODIVIA',
      description: 'Full clinical coding enrolment — all 22 hospital departments',
      order_id: orderData.orderId,
      prefill: {
        name: user.fullName || user.displayName || '',
        email: user.email || '',
      },
      theme: { color: '#F26722' },
      handler: async function (response) {
        try {
          // 2. Cryptographic signature verification on backend
          const verifyRes = await verifyBackendPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          })
          onSuccess?.(verifyRes)
        } catch (vErr) {
          onError?.(vErr)
        }
      },
      modal: {
        ondismiss: () => onDismiss?.(),
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (resp) => onError?.(resp.error))
    rzp.open()
  } catch (err) {
    console.error('Payment initiation note:', err)
    onError?.(err)
  }
}
