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

const frontendURL = "https://shophubfrontend-five.vercel.app";

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", frontendURL],
  credentials: true
}));

app.use(express.json());

// Health/root route
app.get("/", (req, res) => {
  res.json({
    message: "ShopHub backend is running",
    endpoints: ["/test", "/api/products", "/api/auth", "/api/payment"]
  });
});

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

// Connect to MongoDB and create sample products when available
connectDB().then((connected) => {
  if (connected) {
    createSampleProducts();
  } else {
    console.log("Running without database. Fallback product data will be used.");
  }
});

const PORT = process.env.PORT || 5000;

// Only listen if not imported (for local dev)
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

