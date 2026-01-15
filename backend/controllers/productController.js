import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create sample products if DB empty
export const createSampleProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const sampleProducts = [
        {
          title: "Cool Sneakers",
          price: 99,
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Stylish Jacket",
          price: 150,
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Smart Watch",
          price: 199,
          image: "https://via.placeholder.com/150",
        },
      ];
      await Product.insertMany(sampleProducts);
      console.log("Sample products created");
    }
  } catch (err) {
    console.error("Error creating sample products:", err.message);
  }
};

