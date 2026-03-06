#!/bin/bash

set -e

echo ""
echo "========================================"
echo "🚀 EcoTrack - Starting Deployment"
echo "========================================"
echo ""

# PASO 1: Instalar y construir frontend PRIMERO
echo "📦 Step 1: Installing frontend dependencies..."
npm --prefix ./frontend install

echo "🔨 Step 2: Building frontend..."
cd frontend

# Dar permisos explícitamente
chmod +x ./node_modules/.bin/vite 2>/dev/null || true
chmod +x ./node_modules/vite/bin/vite.js 2>/dev/null || true

# Intentar ejecutar vite
if ! node ./node_modules/vite/bin/vite.js build; then
  echo "❌ Frontend build FAILED"
  cd ..
  exit 1
fi
cd ..
echo "✅ Frontend built successfully!"
echo ""

# PASO 2: Instalar dependencias del backend
echo "📦 Step 3: Installing backend dependencies..."
cd backend
npm install

echo "🔨 Step 4: Building backend..."

# Dar permisos explícitamente
chmod +x ./node_modules/.bin/nest 2>/dev/null || true
chmod +x ./node_modules/@nestjs/core/index.js 2>/dev/null || true

# Ejecutar nest build directamente
if ! node ./node_modules/.bin/nest build; then
  echo "❌ Backend build FAILED"
  cd ..
  exit 1
fi
echo "✅ Backend built successfully!"
echo ""

# PASO 3: Iniciar servidor
echo "========================================"
echo "✅ Build Successful!"
echo "🌍 Starting server on port 3000..."
echo "========================================"
echo ""

npm run start:prod

