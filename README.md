# 🛍️ ShopHub - Premium E-Commerce Experience

A modern, full-stack e-commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js). 
Featuring a stunning UI, real-time payment integration, and gamified engagement features.

## ✨ Features

### 🎨 User Interface
- **Modern Design**: Glassmorphism effects, smooth gradients, and micro-interactions.
- **Responsive**: Fully optimized for desktop, tablet, and mobile.
- **Dynamic Home Page**: Hero section with video backgrounds, flash sale countdowns, and "New Arrivals".

### 🛒 Shopping Experience
- **Product Catalog**: Extensive categories (Electronics, Fashion, Home, Sports, etc.).
- **Smart Cart**: Coupon code system, dynamic quantity updates, and instant price calculation.
- **Search & Filter**: Real-time product search and category filtering.

### 🎡 Engagement & Rewards
- **Spin & Win**: Gamified "Spin the Wheel" feature to win real discount coupons.
- **Flash Sales**: Countdown timers for special limited-time offers.
- **Coupons**: Apply codes like `SAVE10` or `FREESHIP` for discounts.

### 💳 Payments & Security
- **Secure Checkout**: Integrated **Stripe** for secure credit/debit card processing.
- **Mock Payment Mode**: Built-in simulator for testing payments without real cards (supports UPI & Cards).
- **Authentication**: Secure JWT-based login and registration.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payments**: Stripe API
- **State Management**: React Context / Hooks

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Aanya05gautam/ecommerce.git
cd ecommerce
```

### 2. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key_or_placeholder
```
Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The app will launch at `http://localhost:5173`!

---

## 🔮 Future Improvements
- [ ] Admin Dashboard for product management
- [ ] User Reviews and Ratings
- [ ] Wishlist functionality
- [ ] Order History tracking

---

Made with ❤️ by [Aksha]
