<!-- ───────────────────────────────────────────── -->
<!-- 🌐 TechOrbit README.md -->
<!-- ───────────────────────────────────────────── -->

<p align="center">
  <img src="https://i.ibb.co.com/Y4XnpX1r/image.png" alt="TechOrbit Banner" width="100%" />
</p>

<h1 align="center">🚀 TechOrbit</h1>
<p align="center">
  <b>Discover, Share & Explore The World of Technology</b><br/>
  A full-featured MERN Stack web platform inspired by <a href="https://producthunt.com">Product Hunt</a>
</p>

<p align="center">
  <a href="https://techorbit-0.web.app/" target="blank"><img src="https://img.shields.io/badge/Live_Site-Firebase-blue?style=for-the-badge&logo=firebase" /></a>
  <a href="https://tech-orbit-server-sepia.vercel.app/"><img src="https://img.shields.io/badge/Server-Vercel-black?style=for-the-badge&logo=vercel" /></a>
  <a href="https://github.com/tanvir-hasan-code"><img src="https://img.shields.io/badge/Author-Tanvir_Hasan-green?style=for-the-badge&logo=github" /></a>
</p>

---

## 🧠 Project Overview

**TechOrbit** is a modern full-stack web application where users can discover and share technology products such as AI tools, web apps, games, mobile apps, and software.  
It supports **authentication**, **user roles**, **moderation**, **reporting**, and **premium membership with Stripe payment**.  

Users can post, comment, upvote/downvote, report products, and moderators or admins can review and manage them — all inside an elegant, responsive dashboard.

> 🏆 This project fulfills and exceeds all requirements of **Assignment 12 (Category 012)**.

---

## 🌐 Live Links

