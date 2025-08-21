// src/components/Features.js
import { Colors } from 'chart.js';
import React from 'react';

const featuresData = [
  {
    icon: "fas fa-users",
    title: "Multi-Stakeholder Collaboration",
    description: "A unified platform where governments, academic institutions, NGOs, and local communities co-create, fund, and monitor environmental projects in real-time."
    
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Crowdsourced Data Collection",
    description: "Mobile and web tools for individuals and groups to upload data on deforestation, marine pollution, species sightings, and carbon emissions."
  },
  {
    icon: "fas fa-map-marked-alt",
    title: "Real-Time Dashboards & Maps",
    description: "Interactive visualizations of deforestation hotspots, coral reef health, plastic waste zones, and GHG emissions powered by satellite and IoT data."
  },
  {
    icon: "fas fa-chart-line",
    title: "Sustainability Scorecards",
    description: "Track progress against SDG 13, 14, and 15 goals at local, regional, and national levels with comprehensive impact metrics."
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Education & Engagement",
    description: "Learning modules, climate literacy resources, and gamified challenges to foster citizen participation and environmental awareness."
  },
  {
    icon: "fas fa-database",
    title: "Open Data Integration",
    description: "API connectivity with global databases like UNEP, Global Forest Watch, and Ocean Health Index for comprehensive environmental analysis."
  }
];

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Platform Features</h2>
          <p>EcoHarmony integrates powerful tools for environmental collaboration, data sharing, and impact tracking</p>
        </div>
        
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;