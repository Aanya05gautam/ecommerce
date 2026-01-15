// backend/controllers/productController.js
import Product from "../models/Products.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    console.log("getProducts called");
    const products = await Product.find();
    console.log("Products found:", products);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create sample products if DB empty
export const createSampleProducts = async () => {
  try {
    // DELETE ALL OLD PRODUCTS
    await Product.deleteMany({});
    console.log("Old products deleted");

    const sampleProducts = [
      {
        title: "Premium Wireless Headphones",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        description: "Experience crystal-clear audio with active noise cancellation. Perfect for music lovers and professionals. 30-hour battery life.",
        category: "Electronics"
      },
      {
        title: "Classic Analog Watch",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        description: "Timeless elegance meets precision engineering. Swiss-inspired design with genuine leather strap. Water resistant up to 50m.",
        category: "Watches"
      },
      {
        title: "Premium Leather Backpack",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        description: "Handcrafted genuine leather with multiple compartments. Perfect for travel, work, or daily adventures. Lifetime warranty.",
        category: "Bags"
      },
      {
        title: "Classic Sneaker Shoes",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        description: "Comfortable everyday sneakers with premium cushioning. Breathable mesh design. Perfect for casual and athletic wear.",
        category: "Shoes"
      },
      {
        title: "Smart Watch Pro",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        description: "Advanced fitness tracking with heart rate monitor. 7-day battery. Water resistant. Track sleep, steps, and calories.",
        category: "Electronics"
      },
      {
        title: "Designer Sunglasses",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        description: "UV protection with trendy oversized design. Polarized lenses reduce glare. Premium acetate frame. Available in 5 colors.",
        category: "Accessories"
      },
      {
        title: "Running Shoes Professional",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        description: "Lightweight with responsive cushioning technology. Designed for long-distance runners. Anti-slip rubber sole.",
        category: "Shoes"
      },
      {
        title: "Portable Bluetooth Speaker",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1589003077984-894e133da26d?w=500&h=500&fit=crop",
        description: "360-degree surround sound. IPX7 waterproof. 12-hour battery. Connect multiple devices via Bluetooth 5.0.",
        category: "Electronics"
      },
      {
        title: "Winter Parka Jacket",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
        description: "Warm down-filled insulation. Waterproof outer shell. Wind-resistant. Multiple pockets. Available in XS-XXL.",
        category: "Clothing"
      },
      {
        title: "Premium Phone Case",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop",
        description: "Military-grade protection with shock absorption. Slim design. Compatible with wireless charging. Drop tested to 12ft.",
        category: "Accessories"
      },
      {
        title: "Laptop Business Backpack",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        description: "Fits 15.6-inch laptops. Ergonomic design reduces shoulder strain. Anti-theft features. TSA-approved for travel.",
        category: "Bags"
      },
      {
        title: "Wireless Ergonomic Mouse",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
        description: "Precision tracking with adjustable DPI. 24-month battery life. Silent clicking technology. Comfortable hand fit.",
        category: "Electronics"
      },
      {
        title: "Vintage Leather Wallet",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1627123454529-c62e9d3f4bab?w=500&h=500&fit=crop",
        description: "Genuine Italian leather. RFID blocking technology. 12 card slots. Slim design. Vintage patina develops over time.",
        category: "Accessories"
      },
      {
        title: "Professional Messenger Bag",
        price: 139.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        description: "Canvas and leather construction. Padded laptop compartment. Adjustable shoulder strap. Perfect for professionals.",
        category: "Bags"
      },
      {
        title: "Cotton Crew Neck T-Shirt",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        description: "100% organic cotton. Comfortable fit. Available in 15 colors. Machine washable. Sustainable production.",
        category: "Clothing"
      },
      {
        title: "Premium Yoga Mat",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        description: "Non-slip surface. Eco-friendly natural rubber. 6mm thickness. Includes carrying strap. Perfect for all yoga styles.",
        category: "Sports"
      },
      {
        title: "Stainless Steel Water Bottle",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=500&h=500&fit=crop",
        description: "Double-wall insulation keeps drinks cold for 24 hours. BPA-free. Durable and lightweight. Available in 8 colors.",
        category: "Accessories"
      },
      {
        title: "Wireless Charging Pad",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1591290621155-e1725f45bac6?w=500&h=500&fit=crop",
        description: "Fast 15W wireless charging. Compatible with all Qi devices. LED indicator. Non-slip surface. Compact design.",
        category: "Electronics"
      },
      {
        title: "Premium Fitness Tracker Band",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
        description: "Waterproof silicone band. Step, calorie, and heart rate tracking. Sleep monitoring. 14-day battery life.",
        category: "Sports"
      },
      {
        title: "Designer Sunglasses Case",
        price: 22.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        description: "Hard shell protection. Premium leather exterior. Microfiber cleaning cloth included. Perfect gift packaging.",
        category: "Accessories"
      },
      {
        title: "Professional Camera Tripod",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
        description: "Adjustable height from 15 to 67 inches. Lightweight aluminum. Ball head for smooth panning. Carrying bag included.",
        category: "Electronics"
      },
      {
        title: "Bamboo Cutting Board Set",
        price: 54.99,
        image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        description: "Set of 3 sustainable bamboo boards. Antibacterial coating. Food-safe finishes. Beautiful kitchen addition.",
        category: "Home"
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log("✅ 22 Beautiful products created successfully!");
  } catch (err) {
    console.error("Error creating sample products:", err.message);
  }
};