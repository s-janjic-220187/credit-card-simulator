# Frontend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with increased timeout and retries
RUN npm ci --production=false --maxsockets 1 --fetch-timeout=300000

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Set default API URL if not provided
ENV VITE_API_URL=${VITE_API_URL:-https://backend-ccs-production.up.railway.app/api}

# Increase Node.js memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Debug: Show environment
RUN echo "Building with VITE_API_URL: $VITE_API_URL"
RUN echo "Node version: $(node --version)"
RUN echo "TypeScript version: $(npx tsc --version)"

# Build with verbose output to catch specific errors
RUN npm run build 2>&1 | tee build.log || (echo "Build failed, showing log:" && cat build.log && exit 1)

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
