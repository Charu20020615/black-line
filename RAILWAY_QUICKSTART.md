# Railway Quick Start Guide - Separate Services

## Quick Deployment Steps

### 1. Prepare Your Repository
- Make sure your code is pushed to GitHub/GitLab/Bitbucket
- All files are committed

### 2. Create Railway Project
1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository

### 3. Deploy Backend Service
1. Railway will auto-detect your project
2. In service settings, set **Root Directory** to: `backend`
3. Railway will auto-detect Node.js
4. Go to **Variables** tab and add:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-random-secret-key-here
   NODE_ENV=production
   ```
5. Deploy and **copy the backend URL** (e.g., `https://your-backend.railway.app`)

### 4. Deploy Frontend Service
1. In the same project, click **"+ New"** → **"GitHub Repo"**
2. Select the same repository
3. Set **Root Directory** to: `frontend`
4. Go to **Variables** tab and add:
   ```
   VITE_API_BASE_URL=https://your-backend.railway.app
   ```
   (Use the backend URL from step 3)
5. Deploy and **copy the frontend URL**

### 5. Update Backend CORS
1. Go back to **Backend Service** → **Variables**
2. Add/Update: `FRONTEND_URL=https://your-frontend.railway.app`
3. Backend will auto-redeploy

### 6. Test
- Backend: `https://your-backend.railway.app/api/health`
- Frontend: `https://your-frontend.railway.app`

## MongoDB Setup (If Needed)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string
5. Add to Railway as `MONGODB_URI`

## Troubleshooting

**Service won't start?**
- Check Railway logs
- Verify `MONGODB_URI` is correct
- Ensure all environment variables are set

**CORS errors?**
- Make sure `FRONTEND_URL` matches your frontend domain exactly
- Railway domains (`.railway.app`) are automatically allowed

**Need help?**
- Check `RAILWAY_DEPLOYMENT.md` for detailed guide
- Check Railway logs in dashboard

