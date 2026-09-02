#!/bin/bash
cd ~/aura
if [ -f logs/app.pid ]; then kill $(cat logs/app.pid) 2>/dev/null; fi
pkill -f "vite" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null
rm -f logs/*.pid
echo "aura stopped"
