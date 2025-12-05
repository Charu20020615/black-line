# How to Set Environment Variables in Vercel

## Step-by-Step Guide

### Step 1: Navigate to Your Project
1. Go to https://vercel.com
2. Sign in to your account
3. Click on **"charuka's projects"** or go directly to your dashboard
4. Find and click on the project **"black-line-back"**

### Step 2: Open Settings
1. Once you're in the project, look at the **top menu bar**
2. You'll see tabs: [Overview] [Deployments] [Analytics] [**Settings**]
3. Click on **"Settings"**

### Step 3: Go to Environment Variables
1. In the **left sidebar**, you'll see:
   - General
   - Domains
   - **Environment Variables** ← Click this!
   - Integrations
   - Git
   - Security
   - etc.

### Step 4: Add MONGODB_URI
1. Click the **"Add New"** button
2. **Key:** `MONGODB_URI`
3. **Value:** Paste your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
4. **Environment:** Select **ALL** (Production, Preview, Development)
5. Click **"Save"**

### Step 5: Add JWT_SECRET
1. Click **"Add New"** again
2. **Key:** `JWT_SECRET`
3. **Value:** A random secret string (at least 32 characters)
   - Example: `my-super-secret-jwt-key-1234567890-abcdefghijklmnop`
4. **Environment:** Select **ALL** (Production, Preview, Development)
5. Click **"Save"**

### Step 6: Add FRONTEND_URL (Optional but Recommended)
1. Click **"Add New"** again
2. **Key:** `FRONTEND_URL`
3. **Value:** `http://localhost:5173`
4. **Environment:** Select **Development** and **Preview**
5. Click **"Save"**

### Step 7: Redeploy
After adding environment variables, you MUST redeploy:
1. Go to **"Deployments"** tab
2. Find the **latest deployment** (top of the list)
3. Click the **three dots (⋯)** menu
4. Click **"Redeploy"**
5. Select **"Production"**
6. Check **"Use existing Build Cache"** (optional)
7. Click **"Redeploy"**

## Important Notes

⚠️ **After adding environment variables, you MUST redeploy for them to take effect!**

✅ The environment variables are now available to your serverless functions.

## Troubleshooting

### If you still get "Database unavailable":
1. **Check MongoDB Atlas Network Access:**
   - Go to MongoDB Atlas dashboard
   - Click "Network Access" in the left menu
   - Make sure you have an IP allowlist entry
   - For Vercel, you can add: `0.0.0.0/0` (allows all IPs) OR add Vercel's IP ranges

2. **Verify Connection String:**
   - Make sure your MongoDB connection string is correct
   - Replace `<password>` with your actual database password
   - Make sure the database name is correct

3. **Check Vercel Logs:**
   - Go to your deployment
   - Click "View Function Logs"
   - Look for specific error messages

## MongoDB Atlas Network Access Setup

If using MongoDB Atlas:
1. Go to https://cloud.mongodb.com
2. Select your cluster
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - OR add specific IPs if you prefer
6. Click **"Confirm"**

