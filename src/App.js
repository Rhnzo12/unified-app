import React, { useState } from 'react';
import Home from './pages/Home';
import PreOnboarding from './auth/PreOnboarding';
import AuthPage from './auth/AuthPage';
import Onboarding from './auth/Onboarding';
import BrandProfileManager from './profiles/BrandProfileManager';
import CreateProfile from './profiles/CreateProfile';
import ProfilePage from './profiles/ProfilePage';
import Dashboard from './components/Dashboard';
import TemplateBrowser from './templates/TemplateBrowser';
import AIImageGenerator from './ai/AIImageGenerator';
import Gallery from './gallery/Gallery';
import UsageAndPricing from './pricing/UsageAndPricing';
import BannerImages from './modules/BannerImages';
import ImageAds from './modules/ImageAds';
import HelpToSell from './modules/HelpToSell';
import SocialMediaSquare from './modules/SocialMediaSquare';
import MediaStory from './modules/MediaStory';

function App() {
  const [onboardingAction, setOnboardingAction] = useState(null);
  const [step, setStep] = useState(() => localStorage.getItem('nanoBananaStep') || 'home');
  const [onboardingData, setOnboardingData] = useState(null);
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('nanoBananaAuth');
    return savedAuth ? JSON.parse(savedAuth) : null;
  });
  const [profile, setProfile] = useState(null);
  const [niche, setNiche] = useState(null);
  const [selectedModule, setSelectedModule] = useState(() => localStorage.getItem('nanoBananaSelectedModule'));
  const [template, setTemplate] = useState(null);
  
  const handleSignOut = () => {
    setSelectedModule(null);
    setAuth(null);
    setProfile(null);
    setStep('onboarding');
    localStorage.removeItem('nanoBananaStep');
    localStorage.removeItem('nanoBananaSelectedModule');
    localStorage.removeItem('nanoBananaAuth');
  };
  
  // Persist step and selectedModule in localStorage
  React.useEffect(() => {
    localStorage.setItem('nanoBananaStep', step);
  }, [step]);

  React.useEffect(() => {
    if (selectedModule) {
      localStorage.setItem('nanoBananaSelectedModule', selectedModule);
    } else {
      localStorage.removeItem('nanoBananaSelectedModule');
    }
  }, [selectedModule]);

  React.useEffect(() => {
    if (auth) {
      localStorage.setItem('nanoBananaAuth', JSON.stringify(auth));
    }
  }, [auth]);
  
  const [images, setImages] = useState([]);
  const [imagesUsed, setImagesUsed] = useState(0);

  React.useEffect(() => {
    if (!onboardingAction) return;
    const email = auth?.email;
    if (!email) {
      alert('No signed-in email found. Please sign in again.');
      setStep('onboarding');
      setOnboardingAction(null);
      return;
    }
    if (onboardingAction === 'create') {
      setStep('createProfile');
      setOnboardingAction(null);
    } else if (onboardingAction === 'select') {
      const profileKey = `nanoBananaProfile_${email}`;
      const savedProfile = localStorage.getItem(profileKey);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
        setStep('dashboard');
      } else {
        alert('No existing profile found for this account. Please create a new profile.');
        setStep('createProfile');
      }
      setOnboardingAction(null);
    }
  }, [auth, onboardingAction]);
  
  if (step === 'createProfile') {
    return <CreateProfile 
      user={auth}
      onComplete={p => {
        setProfile(p);
        const email = auth?.email;
        if (!email) {
          alert('No signed-in email found. Please sign in again.');
          setStep('home');
          return;
        }
        const profileKey = `nanoBananaProfile_${email}`;
        localStorage.setItem(profileKey, JSON.stringify(p));
        setStep('dashboard');
      }} 
      onBack={() => setStep('onboarding')} 
    />;
  }

  if (step === 'home') {
    return <Home onGetStarted={(action) => {
      if (action === 'signin') {
        setStep('onboarding');
      } else {
        setStep('preonboarding');
      }
    }} />;
  }

  if (step === 'preonboarding') {
    return <PreOnboarding 
      onComplete={data => {
        setOnboardingData(data);
        setStep('onboarding');
      }}
      onBack={() => setStep('home')}
    />;
  }

  if (step === 'onboarding') {
    return <Onboarding 
      onComplete={action => setOnboardingAction(action)}
      onAuth={user => setAuth(user)}
      onBack={() => setStep('home')}
    />;
  }

  if (step === 'profile') {
    return <BrandProfileManager
      user={auth}
      onComplete={p => {
        setProfile(p);
        const email = auth?.email;
        if (!email) {
          alert('No signed-in email found. Please sign in again.');
          setStep('home');
          return;
        }
        const profileKey = `nanoBananaProfile_${email}`;
        localStorage.setItem(profileKey, JSON.stringify(p));
        setStep('dashboard');
      }}
      onBack={() => setStep('profilePage')}
    />;
  }
  
  if (step === 'profilePage') {
    return <ProfilePage
      user={auth}
      profile={profile}
      onEdit={() => setStep('profile')}
      onChangePassword={() => alert('Change password functionality coming soon.')}
      onBack={() => setStep('dashboard')}
      onSave={updatedProfile => {
        // Save the updated profile here
      }}
    />;
  }

  if (step === 'dashboard') {
    // Merge name from localStorage user object
    let userWithName = auth;
    if (auth && auth.email) {
      const userKey = `nanoBananaUser_${auth.email}`;
      const savedUser = localStorage.getItem(userKey);
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        userWithName = { ...auth, name: userObj.name };
      }
    }
    
    // If a module is selected, render its page in main content
    const email = auth?.email;
    const profileKey = email ? `nanoBananaProfile_${email}` : null;
    const preKey = email ? `nanoBananaPreOnboarding_${email}` : null;
    const savedProfile = profileKey ? JSON.parse(localStorage.getItem(profileKey) || '{}') : {};
    const savedPre = preKey ? JSON.parse(localStorage.getItem(preKey) || '{}') : {};
    
    if (selectedModule === 'BannerImages') {
      return (
        <BannerImages
          user={auth}
          onBackToDashboard={() => setSelectedModule(null)}
          onNavigate={setSelectedModule}
          onSignOut={handleSignOut}
          onProfileClick={() => setStep('profilePage')}
          exampleImages={savedProfile.exampleImages || []}
          preOnboardingData={savedPre}
        />
      );
    }

    if (selectedModule === 'ImageAds') {
      return (
        <ImageAds
          user={auth}
          onBackToDashboard={() => setSelectedModule(null)}
          onNavigate={setSelectedModule}
          onSignOut={handleSignOut}
          onProfileClick={() => setStep('profilePage')}
          exampleImages={savedProfile.exampleImages || []}
          preOnboardingData={savedPre}
        />
      );
    }

    if (selectedModule === 'HelpToSell') {
      return (
        <HelpToSell
          user={auth}
          onBackToDashboard={() => setSelectedModule(null)}
          onNavigate={setSelectedModule}
          onSignOut={handleSignOut}
          onProfileClick={() => setStep('profilePage')}
          exampleImages={savedProfile.exampleImages || []}
          preOnboardingData={savedPre}
        />
      );
    }

    if (selectedModule === 'SocialMediaSquare') {
      return (
        <SocialMediaSquare
          user={auth}
          onBackToDashboard={() => setSelectedModule(null)}
          onNavigate={setSelectedModule}
          onSignOut={handleSignOut}
          onProfileClick={() => setStep('profilePage')}
          exampleImages={savedProfile.exampleImages || []}
          preOnboardingData={savedPre}
        />
      );
    }

    if (selectedModule === 'MediaStory') {
      return (
        <MediaStory
          user={auth}
          onBackToDashboard={() => setSelectedModule(null)}
          onNavigate={setSelectedModule}
          onSignOut={handleSignOut}
          onProfileClick={() => setStep('profilePage')}
          exampleImages={savedProfile.exampleImages || []}
          preOnboardingData={savedPre}
        />
      );
    }
    
    // Default: show dashboard only
    return <Dashboard
      onSelectModule={mod => setSelectedModule(mod)}
      selectedModule={selectedModule}
      user={userWithName}
      imagesUsed={imagesUsed}
      onSignOut={handleSignOut}
      onProfileClick={() => setStep('profilePage')}
      preOnboardingData={onboardingData}
    />;
  }
  
  // Fallback: show Home if step is unknown
  return <Home onGetStarted={(action) => {
    if (action === 'signin') {
      setStep('onboarding');
    } else {
      setStep('preonboarding');
    }
  }} />;
}

export default App;