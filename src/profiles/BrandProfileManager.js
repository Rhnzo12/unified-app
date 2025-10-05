import React, { useState } from 'react';
import { FaImage, FaPalette, FaFont, FaLightbulb, FaBox, FaCheck, FaUpload } from 'react-icons/fa';

export default function BrandProfileManager({ onComplete }) {
  const [profile, setProfile] = useState({
    name: '',
    logo: null,
    colors: '',
    fonts: '',
    mission: '',
    product: '',
    exampleImages: []
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [examplePreviews, setExamplePreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const email = JSON.parse(localStorage.getItem('nanoBananaAuth'))?.email;

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  }

  function handleLogo(e) {
    const file = e.target.files[0];
    if (file) {
      setProfile(p => ({ ...p, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  }

  function handleExampleImages(e) {
    const files = Array.from(e.target.files);
    setProfile(p => ({ ...p, exampleImages: files }));
    const previews = files.map(f => URL.createObjectURL(f));
    setExamplePreviews(previews);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    if (!email) {
      alert('No signed-in account found. Please sign in again.');
      setSaving(false);
      return;
    }
    const profileKey = `nanoBananaProfile_${email}`;
    localStorage.setItem(profileKey, JSON.stringify({
      ...profile,
      logo: logoPreview,
      exampleImages: profile.exampleImages.map(f => f.name)
    }));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      if (onComplete) onComplete(profile);
    }, 1500);
  }

  const InputField = ({ icon, label, name, placeholder, value, type = "text", required = false }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 10, 
        marginBottom: 8,
        color: '#b6e880',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0.5
      }}>
        {icon}
        <span>{label}</span>
      </div>
      <input
        style={{
          width: '100%',
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.08)',
          border: '2px solid rgba(255,224,102,0.2)',
          borderRadius: 10,
          color: '#e9d5ff',
          fontSize: 16,
          outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxSizing: 'border-box',
        }}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        onFocus={e => {
          e.target.style.borderColor = '#ffe066';
          e.target.style.boxShadow = '0 0 0 3px rgba(255,224,102,0.15)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(255,224,102,0.2)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );

  const FileUpload = ({ icon, label, accept, multiple = false, onChange, preview }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 10, 
        marginBottom: 8,
        color: '#b6e880',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0.5
      }}>
        {icon}
        <span>{label}</span>
      </div>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '16px',
        background: 'rgba(255,224,102,0.1)',
        border: '2px dashed rgba(255,224,102,0.4)',
        borderRadius: 10,
        color: '#ffe066',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = 'rgba(255,224,102,0.15)';
        e.currentTarget.style.borderColor = '#ffe066';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = 'rgba(255,224,102,0.1)';
        e.currentTarget.style.borderColor = 'rgba(255,224,102,0.4)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      >
        <FaUpload size={18} />
        <span>Click to upload {multiple ? 'files' : 'file'}</span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          style={{ display: 'none' }}
        />
      </label>
      {preview}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: "url('/bannerimage2.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      padding: '40px 20px',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(24,26,32,0.75)',
        zIndex: 0,
      }} />

      <div 
        style={{
          background: 'rgba(30,32,38,0.9)',
          borderRadius: 24,
          boxShadow: '0 8px 40px rgba(255,224,102,0.25)',
          padding: '48px 40px',
          maxWidth: 700,
          width: '100%',
          position: 'relative',
          zIndex: 1,
          border: '2px solid rgba(255,224,102,0.3)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffe066 0%, #b6e880 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 20px rgba(255,224,102,0.4)',
          }}>
            <FaPalette size={36} color="#23272f" />
          </div>
          <h2 style={{ 
            margin: 0, 
            color: '#ffe066', 
            fontSize: 32, 
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(255,224,102,0.3)',
            marginBottom: 8
          }}>
            Create Brand Profile
          </h2>
          <div style={{ color: '#e9d5ff', fontSize: 14, opacity: 0.8 }}>
            Set up your brand identity and preferences
          </div>
        </div>

        <InputField
          icon={<FaPalette />}
          label="Brand Name"
          name="name"
          placeholder="Enter your brand name"
          value={profile.name}
          required
        />

        <FileUpload
          icon={<FaImage />}
          label="Brand Logo"
          accept="image/*"
          onChange={handleLogo}
          preview={logoPreview && (
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
              <img 
                src={logoPreview} 
                alt="Logo preview" 
                style={{ 
                  height: 80, 
                  borderRadius: 12, 
                  border: '3px solid #ffe066',
                  boxShadow: '0 4px 16px rgba(255,224,102,0.3)'
                }} 
              />
            </div>
          )}
        />

        <InputField
          icon={<FaPalette />}
          label="Brand Colors"
          name="colors"
          placeholder="e.g., #FF5733, #33FF57, #3357FF"
          value={profile.colors}
        />

        <InputField
          icon={<FaFont />}
          label="Brand Fonts"
          name="fonts"
          placeholder="e.g., Roboto, Arial, Helvetica"
          value={profile.fonts}
        />

        <InputField
          icon={<FaLightbulb />}
          label="Mission Statement / Tagline"
          name="mission"
          placeholder="Your brand's mission or tagline"
          value={profile.mission}
        />

        <InputField
          icon={<FaBox />}
          label="Product Details"
          name="product"
          placeholder="Describe your products or services"
          value={profile.product}
        />

        <FileUpload
          icon={<FaImage />}
          label="Example Images"
          accept="image/*"
          multiple
          onChange={handleExampleImages}
          preview={examplePreviews.length > 0 && (
            <div style={{ 
              marginTop: 12, 
              display: 'flex', 
              gap: 10, 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {examplePreviews.map((preview, i) => (
                <img 
                  key={i}
                  src={preview} 
                  alt={`Example ${i + 1}`} 
                  style={{ 
                    height: 80, 
                    width: 80,
                    objectFit: 'cover',
                    borderRadius: 10, 
                    border: '2px solid #b6e880',
                    boxShadow: '0 2px 8px rgba(182,232,128,0.3)'
                  }} 
                />
              ))}
            </div>
          )}
        />

        <button 
          onClick={handleSubmit}
          disabled={saving || saved}
          style={{ 
            width: '100%', 
            padding: '18px', 
            background: saved 
              ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
              : 'linear-gradient(135deg, #ffe066 0%, #ffd700 100%)', 
            color: '#23272f', 
            border: 'none', 
            borderRadius: 12, 
            fontWeight: 700, 
            fontSize: 18, 
            cursor: saving || saved ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            boxShadow: saved 
              ? '0 4px 20px rgba(76,175,80,0.4)'
              : '0 4px 20px rgba(255,224,102,0.4)',
            transition: 'all 0.3s',
            marginTop: 32,
            opacity: saving ? 0.7 : 1,
          }}
          onMouseOver={e => {
            if (!saving && !saved) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,224,102,0.5)';
            }
          }}
          onMouseOut={e => {
            if (!saving && !saved) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,224,102,0.4)';
            }
          }}
        >
          {saved ? (
            <>
              <FaCheck size={20} /> Profile Saved Successfully!
            </>
          ) : saving ? (
            <>
              <div style={{
                width: 20,
                height: 20,
                border: '3px solid #23272f',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              Saving...
            </>
          ) : (
            'Save Brand Profile'
          )}
        </button>

        {saved && (
          <div style={{ 
            marginTop: 20,
            padding: '16px',
            background: 'rgba(76,175,80,0.15)',
            border: '2px solid rgba(76,175,80,0.4)',
            borderRadius: 12,
            color: '#4caf50',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 600,
          }}>
            <FaCheck style={{ marginRight: 8 }} />
            Your brand profile has been saved to your account!
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}