import React, { useState } from "react";
import { signUp, signIn } from "../firebaseAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";

// Custom SVG Icons
const MailIcon = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UserIcon = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #23272f 0%, #181a20 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    position: 'relative',
    backgroundImage: "url('/bannerimage2.png')",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  backgroundBlob1: {
    position: 'absolute',
    width: '384px',
    height: '384px',
    background: '#a855f7',
    borderRadius: '50%',
    mixBlendMode: 'multiply',
    filter: 'blur(64px)',
    opacity: 0.2,
    animation: 'pulse 3s infinite',
    top: 0,
    left: '-80px'
  },
  backgroundBlob2: {
    position: 'absolute',
    width: '384px',
    height: '384px',
    background: '#eab308',
    borderRadius: '50%',
    mixBlendMode: 'multiply',
    filter: 'blur(64px)',
    opacity: 0.2,
    animation: 'pulse 3s infinite',
    animationDelay: '2s',
    bottom: 0,
    right: '-80px'
  },
  backgroundBlob3: {
    position: 'absolute',
    width: '384px',
    height: '384px',
    background: '#ec4899',
    borderRadius: '50%',
    mixBlendMode: 'multiply',
    filter: 'blur(64px)',
    opacity: 0.2,
    animation: 'pulse 3s infinite',
    animationDelay: '4s',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  card: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '448px',
    transition: 'all 0.5s',
  },
  cardInner: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden'
  },
  gradientBar: {
    height: '8px',
    background: 'linear-gradient(90deg, #facc15 0%, #a855f7 50%, #ec4899 100%)'
  },
  content: {
    padding: '32px'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  logo: {
    position: 'relative'
  },
  logoIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #ffe066 0%, #b6e880 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  logoBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '24px',
    height: '24px',
    background: '#a855f7',
    borderRadius: '50%',
    border: '4px solid rgba(255, 255, 255, 0.1)',
    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
  },
  title: {
    textAlign: 'center',
    marginBottom: '8px'
  },
  h1: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    letterSpacing: '-0.025em'
  },
  subtitle: {
    textAlign: 'center',
    color: '#e9d5ff',
    fontSize: '18px',
    marginBottom: '24px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#e9d5ff',
    marginBottom: '8px'
  },
  inputWrapper: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#d8b4fe',
    zIndex: 1,
    pointerEvents: 'none'
  },
  input: {
    width: '100%',
    paddingLeft: '48px',
    paddingRight: '16px',
    paddingTop: '16px',
    paddingBottom: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.4)',
    marginBottom: '16px'
  },
  footerText: {
    textAlign: 'center',
    color: '#e9d5ff',
    fontSize: '14px',
    margin: 0
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#c4b5fd',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    textDecoration: 'underline',
    padding: 0
  },
  errorMessage: {
    color: '#ff6b6b',
    background: 'rgba(255, 107, 107, 0.1)',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    border: '1px solid rgba(255, 107, 107, 0.3)'
  }
};

