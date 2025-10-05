import './Home.css';
import { FaHome, FaInfoCircle, FaPhone, FaQuestionCircle, FaSignInAlt, FaRocket } from 'react-icons/fa';


export default function Home({ onGetStarted }) {
  return (
    <div className="home-bg">
      <nav className="home-nav">
        <img src="/logo.png" alt="Nano Banana Logo" className="home-logo" />
        <ul className="home-nav-links">
          <li><a href="#home"><FaHome style={{marginRight: 6}} />Home</a></li>
          <li><a href="#about"><FaInfoCircle style={{marginRight: 6}} />About</a></li>
          <li><a href="#contact"><FaPhone style={{marginRight: 6}} />Contact Us</a></li>
          <li><a href="#faq"><FaQuestionCircle style={{marginRight: 6}} />FAQ</a></li>
        </ul>
        <button className="home-signup-btn" onClick={() => onGetStarted('signin')}><FaSignInAlt style={{marginRight: 6}} />Sign In</button>
      </nav>
      <header className="home-header">
        <div className="home-header-content">
          <img src="/logo.png" alt="Nano Banana Logo" className="home-header-logo" />
          <p className="home-desc">Create stunning images and video ads for your brand, free and fast.</p>
          <button className="home-getstarted-btn" onClick={onGetStarted}><FaRocket style={{marginRight: 6}} />Get Started</button>
        </div>
      </header>
    </div>
  );
}
