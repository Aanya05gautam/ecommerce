# 🛒 Full Stack E-Commerce Website (MERN Stack)

A modern **full‑stack E‑Commerce web application** built using the **MERN stack**. This project demonstrates real‑world implementation of backend APIs, database integration, authentication, and a responsive frontend UI.

---

## 🚀 Features

### 🧑‍💻 User Features

* User registration & login (Authentication)
* Browse products with images, price & category
* Add products to cart
* View cart items
* Responsive UI for desktop & mobile

### 🛠️ Admin / Backend Features

* RESTful APIs using Express.js
* MongoDB database integration using Mongoose
* Product CRUD functionality
* Sample product generation
* Secure authentication logic

---

## 🧰 Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🔀 React Router DOM
* 🌐 Axios

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication

### Tools

* Git & GitHub
* Postman (API testing)
* VS Code

---

## 📂 Project Structure

```
ecommerce/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── user.js
│   │   └── Products.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd ecommerce
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔗 API Endpoints

### Products

* `GET /api/products` → Get all products
* `GET /api/products/:id` → Get product by ID

### Authentication

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

---

## 📸 Screenshots

<img width="1133" height="581" alt="Screenshot 2026-01-15 145447" src="https://github.com/user-attachments/assets/2f8012de-d9cf-4173-8e0a-57e424a5b18b" />

<img width="1096" height="774" alt="Screenshot 2026-01-15 145425" src="https://github.com/user-attachments/assets/eef59f50-3e08-4dcb-90e2-abdd5000a086" />

<img width="1001" height="702" alt="Screenshot 2026-01-15 145501" src="https://github.com/user-attachments/assets/31378e22-cfaf-496f-ada6-08c74d65bf22" />



---

## 📈 What I Learned

* Building REST APIs with Express
* MongoDB schema design using Mongoose
* Connecting frontend & backend
* Authentication using JWT
* Structuring scalable MERN projects
* Using Git & GitHub professionally

---

## 🌱 Future Improvements

* Payment gateway integration
* Admin dashboard
* Product filtering & search
* Order history
* Wishlist feature

---


## 🌐 Live Demo

- **Frontend:** [E-commerce Frontend](https://ecommerce-frontend-ljqe.onrender.com)
- **Backend API:** [E-commerce Backend API](https://ecommerce-tzmo.onrender.com/api/products)



## 👩‍💻 Author


**Aanya Gautam**

B.Tech CSE Student



---

⭐ If you like this project, give it a star on GitHub!
