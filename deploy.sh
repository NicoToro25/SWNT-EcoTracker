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

echo "🔨 Step 4: Building backend..."
cd "$ROOT_DIR/backend"
node ./node_modules/typescript/bin/tsc -p ./tsconfig.json --outDir ./dist
cd "$ROOT_DIR"
echo "✅ Backend built successfully!"
echo ""

# PASO 3: Iniciar servidor
echo "========================================"
echo "✅ Build Successful!"
echo "🌍 Starting server on port ${PORT:-3000}..."
echo "========================================"
echo ""

PORT_TO_USE="${PORT:-3000}"
export PORT="$PORT_TO_USE"

echo "🧹 Cleaning process on port ${PORT_TO_USE}..."

is_port_busy() {
  node -e "
const net = require('net');
const port = Number(process.argv[1]);
const server = net.createServer();
server.once('error', (err) => {
  if (err && err.code === 'EADDRINUSE') process.exit(1);
  process.exit(2);
});
server.once('listening', () => {
  server.close(() => process.exit(0));
});
server.listen(port, '0.0.0.0');
" "$PORT_TO_USE"
}

if command -v fuser >/dev/null 2>&1; then
  fuser -k "${PORT_TO_USE}/tcp" 2>/dev/null || true
fi

if command -v lsof >/dev/null 2>&1; then
  OLD_PID="$(lsof -ti tcp:${PORT_TO_USE} 2>/dev/null || true)"
  if [ -n "$OLD_PID" ]; then
    kill -9 $OLD_PID 2>/dev/null || true
  fi
fi

if command -v pkill >/dev/null 2>&1; then
  pkill -9 -f "/workspace/backend/dist/main" 2>/dev/null || true
  pkill -9 -f "node dist/main" 2>/dev/null || true
fi

for _ in 1 2 3 4 5; do
  if is_port_busy; then
    break
  fi
  echo "⏳ Port ${PORT_TO_USE} still busy, waiting..."
  sleep 1
done

if ! is_port_busy; then
  echo "❌ Port ${PORT_TO_USE} is still occupied. Aborting start to avoid crash loop."
  exit 1
fi

cd "$ROOT_DIR/backend"
exec npm run start:prod

