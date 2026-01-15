import express from "express";
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get single product by ID
router.get("/:id", getProductById);

// Add a new product
router.post("/", createProduct);

export default router;
