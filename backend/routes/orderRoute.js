import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderMpesa, allOrders, userOrders, updateStatus, verifyStripe, verifyMpesa } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/mpesa', authUser, placeOrderMpesa)

// User Feature
orderRouter.post('/userorders', authUser, userOrders)

// Verify Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyMpesa', authUser, verifyMpesa )


// M-Pesa Callback
orderRouter.post('/mpesa/callback', (req, res) => {
  console.log('✅ M-Pesa Callback received:', req.body);
  res.status(200).send('Callback received successfully');
});


export default orderRouter