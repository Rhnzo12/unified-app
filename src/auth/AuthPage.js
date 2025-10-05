import React from 'react';

export default function AuthPage({ onComplete }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #23272f 0%, #181a20 100%)' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', maxWidth: 400, width: '100%' }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: 24 }}>Quantom Bloom</h1>
        {/* Profile selection UI removed. Now handled in Onboarding.js */}
      </div>
    </div>
  );
}
