import express from 'express';
import { addToCart, getCartItems, getUserCart, removeCartItem, updateCart } from '../controllers/cartController.js';
//import authUser from '../middlewares/authMiddleware.js'
import authUser from '../middleware/auth.js';



const cartRouter = express.Router()

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter