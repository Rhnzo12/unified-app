import React, { useState } from 'react';
import { FaArrowLeft, FaEdit, FaKey, FaUser, FaEnvelope, FaBriefcase, FaBullseye, FaPalette, FaFont, FaLightbulb, FaBox, FaImage } from 'react-icons/fa';

export default function ProfilePage({ user, profile, onEdit, onChangePassword, onBack, onSave = () => {} }) {
  const [form, setForm] = useState({
    name: profile?.name || '',
    brand: profile?.brand || '',
    niche: profile?.niche || '',
    subNiche: profile?.subNiche || ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        <div style={{ color: '#e9d5ff', fontSize: 16, fontWeight: 500, wordBreak: 'break-word' }}>{value || '-'}</div>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1c23 0%, #2d1f3d 100%)',
      position: 'relative',
      padding: '40px 20px',
    }}>
      {/* Top Back Button */}
      <button
        type="button"
        onClick={onBack}
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          background: "linear-gradient(135deg, #ffe066 0%, #b6e880 100%)",
          border: "none",
          borderRadius: 8,
          padding: "8px 18px",
          color: "#23272f",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 2px 8px #ffe06655",
          zIndex: 100
        }}
      >
        <FaArrowLeft style={{ marginRight: 8 }} />
        Back
      </button>

      <div style={{
        background: 'rgba(30,32,38,0.95)',
        borderRadius: 24,
        boxShadow: '0 8px 40px rgba(255,224,102,0.25)',
        padding: '48px 40px',
        maxWidth: 600,
        width: '100%',
        border: '2px solid rgba(255,224,102,0.3)',
        backdropFilter: 'blur(20px)',
        maxHeight: '90vh',
        overflowY: 'auto',
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
          <ProfileField icon={<FaUser />} label="Name" value={profile?.name} />
          <ProfileField icon={<FaEnvelope />} label="Email" value={user?.email} />
          <ProfileField icon={<FaBriefcase />} label="Brand" value={profile?.brand} />
          <ProfileField icon={<FaBullseye />} label="Niche" value={profile?.niche} />
          
          {profile?.subNiche && (
            <ProfileField icon={<FaBullseye />} label="Sub-Niche" value={profile.subNiche} />
          )}
          
          {profile?.colors && (
            <ProfileField icon={<FaPalette />} label="Colors" value={profile.colors} />
          )}
          
          {profile?.fonts && (
            <ProfileField icon={<FaFont />} label="Fonts" value={profile.fonts} />
          )}
          
          {profile?.mission && (
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 12,
              border: '1px solid rgba(255,224,102,0.2)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ color: '#ffe066', fontSize: 20, minWidth: 24, paddingTop: 2 }}><FaLightbulb /></div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ color: '#b6e880', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Mission Statement</div>
                  <div style={{ color: '#e9d5ff', fontSize: 16, fontWeight: 500, lineHeight: 1.6, wordBreak: 'break-word' }}>{profile.mission}</div>
                </div>
              </div>
            </div>
          )}
          
          {profile?.product && (
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 12,
              border: '1px solid rgba(255,224,102,0.2)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ color: '#ffe066', fontSize: 20, minWidth: 24, paddingTop: 2 }}><FaBox /></div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ color: '#b6e880', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Product Details</div>
                  <div style={{ color: '#e9d5ff', fontSize: 16, fontWeight: 500, lineHeight: 1.6, wordBreak: 'break-word' }}>{profile.product}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Logo Field */}
          {profile?.logoPreview && (
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
                <img 
                  src={profile.logoPreview} 
                  alt="Brand Logo" 
                  style={{ 
                    maxHeight: 80, 
                    maxWidth: '100%',
                    borderRadius: 8, 
                    border: '2px solid #ffe066', 
                    boxShadow: '0 2px 8px rgba(255,224,102,0.3)' 
                  }} 
                />
              </div>
            </div>
          )}

          {/* Example Images Field */}
          {profile?.exampleImageNames && profile.exampleImageNames.length > 0 && (
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
                {profile.exampleImageNames.map((name, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      color: '#e9d5ff', 
                      fontSize: 14,
                      background: 'rgba(182,232,128,0.15)',
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: '1px solid rgba(182,232,128,0.3)',
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!profile || Object.keys(profile).length === 0) && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'rgba(255,224,102,0.1)',
              borderRadius: 12,
              border: '2px dashed rgba(255,224,102,0.3)',
            }}>
              <FaUser size={48} color="rgba(255,224,102,0.5)" />
              <div style={{ color: '#e9d5ff', fontSize: 16, marginTop: 16, opacity: 0.8 }}>
                No profile information available yet.
              </div>
              <div style={{ color: '#b6e880', fontSize: 14, marginTop: 8 }}>
                Click "Edit Profile" below to add your information.
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
            onClick={onEdit}
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
            onClick={onChangePassword}
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

      <style>{`
        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 8px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(255,224,102,0.3);
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255,224,102,0.5);
        }
      `}</style>
    </div>
  );
}
