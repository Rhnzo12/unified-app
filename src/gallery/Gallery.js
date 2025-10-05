
import React from 'react';

export default function Gallery({ images = [] }) {
  return (
  <div className="quantom-bloom-card" style={{ maxWidth: 800 }}>
  <div className="quantom-bloom-header">Gallery</div>
      {images.length === 0 && <div>No images yet.</div>}
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((img, i) => (
          <div key={i} style={{ border: '2px solid #ffe066', borderRadius: 18, padding: 8, background: '#fff', boxShadow: '0 2px 8px #ffe06633' }}>
            <img src={img} alt={`Saved ${i+1}`} className="quantom-bloom-gallery-img" style={{ width: 140, height: 140 }} />
            <a href={img} download={`image${i+1}.png`} style={{ display: 'block', marginTop: 8, textAlign: 'center', color: '#b6e880', fontWeight: 600 }}>Download</a>
          </div>
        ))}
      </div>
    </div>
  );
}
