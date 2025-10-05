
import React, { useState } from 'react';

// Generate placeholder images
function generateImages(count = 3) {
  return Array.from({ length: count }, (_, i) => `https://placehold.co/400x400?text=AI+Image+${i+1}`);
}


export default function AIImageGenerator({ profile, niche, template, module, onComplete }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  function handleGenerate() {
    setLoading(true);
    setTimeout(() => {
      setImages(generateImages(4));
      setLoading(false);
      if (onComplete) onComplete(generateImages(4));
    }, 1200);
  }

  return (
  <div className="quantom-bloom-card" style={{ maxWidth: 700 }}>
  <div className="quantom-bloom-header">AI Image Generation</div>
  <div className="quantom-bloom-sub" style={{ marginBottom: 18 }}>
        Enter a prompt to guide the AI for this {module ? module.replace(/([A-Z])/g, ' $1').trim() : 'module'}:
      </div>
      <input
  className="quantom-bloom-input"
        type="text"
        placeholder="Describe what you want to generate..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ marginBottom: 18 }}
      />
      <div style={{ marginBottom: 16 }}>
        <button
          className="quantom-bloom-btn"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          style={{ width: 220, height: 44 }}
        >
          {loading ? 'Generating...' : 'Generate Images'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`AI ${i+1}`} className="quantom-bloom-gallery-img" style={{ width: 140, height: 140 }} />
        ))}
      </div>
    </div>
  );
}
