const crypto = require('crypto');
const Razorpay = require('razorpay');
const User = require('../models/User');
const Payment = require('../models/Payment');

// Fixed server-side pricing to prevent client tampering
const ENROLMENT_PRICE_INR = 8999; // ₹8,999.00
const ENROLMENT_PRICE_PAISE = 899900; // in paise

/**
 * Helper to get configured Razorpay client instance
 */
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API keys are not configured in environment variables.');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

/**
 * @desc    Create a new Razorpay order
 * @route   POST /api/payment/create-order
 * @access  Private (Authenticated student)
 */
const createOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.paid) {
      return res.status(400).json({ success: false, message: 'Account is already enrolled in Codivia Pro.' });
    }

    const receipt = `codivia_${user._id}_${Date.now()}`;
    const razorpay = getRazorpayInstance();

    const order = await razorpay.orders.create({
      amount: ENROLMENT_PRICE_PAISE,
      currency: 'INR',
      receipt,
      notes: {
        userId: user._id.toString(),
        userEmail: user.email,
        userName: user.fullName,
        purpose: 'codivia_enrolment_all_22_depts',
      },
    });

    // Save pending payment record in DB
    await Payment.create({
      user: user._id,
      orderId: order.id,
      amount: ENROLMENT_PRICE_INR,
      currency: 'INR',
      status: 'created',
      purpose: 'codivia_enrolment_all_22_depts',
      receipt,
      notes: {
        userEmail: user.email,
      },
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify Razorpay payment signature
 * @route   POST /api/payment/verify-signature
 * @access  Private (Authenticated student)
 */
const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Please provide orderId, paymentId, and signature.',
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === signature;

    if (!isAuthentic) {
      // Mark payment failed in DB
      await Payment.findOneAndUpdate(
        { orderId },
        { status: 'failed', paymentId, signature }
      );

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: invalid HMAC signature.',
      });
    }

    // Payment signature is valid! Update payment in DB
    await Payment.findOneAndUpdate(
      { orderId },
      {
        status: 'captured',
        paymentId,
        signature,
      }
    );

    // Upgrade user to paid = true
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        paid: true,
        enrolledAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully. Welcome to Codivia Pro!',
      paid: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        paid: user.paid,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Razorpay Webhook endpoint (Server-to-Server asynchronous source of truth)
 * @route   POST /api/payment/webhook
 * @access  Public (Verified via X-Razorpay-Signature header)
 */
const handleWebhook = async (req, res, next) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    if (!webhookSecret || !signature) {
      return res.status(400).json({ message: 'Webhook secret or signature missing.' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid webhook signature.' });
    }

    const event = req.body.event;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const userId = paymentEntity.notes?.userId;

      if (orderId) {
        await Payment.findOneAndUpdate(
          { orderId },
          { status: 'captured', paymentId: paymentEntity.id }
        );
      }

      if (userId) {
        await User.findByIdAndUpdate(userId, { paid: true, enrolledAt: new Date() });
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('[Webhook Error]:', error);
    res.status(500).json({ message: 'Webhook processing failed.' });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  handleWebhook,
};
