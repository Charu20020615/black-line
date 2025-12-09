# Separate Frontend & Backend Deployment Guide

This project is configured for **separate deployments** of frontend and backend on Railway.

## Project Structure

```
black-line/
├── backend/          # Backend service (Node.js/Express)
│   ├── Dockerfile
│   ├── nixpacks.toml
│   ├── railway.json
│   └── ...
├── frontend/         # Frontend service (React/Vite)
│   ├── Dockerfile
│   ├── nixpacks.toml
│   ├── railway.json
│   └── ...
└── ...
```

## Quick Deployment Steps

### 1. Deploy Backend Service

1. Create new Railway project
2. Add service from GitHub repo
3. Set **Root Directory**: `backend`
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy and copy backend URL

### 2. Deploy Frontend Service

1. In same Railway project, add another service
2. Set **Root Directory**: `frontend`
3. Set environment variables:
   - `VITE_API_BASE_URL=<your-backend-url>`
4. Deploy and copy frontend URL

### 3. Update Backend CORS

1. Update backend `FRONTEND_URL` variable with frontend URL
2. Backend will auto-redeploy

## Configuration Files

Each service has its own configuration:

### Backend (`backend/`)
- `Dockerfile` - Docker configuration
- `nixpacks.toml` - Nixpacks build config
- `railway.json` - Railway service config
- `.dockerignore` - Docker ignore rules

### Frontend (`frontend/`)
- `Dockerfile` - Docker configuration
- `nixpacks.toml` - Nixpacks build config
- `railway.json` - Railway service config
- `.dockerignore` - Docker ignore rules

## Deployment Methods

Railway supports three methods (in order of priority):

1. **Dockerfile** - If found, Railway uses Docker
2. **nixpacks.toml** - Custom Nixpacks configuration
3. **railway.json** - Railway-specific settings
4. **Auto-detection** - Railway auto-detects Node.js

## Environment Variables

### Backend Service
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.railway.app
NODE_ENV=production
```

### Frontend Service
```
VITE_API_BASE_URL=https://your-backend.railway.app
PORT=3000
```

## Testing

After deployment:

1. **Backend Health Check**: `https://your-backend.railway.app/api/health`
2. **Frontend**: `https://your-frontend.railway.app`

## Troubleshooting

- **Service won't start**: Check Railway logs
- **CORS errors**: Verify `FRONTEND_URL` matches frontend domain exactly
- **API not connecting**: Check `VITE_API_BASE_URL` is set correctly
- **Build failures**: Check Node.js version (requires 18+)

For detailed instructions, see `RAILWAY_DEPLOYMENT.md` or `RAILWAY_QUICKSTART.md`.

