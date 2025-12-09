# Multi-stage build for backend
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Copy backend package files
COPY package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy from builder
COPY --from=backend-builder /app .

# Expose port (Railway will set PORT env var)
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 4000) + '/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["node", "server.js"]

