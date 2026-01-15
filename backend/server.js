import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { createSampleProducts } from "./controllers/productController.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// Product API
app.use("/api/products", productRoutes);

// Create sample products if DB empty
createSampleProducts();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

