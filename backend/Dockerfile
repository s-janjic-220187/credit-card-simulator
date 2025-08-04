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

# Copy prisma schema (needed for generate)
COPY prisma/schema.prisma ./prisma/schema.prisma

# Install only production dependencies
RUN npm ci --only=production

# Generate Prisma client for production
RUN npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy all migrations and related files from builder
COPY --from=builder /app/prisma/migrations/ ./prisma/migrations/

# Copy seed script for production
COPY seed.js ./

# Copy startup script
COPY start.sh ./

# Copy local scripts directory
COPY scripts/ ./scripts/

# Make startup script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 3001

# Start the application with migrations
CMD ["./start.sh"]
