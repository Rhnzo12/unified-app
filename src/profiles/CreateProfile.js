import React, { useState } from 'react';
import { FaUser, FaBriefcase, FaBullseye, FaCheck, FaUserPlus } from 'react-icons/fa';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config"; // adjust the path if needed

// 95+ niches with sub-niches
const niches = [
  { name: 'Fitness', subNiches: ['Yoga', 'Crossfit', 'Bodybuilding', 'Pilates', 'Running', 'Cycling', 'Swimming', 'Martial Arts'] },
  { name: 'Food & Beverage', subNiches: ['Vegan', 'Coffee Shops', 'Meal Prep', 'Bakeries', 'Restaurants', 'Food Trucks', 'Catering', 'Desserts'] },
  { name: 'Beauty', subNiches: ['Skincare', 'Hair Salons', 'Makeup Artists', 'Nail Salons', 'Spas', 'Cosmetics', 'Barbershops', 'Aesthetics'] },
  { name: 'Pets', subNiches: ['Dog Training', 'Pet Stores', 'Grooming', 'Pet Food', 'Veterinary', 'Pet Sitting', 'Aquariums', 'Exotic Pets'] },
  { name: 'Real Estate', subNiches: ['Residential', 'Commercial', 'Luxury', 'Rentals', 'Property Management', 'Investment', 'Flipping', 'Staging'] },
  { name: 'Education', subNiches: ['Online Courses', 'Tutoring', 'Test Prep', 'Language Schools', 'Music Lessons', 'Art Classes', 'STEM', 'Homeschooling'] },
  { name: 'Health & Wellness', subNiches: ['Chiropractic', 'Therapy', 'Nutrition', 'Massage', 'Meditation', 'Mental Health', 'Holistic', 'Weight Loss'] },
  { name: 'Automotive', subNiches: ['Car Dealerships', 'Auto Repair', 'Car Wash', 'Detailing', 'Parts & Accessories', 'Custom Builds', 'Tinting', 'Tires'] },
  { name: 'Fashion', subNiches: ['Boutiques', 'Shoes', 'Accessories', 'Streetwear', 'Luxury Fashion', 'Vintage', 'Sustainable', 'Plus Size'] },
  { name: 'Travel', subNiches: ['Travel Agents', 'Tours', 'Hotels', 'Adventure Travel', 'Luxury Travel', 'Budget Travel', 'Cruises', 'Eco Tourism'] },
  { name: 'Technology', subNiches: ['Software Development', 'AI & Machine Learning', 'Cybersecurity', 'Mobile Apps', 'Web Development', 'IT Services', 'Cloud Computing', 'Data Science'] },
  { name: 'E-commerce', subNiches: ['Dropshipping', 'Amazon FBA', 'Shopify Stores', 'Etsy Shops', 'Print on Demand', 'Wholesale', 'Subscription Boxes', 'Digital Products'] },
  { name: 'Marketing', subNiches: ['Social Media', 'SEO', 'Content Marketing', 'Email Marketing', 'Influencer Marketing', 'Video Marketing', 'Paid Ads', 'Branding'] },
  { name: 'Finance', subNiches: ['Financial Planning', 'Investment', 'Accounting', 'Tax Services', 'Insurance', 'Cryptocurrency', 'Banking', 'Wealth Management'] },
  { name: 'Photography', subNiches: ['Wedding Photography', 'Portrait', 'Commercial', 'Product', 'Real Estate', 'Event', 'Nature', 'Fashion'] },
  { name: 'Home Services', subNiches: ['Cleaning', 'Landscaping', 'Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Painting', 'Remodeling'] },
  { name: 'Entertainment', subNiches: ['DJs', 'Event Planning', 'Musicians', 'Comedians', 'Magicians', 'Gaming', 'Streaming', 'Podcasting'] },
  { name: 'Legal', subNiches: ['Family Law', 'Criminal Defense', 'Business Law', 'Real Estate Law', 'Immigration', 'Personal Injury', 'Estate Planning', 'Intellectual Property'] },
  { name: 'Construction', subNiches: ['Residential', 'Commercial', 'Renovation', 'Green Building', 'Project Management', 'Demolition', 'Concrete', 'Framing'] },
  { name: 'Hospitality', subNiches: ['Hotels', 'Restaurants', 'Bars & Nightclubs', 'Event Venues', 'Catering', 'Bed & Breakfast', 'Resorts', 'Guest Services'] },
  { name: 'Arts & Crafts', subNiches: ['Painting', 'Pottery', 'Jewelry Making', 'Woodworking', 'Sewing', 'Scrapbooking', 'Calligraphy', 'Digital Art'] },
  { name: 'Music', subNiches: ['Music Production', 'Songwriting', 'DJing', 'Music Lessons', 'Recording Studios', 'Live Performance', 'Music Marketing', 'Sound Design'] },
  { name: 'Sports', subNiches: ['Coaching', 'Sports Equipment', 'Sports Teams', 'Sports Medicine', 'Sports Nutrition', 'Sports Psychology', 'Athletic Training', 'Sports Betting'] },
  { name: 'Gaming', subNiches: ['Video Games', 'Board Games', 'Mobile Gaming', 'Game Development', 'Esports', 'Gaming Content', 'Game Streaming', 'Gaming Hardware'] },
  { name: 'Parenting', subNiches: ['Baby Products', 'Childcare', 'Parenting Advice', 'Kids Activities', 'Education', 'Teen Support', 'Adoption', 'Foster Care'] },
  { name: 'Home Decor', subNiches: ['Interior Design', 'Furniture', 'Lighting', 'Textiles', 'Wall Art', 'Minimalism', 'Vintage', 'Modern'] },
  { name: 'Gardening', subNiches: ['Vegetable Gardening', 'Flower Gardening', 'Indoor Plants', 'Landscaping', 'Organic Gardening', 'Hydroponics', 'Permaculture', 'Urban Gardening'] },
  { name: 'DIY', subNiches: ['Home Improvement', 'Crafts', 'Woodworking', 'Electronics', 'Auto Repair', 'Furniture Building', 'Home Automation', 'Upcycling'] },
  { name: 'Lifestyle', subNiches: ['Minimalism', 'Organization', 'Productivity', 'Self-Improvement', 'Relationships', 'Dating', 'Marriage', 'Retirement'] },
  { name: 'Spirituality', subNiches: ['Meditation', 'Yoga', 'Mindfulness', 'Astrology', 'Tarot', 'Energy Healing', 'Buddhism', 'Christianity'] },
  { name: 'Environment', subNiches: ['Sustainability', 'Zero Waste', 'Renewable Energy', 'Climate Change', 'Conservation', 'Eco-Friendly Products', 'Green Living', 'Recycling'] },
  { name: 'News & Media', subNiches: ['Journalism', 'Podcasting', 'Blogging', 'Video Production', 'Social Media', 'Public Relations', 'Broadcasting', 'Publishing'] },
  { name: 'Nonprofit', subNiches: ['Charity', 'Fundraising', 'Volunteering', 'Advocacy', 'Social Justice', 'Community Development', 'Humanitarian Aid', 'Environmental'] },
  { name: 'Science', subNiches: ['Biology', 'Chemistry', 'Physics', 'Astronomy', 'Environmental Science', 'Research', 'Lab Equipment', 'Science Education'] },
  { name: 'Agriculture', subNiches: ['Farming', 'Livestock', 'Crop Production', 'Organic Farming', 'Agricultural Technology', 'Farm Equipment', 'Agribusiness', 'Sustainable Agriculture'] },
  { name: 'Manufacturing', subNiches: ['Product Design', 'Quality Control', 'Supply Chain', 'Automation', 'Industrial Equipment', ' 3D Printing', 'Assembly', 'Packaging'] },
  { name: 'Logistics', subNiches: ['Shipping', 'Warehousing', 'Transportation', 'Freight', 'Last Mile Delivery', 'Supply Chain Management', 'Inventory', 'Distribution'] },
  { name: 'Human Resources', subNiches: ['Recruitment', 'Training', 'Employee Benefits', 'Payroll', 'Performance Management', 'Compliance', 'Workplace Culture', 'HR Technology'] },
  { name: 'Customer Service', subNiches: ['Call Centers', 'Help Desk', 'Live Chat', 'Customer Success', 'Support Software', 'Training', 'Quality Assurance', 'Customer Experience'] },
  { name: 'Security', subNiches: ['Cybersecurity', 'Physical Security', 'Home Security', 'Private Investigation', 'Security Consulting', 'Surveillance', 'Access Control', 'Security Training'] },
  { name: 'Insurance', subNiches: ['Life Insurance', 'Health Insurance', 'Auto Insurance', 'Home Insurance', 'Business Insurance', 'Travel Insurance', 'Pet Insurance', 'Insurance Brokerage'] },
  { name: 'Retail', subNiches: ['Brick and Mortar', 'Online Retail', 'Pop-up Shops', 'Wholesale', 'Luxury Retail', 'Discount Retail', 'Department Stores', 'Specialty Stores'] },
  { name: 'Writing', subNiches: ['Copywriting', 'Content Writing', 'Technical Writing', 'Creative Writing', 'Ghostwriting', 'Screenwriting', 'Grant Writing', 'Resume Writing'] },
  { name: 'Consulting', subNiches: ['Business Consulting', 'Management Consulting', 'IT Consulting', 'Marketing Consulting', 'HR Consulting', 'Financial Consulting', 'Strategy Consulting', 'Operations Consulting'] },
  { name: 'Coaching', subNiches: ['Life Coaching', 'Business Coaching', 'Career Coaching', 'Health Coaching', 'Relationship Coaching', 'Executive Coaching', 'Sports Coaching', 'Financial Coaching'] },
  { name: 'Events', subNiches: ['Wedding Planning', 'Corporate Events', 'Concerts', 'Conferences', 'Trade Shows', 'Festivals', 'Private Parties', 'Virtual Events'] },
  { name: 'Dental', subNiches: ['General Dentistry', 'Orthodontics', 'Cosmetic Dentistry', 'Periodontics', 'Oral Surgery', 'Pediatric Dentistry', 'Prosthodontics', 'Dental Hygiene'] },
  { name: 'Medical', subNiches: ['Primary Care', 'Specialty Medicine', 'Surgery', 'Diagnostic Services', 'Urgent Care', 'Telemedicine', 'Medical Devices', 'Pharmaceuticals'] },
  { name: 'Aviation', subNiches: ['Airlines', 'Private Jets', 'Flight Training', 'Aircraft Maintenance', 'Aviation Technology', 'Drones', 'Aerospace', 'Airport Services'] },
  { name: 'Marine', subNiches: ['Boating', 'Fishing', 'Sailing', 'Marine Equipment', 'Boat Repair', 'Yacht Charter', 'Marine Biology', 'Ocean Conservation'] },
  { name: 'Energy', subNiches: ['Solar Power', 'Wind Energy', 'Oil & Gas', 'Nuclear Energy', 'Energy Efficiency', 'Battery Technology', 'Energy Storage', 'Smart Grid'] },
  { name: 'Telecommunications', subNiches: ['Mobile Networks', 'Internet Service', 'VoIP', 'Satellite Communications', 'Network Infrastructure', 'Telecom Equipment', '5G Technology', 'Unified Communications'] },
  { name: 'Furniture', subNiches: ['Office Furniture', 'Home Furniture', 'Outdoor Furniture', 'Custom Furniture', 'Vintage Furniture', 'Modern Furniture', 'Ergonomic Furniture', 'Kids Furniture'] },
  { name: 'Jewelry', subNiches: ['Fine Jewelry', 'Fashion Jewelry', 'Custom Jewelry', 'Engagement Rings', 'Watches', 'Jewelry Repair', 'Estate Jewelry', 'Handmade Jewelry'] },
  { name: 'Watches', subNiches: ['Luxury Watches', 'Smart Watches', 'Vintage Watches', 'Sports Watches', 'Watch Repair', 'Watch Collecting', 'Custom Watches', 'Watch Accessories'] },
  { name: 'Toys', subNiches: ['Educational Toys', 'Action Figures', 'Dolls', 'Board Games', 'Outdoor Toys', 'Baby Toys', 'Collectibles', 'Electronic Toys'] },
  { name: 'Books', subNiches: ['Fiction', 'Non-Fiction', 'Self-Help', 'Biography', 'Children\'s Books', 'Audiobooks', 'E-books', 'Rare Books'] },
  { name: 'Movies & TV', subNiches: ['Film Production', 'Streaming Services', 'Movie Reviews', 'TV Shows', 'Documentaries', 'Animation', 'Independent Film', 'Film Distribution'] },
  { name: 'Software', subNiches: ['SaaS', 'Mobile Apps', 'Enterprise Software', 'CRM', 'Project Management', 'Accounting Software', 'Design Software', 'Gaming Software'] },
  { name: 'Hardware', subNiches: ['Computers', 'Smartphones', 'Tablets', 'Wearables', 'Gaming Consoles', 'Networking Equipment', 'Peripherals', 'Components'] },
  { name: 'Office Supplies', subNiches: ['Stationery', 'Office Furniture', 'Printing Services', 'Office Equipment', 'Packaging Supplies', 'Cleaning Supplies', 'Breakroom Supplies', 'Technology'] },
  { name: 'Printing', subNiches: ['Digital Printing', 'Offset Printing', 'Large Format Printing', 'Screen Printing', '3D Printing', 'Print Design', 'Commercial Printing', 'Custom Printing'] },
  { name: 'Packaging', subNiches: ['Product Packaging', 'Food Packaging', 'Eco-Friendly Packaging', 'Custom Boxes', 'Shipping Supplies', 'Packaging Design', 'Labels', 'Protective Packaging'] },
  { name: 'Textiles', subNiches: ['Fabrics', 'Clothing Manufacturing', 'Textile Design', 'Upholstery', 'Home Textiles', 'Technical Textiles', 'Sustainable Textiles', 'Textile Printing'] },
  { name: 'Cleaning', subNiches: ['Residential Cleaning', 'Commercial Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Pressure Washing', 'Green Cleaning', 'Janitorial Services', 'Specialty Cleaning'] },
  { name: 'Moving', subNiches: ['Residential Moving', 'Commercial Moving', 'Long Distance Moving', 'Local Moving', 'International Moving', 'Packing Services', 'Storage', 'Moving Supplies'] },
  { name: 'Storage', subNiches: ['Self Storage', 'Climate Controlled Storage', 'Vehicle Storage', 'Business Storage', 'Document Storage', 'Portable Storage', 'Storage Units', 'Moving Storage'] },
  { name: 'Waste Management', subNiches: ['Recycling', 'Trash Collection', 'Hazardous Waste', 'Composting', 'E-Waste', 'Industrial Waste', 'Medical Waste', 'Waste Consulting'] },
  { name: 'Vending', subNiches: ['Snack Vending', 'Beverage Vending', 'Healthy Vending', 'Coffee Vending', 'Vending Machine Sales', 'Micro Markets', 'Specialty Vending', 'Vending Route Management'] },
  { name: 'Franchising', subNiches: ['Restaurant Franchises', 'Service Franchises', 'Retail Franchises', 'Franchise Consulting', 'Franchise Development', 'Franchise Marketing', 'Franchise Legal', 'Franchise Financing'] },
  { name: 'Import/Export', subNiches: ['International Trade', 'Customs Brokerage', 'Freight Forwarding', 'Import/Export Consulting', 'Trade Compliance', 'Global Sourcing', 'Trade Finance', 'Export Management'] },
  { name: 'Wholesale', subNiches: ['Wholesale Distribution', 'B2B Sales', 'Bulk Products', 'Dropship Wholesale', 'Wholesale Marketplace', 'Wholesale Suppliers', 'Trade Shows', 'Wholesale Technology'] },
  { name: 'Auction', subNiches: ['Online Auctions', 'Estate Auctions', 'Auto Auctions', 'Art Auctions', 'Liquidation Auctions', 'Charity Auctions', 'Real Estate Auctions', 'Auction Software'] },
  { name: 'Collectibles', subNiches: ['Coins', 'Stamps', 'Trading Cards', 'Antiques', 'Memorabilia', 'Vintage Items', 'Comic Books', 'Sports Collectibles'] },
  { name: 'Rental', subNiches: ['Equipment Rental', 'Party Rentals', 'Tool Rental', 'Vehicle Rental', 'Property Rental', 'Event Rentals', 'Vacation Rentals', 'Construction Equipment'] },
  { name: 'Repair Services', subNiches: ['Electronics Repair', 'Appliance Repair', 'Computer Repair', 'Phone Repair', 'Jewelry Repair', 'Watch Repair', 'Shoe Repair', 'Furniture Repair'] },
  { name: 'Subscription Services', subNiches: ['Meal Kits', 'Beauty Boxes', 'Book Clubs', 'Streaming Services', 'Software Subscriptions', 'Coffee Subscriptions', 'Clothing Rentals', 'Digital Content'] },
  { name: 'Membership', subNiches: ['Gyms', 'Country Clubs', 'Professional Organizations', 'Online Communities', 'Loyalty Programs', 'Warehouse Clubs', 'Private Clubs', 'Alumni Associations'] },
  { name: 'Crowdfunding', subNiches: ['Kickstarter', 'Indiegogo', 'GoFundMe', 'Equity Crowdfunding', 'Real Estate Crowdfunding', 'Crowdfunding Consulting', 'Campaign Marketing', 'Reward-Based Crowdfunding'] },
  { name: 'Cryptocurrency', subNiches: ['Bitcoin', 'Ethereum', 'NFTs', 'DeFi', 'Crypto Trading', 'Blockchain Development', 'Crypto Mining', 'Crypto Wallets'] },
  { name: 'Virtual Reality', subNiches: ['VR Gaming', 'VR Training', 'VR Entertainment', 'VR Healthcare', 'VR Real Estate', 'VR Development', 'VR Hardware', 'VR Content Creation'] },
  { name: 'Augmented Reality', subNiches: ['AR Apps', 'AR Gaming', 'AR Marketing', 'AR Retail', 'AR Education', 'AR Development', 'AR Hardware', 'AR Navigation'] },
  { name: 'Artificial Intelligence', subNiches: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'AI Chatbots', 'AI Consulting', 'AI Research', 'AI Ethics', 'AI in Healthcare'] },
  { name: 'Internet of Things', subNiches: ['Smart Home', 'Wearables', 'Industrial IoT', 'IoT Security', 'IoT Development', 'Connected Cars', 'Smart Cities', 'IoT Analytics'] },
  { name: 'Robotics', subNiches: ['Industrial Robots', 'Service Robots', 'Educational Robots', 'Medical Robots', 'Agricultural Robots', 'Robotics Development', 'Robot Components', 'Autonomous Systems'] },
  { name: 'Drones', subNiches: ['Aerial Photography', 'Drone Racing', 'Agricultural Drones', 'Delivery Drones', 'Drone Services', 'Drone Manufacturing', 'Drone Training', 'Drone Regulations'] },
  { name: 'Space', subNiches: ['Space Tourism', 'Satellite Services', 'Space Research', 'Aerospace Engineering', 'Space Technology', 'Astronomy', 'Space Education', 'Commercial Spaceflight'] },
  { name: 'Biotechnology', subNiches: ['Genetic Engineering', 'Biopharmaceuticals', 'Agricultural Biotech', 'Industrial Biotech', 'Medical Biotech', 'Bioinformatics', 'Biosensors', 'Biotech Research'] },
  { name: 'Nanotechnology', subNiches: ['Nanomaterials', 'Nanoelectronics', 'Nanomedicine', 'Nano Manufacturing', 'Nano Research', 'Carbon Nanotubes', 'Quantum Dots', 'Nano Sensors'] },
  { name: 'Green Technology', subNiches: ['Clean Energy', 'Electric Vehicles', 'Green Building', 'Sustainable Materials', 'Carbon Capture', 'Water Purification', 'Waste to Energy', 'Green Tech Consulting'] },
  { name: 'Senior Care', subNiches: ['Assisted Living', 'Home Care', 'Memory Care', 'Senior Transportation', 'Elder Law', 'Senior Activities', 'Hospice Care', 'Geriatric Care Management'] }
];

