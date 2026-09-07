# Codivia Medical Coding Platform — Fullstack MERN Monorepo

Enterprise clinical medical coding practice platform built with the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS, Framer Motion, JWT Authentication, and Razorpay payment processing.

---

## 📁 Project Structure

```
codivia-home/
├── client/                     # Frontend Application (React + Vite + Tailwind CSS)
│   ├── public/                 # Static assets & 22 medical specialty icons
│   ├── src/                    # React components, sections, auth & state
│   │   ├── components/         # UI components & landing page sections
│   │   ├── data/               # Medical specialty & department datasets
│   │   ├── lib/                # REST API client & Razorpay helpers
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # React root mount
│   ├── index.html              # HTML entrypoint
│   ├── package.json            # Client dependencies & scripts
│   ├── tailwind.config.js      # Tailwind theme & design tokens
│   └── vite.config.js          # Vite build configuration
│
├── server/                     # Backend API (Node.js + Express + MongoDB)
│   ├── config/                 # MongoDB Mongoose database connection
│   ├── controllers/            # Auth & Razorpay payment controllers
│   ├── middleware/             # JWT auth & error handler middleware
│   ├── models/                 # User & Payment Mongoose schemas
│   ├── routes/                 # REST API route handlers
│   ├── .env.example            # Backend environment variables template
│   ├── package.json            # Server dependencies & scripts
│   ├── README.md               # AWS & MongoDB Atlas deployment guide
│   └── server.js               # Express server entrypoint
│
└── package.json                # Root workspace scripts (runs client & server together)
```

---

## 🚀 Quick Start (Development)

### 1. Run Both Client & Server Concurrently (Recommended):
```bash
npm run dev
```
- **Frontend (Client)**: [http://localhost:5173](http://localhost:5173)
- **Backend (Server)**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🛠️ Individual Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts both Frontend (`client`) and Backend (`server`) concurrently |
| `npm run client` | Starts Frontend only on port `5173` |
| `npm run server` | Starts Backend only on port `5000` with auto-reload |
| `npm run build` | Builds optimized production assets in `client/dist/` |
| `npm run install:all` | Installs dependencies across root, client, and server |

---

## ☁️ Deployment Guides

- **MongoDB Database**: Connect to a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster using the `MONGODB_URI` environment variable in `server/.env`.
- **AWS Hosting**: Follow the AWS deployment guide in [server/README.md](server/README.md) for AWS App Runner, AWS EC2 with PM2, or Elastic Beanstalk.
