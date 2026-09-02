#!/bin/bash
cd ~/aethel-daw

# Kill any leftover processes
pkill -f "node src/suggest.js" 2>/dev/null
pkill -f "node scripts/supervisor.js" 2>/dev/null
pkill -f "node src/conductor.js" 2>/dev/null
pkill -f "arecord" 2>/dev/null
pkill -f "aplay" 2>/dev/null
sleep 1

# Create logs directory
mkdir -p logs

# Start HIVE agent
npm run suggest > logs/suggest.log 2>&1 &
echo $! > logs/suggest.pid

# Start supervisor (capture)
npm run supervisor > logs/supervisor.log 2>&1 &
echo $! > logs/supervisor.pid

# Start conductor (UI)
npm start > logs/conductor.log 2>&1 &
echo $! > logs/conductor.pid

echo "All services started."
echo "  HIVE:       logs/suggest.log (PID $(cat logs/suggest.pid))"
echo "  Supervisor: logs/supervisor.log (PID $(cat logs/supervisor.pid))"
echo "  Conductor:  logs/conductor.log (PID $(cat logs/conductor.pid))"
echo "UI: http://localhost:5001"
