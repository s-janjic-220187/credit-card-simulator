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
    if npx prisma db execute --file-from-stdin < /dev/null &> /dev/null 2>&1; then
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

# Run database migrations (this preserves existing data)
echo "🔄 Running safe database migration..."
if [ -f "scripts/migrate-safe.js" ]; then
    echo "📂 Using smart migration script..."
    if node scripts/migrate-safe.js; then
        echo "✅ Database migration completed successfully"
    else
        echo "⚠️ Smart migration failed, trying fallback..."
        # Fallback: try standard migration
        if npx prisma migrate deploy; then
            echo "✅ Fallback migration succeeded"
        elif npx prisma db push; then
            echo "✅ Database schema pushed successfully"
        else
            echo "⚠️ All migration approaches failed, continuing with existing schema..."
        fi
    fi
else
    echo "📂 Migration script not found, using direct approach..."
    # Try migrate deploy first (preserves data)
    if npx prisma migrate deploy; then
        echo "✅ Database migrations completed"
    elif npx prisma db push; then
        echo "✅ Database schema pushed successfully"
    else
        echo "⚠️ Migration failed, continuing with existing schema..."
    fi
fi

# Run database seeding (upsert operations, won't duplicate data)
echo "🌱 Seeding database with demo data..."
if node seed.js; then
    echo "✅ Database seeding completed"
else
    echo "⚠️ Database seeding failed, continuing anyway..."
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
