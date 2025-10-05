import React, { useState } from 'react';
import { FaBullseye, FaArrowRight, FaCheck } from 'react-icons/fa';

// Sample niches data structure
const niches = [
  { 
    name: 'Technology',
    subNiches: ['Software Development', 'AI & Machine Learning', 'Cybersecurity', 'Mobile Apps', 'Web Development']
  },
  {
    name: 'Health & Wellness',
    subNiches: ['Fitness Training', 'Nutrition', 'Mental Health', 'Yoga & Meditation', 'Weight Loss']
  },
  {
    name: 'Business & Finance',
    subNiches: ['Entrepreneurship', 'Investing', 'Accounting', 'Marketing', 'E-commerce']
  },
  {
    name: 'Education',
    subNiches: ['Online Courses', 'Tutoring', 'Test Prep', 'Language Learning', 'Professional Development']
  },
  {
    name: 'Creative Arts',
    subNiches: ['Graphic Design', 'Photography', 'Music Production', 'Writing', 'Video Production']
  },
  {
    name: 'Lifestyle',
    subNiches: ['Fashion', 'Travel', 'Food & Cooking', 'Home Decor', 'Personal Development']
  }
];

export default function NicheSelector({ onSelect, user }) {
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [error, setError] = useState('');

  const currentNiche = niches.find(n => n.name === selectedNiche);

  const handleContinue = () => {
    if (!selectedNiche || !selectedSub) {
      setError('Please select both niche and sub-niche.');
      return;
    }
    setError('');
    // Save to localStorage under user account
    if (user && user.email) {
      const profileKey = `nanoBananaProfile_${user.email}`;
      const profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
      profile.niche = selectedNiche;
      profile.subNiche = selectedSub;
      localStorage.setItem(profileKey, JSON.stringify(profile));
    }
    onSelect({ niche: selectedNiche, subNiche: selectedSub });
  };

  const CustomSelect = ({ value, onChange, options, placeholder, icon }) => (
    <div style={{ marginBottom: 20, position: 'relative' }}>
      <div style={{
        position: 'absolute',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#ffe066',
        fontSize: 18,
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        {icon}
      </div>
      <select
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '16px 16px 16px 50px',
          background: 'rgba(255,255,255,0.08)',
          border: '2px solid rgba(255,224,102,0.2)',
          borderRadius: 12,
          color: value ? '#e9d5ff' : '#999',
          fontSize: 16,
          outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxSizing: 'border-box',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffe066' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
        }}
        onFocus={e => {
          e.target.style.borderColor = '#ffe066';
          e.target.style.boxShadow = '0 0 0 3px rgba(255,224,102,0.15)';
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(255,224,102,0.2)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <option value="" style={{ background: '#23272f', color: '#999' }}>{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt} style={{ background: '#23272f', color: '#e9d5ff' }}>
            {opt}
          </option>
        ))}
      </select>
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

      {/* Selector Card */}
      <div style={{
        background: 'rgba(30,32,38,0.9)',
        borderRadius: 24,
        boxShadow: '0 8px 40px rgba(255,224,102,0.25)',
        padding: '48px 40px',
        maxWidth: 520,
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
            <FaBullseye size={36} color="#23272f" />
          </div>
          <h2 style={{ 
            margin: 0, 
            color: '#ffe066', 
            fontSize: 32, 
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(255,224,102,0.3)',
            marginBottom: 8
          }}>
            Select Your Niche
          </h2>
          <div style={{ color: '#e9d5ff', fontSize: 14, opacity: 0.8 }}>
            Choose your industry and specialization
          </div>
        </div>

        {/* Selection Fields */}
        <div style={{ marginBottom: 24 }}>
          <CustomSelect
            icon={<FaBullseye />}
            value={selectedNiche}
            onChange={e => { setSelectedNiche(e.target.value); setSelectedSub(''); }}
            options={niches.map(n => n.name)}
            placeholder="-- Choose a Niche --"
          />

          {currentNiche && (
            <div style={{
              animation: 'slideIn 0.3s ease-out',
            }}>
              <CustomSelect
                icon={<FaCheck />}
                value={selectedSub}
                onChange={e => setSelectedSub(e.target.value)}
                options={currentNiche.subNiches}
                placeholder="-- Choose a Sub-Niche --"
              />
            </div>
          )}

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
              marginTop: 12,
              animation: 'shake 0.3s',
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!selectedNiche || !selectedSub}
          style={{ 
            width: '100%', 
            padding: '18px', 
            background: (!selectedNiche || !selectedSub) 
              ? 'rgba(100,100,100,0.3)'
              : 'linear-gradient(135deg, #ffe066 0%, #ffd700 100%)', 
            color: (!selectedNiche || !selectedSub) ? '#666' : '#23272f', 
            border: 'none', 
            borderRadius: 12, 
            fontWeight: 700, 
            fontSize: 18, 
            cursor: (!selectedNiche || !selectedSub) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: (!selectedNiche || !selectedSub) 
              ? 'none'
              : '0 4px 20px rgba(255,224,102,0.4)',
            transition: 'all 0.3s',
            opacity: (!selectedNiche || !selectedSub) ? 0.5 : 1,
          }}
          onMouseOver={e => {
            if (selectedNiche && selectedSub) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,224,102,0.5)';
            }
          }}
          onMouseOut={e => {
            if (selectedNiche && selectedSub) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,224,102,0.4)';
            }
          }}
        >
          Continue <FaArrowRight size={18} />
        </button>

        {/* Progress Indicator */}
        <div style={{ marginTop: 32 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: 8,
            color: '#b6e880',
            fontSize: 12,
            fontWeight: 600,
          }}>
            <span>Progress</span>
            <span>{selectedNiche && selectedSub ? '100%' : selectedNiche ? '50%' : '0%'}</span>
          </div>
          <div style={{
            width: '100%',
            height: 8,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <div style={{
              width: selectedNiche && selectedSub ? '100%' : selectedNiche ? '50%' : '0%',
              height: '100%',
              background: 'linear-gradient(90deg, #ffe066 0%, #b6e880 100%)',
              borderRadius: 8,
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(255,224,102,0.5)',
            }} />
          </div>
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: 24,
          padding: '16px',
          background: 'rgba(182,232,128,0.1)',
          border: '1px solid rgba(182,232,128,0.3)',
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <div style={{ color: '#b6e880', fontSize: 13, lineHeight: 1.6 }}>
            <strong>Tip:</strong> Selecting the right niche helps us personalize your content and recommendations.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}