export default function CreateProfile({ onComplete, onBack, user }) {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    niche: '',
    subNiche: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'niche') {
        updated.subNiche = '';
      }
      return updated;
    });
  };

  async function saveProfileToFirestore(user, profileData) {
    if (!user || !user.uid) {
      throw new Error("No user ID found.");
    }
    // Save under users/{uid}/profile/main
    await setDoc(doc(db, "users", user.uid, "profile", "main"), profileData);
  }

 const handleSubmit = async e => {
  e.preventDefault();
  
  // Add this user check at the very start
  if (!user || !user.uid) {
    setError('No user session found. Please sign in first.');
    return;
  }
  
  if (!form.name || !form.brand || !form.niche || !form.subNiche) {
    setError('Please fill in all fields.');
    return;
  }
  
  setError('');
  setLoading(true);
  
  try {
    const profileData = {
      name: form.name,
      brand: form.brand,
      niche: form.niche,
      subNiche: form.subNiche,
      profilePicUrl: "",
      updatedAt: new Date().toISOString()
    };
    
    // Save to Firestore
    await saveProfileToFirestore(user, profileData);
    
    // Also store in localStorage for quick access
    if (user && user.email) {
      const profileKey = `nanoBananaProfile_${user.email}`;
      localStorage.setItem(profileKey, JSON.stringify(profileData));
    }
    
    setLoading(false);
    if (onComplete) onComplete(profileData);
  } catch (err) {
    setLoading(false);
    setError(err.message || "Failed to save profile. Please try again.");
  }
};

  const currentNiche = niches.find(n => n.name === form.niche);
  const progressPercent = !form.niche ? 0 : !form.subNiche ? 50 : 100;

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: '2px solid rgba(255,224,102,0.2)',
    borderRadius: 10,
    color: '#e9d5ff',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 8,
    color: '#b6e880',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.5
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffe066' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
  };

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
      <div style={{
        background: 'rgba(30,32,38,0.95)',
        borderRadius: 24,
        boxShadow: '0 8px 40px rgba(255,224,102,0.25)',
        padding: '48px 40px',
        maxWidth: 520,
        width: '100%',
        border: '2px solid rgba(255,224,102,0.3)',
        backdropFilter: 'blur(20px)',
      }}>
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
            <FaUserPlus size={36} color="#23272f" />
          </div>
          <h2 style={{ 
            margin: 0, 
            color: '#ffe066', 
            fontSize: 32, 
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(255,224,102,0.3)',
            marginBottom: 8
          }}>
            Create Your Profile
          </h2>
          <div style={{ color: '#e9d5ff', fontSize: 14, opacity: 0.8 }}>
            Set up your profile to get started
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>
              <FaUser style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = '#ffe066';
                e.target.style.boxShadow = '0 0 0 3px rgba(255,224,102,0.15)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,224,102,0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>
              <FaBriefcase style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Brand Name
            </label>
            <input
              type="text"
              name="brand"
              placeholder="Enter your brand name"
              value={form.brand}
              onChange={handleChange}
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = '#ffe066';
                e.target.style.boxShadow = '0 0 0 3px rgba(255,224,102,0.15)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,224,102,0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>
              <FaBullseye style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Select Niche
            </label>
            <select
              name="niche"
              value={form.niche}
              onChange={handleChange}
              style={selectStyle}
              onFocus={e => {
                e.target.style.borderColor = '#ffe066';
                e.target.style.boxShadow = '0 0 0 3px rgba(255,224,102,0.15)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,224,102,0.2)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="" style={{ background: '#100e12ff', color: '#999' }}>-- Choose a Niche --</option>
              {niches.map(n => (
                <option key={n.name} value={n.name} style={{ background: '#100e12ff', color: '#e9d5ff' }}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          {currentNiche && (
            <div style={{ marginBottom: 20, animation: 'slideIn 0.3s ease-out' }}>
              <label style={labelStyle}>
                <FaCheck style={{ marginRight: 8, verticalAlign: 'middle' }} />
                Select Sub-Niche
              </label>
              <select
                name="subNiche"
                value={form.subNiche}
                onChange={handleChange}
                style={selectStyle}
                onFocus={e => {
                  e.target.style.borderColor = '#ffe066';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255,224,102,0.15)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,224,102,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="" style={{ background: '#100e12ff', color: '#999' }}>-- Choose a Sub-Niche --</option>
                {currentNiche.subNiches.map(sub => (
                  <option key={sub} value={sub} style={{ background: '#100e12ff', color: '#e9d5ff' }}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              marginBottom: 20,
              animation: 'shake 0.3s',
            }}>
              {error}
            </div>
          )}

          {form.niche && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: 8,
                color: '#b6e880',
                fontSize: 12,
                fontWeight: 600,
              }}>
                <span>Profile Completion</span>
                <span>{progressPercent}%</span>
              </div>
              <div style={{
                width: '100%',
                height: 8,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ffe066 0%, #b6e880 100%)',
                  borderRadius: 8,
                  transition: 'width 0.4s ease',
                  boxShadow: '0 0 10px rgba(255,224,102,0.5)',
                }} />
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: loading 
                ? 'rgba(100,100,100,0.3)'
                : 'linear-gradient(135deg, #ffe066 0%, #ffd700 100%)', 
              color: loading ? '#666' : '#23272f', 
              border: 'none', 
              borderRadius: 12, 
              fontWeight: 700, 
              fontSize: 18, 
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: loading ? 'none' : '0 4px 20px rgba(255,224,102,0.4)',
              transition: 'all 0.3s',
              marginBottom: 12,
              opacity: loading ? 0.5 : 1,
            }}
            onMouseOver={e => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,224,102,0.5)';
              }
            }}
            onMouseOut={e => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,224,102,0.4)';
              }
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 18,
                  height: 18,
                  border: '3px solid #23272f',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
                Saving...
              </>
            ) : (
              <>
                <FaUserPlus size={18} /> Create Profile
              </>
            )}
          </button>

          {onBack && (
            <button 
              type="button"
              onClick={onBack}
              style={{ 
                width: '100%', 
                padding: '16px', 
                background: 'rgba(255,255,255,0.1)', 
                color: '#e9d5ff', 
                border: '2px solid rgba(233,213,255,0.3)', 
                borderRadius: 12, 
                fontWeight: 600, 
                fontSize: 16, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.3s',
              }}
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
              Back
            </button>
          )}
        </form>

        <div style={{
          marginTop: 24,
          padding: '16px',
          background: 'rgba(182,232,128,0.1)',
          border: '1px solid rgba(182,232,128,0.3)',
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <div style={{ color: '#b6e880', fontSize: 13, lineHeight: 1.6 }}>
            <strong>Tip:</strong> Choose a name, brand, and niche that represent you. Select a specific sub-niche for better personalization.
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

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}