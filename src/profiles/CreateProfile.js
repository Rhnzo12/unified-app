import React, { useState } from 'react';
import { FaUser, FaBriefcase, FaArrowLeft, FaUserPlus } from 'react-icons/fa';

export default function CreateProfile({ onComplete, onBack }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !brand) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onComplete({ name, brand });
  };

  const InputField = ({ icon, placeholder, value, onChange, type = "text" }) => (
    <div style={{ marginBottom: 20, position: 'relative' }}>
      <div style={{
        position: 'absolute',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#ffe066',
        fontSize: 18,
        zIndex: 1,
      }}>
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '16px 16px 16px 50px',
          background: 'rgba(255,255,255,0.08)',
          border: '2px solid rgba(255,224,102,0.2)',
          borderRadius: 12,
          color: '#e9d5ff',
          fontSize: 16,
          outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxSizing: 'border-box',
        }}
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
      {/* Background Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(24,26,32,0.75)',
        zIndex: 0,
      }} />

      {/* Profile Card */}
      <div style={{
        background: 'rgba(30,32,38,0.9)',
        borderRadius: 24,
        boxShadow: '0 8px 40px rgba(255,224,102,0.25)',
        padding: '48px 40px',
        maxWidth: 480,
        width: '100%',
        position: 'relative',
        zIndex: 1,
        border: '2px solid rgba(255,224,102,0.3)',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Header */}
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
            <FaUserPlus size={36} color="#23272f" />
          </div>
          <h2 style={{ 
            margin: 0, 
            color: '#ffe066', 
            fontSize: 32, 
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(255,224,102,0.3)',
            marginBottom: 8
          }}>
            Create New Profile
          </h2>
          <div style={{ color: '#e9d5ff', fontSize: 14, opacity: 0.8 }}>
            Set up your profile to get started
          </div>
        </div>

        {/* Input Fields */}
        <div style={{ marginBottom: 24 }}>
          <InputField
            icon={<FaUser />}
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <InputField
            icon={<FaBriefcase />}
            placeholder="Brand Name"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          />

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(255,59,59,0.15)',
              border: '2px solid rgba(255,59,59,0.4)',
              borderRadius: 10,
              color: '#ff3b3b',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: 20,
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button 
            onClick={handleSubmit}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: 'linear-gradient(135deg, #ffe066 0%, #ffd700 100%)', 
              color: '#23272f', 
              border: 'none', 
              borderRadius: 12, 
              fontWeight: 700, 
              fontSize: 18, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 4px 20px rgba(255,224,102,0.4)',
              transition: 'all 0.3s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,224,102,0.5)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,224,102,0.4)';
            }}
          >
            <FaUserPlus size={18} /> Create Profile
          </button>

          <button 
            onClick={onBack}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'rgba(255,255,255,0.1)', 
              color: '#e9d5ff', 
              border: '2px solid rgba(233,213,255,0.3)', 
              borderRadius: 12, 
              fontWeight: 600, 
              fontSize: 16, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.3s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.borderColor = 'rgba(233,213,255,0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(233,213,255,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Info Text */}
        <div style={{
          marginTop: 24,
          padding: '16px',
          background: 'rgba(182,232,128,0.1)',
          border: '1px solid rgba(182,232,128,0.3)',
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <div style={{ color: '#b6e880', fontSize: 13, lineHeight: 1.6 }}>
            <strong>Tip:</strong> Choose a name that represents you and your brand. You can always update this later in your profile settings.
          </div>
        </div>
      </div>
    </div>
  );
}