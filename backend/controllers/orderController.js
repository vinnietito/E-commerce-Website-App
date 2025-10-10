import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using Cash On Delivery(COD) Method
const placeOrder = async (req, res) => {

    try {
        
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            Date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }

}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    
}

// Placing orders using Razor Pay Method
const placeOrderRazorpay = async (req, res) => {
    
}

// Placing orders using Mpesa Method
const placeOrderMpesa = async (req, res) => {
    
}

// All orders Data for Admin Panel
const allOrders = async (req, res) => {
    
}

// User Order Data for Frontend
const userOrders = async (req, res) => {
    
}

// Update Order status from Admin  Panel
const updateStatus = async (req, res) => {
    
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderMpesa, allOrders, userOrders, updateStatus }