import React, { useState } from 'react';

const steps = [
  'Role Identification',
  'Industry & Niche',
  'Primary Use Cases',
  'Platform Distribution',
  'Image Type Preferences',
  'Brand Style & Aesthetic',
  'Goals & Outcomes',
  'Volume & Frequency',
  'Quick Wins',
  'Preference Confirmation',
];

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: "url('/bannerimage2.png')",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    padding: '20px'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(35,39,47,0.7)',
    zIndex: 1
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    maxWidth: '600px',
    width: '100%',
    zIndex: 2,
    position: 'relative',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
    gap: '4px'
  },
  progressStep: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    background: 'rgba(255,255,255,0.1)',
    transition: 'background 0.3s'
  },
  progressStepActive: {
    background: '#ffe066'
  },
  stepTitle: {
    color: '#ffe066',
    fontWeight: 'bold',
    marginBottom: '8px',
    fontSize: '20px'
  },
  stepDescription: {
    color: '#e9d5ff',
    marginBottom: '16px',
    fontSize: '14px'
  },
  optionsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px'
  },
  optionButton: {
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid #444',
    background: 'rgba(255,255,255,0.05)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  optionButtonSelected: {
    border: '2px solid #ffe066',
    background: '#23272f',
    transform: 'scale(1.02)'
  },
  checkboxLabel: {
    borderRadius: '12px',
    padding: '8px 16px',
    margin: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center'
  },
  checkboxLabelChecked: {
    background: '#ffe066',
    color: '#222'
  },
  checkboxLabelUnchecked: {
    background: 'rgba(255,255,255,0.05)',
    color: 'white'
  },
  textInput: {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #444',
    background: 'rgba(255,255,255,0.05)',
    color: 'white',
    minWidth: '180px',
    outline: 'none',
    transition: 'border 0.2s'
  },
  textInputFull: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #444',
    background: 'rgba(255,255,255,0.05)',
    color: 'white',
    marginBottom: '16px',
    outline: 'none',
    transition: 'border 0.2s'
  },
  colorPicker: {
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px'
  },
  backButton: {
    padding: '12px 32px',
    borderRadius: '12px',
    background: '#444',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  nextButton: {
    padding: '12px 32px',
    borderRadius: '12px',
    background: 'linear-gradient(90deg, #ffe066 60%, #b6e880 100%)',
    color: '#222',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  summaryBox: {
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '12px',
    padding: '16px',
    color: 'white',
    marginBottom: '16px',
    maxHeight: '400px',
    overflowY: 'auto'
  },
  preText: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '14px',
    fontFamily: 'monospace'
  }
};

