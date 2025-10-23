import express from "express";
import cors from "cors";
import "dotenv/config";
import serverless from "serverless-http";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// 🟢 Connect MongoDB & Cloudinary
connectDB();
connectCloudinary();

// 🟢 Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // your React dev server
      "https://vinthriftshop-frontend.vercel.app", // replace with your actual frontend domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🟢 Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.status(200).send("✅ API is working perfectly!");
});

// ✅ Export for Vercel serverless
export const handler = serverless(app);

// ✅ Run locally
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}

export default app;
