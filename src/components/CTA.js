// src/components/CTA.jsx
import React from 'react';
import { Link } from 'react-router';

const CTA = () => {
  return (
    <section className="cta">
      <div className="container">
        <h2>Join the Global Environmental Movement</h2>
        <p>Whether you're a government agency, research institution, NGO, or concerned citizen, your contribution matters.</p>
        <div>
          <Link to="/signup" className="btn btn-light">Create Account</Link>
          <a href="#" className="btn btn-outline">Request Demo</a>
        </div>
      </div>
    </section>
  );
};

export default CTA;