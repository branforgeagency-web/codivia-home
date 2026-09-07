# Codivia MERN Stack Backend

Production-ready Node.js, Express & MongoDB backend for the Codivia Medical Coding Platform.

---

## Features
- **User Authentication**: Secure Registration & Login with `bcrypt` (12 rounds) and `jsonwebtoken` (JWT).
- **MongoDB Schema**: User profiles, medical specialty tracks, practice stats, audit scores, and payment history.
- **Razorpay Payments**: Server-side order creation (`/api/payment/create-order`), cryptographic HMAC-SHA256 signature verification (`/api/payment/verify-signature`), and asynchronous Webhooks (`/api/payment/webhook`).
- **Security**: Equipped with `helmet`, `cors`, `morgan`, and centralized error handling.

---

## 1. Local Setup

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB connection string (local or MongoDB Atlas) and JWT secret:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://localhost:27017/codivia
   JWT_SECRET=your_jwt_secret_key_here
   RAZORPAY_KEY_ID=rzp_test_xxxxxx
   RAZORPAY_KEY_SECRET=your_razorpay_secret_here
   ```

3. **Start Server**:
   ```bash
   npm run dev    # with nodemon auto-reload
   # or
   npm start      # standard node
   ```

4. **Verify Health**:
   Visit `http://localhost:5000/api/health` in your browser.

---

## 2. API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new student/coder account.
  ```json
  {
    "fullName": "Dr. Jordan Mitchell",
    "email": "coder@hospital.org",
    "password": "SecretPassword123",
    "specialty": "Cardiology"
  }
  ```
- `POST /api/auth/login` — Sign in with email and password (returns JWT Bearer token).
- `GET /api/auth/me` — Get current user profile (requires `Authorization: Bearer <token>`).

### Payments (Razorpay)
- `POST /api/payment/create-order` — Create Razorpay order (Authenticated).
- `POST /api/payment/verify-signature` — Cryptographic signature check & account upgrade to `paid: true` (Authenticated).
- `POST /api/payment/webhook` — Razorpay webhook event listener.

---

## 3. Deploying to AWS

### Option A: AWS App Runner (Fastest & Easiest)
1. Push your repository to GitHub.
2. Go to AWS Console > **App Runner** > **Create service**.
3. Select your GitHub repository and set the runtime to `Node.js 18/20`.
4. Build command: `cd server && npm install`
5. Start command: `node server/server.js`
6. Add your Environment variables (`MONGODB_URI`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).

### Option B: AWS EC2 / Elastic Beanstalk
1. Launch an Ubuntu EC2 instance on AWS.
2. Install Node.js & PM2:
   ```bash
   sudo apt update && sudo apt install -y nodejs npm
   sudo npm install -g pm2
   ```
3. Clone repository, install dependencies in `server/`, and start with PM2:
   ```bash
   cd codivia-home/server
   npm install --production
   pm2 start server.js --name "codivia-api"
   pm2 startup && pm2 save
   ```
4. Set up Nginx as reverse proxy on port 80/443 pointing to `http://localhost:5000`.

### Database: MongoDB Atlas (Recommended for AWS)
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create database user & allow network access (`0.0.0.0/0` or your AWS VPC IP).
3. Copy the SRV URI (e.g. `mongodb+srv://admin:<password>@cluster0.mongodb.net/codivia?retryWrites=true&w=majority`) and paste into `MONGODB_URI` in `.env`.
