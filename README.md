# ShopNow - Full MERN E-Commerce Website

A complete MERN e-commerce starter project with:

- React + Vite frontend
- Node.js + Express backend
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Product search/filter/category
- Shopping cart
- Checkout
- Orders
- Admin product management
- Admin order status management
- Responsive CSS
- Demo seed data

## 1. Requirements

Install:

- Node.js 18+
- MongoDB local OR MongoDB Atlas
- VS Code

## 2. Backend setup

Open terminal:

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mernshop
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Seed demo products and admin:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

Backend:
http://localhost:5000

## 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173

## Demo admin

After seeding:

Email: `admin@mernshop.com`
Password: `Admin@123`

Change this password before production use.

## 4. Features

### Customer
- Register/login
- Browse products
- Search
- Category filtering
- Product details
- Add to cart
- Update quantity
- Remove items
- Checkout
- Cash on Delivery
- Demo online payment option
- Order history
- Profile

### Admin
- Dashboard
- Create products
- Edit products
- Delete products
- View users
- View all orders
- Update order status

## 5. Production notes

Before deployment:
- Use MongoDB Atlas.
- Use a strong JWT secret.
- Configure CORS for your production frontend.
- Add real payment processing such as Stripe/Razorpay.
- Add Cloudinary/S3 for production image uploads.
- Never expose private secrets in frontend code.
