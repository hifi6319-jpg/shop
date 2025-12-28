# Deployment Guide - NutriMix Premium

This guide details how to deploy your **Storefront**, **Admin Panel**, and **Backend Server**.

## 1. Environment Configuration
Ensure you have `.env` files in each directory or set these variables in your hosting provider (Vercel, Railway, Render, etc.).

### **Server (.env)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/shop
JWT_SECRET=your_super_secret_key
```

### **Storefront (.env)**
```env
VITE_API_URL= https://your-backend-api.com
```

### **Admin Panel (.env)**
```env
VITE_API_URL= https://your-backend-api.com
```

---

## 2. Build for Production

### **Storefront**
Navigate to `m:/ecom/shop/legacy` and run:
```bash
npm install
npm run build
```
Upload the `dist` folder to your static host (Vercel/Netlify).

### **Admin Panel**
Navigate to `m:/ecom/shop/admin` and run:
```bash
npm install
npm run build
```
Upload the `dist` folder to your static host (Vercel/Netlify).

### **Backend Server**
Navigate to `m:/ecom/shop/server` and run:
```bash
npm install
node index.js
```
Deploy this to a Node.js hosting provider (Railway/Render/Heroku).

---

## 3. Local Production Test
To test the production build locally before uploading:

1. **Serve Backend**:
   ```bash
   cd m:/ecom/shop/server
   node index.js
   ```

2. **Serve Storefront**:
   ```bash
   cd m:/ecom/shop/legacy
   npm run preview
   ```

3. **Serve Admin**:
   ```bash
   cd m:/ecom/shop/admin
   npm run preview
   ```
