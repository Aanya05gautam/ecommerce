// backend/controllers/productController.js
// ... (imports remain the same, I will rewrite the file content)
import Product from "../models/Products.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    console.log("getProducts called");
    const products = await Product.find();
    console.log("Products found:", products.length);
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
      // DELETE ALL OLD PRODUCTS to ensure clean slate with working images
      await Product.deleteMany({});
      console.log("Old products deleted");
  
      const sampleProducts = [
        // ELECTRONICS
        {
          title: "Premium Wireless Headphones",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
          description: "Experience crystal-clear audio with active noise cancellation. Perfect for music lovers and professionals. 30-hour battery life.",
          category: "Electronics"
        },
        {
          title: "Smart Watch Pro",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
          description: "Advanced fitness tracking with heart rate monitor. 7-day battery. Water resistant. Track sleep, steps, and calories.",
          category: "Electronics"
        },
        {
          title: "Portable Bluetooth Speaker",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
          description: "360-degree surround sound. IPX7 waterproof. 12-hour battery. Connect multiple devices via Bluetooth 5.0.",
          category: "Electronics"
        },
        {
          title: "Wireless Ergonomic Mouse",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
          description: "Precision tracking with adjustable DPI. 24-month battery life. Silent clicking technology. Comfortable hand fit.",
          category: "Electronics"
        },
        {
          title: "Smart Thermostat",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80",
          description: "Control your home temperature from anywhere. Energy saving features. detailed usage reports. Works with Alexa and Google Home.",
          category: "Electronics"
        },
        {
            title: "4K Action Camera",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1566421966482-ad8076104d8e?auto=format&fit=crop&w=800&q=80",
            description: "Capture your adventures in stunning 4K. Waterproof, impact resistant, and comes with a full mounting kit.",
            category: "Electronics"
        },
        {
            title: "Mechanical Gaming Keyboard",
            price: 110.00,
            image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
            description: "RGB backlight with customizable patterns. Cherry MX Blue switches for tactile feedback. Aircraft-grade aluminum frame.",
            category: "Electronics"
        },
        {
            title: "HD Camera Drone", // REPLACED VR Headset
            price: 299.99,
            image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80",
            description: "Folding drone with 4K camera. 30-minute flight time. GPS return home function. Easy for beginners.",
            category: "Electronics"
        },
        
        // FASHION / CLOTHING
        {
          title: "Winter Parka Jacket",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
          description: "Warm down-filled insulation. Waterproof outer shell. Wind-resistant. Multiple pockets. Available in XS-XXL.",
          category: "Clothing"
        },
        {
          title: "Cotton Crew Neck T-Shirt",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
          description: "100% organic cotton. Comfortable fit. Available in 15 colors. Machine washable. Sustainable production.",
          category: "Clothing"
        },
        {
            title: "Denim Trucker Jacket",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80",
            description: "Classic American style. Durable denim construction. Perfect formatted layering in any season.",
            category: "Clothing"
        },
        {
            title: "Silk Scarf",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=800&q=80",
            description: "100% Mulberry silk. Hand-painted floral design. Adds a touch of elegance to any outfit.",
            category: "Clothing"
        },
        {
            title: "Comfort Hoodie",
            price: 55.00,
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
            description: "Soft fleece lining. Oversized fit. Perfect for lounging or casual outings.",
            category: "Clothing"
        },
  
        // ACCESSORIES
        {
          title: "Classic Analog Watch",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
          description: "Timeless elegance meets precision engineering. Swiss-inspired design with genuine leather strap. Water resistant up to 50m.",
          category: "Accessories"
        },
        {
          title: "Designer Sunglasses",
          price: 179.99,
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
          description: "UV protection with trendy oversized design. Polarized lenses reduce glare. Premium acetate frame. Available in 5 colors.",
          category: "Accessories"
        },
         {
          title: "Premium Phone Case", 
          price: 29.99,
          image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=800&q=80",
          description: "Military-grade protection with shock absorption. Slim design. Compatible with wireless charging. Drop tested to 12ft.",
          category: "Accessories"
        },
        {
          title: "Canvas Weekender Bag", // REPLACED Leather Travel Organizer
          price: 69.99,
          image: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=800&q=80", 
          description: "Durable canvas material with leather accents. Spacious main compartment. Perfect for short trips.",
          category: "Accessories"
        },
        {
            title: "Portable Power Bank", // REPLACED Stainless Steel Water Bottle
            price: 39.99,
            image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80",
            description: "High capacity 20,000mAh battery. Fast charging support (USB-C). Slim design fits in your pocket.",
            category: "Accessories"
        },
  
        // BAGS
        {
          title: "Premium Leather Backpack",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
          description: "Handcrafted genuine leather with multiple compartments. Perfect for travel, work, or daily adventures. Lifetime warranty.",
          category: "Bags"
        },
        {
          title: "Laptop Business Backpack",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80",
          description: "Fits 15.6-inch laptops. Ergonomic design reduces shoulder strain. Anti-theft features. TSA-approved for travel.",
          category: "Bags"
        },
         {
          title: "Professional Messenger Bag", // UPDATED IMAGE
          price: 139.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", // Using a reliable leather bag image
          description: "Canvas and leather construction. Padded laptop compartment. Adjustable shoulder strap. Perfect for professionals.",
          category: "Bags"
        },
  
        // SHOES
        {
          title: "Classic Sneaker Shoes",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
          description: "Comfortable everyday sneakers with premium cushioning. Breathable mesh design. Perfect for casual and athletic wear.",
          category: "Shoes"
        },
        {
          title: "Running Shoes Professional",
          price: 119.99,
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
          description: "Lightweight with responsive cushioning technology. Designed for long-distance runners. Anti-slip rubber sole.",
          category: "Shoes"
        },
        {
            title: "Leather Chelsea Boots",
            price: 159.00,
            image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80",
            description: "Hand-stitched leather. Durable rubber outsole. Elastic side panels for easy wear. Timeless style.",
            category: "Shoes"
        },
        {
            title: "Hiker Boots", // NEW
            price: 130.00,
            image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
            description: "Rugged durability for outdoor adventures. Waterproof leather. High traction sole.",
            category: "Shoes"
        },
  
        // HOME & FURNITURE
        {
          title: "Modern Minimalist Desk",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
          description: "Solid oak wood. Sleek design for modern home offices. Built-in cable management. Easy assembly.",
          category: "Home"
        },
        {
          title: "Velvet Accent Chair",
          price: 189.99,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
          description: "Luxurious velvet upholstery. Gold-finished legs. Comfortable ergonomic backrest. Available in Emerald, Navy, and Blush.",
          category: "Home"
        },
         {
          title: "Ceramic Plant Pot Set",
          price: 39.99,
          image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
          description: "Set of 3 minimalist ceramic pots. Drainage holes with saucers. Matte white finish. Different sizes for various plants.",
          category: "Home"
        },
        {
          title: "Abstract Wall Art",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80",
          description: "Large canvas print. Modern abstract design. Ready to hang. UV-resistant fade-free inks. Adds character to any room.",
          category: "Home"
        },
         {
            title: "Aromatic Soy Candle",
            price: 22.00,
            image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
            description: "Hand-poured 100% soy wax. Lavender and Vanilla scent. 40-hour burn time. Reusable glass jar.",
            category: "Home"
        },
        {
            title: "Smart LED Light Bulb", // NEW
            price: 15.99,
            image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80",
            description: "16 million colors. WiFi connected. Voice control compatible. Energy efficient.",
            category: "Home"
        },
  
        // BOOKS
        {
          title: "Bestseller Novel Set",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
          description: "Collection of top 3 mystery thrillers. Hardcover edition. Exclusive bookmarks included. Perfect gift for readers.",
          category: "Books"
        },
        {
            title: "Design Coffee Table Book",
            price: 65.00,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
            description: "Stunning photography of modern architecture. Hardcover. 300 pages of inspiration.",
            category: "Books"
        },
  
        // FOOD & DRINK
        {
          title: "Gourmet Coffee Beans",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
          description: "Single-origin Arabica beans. Medium roast with notes of chocolate and caramel. 1lb bag. Freshly roasted.",
          category: "Food & Drink"
        },
        {
            title: "Artisan Chocolate Box",
            price: 35.00,
            image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
            description: "Handcrafted truffles and bonbons. Assorted flavors including sea salt caramel and dark chocolate raspberry.",
            category: "Food & Drink"
        },
  
        // BEAUTY (NEW CATEGORY)
         {
          title: "Organic Skincare Set",
          price: 64.99,
          image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
          description: "Complete facial care routine. Cleanser, toner, and moisturizer. 100% natural ingredients. Cruelty-free and vegan.",
          category: "Beauty"
        },
         {
            title: "Luxury Perfume",
            price: 85.00,
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
            description: "Eau de Parfum with notes of Jasmine, Rose, and Sandalwood. Long-lasting fragrance. Elegant glass bottle.",
            category: "Beauty"
        },
  
        // SPORTS
        {
          title: "Premium Yoga Mat",
          price: 45.99,
          image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80",
          description: "Non-slip surface. Eco-friendly natural rubber. 6mm thickness. Includes carrying strap. Perfect for all yoga styles.",
          category: "Sports"
        },
         {
            title: "Adjustable Dumbbell Set", // UPDATED IMAGE
            price: 120.00,
            image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
            description: "Adjustable weight from 5 to 25 lbs. Compact design saves space. Non-slip grip handle.",
            category: "Sports"
        },
        {
            title: "Pro Tennis Racket", // NEW
            price: 180.00,
            image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80",
            description: "Carbon fiber frame. Lightweight and durable. Excellent control and power.",
            category: "Sports"
        }
      ];
  
      await Product.insertMany(sampleProducts);
      console.log("✅ 30+ Beautiful products created successfully!");
    } catch (err) {
      console.error("Error creating sample products:", err.message);
    }
  };