export default function Onboarding({ onAuth, onComplete, onBack }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileData, setProfileData] = useState({ name: "", birthday: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to check if user has a profile
  const checkUserProfile = async (uid) => {
    try {
      const profileRef = doc(db, "users", uid, "profile", "main");
      const profileSnap = await getDoc(profileRef);
      return profileSnap.exists();
    } catch (err) {
      console.error("Error checking profile:", err);
      return false;
    }
  };

  // Function to save user basic info to Firestore
  const saveUserInfo = async (uid, userData) => {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        name: userData.name,
        birthday: userData.birthday,
        email: email,
        createdAt: new Date().toISOString()
      }, { merge: true });
      console.log("User info saved successfully");
    } catch (err) {
      console.error("Error saving user info:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Input validation for sign up
    if (isSignUp) {
      if (!profileData.name || !profileData.birthday) {
        setLoading(false);
        setError("Please fill in all profile fields.");
        return;
      }
      if (!email || !password || !confirmPassword) {
        setLoading(false);
        setError("Please fill in all authentication fields.");
        return;
      }
      if (password.length < 6) {
        setLoading(false);
        setError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setLoading(false);
        setError("Passwords do not match.");
        return;
      }
    } else {
      // Input validation for sign in
      if (!email || !password) {
        setLoading(false);
        setError("Please enter your email and password.");
        return;
      }
    }

    try {
      let user;
      if (isSignUp) {
        console.log("Attempting signup with profileData:", profileData);
        
        // Sign up the user (this only creates auth account)
        user = await signUp(email, password);
        console.log("Signup successful, user:", user);
        
        // Save user info to Firestore
        if (user && user.uid) {
          await saveUserInfo(user.uid, profileData);
          console.log("User data saved to Firestore");
        }
        
        if (user && onAuth) onAuth(user);
        if (user && onComplete) onComplete("create");
      } else {
        user = await signIn(email, password);
        if (user && onAuth) onAuth(user);
        
        // Check if profile exists for sign-in
        const hasProfile = await checkUserProfile(user.uid);
        if (hasProfile && onComplete) {
          onComplete("select");
        } else if (onComplete) {
          onComplete("create");
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Full error object:", err);
      // Only show "Invalid Email or Password" for sign in errors
      if (!isSignUp && err.code && err.code.startsWith("auth/")) {
        setError("Invalid Email or Password");
      } else {
        setError(err.message || (isSignUp ? "Failed to create account. Please try again." : "Authentication failed"));
      }
      console.log("Firebase Auth Error:", err);
    }
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .auth-input:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }
        .auth-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.4);
        }
        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .auth-logo:hover {
          transform: scale(1.05);
        }
        .auth-link:hover {
          color: #a855f7;
        }
      `}</style>
      
      <div style={styles.container}>
        {/* Back Button */}
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
          ← Home
        </button>
        
        <div style={styles.backgroundBlob1}></div>
        <div style={styles.backgroundBlob2}></div>
        <div style={styles.backgroundBlob3}></div>
        <div style={styles.card}>
          <div style={styles.cardInner}>
            <div style={styles.gradientBar}></div>
            <div style={styles.content}>
              <div style={styles.logoContainer}>
                <div style={styles.logo}>
                  <div style={styles.logoIcon} className="auth-logo">
                    <img src="/logosec.png" alt="Logo" style={{ width: 64, height: 64 }} />
                  </div>
                  <div style={styles.logoBadge}></div>
                </div>
              </div>

              <div style={styles.title}>
                <h1 style={styles.h1}>Quantum Bloom</h1>
              </div>
              <p style={styles.subtitle}>
                {isSignUp ? "Create your account" : "Sign in to your account"}
              </p>

              {error && <div style={styles.errorMessage}>{error}</div>}

              <div>
                {isSignUp && (
                  <>
                    <div style={styles.formGroup}>
                      <label htmlFor="name" style={styles.label}>Your Name</label>
                      <div style={styles.inputWrapper}>
                        <div style={styles.inputIcon}>
                          <UserIcon />
                        </div>
                        <input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={profileData.name}
                          onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                          style={styles.input}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label htmlFor="birthday" style={styles.label}>Birthday</label>
                      <div style={styles.inputWrapper}>
                        <div style={styles.inputIcon}>
                          <CalendarIcon />
                        </div>
                        <input
                          id="birthday"
                          type="date"
                          value={profileData.birthday}
                          onChange={e => setProfileData({ ...profileData, birthday: e.target.value })}
                          style={styles.input}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <MailIcon />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={styles.input}
                      className="auth-input"
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="password" style={styles.label}>Password</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <LockIcon />
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={styles.input}
                      className="auth-input"
                    />
                  </div>
                </div>

                {isSignUp && (
                  <div style={styles.formGroup}>
                    <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <LockIcon />
                      </div>
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={styles.button}
                  className="auth-button"
                >
                  {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                </button>

                <p style={styles.footerText}>
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                  <button 
                    type="button" 
                    style={styles.link} 
                    className="auth-link" 
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError("");
                      setConfirmPassword("");
                      setProfileData({ name: "", birthday: "" });
                    }}
                  >
                    {isSignUp ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}