| Type | Link |
|------|------|
| 🖥️ Client | [https://techorbit-0.web.app](https://techorbit-0.web.app) |
| 🧩 Server | [https://tech-orbit-server-sepia.vercel.app](https://tech-orbit-server-sepia.vercel.app) |

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React 19, Vite, Tailwind CSS, DaisyUI, Framer Motion, Recharts, Axios, React Query |
| **Backend** | Node.js, Express 5, MongoDB |
| **Authentication** | Firebase Auth, Firebase Admin SDK, JWT |
| **Payment** | Stripe Integration |
| **Deployment** | Firebase Hosting (client) & Vercel (server) |
| **State Management** | React Query + Context |
| **Animation** | Framer Motion, AOS |
| **Charting** | Recharts |
| **Form Handling** | React Hook Form |
| **Notification** | SweetAlert2, React Hot Toast |

---


## 🔐 Security & Environment

Your project takes security seriously. Here’s how sensitive information is handled:

- ✅ **Firebase configuration keys** secured in `.env`
- ✅ **MongoDB credentials** secured in `.env`
- ✅ **Stripe secret key** secured in `.env`
- ✅ **Firebase Admin credentials** safely handled
- ✅ **JWT token-based route protection**
- ✅ **Role-based API access** (Admin / Moderator / User)

---

## 👥 User Roles & Features

### 🧑 Normal User
- 🔸 **Register/Login with Firebase** (Email & Google)
- 🔸 **Create/Update Profile**
- 🔸 **Post new products** (AI tools, Apps, Games, etc.)
- 🔸 **Upvote / Downvote / Comment / Report products**
- 🔸 **View trending & featured products**
- 🔸 **Subscribe via Stripe for Premium Membership**
- 🔸 **Premium users can post unlimited products**

---

### 🧑‍⚖️ Moderator
- ✅ **Review pending product submissions**
- ✅ **Approve / Reject / Feature products**
- ✅ **Handle reported content**
- ✅ **Manage moderation dashboard**

---

### 🧑‍💼 Admin
- 🧭 **View platform analytics** (Pie Charts & Cards)
- 🧑‍🤝‍🧑 **Manage all users & roles**
- 🎟️ **Add/Edit/Delete coupons**
- 💬 **Monitor site-wide activity**

---

## 💳 Payment System
- Integrated **Stripe Checkout**
- Secure API keys using `.env`
- Users can upgrade to **Premium instantly**

---

## 🧩 Coupon Management
- Admin adds valid coupon codes with expiry, description, and amount  
- Dynamic coupon slider on the homepage  
- Coupons integrated with payment flow for discount redemption  

---

## 🧾 Dashboard Overview

| Dashboard Type          | Features                                 |
| ----------------------- | ---------------------------------------- |
| **User Dashboard**      | Profile, Add Product, My Products        |
| **Moderator Dashboard** | Pending Post, Reported Post              |
| **Admin Dashboard**     | Statistics, Manage Users, Manage Coupons |

---

## 📊 Commit Structure

| Type      | Example                                   |
| ---------- | ----------------------------------------- |
| ✨ Feature | `feat(auth): add google login system`     |
| 🐛 Fix     | `fix(api): resolve jwt middleware error`  |
| 🎨 UI      | `style(home): improve banner layout`      |
| 🔧 Config  | `chore(env): secure stripe keys`          |

---

## ⚙️ Backend Features
- Role-based protected API routes  
- JWT authentication middleware  
- MongoDB-based dynamic filtering, pagination & search  
- CORS configured properly for production  
- Stripe & Firebase Admin integration for secure operations  

---

## 🧩 Deployment Overview

| Component      | Platform         |
| -------------- | ---------------- |
| **Frontend**   | Firebase Hosting |
| **Backend**    | Vercel           |
| **Database**   | MongoDB Atlas    |
| **Auth**       | Firebase         |
| **Payment**    | Stripe           |

---

## 📸 Project Preview

<p align="center">
  <img src="https://i.ibb.co.com/0w2TGmZ/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/MD6zFBHm/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/rCc34WD/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/Qjj3Wc6D/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/RktdXDm1/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/h1nPmQ7y/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/VYFXCRcg/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/7tMn0zPr/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/sdqB9TSN/image.png" alt="Dashboard Preview" width="85%" />
  <img src="https://i.ibb.co.com/5XwF9J0K/image.png" alt="Dashboard Preview" width="85%" />
</p>

---

## 👨‍💻 Author

**Tanvir Hasan**  
📧 Email: [tanvirx015@gmail.com](mailto:tanvirx015@gmail.com)  

💼 **GitHub:** [tanvir-hasan-code](https://github.com/tanvir-hasan-code)  
💬 **LinkedIn:** [linkedin.com/in/tanvir-hasan-code](https://www.linkedin.com/in/tanvir-hasan-b71828381/)

---

⭐ *If you like this project, please consider giving it a star on GitHub — it helps others discover it too!*

## 👨‍💻 Author

<div align="center">
  <a href="https://github.com/tanvir-hasan-code" target="_blank" rel="noopener">
    <img src="https://i.ibb.co.com/TMRn5yvy/image.png" width="110" alt="Tanvir Hasan" style="border-radius:12px; border:1px solid #eaeaea"/>
  </a>
  <br />
  <strong style="font-size:18px">Tanvir Hasan</strong>
  <p style="margin:6px 0 12px 0">Full-stack MERN developer • Creator of <em>TechOrbit</em></p>

  <a href="mailto:tanvirx015@gmail.com" target="_blank" rel="noopener">📧 tanvirx015@gmail.com</a>
  &nbsp; • &nbsp;
  <a href="https://github.com/tanvir-hasan-code" target="_blank" rel="noopener">💼 GitHub</a>
  &nbsp; • &nbsp;
  <a href="https://www.linkedin.com/in/tanvir-hasan-b71828381" target="_blank" rel="noopener">💬 LinkedIn</a>
  <br /><br />

  <a href="https://techorbit-0.web.app/" target="_blank" rel="noopener">🌐 Live Demo</a>
  &nbsp; • &nbsp;
  <a href="https://tech-orbit-server-sepia.vercel.app/" target="_blank" rel="noopener">🔗 Server API</a>
</div>

## ⚙️ Dependencies

### 🖥️ Client Side
```json
"dependencies": {
  "@pathofdev/react-tag-input": "^1.0.7",
  "@stripe/react-stripe-js": "^5.2.0",
  "@stripe/stripe-js": "^8.1.0",
  "@tanstack/react-query": "^5.90.5",
  "aos": "^2.3.4",
  "axios": "^1.12.2",
  "daisyui": "^5.2.2",
  "firebase": "^12.4.0",
  "framer-motion": "^12.23.24",
  "lottie-react": "^2.4.1",
  "lucide-react": "^0.545.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-hook-form": "^7.65.0",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-intersection-observer": "^9.16.0",
  "react-router": "^7.9.4",
  "recharts": "^3.3.0",
  "sweetalert2": "^11.26.2",
  "swiper": "^12.0.2",
  "tailwindcss": "^4.1.14"
}


"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "firebase-admin": "^13.5.0",
  "mongodb": "^6.20.0",
  "stripe": "^19.1.0"
}
```
-**Made By Tanvir**




