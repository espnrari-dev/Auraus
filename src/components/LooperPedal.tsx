import React, { useState } from 'react';

export default function LooperPedal({ onOath, onForget, onElegy }) {
  const [intention, setIntention] = useState('');
  const [deadline, setDeadline] = useState('');
  const [memoryHash, setMemoryHash] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="looper-pedal" style={{ padding: '1rem', border: '2px solid #f5a623', margin: '1rem' }}>
      <h3 style={{ color: '#f5a623' }}>LOOPER PEDAL // OATH + LETHE + ELEGY</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h4>OATH</h4>
          <input placeholder="Intention" value={intention} onChange={(e) => setIntention(e.target.value)} />
          <input placeholder="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <button onClick={() => onOath(intention, deadline)}>Seal Oath</button>
        </div>
        <div>
          <h4>LETHE</h4>
          <input placeholder="Memory Hash" value={memoryHash} onChange={(e) => setMemoryHash(e.target.value)} />
          <input placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
          <button onClick={() => onForget(memoryHash, reason)}>Forget</button>
        </div>
        <div>
          <h4>ELEGY</h4>
          <button onClick={() => onElegy()}>Check Elegy</button>
        </div>
      </div>
    </div>
  );
}
