import React, { useState } from "react";
import { FaPaperPlane, FaImage, FaRegNewspaper, FaChartLine, FaSquare, FaRegPlayCircle, FaUserCircle, FaSignOutAlt, FaExpand, FaDownload } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

export default function SocialMediaSquare({ onBackToDashboard, onNavigate, onSignOut, onProfileClick }) {
  const handleProfileClick = () => window.location.href = '/';
  const handleSignOutLocal = () => {
    if (onSignOut) onSignOut();
  };

  const exampleImages = typeof window !== 'undefined' && window.exampleImages ? window.exampleImages : [];
  const preOnboardingData = typeof window !== 'undefined' && window.preOnboardingData ? window.preOnboardingData : {};
  
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setImageUrl("");
    setLastPrompt(prompt);
    const currentPrompt = prompt;
    setPrompt("");
    try {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(currentPrompt)}?width=1024&height=1024&nologo=true&enhance=true`;
      const img = new Image();
      img.onload = () => {
        setImageUrl(url);
        setLoading(false);
      };
      img.onerror = () => {
        setError("Failed to generate image. Please try again.");
        setLoading(false);
      };
      img.src = url;
    } catch (err) {
      setError("Error generating image. Please try again.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && prompt.trim()) {
      handleGenerate();
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = lastPrompt ? `${lastPrompt.slice(0, 50).replace(/[^a-z0-9]/gi, '_')}.png` : "social_media_square.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: "100vh",
      backgroundImage: `url('/bannerimage2.png')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 0,
      position: "relative"
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
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 150, height: 80, borderRadius: 16, marginBottom: 8 }} />
          </div>
          <hr style={{ border: 'none', borderTop: '1.5px solid #ffe06633', margin: '16px 0 24px 16px', width: '80%', alignSelf: 'flex-start' }} />
          <nav>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 400, letterSpacing: 1, margin: '0 0 8px 8px', opacity: 0.7 }}>Module</div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '16px 32px', background: 'none', border: 'none', color: '#e9d5ff', fontSize: 18, cursor: 'pointer', borderLeft: '4px solid transparent', marginBottom: 8, transition: 'background 0.2s, color 0.2s, transform 0.2s' }} onClick={onBackToDashboard}><span style={{ fontWeight: 700 }}>&#8592;</span> <span>Dashboard</span></button>
            <button disabled style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '16px 32px', background: 'none', border: 'none', color: '#888', fontSize: 18, cursor: 'not-allowed', borderLeft: '4px solid transparent', marginBottom: 8, opacity: 0.5, transition: 'background 0.2s, color 0.2s, transform 0.2s' }}><FaImage size={22} /> <span>Image Ads</span></button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '16px 32px', background: 'none', border: 'none', color: '#e9d5ff', fontSize: 18, cursor: 'pointer', borderLeft: '4px solid transparent', marginBottom: 8, transition: 'background 0.2s, color 0.2s, transform 0.2s' }} onClick={() => onNavigate && onNavigate('BannerImages')}><FaRegNewspaper size={22} /> <span>Banner Images</span></button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '16px 32px', background: 'none', border: 'none', color: '#e9d5ff', fontSize: 18, cursor: 'pointer', borderLeft: '4px solid transparent', marginBottom: 8, transition: 'background 0.2s, color 0.2s, transform 0.2s' }} onClick={() => onNavigate && onNavigate('HelpToSell')}><FaChartLine size={22} /> <span>Help-to-Sell</span></button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '16px 32px', background: 'rgba(255,224,102,0.12)', border: 'none', color: '#ffe066', fontWeight: 700, fontSize: 18, cursor: 'pointer', borderLeft: '4px solid #ffe066', marginBottom: 8, transition: 'background 0.2s, color 0.2s, transform 0.2s' }}><FaSquare size={22} /> <span>Social Media Square</span></button>
            <button disabled style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '16px 32px', background: 'none', border: 'none', color: '#888', fontSize: 18, cursor: 'not-allowed', borderLeft: '4px solid transparent', marginBottom: 8, opacity: 0.5, transition: 'background 0.2s, color 0.2s, transform 0.2s' }}><FaRegPlayCircle size={22} /> <span>Media Story</span></button>
          </nav>
          <hr style={{ border: 'none', borderTop: '1.5px solid #ffe06633', margin: '24px 0 12px 16px', width: '80%', alignSelf: 'flex-start' }} />
        </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 400, letterSpacing: 1, margin: '0 0 8px 32px', opacity: 0.7 }}>Settings</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 16px' }}>
              <button
                onClick={() => {
                  if (onProfileClick) {
                    onProfileClick();
                  } else {
                    window.location.href = '/profile';
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  borderRadius: 8,
                  transition: 'background 0.2s, color 0.2s, transform 0.2s',
                }}
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
                onClick={handleSignOutLocal}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ffe066',
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 8px',
                  borderRadius: 8,
                  transition: 'background 0.2s, color 0.2s, transform 0.2s',
                }}
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
      <div style={{ flex: 1 }}>
        {/* Centered Result Image */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 120px)", paddingBottom: 120 }}>
          <div style={{ maxWidth: 600, width: "100%", background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(12px)", borderRadius: 18, boxShadow: "0 4px 24px rgba(255, 224, 102, 0.3)", padding: 40, textAlign: "center", position: "relative", margin: "0 auto", border: "1px solid rgba(255, 224, 102, 0.2)" }}>
            <h2 style={{ color: "#ffe066", fontWeight: 700, marginBottom: 24, fontSize: 28, textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}>Social Media Square Generator</h2>
            {error && <div style={{ color: "#ff3b3b", marginBottom: 16, padding: 12, background: "rgba(255, 59, 59, 0.2)", borderRadius: 8, backdropFilter: "blur(8px)" }}>{error}</div>}
            
            {loading && (
              <div style={{ margin: "48px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", width: 80, height: 80, marginBottom: 24 }}>
                  <FaSpinner className="spin" style={{ fontSize: 64, color: "#ffe066" }} />
                </div>
                <div style={{ color: "#ffe066", fontSize: 18, fontWeight: 600, textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}>Generating your image...</div>
                <div style={{ color: "#e9d5ff", fontSize: 14, marginTop: 8 }}>This may take a few moments</div>
              </div>
            )}
            
            {imageUrl && !loading && (
              <>
                <div style={{ margin: "32px 0", padding: 20, background: "rgba(182, 232, 128, 0.05)", borderRadius: 12, border: "2px dashed #b6e880", position: "relative" }}>
                  <img 
                    src={imageUrl} 
                    alt="Generated social media square" 
                    style={{ 
                      width: "100%", 
                      maxWidth: 512,
                      height: "auto",
                      aspectRatio: "1/1",
                      borderRadius: 12, 
                      boxShadow: "0 4px 16px rgba(255, 224, 102, 0.4)",
                      objectFit: "contain",
                      cursor: "pointer"
                    }} 
                    onClick={() => setFullscreen(true)}
                  />
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
                    <button
                      style={{ 
                        padding: "12px 24px", 
                        borderRadius: 10, 
                        background: "#ffe066", 
                        color: "#23272f", 
                        fontWeight: 700, 
                        fontSize: 16, 
                        border: "none", 
                        boxShadow: "0 2px 8px rgba(255, 224, 102, 0.4)", 
                        cursor: "pointer", 
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                      onClick={() => setFullscreen(true)}
                      onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <FaExpand /> Fullscreen
                    </button>
                    <button
                      onClick={handleDownload}
                      style={{ 
                        padding: "12px 24px", 
                        borderRadius: 10, 
                        background: "#b6e880", 
                        color: "#23272f", 
                        fontWeight: 700, 
                        fontSize: 16, 
                        border: "none", 
                        boxShadow: "0 2px 8px rgba(182, 232, 128, 0.4)", 
                        cursor: "pointer", 
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <FaDownload /> Download
                    </button>
                  </div>
                </div>
                {lastPrompt && (
                  <div style={{ margin: "16px 0 0 0", padding: 12, background: "rgba(182, 232, 128, 0.1)", borderRadius: 8, textAlign: "left" }}>
                    <span style={{ fontWeight: 700, color: "#b6e880", fontSize: 14 }}>Prompt: </span>
                    <span style={{ color: "#e9d5ff", fontSize: 14 }}>{lastPrompt}</span>
                  </div>
                )}
              </>
            )}
            
            {!imageUrl && !loading && (
              <div style={{ margin: "48px 0", color: "#e9d5ff", fontSize: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
                <div>Enter a description below to generate your social media square</div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Input and Send Button at Bottom */}
        <div style={{ position: "fixed", left: 240, right: 0, bottom: 0, background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", boxShadow: "0 -2px 16px rgba(0, 0, 0, 0.1)", padding: "20px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your social media square..."
              style={{ 
                flex: 1,
                padding: 18, 
                fontSize: 18, 
                borderRadius: 12, 
                border: "2px solid #ffe066", 
                background: "rgba(255, 255, 255, 0.95)", 
                color: "#23272f", 
                boxShadow: "0 2px 8px rgba(255, 224, 102, 0.2)",
                outline: "none",
                transition: "all 0.3s"
              }}
              disabled={loading}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              style={{ 
                padding: "18px 24px", 
                borderRadius: 12, 
                background: loading || !prompt.trim() ? "#ffe06650" : "#ffe066", 
                color: "#23272f", 
                border: "none", 
                fontWeight: 700, 
                fontSize: 20, 
                cursor: loading || !prompt.trim() ? "not-allowed" : "pointer", 
                boxShadow: loading || !prompt.trim() ? "none" : "0 4px 12px rgba(255, 224, 102, 0.4)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                transition: "all 0.3s",
                minWidth: 70
              }}
              title="Generate"
            >
              {loading ? <FaSpinner className="spin" style={{ fontSize: 20 }} /> : <FaPaperPlane />}
            </button>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {fullscreen && (
          <div 
            style={{ 
              position: "fixed", 
              top: 0, 
              left: 0, 
              width: "100vw", 
              height: "100vh", 
              background: "rgba(0, 0, 0, 0.95)", 
              zIndex: 9999, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              animation: "fadeIn 0.2s",
              backdropFilter: "blur(8px)"
            }}
            onClick={() => setFullscreen(false)}
          >
            <div 
              style={{ 
                position: "relative", 
                maxWidth: "90vw", 
                maxHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imageUrl}
                alt="Fullscreen social media square"
                style={{ 
                  maxWidth: "90vw", 
                  maxHeight: "90vh", 
                  borderRadius: 16, 
                  boxShadow: "0 8px 32px rgba(255, 224, 102, 0.5)",
                  animation: "popScale 0.3s cubic-bezier(.22,1,.36,1)",
                  objectFit: "contain"
                }}
              />
              <button
                onClick={() => setFullscreen(false)}
                style={{ 
                  position: "absolute", 
                  top: -60, 
                  right: -60, 
                  fontSize: 28, 
                  color: "#fff", 
                  background: "rgba(255, 224, 102, 0.2)", 
                  border: "2px solid #ffe066", 
                  borderRadius: 50, 
                  cursor: "pointer", 
                  padding: "12px 16px", 
                  boxShadow: "0 4px 16px rgba(255, 224, 102, 0.3)",
                  transition: "all 0.2s",
                  fontWeight: 700,
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "rgba(255, 59, 59, 0.3)";
                  e.currentTarget.style.borderColor = "#ff3b3b";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "rgba(255, 224, 102, 0.2)";
                  e.currentTarget.style.borderColor = "#ffe066";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Animations */}
        <style>{`
          .spin { 
            animation: spin 1s linear infinite; 
          } 
          @keyframes spin { 
            100% { transform: rotate(360deg); } 
          }
          @keyframes fadeIn { 
            from { opacity: 0; } 
            to { opacity: 1; } 
          }
          @keyframes popScale {
            0% { transform: scale(0.8); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}