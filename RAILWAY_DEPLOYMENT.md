# Railway Deployment Guide - Separate Frontend & Backend

This guide will help you deploy the Black Line application on Railway with **separate services** for frontend and backend.

## Prerequisites

1. A Railway account (Hobby plan or higher)
2. A MongoDB database (MongoDB Atlas recommended)
3. Git repository connected to Railway

## Deployment Overview

You'll create **two separate services** in Railway:
- **Backend Service**: Node.js/Express API
- **Frontend Service**: React/Vite static site

---

## Step 1: Create Railway Project

1. Go to [Railway](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** (or your Git provider)
4. Select your repository

---

## Step 2: Deploy Backend Service

### 2.1 Create Backend Service

1. In your Railway project, click **"+ New"** → **"GitHub Repo"**
2. Select the same repository
3. Railway will auto-detect the project

### 2.2 Configure Backend Service

1. Go to **Settings** → **Root Directory**
2. Set Root Directory to: `backend`
3. Railway will auto-detect Node.js (or use Dockerfile if present)

### 2.3 Set Backend Environment Variables

Go to **Variables** tab and add:

```
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-jwt-key
FRONTEND_URL=https://your-frontend-service.railway.app
```

**Note:** `PORT` is automatically set by Railway - don't override it.

### 2.4 Deploy Backend

1. Railway will automatically deploy
2. Wait for deployment to complete
3. **Copy the backend URL** (e.g., `https://your-backend.railway.app`)
4. Test it: Visit `https://your-backend.railway.app/api/health`

---

## Step 3: Deploy Frontend Service

### 3.1 Create Frontend Service

1. In the same Railway project, click **"+ New"** → **"GitHub Repo"**
2. Select the same repository again
3. This creates a second service

### 3.2 Configure Frontend Service

1. Go to **Settings** → **Root Directory**
2. Set Root Directory to: `frontend`
3. Railway will auto-detect Node.js (or use Dockerfile if present)

### 3.3 Set Frontend Environment Variables

Go to **Variables** tab and add:

```
VITE_API_BASE_URL=https://your-backend.railway.app
PORT=3000
```

**Important:** Replace `https://your-backend.railway.app` with your actual backend URL from Step 2.4

### 3.4 Deploy Frontend

1. Railway will automatically deploy
2. Wait for deployment to complete
3. **Copy the frontend URL** (e.g., `https://your-frontend.railway.app`)

---

## Step 4: Update CORS Configuration

After getting your frontend URL:

1. Go back to **Backend Service** → **Variables**
2. Update `FRONTEND_URL` with your frontend Railway URL:
   ```
   FRONTEND_URL=https://your-frontend.railway.app
   ```
3. Railway will automatically redeploy the backend

---

## Deployment Methods

### Method 1: Using Nixpacks (Auto-detected)

Railway will automatically use the `nixpacks.toml` files in each directory:
- `backend/nixpacks.toml` - for backend service
- `frontend/nixpacks.toml` - for frontend service

### Method 2: Using Dockerfiles

If you prefer Docker:
- `Dockerfile` (root) - for backend service (set root directory to `backend`)
- `frontend/Dockerfile` - for frontend service (set root directory to `frontend`)

Railway will automatically detect and use the Dockerfiles.

### Method 3: Manual Configuration

If auto-detection doesn't work, manually set in Railway:

**Backend Service:**
- Build Command: `npm install` (or leave empty)
- Start Command: `npm start`

**Frontend Service:**
- Build Command: `npm install && npm run build`
- Start Command: `npx serve -s dist -l $PORT`

---

## Environment Variables Reference

### Backend Service Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | Auto-set | Server port (Railway sets automatically) | `4000` |
| `NODE_ENV` | Yes | Environment mode | `production` |
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Yes | Secret key for JWT tokens | `your-secret-key` |
| `FRONTEND_URL` | Yes | Frontend URL for CORS | `https://your-frontend.railway.app` |

### Frontend Service Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_BASE_URL` | Yes | Backend API URL (without /api) | `https://your-backend.railway.app` |
| `PORT` | Auto-set | Server port (Railway sets automatically) | `3000` |

---

## Database Setup

### MongoDB Atlas (Recommended)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Add it to Railway environment variables as `MONGODB_URI`
4. Make sure to whitelist Railway's IP addresses (or use `0.0.0.0/0` for all)

---

## Troubleshooting

### Backend won't start

- Check that `MONGODB_URI` is set correctly
- Verify `PORT` is set (Railway sets this automatically)
- Check Railway logs for errors

### CORS errors

- Make sure `FRONTEND_URL` matches your frontend domain exactly
- Check that Railway domains (`.railway.app`) are allowed in CORS config

### Database connection issues

- Verify MongoDB connection string is correct
- Check MongoDB Atlas network access settings
- Ensure database user has proper permissions

### Build failures

- Check Node.js version (requires Node 18+)
- Verify all dependencies are in `package.json`
- Check Railway build logs for specific errors

---

## Railway Hobby Plan Limits

- **$5/month** with 500 hours of usage
- **512 MB RAM** per service
- **1 GB storage** per service
- **100 GB bandwidth** per month

For production with higher traffic, consider upgrading to the Pro plan.

---

## Custom Domain

1. In Railway dashboard, go to your service → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Railway
4. Update `FRONTEND_URL` and `VITE_API_BASE_URL` with your custom domain

---

## Monitoring

- Railway provides built-in logs and metrics
- Check the "Metrics" tab for CPU, memory, and network usage
- Use the "Logs" tab to debug issues

---

## Support

For Railway-specific issues, check:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

For application-specific issues, check the project README files.

