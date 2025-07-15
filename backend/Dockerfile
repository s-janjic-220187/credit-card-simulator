# Backend Dockerfile - Multi-stage build
FROM node:18-slim AS builder

WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:18-slim AS production

WORKDIR /app

# Install OpenSSL and bash (required by Prisma and startup script)
RUN apt-get update -y && apt-get install -y openssl bash && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production

# Generate Prisma client for production
RUN npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy migrations from builder stage (important for Railway!)
COPY --from=builder /app/prisma/migrations ./prisma/migrations
COPY --from=builder /app/prisma/migration_lock.toml ./prisma/migration_lock.toml

# Copy seed script for production
COPY seed.js ./

# Copy migration scripts
COPY scripts/ ./scripts/

# Copy startup script
COPY start.sh ./

# Make startup script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 3001

# Start the application with migrations
CMD ["./start.sh"]
