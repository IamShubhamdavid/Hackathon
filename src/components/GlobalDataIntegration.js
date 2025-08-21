// src/components/GlobalDataIntegration.jsx
import React, { useState, useEffect } from 'react';

const GlobalDataIntegration = () => {
  const [activeDatabase, setActiveDatabase] = useState('unep');
  const [sampleData, setSampleData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated API call to fetch sample data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      switch(activeDatabase) {
        case 'unep':
          setSampleData({
            title: "Global Environmental Outlook",
            description: "Comprehensive assessment of the state of the global environment",
            latestReport: "GEO-6 (2019)",
            keyFindings: [
              "Over 90% of people breathe polluted air",
              "Plastic pollution has increased tenfold since 1980",
              "Climate change is accelerating faster than previously anticipated"
            ],
            link: "https://www.unep.org/global-environment-outlook"
          });
          break;
        case 'gfw':
          setSampleData({
            title: "Forest Monitoring Data",
            description: "Real-time global forest change data",
            stats: [
              { label: "Tree Cover Loss (2023)", value: "4.1M ha" },
              { label: "Global Tree Cover", value: "31% of land area" },
              { label: "Primary Forest Loss", value: "4.3M ha (2023)" }
            ],
            mapImage: "https://www.iasgyan.in//ig-uploads/images//Global_forest_watch.png",
            link: "https://www.globalforestwatch.org"
          });
          break;
        case 'ohi':
          setSampleData({
            title: "Ocean Health Assessment",
            description: "Comprehensive evaluation of ocean ecosystems",
            score: 73,
            components: [
              { name: "Biodiversity", score: 81 },
              { name: "Clean Waters", score: 78 },
              { name: "Fisheries", score: 65 },
              { name: "Carbon Storage", score: 94 }
            ],
            link: "https://oceanhealthindex.org"
          });
          break;
        default:
          setSampleData(null);
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeDatabase]);

  return (
    <section id="global-data" className="global-data" style={{ 
      padding: '100px 0', 
      background: 'linear-gradient(to bottom, #1a3a4f, #1a6b8a)',
      color: 'white'
    }}>
      <div className="container">
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'white' }}>Global Environmental Data Integration</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            EcoHarmony connects with leading environmental databases to provide comprehensive insights
          </p>
        </div>
        
        <div className="database-selector" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          gap: '20px',
          margin: '40px 0'
        }}>
          <button 
            className={`database-btn ${activeDatabase === 'unep' ? 'active' : ''}`}
            onClick={() => setActiveDatabase('unep')}
            style={{
              background: activeDatabase === 'unep' ? 'white' : 'transparent',
              color: activeDatabase === 'unep' ? '#1a3a4f' : 'white',
              border: '2px solid white',
              padding: '12px 30px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxRuRzPrFrjSy_tHdhXT1S8vurfDbBTj6vg&s" 
              alt="UNEP" 
              style={{ height: '24px' }} 
            />
            UNEP
          </button>
          
          <button 
            className={`database-btn ${activeDatabase === 'gfw' ? 'active' : ''}`}
            onClick={() => setActiveDatabase('gfw')}
            style={{
              background: activeDatabase === 'gfw' ? 'white' : 'transparent',
              color: activeDatabase === 'gfw' ? '#1a3a4f' : 'white',
              border: '2px solid white',
              padding: '12px 30px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <img 
              src="https://yt3.googleusercontent.com/_5MhaNk0nihXOEgEuhRuTqkb3R-2aZ_mFalaH5bk4yy28ai7GqoWclUxhfDXcFo4719-wkjOMQ=s900-c-k-c0x00ffffff-no-rj" 
              alt="Global Forest Watch" 
              style={{ height: '24px' }} 
            />
            Global Forest Watch
          </button>
          
          <button 
            className={`database-btn ${activeDatabase === 'ohi' ? 'active' : ''}`}
            onClick={() => setActiveDatabase('ohi')}
            style={{
              background: activeDatabase === 'ohi' ? 'white' : 'transparent',
              color: activeDatabase === 'ohi' ? '#1a3a4f' : 'white',
              border: '2px solid white',
              padding: '12px 30px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <img 
              src="https://wateractionhubfrontdoor-d6dwaqhbgwebcfg2.z01.azurefd.net/media/CACHE/images/resources/2020/08/30/15._Ocean_Health_Index/9d0f313a9622236ede0da64b7b0b5c1b.png" 
              alt="Ocean Health Index" 
              style={{ height: '24px' }} 
            />
            Ocean Health Index
          </button>
        </div>
        
        <div className="data-display" style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          color: '#2c3e50',
          minHeight: '400px'
        }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <div className="loading-spinner" style={{
                width: '50px',
                height: '50px',
                border: '5px solid rgba(26, 107, 138, 0.2)',
                borderTop: '5px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : (
            <div className="database-content">
              {activeDatabase === 'unep' && sampleData && (
                <div className="unep-data">
                  <h3 style={{ color: 'var(--primary)', marginBottom: '20px' }}>{sampleData.title}</h3>
                  <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>{sampleData.description}</p>
                  
                  <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h4 style={{ marginBottom: '15px', color: 'var(--dark)' }}>Latest Report: {sampleData.latestReport}</h4>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {sampleData.keyFindings && sampleData.keyFindings.map((finding, index) => (
                          <li key={index} style={{ 
                            padding: '15px', 
                            background: index % 2 === 0 ? 'rgba(26, 107, 138, 0.05)' : 'transparent',
                            marginBottom: '10px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'flex-start'
                          }}>
                            <i className="fas fa-exclamation-circle" style={{ color: 'var(--accent)', marginRight: '10px', marginTop: '5px' }}></i>
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ 
                        background: 'linear-gradient(to right, #1a6b8a, #2d9a6e)', 
                        padding: '25px', 
                        borderRadius: '10px',
                        color: 'white',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <h4 style={{ marginBottom: '20px' }}>How We Use UNEP Data</h4>
                        <ul style={{ paddingLeft: '20px' }}>
                          <li style={{ marginBottom: '15px' }}>Integrate global pollution metrics into our dashboards</li>
                          <li style={{ marginBottom: '15px' }}>Compare regional environmental performance</li>
                          <li style={{ marginBottom: '15px' }}>Inform policy recommendations</li>
                          <li>Track progress on Sustainable Development Goals</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <a 
                      href={sampleData.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Explore UNEP Data
                    </a>
                  </div>
                </div>
              )}
              
              {activeDatabase === 'gfw' && sampleData && (
                <div className="gfw-data">
                  <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h3 style={{ color: 'var(--primary)', marginBottom: '20px' }}>{sampleData.title}</h3>
                      <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>{sampleData.description}</p>
                      
                      {sampleData.stats && (
                        <div className="stats" style={{ marginBottom: '30px' }}>
                          {sampleData.stats.map((stat, index) => (
                            <div key={index} style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              padding: '15px',
                              background: index % 2 === 0 ? 'rgba(45, 154, 110, 0.1)' : 'transparent',
                              borderRadius: '8px',
                              marginBottom: '10px'
                            }}>
                              <span>{stat.label}</span>
                              <strong style={{ color: 'var(--secondary)' }}>{stat.value}</strong>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div style={{ textAlign: 'center' }}>
                        <a 
                          href={sampleData.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                        >
                          <i className="fas fa-external-link-alt"></i>
                          Explore GFW Data
                        </a>
                      </div>
                    </div>
                    
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      {sampleData.mapImage && (
                        <div style={{ 
                          background: '#e8f4f0', 
                          borderRadius: '10px',
                          padding: '20px',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <h4 style={{ color: 'var(--secondary)', marginBottom: '15px' }}>Global Forest Cover Map</h4>
                          <div style={{ 
                            background: `url(${sampleData.mapImage}) `, 
                            flex: 1,
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                          }}></div>
                          <p style={{ marginTop: '15px', color: '#555' }}>
                            Interactive forest cover map integrated from Global Forest Watch API
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeDatabase === 'ohi' && sampleData && (
                <div className="ohi-data">
                  <h3 style={{ color: 'var(--primary)', marginBottom: '20px' }}>{sampleData.title}</h3>
                  <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>{sampleData.description}</p>
                  
                  <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ 
                        background: 'linear-gradient(to right, #0a97d9, #1a6b8a)', 
                        padding: '30px', 
                        borderRadius: '10px',
                        color: 'white',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Global Ocean Health Score</div>
                        <div style={{ 
                          fontSize: '4rem', 
                          fontWeight: '700', 
                          lineHeight: 1,
                          margin: '20px 0'
                        }}>
                          {sampleData.score}
                          <span style={{ fontSize: '1.5rem', fontWeight: '400' }}>/100</span>
                        </div>
                        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px' }}>
                          {sampleData.score >= 80 ? 'Good' : sampleData.score >= 60 ? 'Fair' : 'Poor'}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h4 style={{ color: 'var(--dark)', marginBottom: '20px' }}>Component Scores</h4>
                      {sampleData.components && (
                        <div className="components">
                          {sampleData.components.map((component, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span>{component.name}</span>
                                <span>{component.score}/100</span>
                              </div>
                              <div style={{ 
                                height: '12px', 
                                background: '#e9ecef', 
                                borderRadius: '10px',
                                overflow: 'hidden'
                              }}>
                                <div style={{ 
                                  height: '100%', 
                                  width: `${component.score}%`, 
                                  background: `linear-gradient(to right, #0a97d9, #1a6b8a)`,
                                  borderRadius: '10px'
                                }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <a 
                      href={sampleData.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Explore Ocean Health Data
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="api-integration" style={{ marginTop: '60px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', marginBottom: '20px' }}>API Integration for Developers</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto 30px' }}>
            EcoHarmony provides API endpoints to access integrated environmental data for your own applications and research
          </p>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '25px', 
            borderRadius: '15px',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'left',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ color: '#ffd166' }}>// Example API request for forest data</div>
            <div style={{ color: 'white', margin: '10px 0' }}>
              <span style={{ color: '#ff6b6b' }}>GET</span> https://api.ecoharmony.org/v1/forest-cover?region=global&year=2023
            </div>
            <div style={{ color: '#ffd166' }}>// Example response</div>
            <pre style={{ 
              background: 'rgba(0,0,0,0.2)', 
              padding: '15px', 
              borderRadius: '8px', 
              color: 'white',
              overflowX: 'auto',
              marginTop: '10px'
            }}>
{`{
  "status": "success",
  "data": {
    "region": "global",
    "year": 2023,
    "treeCoverLoss": "4.1M ha",
    "treeCoverGain": "1.2M ha",
    "primaryForestLoss": "2.8M ha",
    "source": "Global Forest Watch"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalDataIntegration;