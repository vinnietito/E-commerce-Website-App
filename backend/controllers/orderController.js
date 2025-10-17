// import { currency } from "../../admin/src/App.jsx";
import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import axios from "axios"
import { getMpesaAccessToken } from "../utils/mpesa.js";

// Global Varibles
const currency = 'kes'
const deliveryCharge = 350

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using Cash On Delivery(COD) Method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Verify Stripe
const verifyStripe = async (req, res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            re.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Placing orders using Razor Pay Method
const placeOrderRazorpay = async (req, res) => {

}

// Placing orders using Mpesa Method
const placeOrderMpesa = async (req, res) => {
    try {
        console.log('Incoming Body:', req.body);

        const { userId, items, amount, address, phoneNumber } = req.body;

        if (!phoneNumber || !amount) {
            return res.status(400).json({ success: false, message: "Missing phoneNumber or amount" });
        }

        // 1️⃣ Save order first
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Mpesa",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // 2️⃣ Get access token
        const tokenResponse = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                auth: {
                    username: process.env.MPESA_CONSUMER_KEY,
                    password: process.env.MPESA_CONSUMER_SECRET
                }
            }
        );

        const accessToken = tokenResponse.data.access_token;
        console.log("✅ Access Token:", accessToken);

        const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);

        const password = Buffer.from(
            `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
        ).toString("base64");

        const stkPushData = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: phoneNumber,
            CallBackURL: `${process.env.MPESA_CALLBACK_URL}`,
            AccountReference: `Order${newOrder._id}`, // ✅ So we can identify it later
            TransactionDesc: "Payment for order"
        };

        const stkResponse = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            stkPushData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ MPESA RESPONSE:", stkResponse.data);

        res.json({
            success: true,
            message: "STK push initiated",
            data: stkResponse.data,
            orderId: newOrder._id
        });
    } catch (error) {
        console.log("❌ MPESA ERROR:", error.response?.data || error.message);
        res.status(400).json({ success: false, message: error.response?.data || error.message });
    }
};


// Verify Mpesa
const verifyMpesa = async (req, res) => {
    try {
        const { Body } = req.body;
        const result = Body.stkCallback;

        const checkoutId = result.CheckoutRequestID;

        if (result.ResultCode === 0) {
            // Payment successful
            const orderRef = result.CallbackMetadata.Item.find(
                i => i.Name === "AccountReference"
            )?.Value.replace("Order", "");

            await orderModel.findByIdAndUpdate(orderRef, { payment: true });
            res.json({ success: true, message: "Payment confirmed" });
        } else {
            console.log("Payment failed:", result.ResultDesc);
            res.json({ success: false, message: result.ResultDesc });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// All orders Data for Admin Panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User Order Data for Frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Update Order status from Admin  Panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export { verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderMpesa, allOrders, userOrders, updateStatus, verifyMpesa }