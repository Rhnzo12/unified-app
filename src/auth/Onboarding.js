import React, { useState } from 'react';
// Import logo from public folder
// No import needed, use <img src="/logo.png" />

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

const SparklesIcon = () => (
  <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const UserBigIcon = () => (
  <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PlusIcon = () => (
  <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const UserSmallIcon = () => (
  <svg style={{ width: '24px', height: '24px', color: '#c4b5fd' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
  welcomeIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
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
    color: '#d8b4fe'
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
  actionCard: {
    background: 'linear-gradient(90deg, #eab308 0%, #ca8a04 100%)',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    marginBottom: '16px'
  },
  actionCardSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(4px)',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s',
    cursor: 'pointer',
    width: '100%'
  },
  actionCardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actionCardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  actionCardIcon: {
    width: '48px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionCardIconSecondary: {
    width: '48px',
    height: '48px',
    background: 'rgba(168, 85, 247, 0.3)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionCardText: {
    textAlign: 'left'
  },
  actionCardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0
  },
  actionCardSubtitle: {
    fontSize: '14px',
    color: '#fef3c7',
    margin: '4px 0 0 0'
  },
  actionCardSubtitleSecondary: {
    fontSize: '14px',
    color: '#e9d5ff',
    margin: '4px 0 0 0'
  }
};

// Removed duplicate export default function AuthFlow
export default function Onboarding(props) {
  const [hasProfile, setHasProfile] = useState(false);
  const [step, setStep] = useState('signin');
  const { onBack, onComplete } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Invalid Email or Password');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid Email or Password');
      return;
    }
    if (password.length < 6) {
      alert('Invalid Email or Password');
      return;
    }
    // Check for existing profile and password
    const profileKey = `nanoBananaProfile_${email}`;
    const savedProfile = localStorage.getItem(profileKey);
    const userKey = `nanoBananaUser_${email}`;
    const savedUser = localStorage.getItem(userKey);
    if (!savedUser) {
      alert('Invalid Email or Password');
      return;
    }
    const userObj = JSON.parse(savedUser);
    if (userObj.password !== password) {
      alert('Invalid Email or Password');
      return;
    }
    // Always set auth before completing
    if (props.onAuth) props.onAuth({ email });
    setTimeout(() => {
      if (savedProfile) {
        setHasProfile(true);
        if (props.onComplete) props.onComplete('select'); // Go directly to dashboard
      } else {
        setHasProfile(false);
        setStep('profileChoice'); // Show only Create New Profile
      }
    }, 0);
  };

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !name || !birthday) {
      alert('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Check if user already exists
    const userKey = `nanoBananaUser_${email}`;
    if (localStorage.getItem(userKey)) {
      alert('An account with this email already exists. Please sign in.');
      return;
    }
    // Save user info (simulate registration)
    localStorage.setItem(userKey, JSON.stringify({ email, password, name, birthday }));
    // Always set auth before completing
    if (props.onAuth) props.onAuth({ email });
    setTimeout(() => {
      setStep('profileChoice');
    }, 0);
  };

  const switchToSignUp = () => {
    setStep('signup');
    setEmail('');
    setPassword('');
  };

  const switchToSignIn = () => {
    setStep('signin');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setBirthday('');
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
        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.4);
        }
        .auth-logo:hover {
          transform: scale(1.05);
        }
        .auth-link:hover {
          color: #a855f7;
        }
        .auth-action-card:hover {
          transform: translateY(-2px);
        }
        .auth-action-card-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #a855f7;
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.backgroundBlob1}></div>
        <div style={styles.backgroundBlob2}></div>
        <div style={styles.backgroundBlob3}></div>
        
        <div style={styles.card}>
          <div style={styles.cardInner}>
            <div style={styles.gradientBar}></div>
            <div style={styles.content}>
              {step === 'signin' && (
                <div>
                  <button type="button" style={{ ...styles.link, marginBottom: 16 }} onClick={onBack}>
                    ← Back
                  </button>
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
                  <p style={styles.subtitle}>Sign in to your account</p>

                  <div style={styles.formGroup}>
                    <label htmlFor="signin-email" style={styles.label}>Email</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <MailIcon />
                      </div>
                      <input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="signin-password" style={styles.label}>Password</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <LockIcon />
                      </div>
                      <input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSignIn}
                    style={styles.button}
                    className="auth-button"
                  >
                    Sign In
                  </button>

                  <p style={styles.footerText}>
                    Don't have an account?{' '}
                    <button type="button" style={styles.link} className="auth-link" onClick={switchToSignUp}>
                      Sign up
                    </button>
                  </p>
                </div>
              )}

              {step === 'signup' && (
                <div>
                  <div style={styles.logoContainer}>
                    <div style={styles.logo}>
                      <div style={styles.logoIcon} className="auth-logo">
                        <img src="/logosec.png" alt="Logo" style={{ width: 64, height: 64 }} />
                      </div>
                      <div style={styles.logoBadge}></div>
                    </div>
                  </div>

                  <div style={styles.title}>
                    <h1 style={styles.h1}>Create Account</h1>
                  </div>
                  <p style={styles.subtitle}>Sign up to get started</p>

                  <div style={styles.formGroup}>
                    <label htmlFor="signup-name" style={styles.label}>Name</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <UserIcon />
                      </div>
                      <input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="signup-birthday" style={styles.label}>Birthday</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <CalendarIcon />
                      </div>
                      <input
                        id="signup-birthday"
                        type="date"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="signup-email" style={styles.label}>Email</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <MailIcon />
                      </div>
                      <input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="signup-password" style={styles.label}>Password</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <LockIcon />
                      </div>
                      <input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="signup-confirm-password" style={styles.label}>Confirm Password</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <LockIcon />
                      </div>
                      <input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSignUp}
                    style={styles.button}
                    className="auth-button"
                  >
                    Sign Up
                  </button>

                  <p style={styles.footerText}>
                    Already have an account?{' '}
                    <button type="button" style={styles.link} className="auth-link" onClick={switchToSignIn}>
                      Sign in
                    </button>
                  </p>
                </div>
              )}

              {step === 'profileChoice' && (
                <div>
                  <button type="button" style={{ ...styles.link, marginBottom: 16 }} onClick={onBack}>
                    ← Back
                  </button>
                  <div style={styles.logoContainer}>
                    <div style={styles.logo}>
                      <div style={styles.welcomeIcon}>
                        <UserBigIcon />
                      </div>
                    </div>
                  </div>

                  <div style={styles.title}>
                    <h1 style={styles.h1}>Welcome! 🎉</h1>
                  </div>
                  <p style={styles.subtitle}>Create a Brand Profile</p>

                  <div style={{ marginTop: '32px' }}>
                    <button
                      onClick={() => onComplete('create')}
                      style={styles.actionCard}
                      className="auth-action-card"
                    >
                      <div style={styles.actionCardContent}>
                        <div style={styles.actionCardLeft}>
                          <div style={styles.actionCardIcon}>
                            <PlusIcon />
                          </div>
                          <div style={styles.actionCardText}>
                            <h3 style={styles.actionCardTitle}>Create Brand Profile</h3>
                            <p style={styles.actionCardSubtitle}>Start fresh with a new brand</p>
                          </div>
                        </div>
                        <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}