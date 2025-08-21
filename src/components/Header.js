// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/" className="logo-text">Eco<span>Harmony</span></Link>
          </div>
          
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="#features">Features</a>
            <a href="#collaboration">Collaboration</a>
            <a href="#datacollection">DataCollection</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#impact">Impact</a>
            {/* <a href="#scorecards">Scorecards</a> */}
            <a href="#global-data">GlobalData</a>
            <a href="#resources">Resources</a>
            <Link to="/login" className="btn btn-outline">Login</Link>
            {/* <Link to="/signup" className="btn btn-outline">Sign Up</Link> */}
          </div>
          
          <div className="mobile-menu-icon" onClick={toggleMenu}>
            <i className={`fas ${menuOpen ? 'fa-times' : ''}`}></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;