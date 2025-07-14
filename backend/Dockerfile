# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install bash for startup script
RUN apk add --no-cache bash

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Make startup script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 3001

# Start the application with migrations
CMD ["./start.sh"]
