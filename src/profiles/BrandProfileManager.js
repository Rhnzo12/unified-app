import React, { useState } from 'react';
import { FaUser, FaBriefcase, FaTags, FaSitemap, FaArrowLeft, FaUserPlus, FaUpload, FaCheck } from 'react-icons/fa';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config"; // adjust the path if needed

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
  { name: 'Telecommunications', subNiches: ['Cell Phone Repair', 'Phone Accessories', 'Internet Service', 'Cable TV', 'VoIP Services', 'Network Setup', 'Tech Support', 'Business Phone Systems'] },
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

export default function BrandProfileManager({ onComplete, user, onBack }) {
  const [profile, setProfile] = useState({
    name: '',
    brand: '',
    niche: '',
    subNiche: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Create subNicheOptions object from niches array
  const subNicheOptions = niches.reduce((acc, item) => {
    acc[item.name] = item.subNiches;
    return acc;
  }, {});

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  }

  function handleProfilePic(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  }

  async function saveProfileToFirestore(user, profile, profilePicUrl = "") {
    if (!user || !user.uid) {
      throw new Error("No user ID found.");
    }
    // Prepare the data to save
    const data = {
      name: profile.name,
      brand: profile.brand,
      niche: profile.niche,
      subNiche: profile.subNiche,
      profilePicUrl: profilePicUrl || "", // URL if you upload to storage, else empty
      updatedAt: new Date().toISOString()
    };
    // Save under users/{uid}/profile/main
    await setDoc(doc(db, "users", user.uid, "profile", "main"), data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // If you have a profilePic file, upload it to Firebase Storage and get the URL
      let profilePicUrl = "";
      if (profilePic) {
        // ...upload logic here, then set profilePicUrl to the download URL...
      }
      await saveProfileToFirestore(user, profile, profilePicUrl);
      setSaving(false);
      setSaved(true);
      if (onComplete) onComplete(profile);
    } catch (err) {
      setSaving(false);
      alert(err.message || "Failed to save profile.");
    }
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
        <FaArrowLeft style={{ marginRight: 8 }} />
        Back
      </button>
      <div 
        style={{
          background: 'rgba(30,32,38,0.95)',
          borderRadius: 24,
          boxShadow: '0 8px 40px rgba(255,224,102,0.25)',
          padding: '48px 40px',
          maxWidth: 480,
          width: '100%',
          border: '2px solid rgba(255,224,102,0.3)',
          backdropFilter: 'blur(20px)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
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
            Create Brand Profile
          </h2>
          <div style={{ color: '#e9d5ff', fontSize: 14, opacity: 0.8 }}>
            Set up your brand identity and preferences
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#b6e880', fontWeight: 600, marginBottom: 8, display: 'block' }}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={profile.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,224,102,0.2)',
                borderRadius: 10,
                color: '#e9d5ff',
                fontSize: 16,
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: 16
              }}
            />

            <label style={{ color: '#b6e880', fontWeight: 600, marginBottom: 8, display: 'block' }}>Brand Name</label>
            <input
              type="text"
              name="brand"
              placeholder="Brand Name"
              value={profile.brand}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,224,102,0.2)',
                borderRadius: 10,
                color: '#e9d5ff',
                fontSize: 16,
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: 16
              }}
            />

           {/* Niche Dropdown */}
<label style={{ color: '#b6e880', fontWeight: 600, marginBottom: 8, display: 'block' }}>Niche</label>
<select
  name="niche"
  value={profile.niche}
  onChange={e => {
    handleChange(e);
    setProfile(p => ({ ...p, subNiche: "" }));
  }}
  style={{
    width: '100%',
    padding: '12px 16px',
    background: '#100e12ff',
    border: '2px solid rgba(255,224,102,0.2)',
    borderRadius: 10,
    color: '#e9d5ff',
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: 16
  }}
>
  <option value="" style={{ background: '#100e12ff', color: '#e9d5ff' }}>Select Niche</option>
  {Object.keys(subNicheOptions).map(niche =>
    <option key={niche} value={niche} style={{ background: '#100e12ff', color: '#e9d5ff' }}>{niche}</option>
  )}
</select>

{/* Sub-niche Dropdown */}
<label style={{ color: '#b6e880', fontWeight: 600, marginBottom: 8, display: 'block' }}>Sub-niche</label>
<select
  name="subNiche"
  value={profile.subNiche}
  onChange={handleChange}
  style={{
    width: '100%',
    padding: '12px 16px',
    background: '#100e12ff',
    border: '2px solid rgba(255,224,102,0.2)',
    borderRadius: 10,
    color: '#e9d5ff',
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: 16
  }}
>
  <option value="" style={{ background: '#100e12ff', color: '#e9d5ff' }}>Select Sub-niche</option>
  {(subNicheOptions[profile.niche] || []).map(sub =>
    <option key={sub} value={sub} style={{ background: '#100e12ff', color: '#e9d5ff' }}>{sub}</option>
  )}
</select>

            <label style={{ color: '#b6e880', fontWeight: 600, marginBottom: 8, display: 'block' }}>Profile Upload (optional)</label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px',
              background: 'rgba(255,224,102,0.1)',
              border: '2px dashed rgba(255,224,102,0.4)',
              borderRadius: 10,
              color: '#ffe066',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              marginBottom: 16
            }}>
              <FaUpload size={18} />
              <span>Click to upload file</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePic}
                style={{ display: 'none' }}
              />
            </label>
            {profilePicPreview && (
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={profilePicPreview} 
                  alt="Profile preview" 
                  style={{ 
                    maxHeight: 100,
                    maxWidth: '100%',
                    borderRadius: 12, 
                    border: '3px solid #ffe066',
                    boxShadow: '0 4px 16px rgba(255,224,102,0.3)'
                  }} 
                />
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={saving || saved}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: saved 
                ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
                : 'linear-gradient(135deg, #ffe066 0%, #ffd700 100%)', 
              color: '#23272f', 
              border: 'none', 
              borderRadius: 12, 
              fontWeight: 700, 
              fontSize: 18, 
              cursor: saving || saved ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: saved 
                ? '0 4px 20px rgba(76,175,80,0.4)'
                : '0 4px 20px rgba(255,224,102,0.4)',
              transition: 'all 0.3s',
              marginTop: 32,
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saved ? (
              <>
                <FaCheck size={20} /> Profile Saved Successfully!
              </>
            ) : saving ? (
              <>
                <div style={{
                  width: 20,
                  height: 20,
                  border: '3px solid #23272f',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
                Saving...
              </>
            ) : (
              'Save Brand Profile'
            )}
          </button>

          {saved && (
            <div style={{ 
              marginTop: 20,
              padding: '16px',
              background: 'rgba(76,175,80,0.15)',
              border: '2px solid rgba(76,175,80,0.4)',
              borderRadius: 12,
              color: '#4caf50',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 600,
              animation: 'fadeIn 0.3s ease-in',
            }}>
              <FaCheck style={{ marginRight: 8 }} />
              Your brand profile has been saved!
            </div>
          )}
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}