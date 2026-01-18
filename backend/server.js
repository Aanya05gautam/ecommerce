import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { createSampleProducts } from "./controllers/productController.js";

dotenv.config();

const app = express();

// Replace with your frontend Render URL
const frontendURL = "https://ecommerce-frontend-ljqe.onrender.com";

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", frontendURL],
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// Auth API
app.use("/api/auth", authRoutes);

// Payment API
app.use("/api/payment", paymentRoutes);

// Product API
app.use("/api/products", productRoutes);

// Connect to MongoDB and create sample products
connectDB().then(() => {
  createSampleProducts();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

