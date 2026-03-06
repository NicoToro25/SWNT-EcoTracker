#!/bin/bash

set -e

ROOT_DIR="$(pwd)"

echo ""
echo "========================================"
echo "🚀 EcoTrack - Starting Deployment"
echo "========================================"
echo ""

# PASO 1: Frontend (solo si hace falta)
if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
  echo "📦 Step 1: Installing frontend dependencies..."
  npm --prefix "$ROOT_DIR/frontend" install
else
  echo "✅ Frontend dependencies already installed"
fi

if [ ! -f "$ROOT_DIR/frontend/dist/index.html" ]; then
  echo "🔨 Step 2: Building frontend..."
  cd "$ROOT_DIR/frontend"
  node ./node_modules/vite/bin/vite.js build
  cd "$ROOT_DIR"
  echo "✅ Frontend built successfully!"
else
  echo "✅ Frontend build already available"
fi
echo ""

# PASO 2: Backend (solo si hace falta)
if [ ! -d "$ROOT_DIR/backend/node_modules" ]; then
  echo "📦 Step 3: Installing backend dependencies..."
  cd "$ROOT_DIR/backend"
  npm install
  cd "$ROOT_DIR"
else
  echo "✅ Backend dependencies already installed"
fi

if [ ! -f "$ROOT_DIR/backend/dist/main.js" ]; then
  echo "🔨 Step 4: Building backend..."
  cd "$ROOT_DIR/backend"
  node ./node_modules/typescript/bin/tsc -p ./tsconfig.json --outDir ./dist
  cd "$ROOT_DIR"
  echo "✅ Backend built successfully!"
else
  echo "✅ Backend build already available"
fi
echo ""

# PASO 3: Iniciar servidor
echo "========================================"
echo "✅ Build Successful!"
echo "🌍 Starting server on port ${PORT:-5000}..."
echo "========================================"
echo ""

cd "$ROOT_DIR/backend"
npm run start:prod

