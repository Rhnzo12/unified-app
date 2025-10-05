// Dashboard for module selection
import React, { useState } from 'react';
import { FaImage, FaRegNewspaper, FaChartLine, FaSquare, FaRegPlayCircle, FaUserCircle, FaSignOutAlt, FaExpand, FaDownload } from 'react-icons/fa';

export default function Dashboard({ onSelectModule, onSignOut, onProfileClick, profilePic, user, imagesUsed, selectedModule, preOnboardingData }) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenBanner, setFullscreenBanner] = useState(false);
  const [fullscreenSocmed, setFullscreenSocmed] = useState(false);
  const [fullscreenHelpto, setFullscreenHelpto] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState(false);
  
  const modules = [
    { key: 'ImageAds', label: 'Image Ads', icon: <FaImage size={22} /> },
    { key: 'BannerImages', label: 'Banner Images', icon: <FaRegNewspaper size={22} /> },
    { key: 'HelpToSell', label: 'Help-to-Sell', icon: <FaChartLine size={22} /> },
    { key: 'SocialMediaSquare', label: 'Social Media Square', icon: <FaSquare size={22} /> },
    { key: 'MediaStory', label: 'Media Story', icon: <FaRegPlayCircle size={22} /> },
  ];

  // Generate sample prompts based on pre-onboarding data
  const generateSamplePrompts = () => {
    if (!preOnboardingData) return [];
    
    const prompts = [];
    const { industry, niche, useCases, brandStyles, goals, quickWinPrompt } = preOnboardingData;
    
    // Use the quick win prompt if available
    if (quickWinPrompt) {
      prompts.push(quickWinPrompt);
    }
    
    // Generate additional prompts based on their data
    if (industry && niche) {
      prompts.push(`Create a professional ${brandStyles[0] || 'modern'} style promotional image for ${niche} in ${industry} industry`);
    }
    
    if (goals && goals.length > 0 && niche) {
      prompts.push(`Design an engaging social media post for ${niche} to ${goals[0]?.toLowerCase()}`);
    }
    
    if (useCases && useCases.length > 0 && industry) {
      prompts.push(`Generate a ${useCases[0]?.toLowerCase()} visual for ${industry} business`);
    }
    
    return prompts.slice(0, 3); // Limit to 3 sample images
  };

  const samplePrompts = generateSamplePrompts();

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundImage: "url('/bannerimage2.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Sidebar Navigation */}
      <aside style={{
        width: 240,
        backgroundImage: "url('/bannerimage2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '2px 0 12px #ffe06622',
        padding: '32px 0 24px 0',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        zIndex: 10,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(24,26,32,0.65)',
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <img src="/logo.png" alt="Logo" style={{ width: 150, height: 80, borderRadius: 16, marginBottom: 8 }} />
            </div>
            <hr style={{ border: 'none', borderTop: '1.5px solid #ffe06633', margin: '16px 0 24px 16px', width: '80%', alignSelf: 'flex-start' }} />
            <nav>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 400, letterSpacing: 1, margin: '0 0 8px 8px', opacity: 0.7 }}>Module</div>
              {modules.map(m => {
                const isDisabled = m.key === 'ImageAds' || m.key === 'MediaStory';
                return (
                  <button
                    key={m.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      width: '100%',
                      padding: '16px 32px',
                      background: isDisabled ? 'rgba(200,200,200,0.08)' : 'none',
                      border: 'none',
                      color: isDisabled ? '#aaa' : '#e9d5ff',
                      fontSize: 18,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      borderLeft: '4px solid transparent',
                      marginBottom: 8,
                      transition: 'background 0.2s, color 0.2s, transform 0.2s',
                      opacity: isDisabled ? 0.5 : 1,
                    }}
                    className="dashboard-sidebar-btn"
                    onClick={() => {
                      if (!isDisabled) onSelectModule(m.key);
                    }}
                    tabIndex={0}
                    aria-disabled={isDisabled ? 'true' : 'false'}
                    onMouseOver={e => {
                      if (!isDisabled) {
                        e.currentTarget.style.background = 'rgba(255,224,102,0.12)';
                        e.currentTarget.style.color = '#ffe066';
                        e.currentTarget.style.borderLeft = '4px solid #ffe066';
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }
                    }}
                    onMouseOut={e => {
                      if (!isDisabled) {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#e9d5ff';
                        e.currentTarget.style.borderLeft = '4px solid transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </nav>
            <hr style={{ border: 'none', borderTop: '1.5px solid #ffe06633', margin: '24px 0 12px 16px', width: '80%', alignSelf: 'flex-start' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 16px' }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 400, letterSpacing: 1, margin: '0 0 8px 0', opacity: 0.7, alignSelf: 'center' }}>Settings</div>
            <button
              onClick={onProfileClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 8, transition: 'background 0.2s, color 0.2s, transform 0.2s' }}
              title="Profile"
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(102,204,255,0.18)';
                e.currentTarget.style.color = '#1e90ff';
                e.currentTarget.style.transform = 'scale(1.12)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FaUserCircle size={32} color="#ffe066" />
            </button>
            <button
              onClick={onSignOut}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffe066', fontSize: 18, display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', borderRadius: 8, transition: 'background 0.2s, color 0.2s, transform 0.2s' }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,102,102,0.18)';
                e.currentTarget.style.color = '#ff3b3b';
                e.currentTarget.style.transform = 'scale(1.12)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#ffe066';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FaSignOutAlt size={22} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'none', overflowY: 'auto', height: '100vh' }}>
        <div style={{ width: '100%', maxWidth: 700, marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#ffe066', marginBottom: 8 }}>
            Welcome{user && user.name ? `, ${user.name}` : ''}!
          </div>
          <div style={{ color: '#e9d5ff', fontSize: 18, marginBottom: 8 }}>
            You have generated <span style={{ color: '#b6e880', fontWeight: 700 }}>{imagesUsed}</span> images this month.
          </div>
          <div style={{ color: '#b6e880', fontSize: 16, marginBottom: 8 }}>
            Credits left: <span style={{ color: '#ffe066', fontWeight: 700 }}>Unlimited</span>
          </div>
        </div>

        {/* Sample Brand Images Section */}
        {samplePrompts.length > 0 && (
          <div style={{ width: '100%', maxWidth: 700, background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, marginBottom: 32, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,224,102,0.2)' }}>
            <div style={{ fontWeight: 600, color: '#ffe066', marginBottom: 16, fontSize: 18 }}>Sample Brand Images</div>
            <div style={{ color: '#e9d5ff', fontSize: 14, marginBottom: 16 }}>
              Based on your preferences: {preOnboardingData?.niche || 'your niche'} in {preOnboardingData?.industry || 'your industry'}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {samplePrompts.map((prompt, index) => (
                <SampleImageGenerator key={index} prompt={prompt} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div style={{ width: '100%', maxWidth: 700, marginBottom: 32 }}>
          <div style={{ fontWeight: 600, color: '#ffe066', marginBottom: 8 }}>Recent Activity</div>
          <div style={{ color: '#e9d5ff', fontSize: 16 }}>
            No recent projects yet. Start by creating your first image!
          </div>
        </div>

        {/* Module Cards */}
        <div className="quantom-bloom-header" style={{ color: '#ffe066', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Choose Image Module</div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {modules.map(m => {
            return (
              <div key={m.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ color: '#b6e880', fontWeight: 700 }}>{m.label}</span>
                </div>
                <button
                  className="quantom-bloom-btn"
                  style={{ width: 160, height: 160, fontSize: 18, boxShadow: '0 2px 8px #ffe06633', border: 'none', background: '#fffbe7', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, cursor: 'pointer' }}
                  onClick={e => {
                    if (m.key === 'ImageAds') {
                      setShowFullscreen(true);
                    }
                    if (m.key === 'BannerImages') {
                      setFullscreenBanner(true);
                    }
                    if (m.key === 'SocialMediaSquare') {
                      setFullscreenSocmed(true);
                    }
                    if (m.key === 'HelpToSell') {
                      setFullscreenHelpto(true);
                    }
                    if (m.key === 'MediaStory') {
                      setFullscreenMedia(true);
                    }
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 16px #ffe06655'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px #ffe06633'; }}
                >
                  {m.key === 'ImageAds' && (
                    <video
                      src="/imageads.mp4"
                      autoPlay
                      loop
                      muted
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, zIndex: 0 }}
                    />
                  )}
                  {m.key === 'BannerImages' && (
                    <img
                      src="/banner.png"
                      alt="Banner"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, zIndex: 0 }}
                    />
                  )}
                  {m.key === 'SocialMediaSquare' && (
                    <img
                      src="/socmedsqa.png"
                      alt="Social Media Square"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, zIndex: 0 }}
                    />
                  )}
                  {m.key === 'HelpToSell' && (
                    <img
                      src="/helpto.png"
                      alt="Help To Sell"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, zIndex: 0 }}
                    />
                  )}
                  {m.key === 'MediaStory' && (
                    <video
                      src="/mediastory.mp4"
                      autoPlay
                      loop
                      muted
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, zIndex: 0 }}
                    />
                  )}
                </button>
                <div style={{ color: '#fff', fontWeight: 'normal', fontSize: 16, marginTop: 12, textAlign: 'center' }}>
                  Create {m.label.toLowerCase()} for your brand
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Modals */}
        {showFullscreen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
              src="/imageads.mp4"
              autoPlay
              loop
              muted
              controls
              style={{ width: '80vw', height: '80vh', objectFit: 'contain', borderRadius: 16, boxShadow: '0 4px 32px #ffe06655' }}
            />
            <button
              onClick={() => setShowFullscreen(false)}
              style={{ position: 'absolute', top: 32, right: 48, fontSize: 32, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000 }}
              title="Close"
            >
              &times;
            </button>
          </div>
        )}
        
        {fullscreenBanner && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/banner.png"
              alt="Banner Fullscreen"
              style={{ width: '80vw', height: '80vh', objectFit: 'contain', borderRadius: 16, boxShadow: '0 4px 32px #ffe06655' }}
            />
            <button
              onClick={() => setFullscreenBanner(false)}
              style={{ position: 'absolute', top: 32, right: 48, fontSize: 32, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000 }}
              title="Close"
            >
              &times;
            </button>
          </div>
        )}

        {fullscreenSocmed && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/socmedsq.png"
              alt="Social Media Square Fullscreen"
              style={{ width: '80vw', height: '80vh', objectFit: 'contain', borderRadius: 16, boxShadow: '0 4px 32px #ffe06655' }}
            />
            <button
              onClick={() => setFullscreenSocmed(false)}
              style={{ position: 'absolute', top: 32, right: 48, fontSize: 32, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000 }}
              title="Close"
            >
              &times;
            </button>
          </div>
        )}

        {fullscreenHelpto && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/helpto.png"
              alt="Help To Sell Fullscreen"
              style={{ width: '80vw', height: '80vh', objectFit: 'contain', borderRadius: 16, boxShadow: '0 4px 32px #ffe06655' }}
            />
            <button
              onClick={() => setFullscreenHelpto(false)}
              style={{ position: 'absolute', top: 32, right: 48, fontSize: 32, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000 }}
              title="Close"
            >
              &times;
            </button>
          </div>
        )}

        {fullscreenMedia && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
              src="/mediastory.mp4"
              autoPlay
              loop
              muted
              controls
              style={{ width: '80vw', height: '80vh', objectFit: 'contain', borderRadius: 16, boxShadow: '0 4px 32px #ffe06655' }}
            />
            <button
              onClick={() => setFullscreenMedia(false)}
              style={{ position: 'absolute', top: 32, right: 48, fontSize: 32, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10000 }}
              title="Close"
            >
              &times;
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// Sample Image Generator Component
function SampleImageGenerator({ prompt }) {
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  React.useEffect(() => {
    if (!prompt) return;
    setLoading(true);
    setError(false);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=256&height=256&nologo=true&enhance=true`;
    const img = new window.Image();
    img.onload = () => {
      setImgUrl(url);
      setLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
    img.src = url;
  }, [prompt]);

  const handleDownload = async () => {
    if (!imgUrl) return;
    try {
      const response = await fetch(imgUrl.replace('width=256&height=256', 'width=1024&height=1024'));
      const blob = await response.blob();
      const urlObj = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlObj;
      link.download = `${prompt.slice(0, 40).replace(/[^a-z0-9]/gi, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObj);
    } catch (err) {
      alert('Download failed.');
    }
  };

  if (loading) {
    return (
      <div style={{ width: 180, height: 180, borderRadius: 12, background: 'rgba(255,224,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,224,102,0.3)' }}>
        <div style={{ color: '#ffe066', fontSize: 12, textAlign: 'center', padding: 8 }}>Generating...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ width: 180, height: 180, borderRadius: 12, background: 'rgba(255,59,59,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,59,59,0.3)' }}>
        <div style={{ color: '#ff3b3b', fontSize: 12, textAlign: 'center', padding: 8 }}>Failed</div>
      </div>
    );
  }
  if (imgUrl) {
    return (
      <>
        <div 
          style={{ 
            width: 180, 
            height: 180, 
            borderRadius: 12, 
            overflow: 'hidden', 
            border: '2px solid rgba(182,232,128,0.5)', 
            boxShadow: '0 4px 12px rgba(255,224,102,0.3)', 
            transition: 'transform 0.2s', 
            cursor: 'pointer', 
            position: 'relative', 
            background: 'rgba(255,255,255,0.05)' 
          }}
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img src={imgUrl} alt="Sample" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
          
          {showButtons && (
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              background: 'rgba(0,0,0,0.6)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: 12 
            }}>
              <button 
                onClick={e => { e.stopPropagation(); handleDownload(); }} 
                style={{ 
                  background: '#b6e880', 
                  color: '#23272f', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '10px 16px', 
                  fontSize: 14, 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  boxShadow: '0 2px 8px #b6e88055', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaDownload /> Download
              </button>
            </div>
          )}
        </div>
        
      </>
    );
  }
  return null;
}