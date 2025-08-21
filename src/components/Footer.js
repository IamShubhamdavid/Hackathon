// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">Eco<span>Harmony</span></div>
            <p>A collaborative platform uniting stakeholders worldwide for climate action, marine conservation, and biodiversity protection.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="footer-links-container">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#impact">Impact</a></li>
              <li><a href="#resources">Resources</a></li>
            </ul>
          </div>
          
          <div className="footer-links-container">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Research Papers</a></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Data Sources</a></li>
              <li><a href="#">Educational Materials</a></li>
              <li><a href="#">Community Forum</a></li>
            </ul>
          </div>
          
          <div className="footer-links-container">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li><i className="fas fa-envelope"></i> info@ecoharmony.org</li>
              <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
              <li><i className="fas fa-map-marker-alt"></i> 123 Sustainability Way, Earth</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 EcoHarmony Collaborative Platform. All rights reserved. | Partnered with UNEP, Global Forest Watch, Ocean Health Index</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;