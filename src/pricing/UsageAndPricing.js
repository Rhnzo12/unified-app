
import React from 'react';

export default function UsageAndPricing({ imagesUsed = 0, freeLimit = 10 }) {
  const paid = imagesUsed > freeLimit;
  return (
  <div className="quantom-bloom-card" style={{ maxWidth: 400, marginTop: 40, boxShadow: '0 4px 24px #ffe06633', border: '2px solid #ffe066' }}>
  <div className="quantom-bloom-header" style={{ marginBottom: 12 }}>Usage & Subscription</div>
      <div style={{ marginBottom: 10, fontSize: '1.1rem' }}>
        <span style={{ color: '#b6e880', fontWeight: 700 }}>Images generated:</span>
        <b style={{ color: '#ffe066', marginLeft: 8 }}>{imagesUsed}</b>
      </div>
      <div style={{ marginBottom: 18, fontSize: '1.1rem' }}>
        <span style={{ color: '#b6e880', fontWeight: 700 }}>Free trial limit:</span>
        <b style={{ color: '#ffe066', marginLeft: 8 }}>{freeLimit}</b>
      </div>
      {paid ? (
        <div style={{ color: '#e67c00', marginTop: 12, fontWeight: 600, fontSize: '1.1rem', textAlign: 'center' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Free limit reached!</span>
          <br />
          <button className="quantom-bloom-btn" style={{ marginTop: 16, width: '100%' }}>Upgrade Plan</button>
        </div>
      ) : (
        <div style={{ color: '#b6e880', marginTop: 12, fontWeight: 600, fontSize: '1.1rem', textAlign: 'center' }}>
          You are on the <span style={{ color: '#ffe066', fontWeight: 700 }}>free plan</span>.
        </div>
      )}
    </div>
  );
}
