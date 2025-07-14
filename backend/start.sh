#!/bin/bash

# Railway startup script for backend
echo "Starting Credit Card Simulator Backend..."

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client (in case it's not already generated)
echo "Generating Prisma client..."
npx prisma generate

# Start the application
echo "Starting the server..."
npm start
