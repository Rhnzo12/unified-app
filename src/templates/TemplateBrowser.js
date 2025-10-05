
import React from 'react';
import templates from './templatesData';

export default function TemplateBrowser({ module, onSelect }) {
  const moduleTemplates = templates[module] || [];
  return (
  <div className="quantom-bloom-card" style={{ maxWidth: 700 }}>
  <div className="quantom-bloom-header">Choose a Template</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
        {moduleTemplates.map(t => (
          <div key={t.id} style={{ border: '2px solid #ffe066', borderRadius: 18, padding: 16, width: 180, background: '#fff', boxShadow: '0 2px 8px #ffe06633' }}>
            <div className="quantom-bloom-badge">{t.name}</div>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>{t.description}</div>
            <div style={{ fontSize: 11, color: '#b6e880' }}>Aspect: {t.aspect}</div>
            <button className="quantom-bloom-btn" style={{ marginTop: 8, width: '100%' }} onClick={() => onSelect(t)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}
