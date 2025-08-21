// src/components/CollaborationPortal.jsx
import React, { useState } from 'react';

const CollaborationPortal = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projectFilter, setProjectFilter] = useState('all');

  // Famous environmental collaborations
  const majorCollaborations = [
    {
      id: 1,
      name: "The Great Green Wall Initiative",
      description: "African-led movement to grow an 8,000km natural wonder across the entire width of Africa to combat desertification.",
      partners: ["African Union", "World Bank", "UNCCD", "Multiple African nations"],
      impact: "20 million hectares restored, 350,000 jobs created",
      year: 2007,
      region: "Africa",
      link: "https://www.greatgreenwall.org/"
    },
    {
      id: 2,
      name: "Global Coral Reef Monitoring Network",
      description: "International collaboration for the protection and management of coral reefs worldwide.",
      partners: ["UNEP", "IUCN", "WWF", "NOAA", "40+ research institutions"],
      impact: "Standardized monitoring of 73% of the world's coral reefs",
      year: 1995,
      region: "Global",
      link: "https://gcrmn.net/"
    },
    {
      id: 3,
      name: "The Bonn Challenge",
      description: "Global effort to restore 350 million hectares of degraded and deforested landscapes by 2030.",
      partners: ["Germany", "IUCN", "World Resources Institute", "64 national governments"],
      impact: "210 million hectares pledged for restoration",
      year: 2011,
      region: "Global",
      link: "https://www.bonnchallenge.org/"
    },
    {
      id: 4,
      name: "Plastic Pact Network",
      description: "A network of national initiatives bringing together governments, businesses, and citizens to tackle plastic waste.",
      partners: ["Ellen MacArthur Foundation", "UN Environment Programme", "Multiple governments and corporations"],
      impact: "1000+ organizations committed to circular economy for plastics",
      year: 2018,
      region: "Global",
      link: "https://ellenmacarthurfoundation.org/our-work/activities/new-plastics-economy/plastics-pact"
    }
  ];

  // Sample projects (in a real app, this would come from an API)
  const projects = [
    {
      id: 1,
      title: "Amazon Reforestation Initiative",
      description: "Restoring degraded lands in the Brazilian Amazon through native species reforestation",
      partners: ["Brazilian Ministry of Environment", "WWF Brazil", "Local Indigenous Communities"],
      funding: "$15M",
      status: "active",
      progress: 65,
      category: "reforestation",
      region: "South America"
    },
    {
      id: 2,
      title: "Urban Air Quality Monitoring Network  ",
      description: "Deploying low-cost air quality sensors in 10 major Asian cities to track pollution sources",
      partners: ["Asian Development Bank", "UNEP", "Local Universities"],
      funding: "$8.2M",
      status: "  planning",
      progress: 20,
      category: "pollution",
      region: "Asia"
    },
    {
      id: 3,
      title: "Mediterranean Marine Protected Areas",
      description: "Establishing a network of protected marine areas to preserve biodiversity in the Mediterranean Sea",
      partners: ["EU Commission", "Mediterranean Countries", "Oceana", "Local Fishing Communities"],
      funding: "$22M",
      status: "active",
      progress: 45,
      category: "marine",
      region: "Europe"
    },
    {
      id: 4,
      title: "African Solar Electrification Project",
      description: "Bringing solar power to 500 remote villages in Sub-Saharan Africa",
      partners: ["African Development Bank", "UNDP", "Tesla", "Local Governments"],
      funding: "$45M",
      status: "completed",
      progress: 100,
      category: "energy",
      region: "Africa"
    }
  ];

  // Funding opportunities
  const fundingOpportunities = [
    {
      id: 1,
      title: "Climate Innovation Grant",
      provider: "Global Environment Facility",
      amount: "$50,000 - $500,000",
      deadline: "2023-12-15",
      focus: "Renewable energy solutions for developing countries"
    },
    {
      id: 2,
      title: "Marine Conservation Fund",
      provider: "Ocean Conservancy",
      amount: "Up to $250,000",
      deadline: "2024-02-28",
      focus: "Coral reef restoration and protection"
    },
    {
      id: 3,
      title: "Community Resilience Award",
      provider: "Rockefeller Foundation",
      amount: "$100,000 - $1M",
      deadline: "2023-11-30",
      focus: "Climate adaptation projects in vulnerable communities"
    }
  ];

  // Stakeholder directory
  const stakeholders = [
    {
      id: 1,
      name: "World Wildlife Fund (WWF)",
      type: "NGO",
      expertise: "Biodiversity conservation, sustainable development",
      projects: 120,
      joined: 2015
    },
    {
      id: 2,
      name: "Stanford Sustainability Initiative",
      type: "Academic",
      expertise: "Climate research, environmental technology",
      projects: 45,
      joined: 2018
    },
    {
      id: 3,
      name: "Ministry of Environment, Japan",
      type: "Government",
      expertise: "Environmental policy, pollution control",
      projects: 68,
      joined: 2016
    },
    {
      id: 4,
      name: "GreenTech Solutions",
      type: "Private Sector",
      expertise: "Renewable energy, carbon capture",
      projects: 32,
      joined: 2020
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === projectFilter);

  return (
    <section id="collaboration" className="collaboration-portal" style={{ padding: '100px 0', background: '#f0f7ff' }}>
      <div className="container">
        <div className="section-title">
          <h2>Multi-Stakeholder Collaboration Portal</h2>
          <p>Connecting governments, NGOs, researchers, and communities to co-create environmental solutions</p>
        </div>

        <div className="portal-tabs" style={{ marginBottom: '30px' }}>
          <div className="tabs-header" style={{ 
            display: 'flex', 
            borderBottom: '2px solid #ddd',
            marginBottom: '30px'
          }}>
            {['projects', 'collaborations', 'funding', 'directory'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '15px 30px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  position: 'relative',
                  textTransform: 'capitalize',
                  color: activeTab === tab ? 'var(--primary)' : '#555'
                }}
              >
                {tab}
                {activeTab === tab && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '0',
                    width: '100%',
                    height: '3px',
                    background: 'var(--primary)'
                  }}></div>
                )}
              </button>
            ))}
          </div>

          <div className="tabs-content">
            {activeTab === 'projects' && (
              <div className="projects-tab">
                <div className="projects-header" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '30px',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <h3 style={{ color: 'var(--primary)' }}>Environmental Projects</h3>
                  
                  <div className="filters" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <select 
                      value={projectFilter} 
                      onChange={(e) => setProjectFilter(e.target.value)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '30px',
                        border: '1px solid #ddd',
                        background: 'white',
                        minWidth: '200px'
                      }}
                    >
                      <option value="all">All Categories</option>
                      <option value="reforestation">Reforestation</option>
                      <option value="marine">Marine Conservation</option>
                      <option value="pollution">Pollution Control</option>
                      <option value="energy">Renewable Energy</option>
                      <option value="biodiversity">Biodiversity</option>
                    </select>
                    
                    <button className="btn" style={{ padding: '10px 25px' }}>
                      <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                      Propose New Project
                    </button>
                  </div>
                </div>
                
                <div className="projects-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                  gap: '30px'
                }}>
                  {filteredProjects.map(project => (
                    <div key={project.id} className="project-card" style={{
                      background: 'white',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div className="project-header" style={{
                        padding: '40px',
                        borderBottom: '3px solid #eee',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          right: '15px',
                          background: project.status === '  active ' ? 'rgba(58, 155, 124, 0.1)' : 
                                    project.status === 'completed' ? 'rgba(41, 128, 185, 0.1)' : 'rgba(241, 196, 15, 0.1)',
                          color: project.status === 'active' ? 'var(--secondary)' : 
                                 project.status === 'completed' ? '#2980b9' : '#f1c40f',
                          padding: '5px 15px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '1000'
                        }}>
                          {project.status}
                        </span>
                        <h4 style={{ marginBottom: '10px' }}>{project.title}</h4>
                        <p style={{ color: '#666' }}>{project.description}</p>
                      </div>
                      
                      <div className="project-body" style={{ padding: '25px' }}>
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>Progress:</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div style={{ 
                            height: '10px', 
                            background: '#e9ecef', 
                            borderRadius: '5px',
                            overflow: 'hidden'
                          }}>
                            <div style={{ 
                              height: '100%', 
                              width: `${project.progress}%`, 
                              background: 'var(--secondary)',
                              borderRadius: '5px'
                            }}></div>
                          </div>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                            <i className="fas fa-users" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                            <span>Partners: {project.partners.slice(0, 2).join(', ')} +{project.partners.length - 2} more</span>
                          </div>
                          <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                            <span>Region: {project.region}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <i className="fas fa-dollar-sign" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                            <span>Funding: {project.funding}</span>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <button className="btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                            <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
                            Details
                          </button>
                          <button className="btn btn-outline" style={{ 
                            padding: '8px 20px', 
                            fontSize: '0.9rem',
                            borderColor: 'var(--primary)',
                            color: 'var(--primary)'
                          }}>
                            <i className="fas fa-handshake" style={{ marginRight: '8px' }}></i>
                            Join Project
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'collaborations' && (
              <div className="collaborations-tab">
                <h3 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Major Environmental Collaborations</h3>
                
                <div className="collaborations-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', 
                  gap: '30px'
                }}>
                  {majorCollaborations.map(collab => (
                    <div key={collab.id} className="collab-card" style={{
                      background: 'white',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      <div className="collab-header" style={{
                        background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        color: 'white',
                        padding: '25px'
                      }}>
                        <h4 style={{ marginBottom: '10px' }}>{collab.name}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{collab.year} • {collab.region}</span>
                          <span>⭐ Major Collaboration</span>
                        </div>
                      </div>
                      
                      <div className="collab-body" style={{ padding: '25px', flex: '1' }}>
                        <p style={{ marginBottom: '20px' }}>{collab.description}</p>
                        
                        <div style={{ marginBottom: '20px' }}>
                          <h5 style={{ marginBottom: '10px', color: 'var(--dark)' }}>Key Partners:</h5>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {collab.partners.map((partner, index) => (
                              <span key={index} style={{
                                background: 'rgba(26, 107, 138, 0.1)',
                                color: 'var(--primary)',
                                padding: '5px 15px',
                                borderRadius: '20px',
                                fontSize: '0.9rem'
                              }}>
                                {partner}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                          <h5 style={{ marginBottom: '10px', color: 'var(--dark)' }}>Impact:</h5>
                          <p>{collab.impact}</p>
                        </div>
                      </div>
                      
                      <div className="collab-footer" style={{ 
                        padding: '20px 25px', 
                        background: '#f8f9fa',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <a 
                          href={collab.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--primary)',
                            textDecoration: 'none',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <i className="fas fa-external-link-alt"></i>
                          Learn more about this initiative
                        </a>
                        <button className="btn" style={{ padding: '8px 20px' }}>
                          <i className="fas fa-share-alt" style={{ marginRight: '8px' }}></i>
                          Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  marginTop: '50px', 
                  background: 'white', 
                  borderRadius: '15px', 
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}>
                  <h4 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Start Your Own Collaboration</h4>
                  <p style={{ marginBottom: '25px' }}>
                    EcoHarmony provides tools to initiate and manage multi-stakeholder environmental projects:
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'rgba(58, 155, 124, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '24px',
                        color: 'var(--secondary)'
                      }}>
                        <i className="fas fa-lightbulb"></i>
                      </div>
                      <h5>Project Ideation</h5>
                      <p>Develop project concepts with our collaboration canvas</p>
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'rgba(26, 107, 138, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '24px',
                        color: 'var(--primary)'
                      }}>
                        <i className="fas fa-handshake"></i>
                      </div>
                      <h5>Partner Matching</h5>
                      <p>Connect with relevant stakeholders for your initiative</p>
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'rgba(255, 154, 118, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '24px',
                        color: 'var(--accent)'
                      }}>
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <h5>Impact Tracking</h5>
                      <p>Monitor progress with our dashboard and reporting tools</p>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button className="btn" style={{ padding: '12px 40px', fontSize: '1.1rem' }}>
                      <i className="fas fa-rocket" style={{ marginRight: '10px' }}></i>
                      Launch New Collaboration
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'funding' && (
              <div className="funding-tab">
                <h3 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Funding Opportunities</h3>
                
                <div className="funding-opportunities" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
                  gap: '30px',
                  marginBottom: '50px'
                }}>
                  {fundingOpportunities.map(opportunity => (
                    <div key={opportunity.id} className="funding-card" style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '30px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      borderLeft: '4px solid var(--secondary)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <h4 style={{ color: 'var(--primary)' }}>{opportunity.title}</h4>
                        <span style={{
                          background: 'rgba(58, 155, 124, 0.1)',
                          color: 'var(--secondary)',
                          padding: '3px 12px',
                          borderRadius: '20px',
                          fontSize: '0.9rem'
                        }}>
                          {opportunity.amount}
                        </span>
                      </div>
                      
                      <p style={{ marginBottom: '20px', color: '#555' }}>{opportunity.focus}</p>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '15px',
                        borderTop: '1px solid #eee'
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <i className="fas fa-building" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                            <span>{opportunity.provider}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <i className="fas fa-calendar-alt" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                            <span>Deadline: {opportunity.deadline}</span>
                          </div>
                        </div>
                        
                        <button className="btn" style={{ padding: '8px 20px' }}>
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                  <h4 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Crowdfunding for Environmental Projects</h4>
                  <p style={{ marginBottom: '25px' }}>
                  EcoHarmony enables communities to fund local environmental initiatives through our crowdfunding platform. 
                  Support projects directly or create your own fundraising campaign.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ 
                        background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        color: 'white',
                        padding: '25px',
                        borderRadius: '15px',
                        height: '100%'
                      }}>
                        <h5 style={{ marginBottom: '15px' }}>For Project Creators</h5>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li style={{ marginBottom: '10px' }}>Create compelling campaign pages</li>
                          <li style={{ marginBottom: '10px' }}>Set funding goals and timelines</li>
                          <li style={{ marginBottom: '10px' }}>Offer rewards to backers</li>
                          <li>Track contributions in real-time</li>
                        </ul>
                        <button className="btn btn-light" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.2)' }}>
                          Start a Campaign
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ 
                        background: '#f8f9fa',
                        padding: '25px',
                        borderRadius: '15px',
                        height: '100%'
                      }}>
                        <h5 style={{ marginBottom: '15px', color: 'var(--primary)' }}>For Supporters</h5>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li style={{ marginBottom: '10px' }}>Discover vetted environmental projects</li>
                          <li style={{ marginBottom: '10px' }}>Contribute any amount securely</li>
                          <li style={{ marginBottom: '10px' }}>Receive updates on project progress</li>
                          <li>Earn impact points for your contributions</li>
                        </ul>
                        <button className="btn" style={{ marginTop: '20px' }}>
                          Explore Projects
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'directory' && (
              <div className="directory-tab">
                <h3 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Stakeholder Directory</h3>
                
                <div className="directory-header" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '30px',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input 
                      type="text" 
                      placeholder="Search organizations..." 
                      style={{
                        padding: '12px 20px',
                        borderRadius: '30px',
                        border: '1px solid #ddd',
                        minWidth: '300px'
                      }}
                    />
                    <button className="btn">
                      <i className="fas fa-search" style={{ marginRight: '8px' }}></i>
                      Search
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                      <i className="fas fa-filter" style={{ marginRight: '8px' }}></i>
                      Filters
                    </button>
                    <button className="btn">
                      <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                      Add Your Organization
                    </button>
                  </div>
                </div>
                
                <div className="stakeholders-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                  gap: '30px'
                }}>
                  {stakeholders.map(stakeholder => (
                    <div key={stakeholder.id} className="stakeholder-card" style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '25px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        flexShrink: 0
                      }}>
                        {stakeholder.name.charAt(0)}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '5px' }}>{stakeholder.name}</h4>
                        <div style={{ 
                          display: 'inline-block', 
                          background: stakeholder.type === 'NGO' ? 'rgba(229, 36, 59, 0.1)' : 
                                    stakeholder.type === 'Academic' ? 'rgba(41, 128, 185, 0.1)' : 
                                    stakeholder.type === 'Government' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(155, 89, 182, 0.1)',
                          color: stakeholder.type === 'NGO' ? '#e5243b' : 
                                 stakeholder.type === 'Academic' ? '#2980b9' : 
                                 stakeholder.type === 'Government' ? '#2ecc71' : '#9b59b6',
                          padding: '3px 12px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          marginBottom: '10px'
                        }}>
                          {stakeholder.type}
                        </div>
                        
                        <p style={{ marginBottom: '15px', color: '#555' }}>{stakeholder.expertise}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <i className="fas fa-project-diagram" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
                            {stakeholder.projects} projects
                          </div>
                          <button className="btn" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationPortal;