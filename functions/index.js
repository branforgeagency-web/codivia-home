/**
 * CODIVIA — Server-verified Razorpay integration
 * ---------------------------------------------------------------------
 * Two entry points, both deployed to the SAME Firebase project as the
 * platform (codivia-platform), so they share the students/{uid} collection
 * and the Auth user store with the landing app's client SDK config.
 *
 *  1. createOrder        — callable function. Client calls this after
 *                           sign-in to open a Razorpay order server-side.
 *                           The amount is fixed here, NEVER trusted from
 *                           the client, to prevent price tampering.
 *
 *  2. razorpayWebhook    — HTTP function. Configured as the Webhook URL in
 *                           the Razorpay Dashboard (Settings > Webhooks).
 *                           This is the SOURCE OF TRUTH for `paid: true` —
 *                           it verifies Razorpay's HMAC-SHA256 signature
 *                           independently of anything the browser reports,
 *                           so a compromised or malicious client can never
 *                           self-grant enrolment.
 *
 * Secrets (set via `firebase functions:secrets:set <NAME>` or
 * functions.config() on older CLI versions):
 *   RAZORPAY_KEY_ID
 *   RAZORPAY_KEY_SECRET
 *   RAZORPAY_WEBHOOK_SECRET   (separate secret configured in the Razorpay
 *                              webhook dashboard — distinct from the API key
 *                              secret, used only to verify webhook payloads)
 * ---------------------------------------------------------------------
 */

const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const admin = require('firebase-admin')
const crypto = require('crypto')
const Razorpay = require('razorpay')

admin.initializeApp()
const db = admin.firestore()

const RAZORPAY_KEY_ID = defineSecret('RAZORPAY_KEY_ID')
const RAZORPAY_KEY_SECRET = defineSecret('RAZORPAY_KEY_SECRET')
const RAZORPAY_WEBHOOK_SECRET = defineSecret('RAZORPAY_WEBHOOK_SECRET')

// Fixed server-side price. Update here only — never accept a client amount.
const ENROLMENT_AMOUNT_PAISE = 899900 // ₹8,999.00
const ENROLMENT_CURRENCY = 'INR'

/**
 * 1) createOrder — callable from the client (httpsCallable).
 *    Requires an authenticated Firebase user (App Check recommended too).
 */
exports.createOrder = onCall(
  { secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Sign in before starting payment.')
    }

    const uid = request.auth.uid
    const studentRef = db.collection('students').doc(uid)
    const studentSnap = await studentRef.get()

    if (studentSnap.exists && studentSnap.data().paid === true) {
      throw new HttpsError('already-exists', 'This account is already enrolled.')
    }

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID.value(),
      key_secret: RAZORPAY_KEY_SECRET.value(),
    })

    const order = await razorpay.orders.create({
      amount: ENROLMENT_AMOUNT_PAISE,
      currency: ENROLMENT_CURRENCY,
      receipt: `codivia_${uid}_${Date.now()}`,
      notes: {
        uid,
        purpose: request.data?.purpose || 'codivia_enrolment',
      },
    })

    // Track the pending order so the webhook can cross-check uid <-> order.
    await studentRef.set(
      { studentId: uid, lastOrderId: order.id, createdAt: studentSnap.exists ? studentSnap.data().createdAt : admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )

    return { id: order.id, amount: order.amount, currency: order.currency }
  }
)

/**
 * 2) razorpayWebhook — HTTP endpoint, called by Razorpay's servers directly
 *    (NOT by the browser). Verifies the `X-Razorpay-Signature` header
 *    against the raw request body using HMAC-SHA256 and the webhook secret,
 *    per Razorpay's documented verification scheme, before trusting the
 *    payload at all.
 */
exports.razorpayWebhook = onRequest(
  { secrets: [RAZORPAY_WEBHOOK_SECRET] },
  async (req, res) => {
    try {
      const signature = req.headers['x-razorpay-signature']
      const rawBody = req.rawBody // Firebase Functions preserves the raw buffer

      if (!signature || !rawBody) {
        res.status(400).send('Missing signature or body')
        return
      }

      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET.value())
        .update(rawBody)
        .digest('hex')

      // Timing-safe comparison — never use `===` on secrets/signatures.
      const signatureValid =
        expectedSignature.length === signature.length &&
        crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))

      if (!signatureValid) {
        console.warn('Razorpay webhook signature mismatch — rejecting.')
        res.status(400).send('Invalid signature')
        return
      }

      const event = req.body
      if (event.event !== 'payment.captured') {
        // Acknowledge other event types without acting on them.
        res.status(200).send('Ignored')
        return
      }

      const payment = event.payload.payment.entity
      const orderId = payment.order_id
      const paymentId = payment.id

      // Find the student by the order id we stored in createOrder.
      const studentsQuery = await db
        .collection('students')
        .where('lastOrderId', '==', orderId)
        .limit(1)
        .get()

      if (studentsQuery.empty) {
        console.error(`No student found for order ${orderId}`)
        res.status(404).send('Student not found for order')
        return
      }

      const studentDoc = studentsQuery.docs[0]

      await studentDoc.ref.set(
        {
          paid: true,
          paymentId,
          enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )

      res.status(200).send('OK')
    } catch (err) {
      console.error('razorpayWebhook error:', err)
      res.status(500).send('Internal error')
    }
  }
)
