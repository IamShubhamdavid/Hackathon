// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Collaborative Platform for Climate Harmony </h1>
        <p>Bringing together governments, NGOs, researchers, and communities to create ecological balance</p>
        <div className="hero-btns">
          <Link to="/login" className="btn">Join the Movement</Link>
          <a href="#resources" className="btn btn-outline">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;