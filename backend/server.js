import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import serverless from 'serverless-http'

// Initialize App
const app = express()

// Connect to services
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Root route
app.get('/', (req, res) => {
  res.status(200).send("API Working on Vercel 🚀")
})

// ❌ Remove app.listen()
// ✅ Instead export a serverless handler
export const handler = serverless(app)
export default app
