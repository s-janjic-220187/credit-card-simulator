#!/bin/bash

# Railway startup script for backend
echo "🚀 Starting Credit Card Simulator Backend..."
echo "📅 Timestamp: $(date)"
echo "🔧 Environment: ${NODE_ENV:-development}"
echo "🗄️ Database URL: ${DATABASE_URL:0:30}..." # Show first 30 chars only

# Wait for database to be ready  
echo "⏳ Waiting for database to be ready..."
timeout=30
counter=0
while [ $counter -lt $timeout ]; do
    if npx prisma db push --accept-data-loss --force-reset &> /dev/null 2>&1; then
        echo "✅ Database is ready!"
        break
    fi
    echo "⏳ Database not ready, waiting... ($counter/$timeout)"
    sleep 2
    counter=$((counter + 2))
done

if [ $counter -ge $timeout ]; then
    echo "⚠️ Database connection timeout after ${timeout} seconds"
    echo "🔍 Attempting to continue anyway - app will retry connections..."
fi

# Run database migrations
echo "🔄 Running database migrations..."
if npx prisma migrate deploy; then
    echo "✅ Database migrations completed"
else
    echo "⚠️ Database migrations failed, attempting to continue..."
fi

# Generate Prisma client (in case it's not already generated)
echo "🔧 Generating Prisma client..."
if npx prisma generate; then
    echo "✅ Prisma client generated"
else
    echo "❌ Prisma client generation failed"
    exit 1
fi

# Start the application
echo "🎯 Starting the server on port ${PORT:-3000}..."
npm start
