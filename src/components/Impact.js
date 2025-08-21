// src/components/Impact.js
import React, { useEffect } from 'react';

const sdgData = [
  {
    id: "sdg-13",
    title: "SDG 13: Climate Action",
    color: "#e5243b",
    description: "Track and reduce carbon emissions, implement climate resilience strategies, and mobilize climate financing.",
    progress: 65
  },
  {
    id: "sdg-14",
    title: "SDG 14: Life Below Water",
    color: "#0a97d9",
    description: "Monitor marine pollution, protect coastal ecosystems, and promote sustainable fishing practices.",
    progress: 42
  },
  {
    id: "sdg-15",
    title: "SDG 15: Life on Land",
    color: "#56c02b",
    description: "Combat desertification, halt biodiversity loss, and promote sustainable forest management.",
    progress: 58
  }
];

const Impact = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.width;
        }
      });
    }, { threshold: 0.5 });
    
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
    
    return () => {
      progressBars.forEach(bar => {
        observer.unobserve(bar);
      });
    };
  }, []);
  
  return (
    <section id="impact" className="impact">
      <div className="container">
        <div className="section-title">
          <h2>Tracking Global Impact</h2>
          <p>Measuring progress towards Sustainable Development Goals</p>
        </div>
        
        <div className="sdg-cards">
          {sdgData.map(sdg => (
            <div key={sdg.id} className={`sdg-card ${sdg.id}`}>
              <div className="sdg-header" style={{ background: sdg.color }}>
                <h3>{sdg.title}</h3>
              </div>
              <div className="sdg-body">
                <p>{sdg.description}</p>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${sdg.progress}%` }}
                  >
                    {sdg.progress}% of target
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;