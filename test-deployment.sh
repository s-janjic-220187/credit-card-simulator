#!/bin/bash

# Local deployment test script
echo "🚀 Testing Railway deployment locally..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "📦 Building backend Docker image..."
cd backend
docker build -t credit-card-backend .
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi
cd ..

echo "📦 Building frontend Docker image..."
cd frontend
docker build -t credit-card-frontend .
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo "✅ Both images built successfully!"
echo ""
echo "🔧 To test locally with Docker Compose:"
echo "1. Create a .env file with your environment variables"
echo "2. Run: docker-compose up -d"
echo ""
echo "🚀 Ready for Railway deployment!"
echo "Follow the instructions in RAILWAY_DEPLOYMENT.md"
