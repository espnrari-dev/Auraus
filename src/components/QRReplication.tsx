import React, { useState, useEffect } from 'react';

export default function QRReplication() {
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    // In production, import LoomProtocol from aethel-apex
    const encoded = btoa(JSON.stringify({ time: Date.now(), version: '1.0' }));
    setQrData(`APEX_${encoded}`);
  }, []);

  return (
    <div className="qr-container" style={{ padding: '1rem', border: '1px solid #8a2be2', margin: '1rem' }}>
      <h3 style={{ color: '#8a2be2', fontSize: '12px', letterSpacing: '0.2em' }}>APEX REPLICATION</h3>
      <img 
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=200x200`} 
        alt="APEX QR"
        style={{ width: '200px', height: '200px', border: '1px solid #333' }}
      />
      <p style={{ fontSize: '10px', color: '#666' }}>Scan with Auraus mobile or BIRTH_EDGE_REPLICA</p>
    </div>
  );
}
