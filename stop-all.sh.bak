#!/bin/bash
cd ~/aethel-daw
if [ -f logs/suggest.pid ]; then kill $(cat logs/suggest.pid) 2>/dev/null; fi
if [ -f logs/supervisor.pid ]; then kill $(cat logs/supervisor.pid) 2>/dev/null; fi
if [ -f logs/conductor.pid ]; then kill $(cat logs/conductor.pid) 2>/dev/null; fi
pkill -f "node src/suggest.js" 2>/dev/null
pkill -f "node scripts/supervisor.js" 2>/dev/null
pkill -f "node src/conductor.js" 2>/dev/null
pkill -f "arecord" 2>/dev/null
pkill -f "aplay" 2>/dev/null
rm -f logs/*.pid
echo "All services stopped."
