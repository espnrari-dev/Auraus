// aethel-abyss/soma-bus-ui.jsx
// React component for the SOMA Bus in the Cybernetic Studio.

import React, { useState, useEffect } from 'react';

export default function SomaBus({ onCoherenceChange }) {
  const [coherence, setCoherence] = useState(0.5);
  const [isCoherent, setIsCoherent] = useState(false);
  const [somaKey, setSomaKey] = useState(null);

  // Simulate SomaPlugin updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In production, get from SomaPlugin
      const newCoherence = 0.5 + Math.random() * 0.5;
      setCoherence(newCoherence);
      const coherent = newCoherence > 0.7;
      setIsCoherent(coherent);
      if (coherent) {
        const key = 'soma_' + Math.random().toString(36).substring(7);
        setSomaKey(key);
        onCoherenceChange && onCoherenceChange(key);
      } else {
        setSomaKey(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [onCoherenceChange]);

  return (
    <div className="soma-bus" style={{ padding: '1rem', border: '2px solid #8a2be2', margin: '1rem' }}>
      <h3 style={{ color: '#8a2be2', fontSize: '12px', letterSpacing: '0.2em' }}>SOMA BUS // HUMAN FADER</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, background: '#111', height: '8px', borderRadius: '4px' }}>
          <div style={{ width: `${coherence * 100}%`, height: '100%', background: isCoherent ? '#00ffd0' : '#f5a623', borderRadius: '4px' }} />
        </div>
        <span style={{ fontSize: '10px', color: '#666' }}>{Math.round(coherence * 100)}%</span>
        <span style={{ fontSize: '10px', color: isCoherent ? '#00ffd0' : '#f5a623' }}>
          {isCoherent ? '● FLOW' : '○ IDLE'}
        </span>
      </div>
      {somaKey && <div style={{ fontSize: '8px', color: '#555', marginTop: '0.5rem' }}>SOMA: {somaKey.slice(0, 8)}...</div>}
    </div>
  );
}
