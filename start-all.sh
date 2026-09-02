#!/bin/bash
cd ~/aura
pkill -f "vite" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null
sleep 1
mkdir -p logs
npm run dev > logs/app.log 2>&1 &
echo $! > logs/app.pid
echo "aura started (PID $(cat logs/app.pid))"
