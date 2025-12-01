# 📋 Task Manager App (MERN)

A full-stack Task Manager application built using **MongoDB, Express.js, React.js, and Node.js**.  
This app allows users to **register, login, create tasks, update tasks, and delete tasks**, with full JWT-based authentication.

---

## 🚀 Live Links

### 🌐 Frontend Vercel
👉 https://ciphrix-task-manager.vercel.app/dashboard

### 🖥 Backend (Render)
👉 https://ciphrix-task-manager.onrender.com

---

## 🛠 Tech Stack

### **Frontend**
- React.js  
- React Router  
- Context API  
- Axios  
- Material UI  

### **Backend**
- Node.js  
- MongoDB   
- JWT Authentication  

---

## 📦 Features

✔ User Registration & Login  
✔ JWT Authentication  
✔ Create, Edit, Delete Tasks  
✔ Protected Routes  
✔ Responsive UI  
✔ Token stored in localStorage  
✔ API integrated with Axios instance  

---

## 📁 Project Structure
ciphrix-task-manager/
├── client/ (React app)
├── task-manager-backend/ (Node + Express)
└── README.md

--
## ⚙️ Installation & Setup

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/DARSHANARANE/ciphrix-task-manager.git
cd ciphrix-task-manager

**1) 🔧 Backend Setup (task-manager-backend/)**
  1. cd task-manager-backend
  2. npm install
  3. Create .env file
      MONGO_URI=your_mongo_connection_string
      JWT_SECRET=yourSecretKey
      PORT=5000
 4. npm start
 -----
**2) 💻 Frontend Setup (client/)**
   1. cd task-manager-backend
   2. npm install
   3. Create .env file
      REACT_APP_API_URL=https://ciphrix-task-manager.onrender.com/api
   4. npm start

-----

**🔗 API Endpoints**
Auth
  POST /api/auth/signup
  POST /api/auth/signin

Tasks
  GET /api/tasks
  POST /api/tasks
  PUT /api/tasks/:id
  DELETE /api/tasks/:id



👨‍💻 **Author**

**Darshana Rane**
**Frontend Developer | React Specialist**
