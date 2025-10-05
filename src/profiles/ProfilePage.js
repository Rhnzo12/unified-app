import React, { useState } from 'react';
import { FaArrowLeft, FaEdit, FaKey, FaUser, FaEnvelope, FaBriefcase, FaBullseye, FaPalette, FaFont, FaLightbulb, FaBox, FaImage } from 'react-icons/fa';

export default function ProfilePage({ user, onEdit, onChangePassword, onBack }) {
  const email = user?.email;
  const profileKey = email ? `nanoBananaProfile_${email}` : null;
  const profile = profileKey ? JSON.parse(localStorage.getItem(profileKey) || '{}') : {};
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);

  const ProfileField = ({ icon, label, value }) => (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '16px 20px',
      marginBottom: 12,
      border: '1px solid rgba(255,224,102,0.2)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateX(4px)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,224,102,0.2)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ color: '#ffe066', fontSize: 20, minWidth: 24 }}>{icon}</div>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ color: '#b6e880', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
        <div style={{ color: '#e9d5ff', fontSize: 16, fontWeight: 500 }}>{value || '-'}</div>
      </div>
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
        background: 'rgba(24,26,32,0.7)',
        zIndex: 0,
      }} />

      {/* Profile Card */}
      <div style={{
        background: 'rgba(30,32,38,0.85)',
        borderRadius: 24,
        boxShadow: '0 8px 40px rgba(255,224,102,0.25)',
        padding: '48px 40px',
        maxWidth: 600,
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
            <FaUser size={36} color="#23272f" />
          </div>
          <h2 style={{ 
            margin: 0, 
            color: '#ffe066', 
            fontSize: 32, 
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(255,224,102,0.3)'
          }}>
            Profile
          </h2>
          <div style={{ color: '#e9d5ff', fontSize: 14, marginTop: 8, opacity: 0.8 }}>
            View and manage your account information
          </div>
        </div>

        {/* Profile Fields */}
        <div style={{ marginBottom: 32 }}>
          <ProfileField icon={<FaUser />} label="Name" value={profile.name} />
          <ProfileField icon={<FaEnvelope />} label="Email" value={email} />
          <ProfileField icon={<FaBriefcase />} label="Brand" value={profile.brand} />
          <ProfileField icon={<FaBullseye />} label="Niche" value={profile.niche} />
          <ProfileField icon={<FaBullseye />} label="Sub-Niche" value={profile.subNiche} />
          <ProfileField icon={<FaPalette />} label="Colors" value={profile.colors} />
          <ProfileField icon={<FaFont />} label="Fonts" value={profile.fonts} />
          <ProfileField icon={<FaLightbulb />} label="Mission" value={profile.mission} />
          <ProfileField icon={<FaBox />} label="Product" value={profile.product} />
          
          {/* Logo Field */}
          {profile.logo && (
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 12,
              border: '1px solid rgba(255,224,102,0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <div style={{ color: '#ffe066', fontSize: 20, minWidth: 24 }}><FaImage /></div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ color: '#b6e880', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Logo</div>
                <img src={profile.logo} alt="Logo" style={{ height: 60, borderRadius: 8, border: '2px solid #ffe066', boxShadow: '0 2px 8px rgba(255,224,102,0.3)' }} />
              </div>
            </div>
          )}

          {/* Example Images Field */}
          {profile.exampleImages && profile.exampleImages.length > 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 12,
              border: '1px solid rgba(255,224,102,0.2)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ color: '#ffe066', fontSize: 20, minWidth: 24 }}><FaImage /></div>
                <div style={{ color: '#b6e880', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Example Images</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 40 }}>
                {profile.exampleImages.map((img, i) => {
                  if (typeof img === 'string') return <span key={i} style={{ color: '#e9d5ff', fontSize: 14 }}>{img}{i < profile.exampleImages.length - 1 ? ', ' : ''}</span>;
                  if (img && typeof img === 'object') {
                    if (img.url) return <img key={i} src={img.url} alt={img.name || 'Example'} style={{ height: 60, borderRadius: 8, border: '2px solid #b6e880', boxShadow: '0 2px 8px rgba(182,232,128,0.3)' }} />;
                    if (img.name) return <span key={i} style={{ color: '#e9d5ff', fontSize: 14 }}>{img.name}{i < profile.exampleImages.length - 1 ? ', ' : ''}</span>;
                    return <span key={i} style={{ color: '#e9d5ff', fontSize: 14 }}>{JSON.stringify(img)}{i < profile.exampleImages.length - 1 ? ', ' : ''}</span>;
                  }
                  return <span key={i} style={{ color: '#e9d5ff', fontSize: 14 }}>{String(img)}{i < profile.exampleImages.length - 1 ? ', ' : ''}</span>;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button 
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'linear-gradient(135deg, #ffe066 0%, #ffd700 100%)', 
              color: '#23272f', 
              border: 'none', 
              borderRadius: 12, 
              fontWeight: 700, 
              fontSize: 16, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 4px 16px rgba(255,224,102,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }} 
            onClick={() => { setShowEdit(true); if(onEdit) onEdit(); }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,224,102,0.5)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,224,102,0.4)';
            }}
          >
            <FaEdit size={18} /> Edit Profile
          </button>

          <button 
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'linear-gradient(135deg, #b6e880 0%, #9ad666 100%)', 
              color: '#23272f', 
              border: 'none', 
              borderRadius: 12, 
              fontWeight: 700, 
              fontSize: 16, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 4px 16px rgba(182,232,128,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }} 
            onClick={() => { setShowChangePw(true); if(onChangePassword) onChangePassword(); }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(182,232,128,0.5)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(182,232,128,0.4)';
            }}
          >
            <FaKey size={18} /> Change Password
          </button>

          <button 
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: 'rgba(255,255,255,0.1)', 
              color: '#e9d5ff', 
              border: '2px solid rgba(233,213,255,0.3)', 
              borderRadius: 12, 
              fontWeight: 600, 
              fontSize: 15, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginTop: 8,
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
            }} 
            onClick={onBack}
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
            <FaArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}