export default function PreOnboarding({ onComplete, onBack }) {
  const [data, setData] = useState({
    role: '',
    roleOther: '',
    industry: '',
    industryOther: '',
    niche: '',
    useCases: [],
    platforms: [],
    imageTypes: [],
    brandStyles: [],
    brandColors: ['#ffffff', '#ffffff', '#ffffff'],
    brandColorPref: '',
    goals: [],
    frequency: '',
    quickWinPrompt: '',
  });
  const [step, setStep] = useState(0);

  function handleRadioChange(field, value) {
    setData(d => ({ ...d, [field]: value }));
  }

  function handleTextChange(field, value) {
    setData(d => ({ ...d, [field]: value }));
  }

  function handleCheckboxChange(field, value) {
    setData(d => {
      const arr = d[field];
      if (arr.includes(value)) {
        return { ...d, [field]: arr.filter(v => v !== value) };
      } else {
        return { ...d, [field]: [...arr, value] };
      }
    });
  }

  function handleColorChange(index, value) {
    setData(d => {
      const colors = [...d.brandColors];
      colors[index] = value;
      return { ...d, brandColors: colors };
    });
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div>
            <p style={styles.stepDescription}>What best describes your role?</p>
            <div style={styles.optionsGrid}>
              {['Business Owner','Marketing Manager','Content Creator','Social Media Manager','Freelancer/Agency','Designer'].map(role => (
                <button 
                  key={role} 
                  style={{
                    ...styles.optionButton,
                    ...(data.role === role ? styles.optionButtonSelected : {})
                  }}
                  onClick={() => handleRadioChange('role', role)}
                >
                  {role}
                </button>
              ))}
              <input 
                type="text" 
                placeholder="Other (please specify)" 
                value={data.roleOther} 
                onChange={e => handleTextChange('roleOther', e.target.value)} 
                style={styles.textInput}
              />
            </div>
            <div style={styles.buttonRow}>
              <button onClick={onBack} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div>
            <p style={styles.stepDescription}>What industry are you in?</p>
            <div style={styles.optionsGrid}>
              {['E-commerce/Retail','Food & Beverage','Real Estate','Health & Wellness','Technology/SaaS','Fashion & Beauty','Finance/Insurance','Education','Hospitality/Travel','Professional Services'].map(industry => (
                <button 
                  key={industry}
                  style={{
                    ...styles.optionButton,
                    ...(data.industry === industry ? styles.optionButtonSelected : {})
                  }}
                  onClick={() => handleRadioChange('industry', industry)}
                >
                  {industry}
                </button>
              ))}
              <input 
                type="text" 
                placeholder="Other (please specify)" 
                value={data.industryOther} 
                onChange={e => handleTextChange('industryOther', e.target.value)} 
                style={styles.textInput}
              />
            </div>
            <p style={styles.stepDescription}>Tell us more about your niche:</p>
            <input 
              type="text" 
              placeholder="e.g. organic skincare" 
              value={data.niche} 
              onChange={e => handleTextChange('niche', e.target.value)} 
              style={styles.textInputFull}
            />
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <p style={styles.stepDescription}>What will you primarily use these images for?</p>
            <div style={styles.optionsGrid}>
              {['Social media posts','Paid advertising','Website/landing pages','Email marketing','Product launches','Blog content','Print materials','Event promotions','Seasonal campaigns','Brand awareness'].map(useCase => (
                <label 
                  key={useCase}
                  style={{
                    ...styles.checkboxLabel,
                    ...(data.useCases.includes(useCase) ? styles.checkboxLabelChecked : styles.checkboxLabelUnchecked)
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={data.useCases.includes(useCase)} 
                    onChange={() => handleCheckboxChange('useCases', useCase)} 
                    style={{ marginRight: '8px' }}
                  />
                  {useCase}
                </label>
              ))}
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <p style={styles.stepDescription}>Where will you share these images most?</p>
            <div style={styles.optionsGrid}>
              {['Instagram','Facebook','LinkedIn','Twitter/X','Pinterest','TikTok','Website','Email newsletters','Print media','Multiple platforms'].map(platform => (
                <label 
                  key={platform}
                  style={{
                    ...styles.checkboxLabel,
                    ...(data.platforms.includes(platform) ? styles.checkboxLabelChecked : styles.checkboxLabelUnchecked)
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={data.platforms.includes(platform)} 
                    onChange={() => handleCheckboxChange('platforms', platform)} 
                    style={{ marginRight: '8px' }}
                  />
                  {platform}
                </label>
              ))}
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <p style={styles.stepDescription}>What types of images do you need?</p>
            <div style={styles.optionsGrid}>
              {['Product showcase','Lifestyle/contextual','Text-based graphics','Promotional/sale announcements','Behind-the-scenes','Infographics','Before/after comparisons','Testimonial graphics','Event/announcement banners','Abstract/conceptual'].map(type => (
                <label 
                  key={type}
                  style={{
                    ...styles.checkboxLabel,
                    ...(data.imageTypes.includes(type) ? styles.checkboxLabelChecked : styles.checkboxLabelUnchecked)
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={data.imageTypes.includes(type)} 
                    onChange={() => handleCheckboxChange('imageTypes', type)} 
                    style={{ marginRight: '8px' }}
                  />
                  {type}
                </label>
              ))}
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div>
            <p style={styles.stepDescription}>How would you describe your brand style?</p>
            <div style={styles.optionsGrid}>
              {['Minimalist/Clean','Bold/Vibrant','Elegant/Luxury','Fun/Playful','Professional/Corporate','Earthy/Natural','Modern/Futuristic','Vintage/Retro','Edgy/Alternative'].map(style => (
                <label 
                  key={style}
                  style={{
                    ...styles.checkboxLabel,
                    ...(data.brandStyles.includes(style) ? styles.checkboxLabelChecked : styles.checkboxLabelUnchecked)
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={data.brandStyles.includes(style)} 
                    onChange={() => handleCheckboxChange('brandStyles', style)} 
                    style={{ marginRight: '8px' }}
                  />
                  {style}
                </label>
              ))}
            </div>
            <p style={styles.stepDescription}>Do you have existing brand colors?</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {[0,1,2].map(i => (
                <input 
                  key={i} 
                  type="color" 
                  value={data.brandColors[i]} 
                  onChange={e => handleColorChange(i, e.target.value)} 
                  style={styles.colorPicker}
                />
              ))}
              <input 
                type="text" 
                placeholder="Or enter hex code" 
                value={data.brandColorPref} 
                onChange={e => handleTextChange('brandColorPref', e.target.value)} 
                style={styles.textInput}
              />
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div>
            <p style={styles.stepDescription}>What are your main goals with these images?</p>
            <div style={styles.optionsGrid}>
              {['Increase engagement','Drive sales/conversions','Build brand awareness','Educate audience','Grow followers','Promote events','Launch new products','Establish thought leadership','Showcase portfolio/work','Build community'].map(goal => (
                <label 
                  key={goal}
                  style={{
                    ...styles.checkboxLabel,
                    ...(data.goals.includes(goal) ? styles.checkboxLabelChecked : styles.checkboxLabelUnchecked)
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={data.goals.includes(goal)} 
                    onChange={() => handleCheckboxChange('goals', goal)} 
                    style={{ marginRight: '8px' }}
                  />
                  {goal}
                </label>
              ))}
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 7:
        return (
          <div>
            <p style={styles.stepDescription}>How often do you need to create marketing images?</p>
            <div style={styles.optionsGrid}>
              {['Daily','2-3 times per week','Weekly','2-3 times per month','Monthly','As needed for campaigns'].map(freq => (
                <button 
                  key={freq}
                  style={{
                    ...styles.optionButton,
                    ...(data.frequency === freq ? styles.optionButtonSelected : {})
                  }}
                  onClick={() => handleRadioChange('frequency', freq)}
                >
                  {freq}
                </button>
              ))}
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 8:
        const quickPrompts = [
          `Create a promotional post for ${data.industry || 'your industry'} announcing a weekend sale`,
          `Showcase a new product for ${data.niche || 'your niche'}`,
          `Share a testimonial graphic for ${data.niche || 'your niche'}`,
          `Announce a seasonal campaign for ${data.industry || 'your industry'}`,
          `Create a behind-the-scenes post for your brand`,
        ];
        return (
          <div>
            <p style={styles.stepDescription}>Want to create your first image now?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {quickPrompts.map((prompt, i) => (
                <button 
                  key={i}
                  style={{
                    ...styles.optionButton,
                    textAlign: 'left',
                    ...(data.quickWinPrompt === prompt ? styles.optionButtonSelected : {})
                  }}
                  onClick={() => handleRadioChange('quickWinPrompt', prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => setStep(step+1)} style={styles.nextButton}>Next</button>
            </div>
          </div>
        );
      
      case 9:
        return (
          <div>
            <p style={styles.stepDescription}>Here's what we learned about you:</p>
            <div style={styles.summaryBox}>
              <pre style={styles.preText}>{JSON.stringify(data, null, 2)}</pre>
            </div>
            <div style={styles.buttonRow}>
              <button onClick={() => setStep(step-1)} style={styles.backButton}>Back</button>
              <button onClick={() => onComplete(data)} style={styles.nextButton}>Continue to Sign In / Sign Up</button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  }

  return (
    <>
      <style>{`
        .backButton:hover {
          background: #555;
          transform: translateY(-2px);
        }
        .nextButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 224, 102, 0.4);
        }
        input[type="text"]:focus,
        input[type="color"]:focus {
          border-color: #ffe066;
          outline: none;
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.progressBar}>
            {steps.map((_, i) => (
              <div 
                key={i}
                style={{
                  ...styles.progressStep,
                  ...(i <= step ? styles.progressStepActive : {})
                }}
              />
            ))}
          </div>
          {renderStep()}
        </div>
      </div>
    </>
  );
}