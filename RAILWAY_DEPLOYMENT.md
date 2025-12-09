# Railway Deployment Guide

This guide will help you deploy the Black Line application on Railway.

## Prerequisites

1. A Railway account (Hobby plan or higher)
2. A MongoDB database (MongoDB Atlas recommended)
3. Git repository connected to Railway

## Deployment Steps

### Option 1: Deploy Backend Only (Recommended for Hobby Plan)

Since Railway Hobby plan has resource limits, it's recommended to deploy the backend on Railway and host the frontend separately (e.g., Vercel, Netlify).

#### Step 1: Create a New Project on Railway

1. Go to [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo" (or Git provider of your choice)
4. Select your repository

#### Step 2: Configure Backend Service

1. Railway will auto-detect the backend folder
2. Set the root directory to `backend` in Railway settings
3. Railway will automatically detect Node.js and install dependencies

#### Step 3: Set Environment Variables

In Railway dashboard, go to your service → Variables tab and add:

```
PORT=4000
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-jwt-key
FRONTEND_URL=https://your-frontend-domain.com
```

#### Step 4: Deploy

1. Railway will automatically deploy when you push to your main branch
2. Or click "Deploy" in the Railway dashboard

#### Step 5: Get Your Backend URL

1. After deployment, Railway will provide a public URL (e.g., `https://your-app.railway.app`)
2. Copy this URL

#### Step 6: Update Frontend API Configuration

Update `frontend/src/api/axiosInstance.js` or set environment variable:

```
VITE_API_BASE_URL=https://your-backend.railway.app
```

Then deploy your frontend to Vercel/Netlify with this environment variable.

---

### Option 2: Deploy Both Backend and Frontend (Monorepo)

If you want to deploy both services on Railway:

#### Step 1: Create Two Services

1. Create first service for **Backend**:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

2. Create second service for **Frontend**:
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Start command: `npx serve -s dist -l 3000`
   - Or use a static file server

#### Step 2: Set Environment Variables

**Backend Service:**
```
PORT=4000
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-jwt-key
FRONTEND_URL=https://your-frontend-service.railway.app
```

**Frontend Service:**
```
VITE_API_BASE_URL=https://your-backend-service.railway.app
```

#### Step 3: Deploy Both Services

Railway will deploy both services automatically.

---

## Using Docker (Alternative)

If you prefer Docker deployment:

1. Railway will automatically detect the `Dockerfile` in the root
2. Make sure to set the root directory to `backend` in Railway settings
3. The Dockerfile is configured to build and run the backend service

---

## Environment Variables Reference

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port (Railway sets this automatically) | `4000` |
| `NODE_ENV` | Environment mode | `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-frontend.com` |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://your-backend.railway.app` |

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

