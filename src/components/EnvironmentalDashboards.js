import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Bar, Line } from 'react-chartjs-2';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const EnvironmentalDashboards = () => {
  const [activeTab, setActiveTab] = useState('deforestation');
  const [timeRange, setTimeRange] = useState('30d');
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data (in a real app, this would come from APIs)
  const deforestationData = {
    points: [
      { id: 1, name: "Amazon Basin, Brazil", lat: -3.4653, lng: -62.2159, loss: 1254, trend: "increasing", lastUpdate: "2 hours ago" },
      { id: 2, name: "Congo Basin, DRC", lat: -0.3174, lng: 20.5513, loss: 897, trend: "stable", lastUpdate: "4 hours ago" },
      { id: 3, name: "Borneo, Indonesia", lat: -0.3970, lng: 113.9213, loss: 1023, trend: "increasing", lastUpdate: "1 hour ago" },
      { id: 4, name: "Siberia, Russia", lat: 61.6987, lng: 99.5054, loss: 782, trend: "increasing", lastUpdate: "6 hours ago" },
    ],
    trendData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Deforestation (sq km)',
          data: [1200, 1900, 1500, 1800, 2200, 2400, 2600, 2500, 2300, 2100, 2000, 1900],
          borderColor: 'rgb(184, 29, 19)',
          backgroundColor: 'rgba(184, 29, 19, 0.5)',
        },
      ],
    },
    summary: {
      totalLoss: "1.2M hectares",
      co2Emissions: "4.8Gt CO2",
      primaryCause: "Agriculture expansion",
      alertLevel: "High"
    }
  };

  const coralReefData = {
    points: [
      { id: 1, name: "Great Barrier Reef, Australia", lat: -18.2871, lng: 147.6992, health: 42, trend: "declining", lastUpdate: "3 hours ago" },
      { id: 2, name: "Mesoamerican Reef, Caribbean", lat: 18.2208, lng: -87.4694, health: 38, trend: "stable", lastUpdate: "5 hours ago" },
      { id: 3, name: "Coral Triangle, Indonesia", lat: 1.3733, lng: 127.8083, health: 35, trend: "declining", lastUpdate: "2 hours ago" },
      { id: 4, name: "Red Sea Reef, Egypt", lat: 27.0000, lng: 33.0000, health: 68, trend: "improving", lastUpdate: "8 hours ago" },
    ],
    trendData: {
      labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Coral Health Index',
          data: [65, 60, 55, 52, 48, 45],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
    summary: {
      globalCoverLoss: "14% since 2009",
      bleachingEvents: "3 major events in 2023",
      primaryThreats: "Ocean warming, pollution",
      alertLevel: "Critical"
    }
  };

  const plasticWasteData = {
    points: [
      { id: 1, name: "Great Pacific Garbage Patch", lat: 35.0000, lng: -145.0000, density: "High", size: "1.6M sq km", lastUpdate: "1 hour ago" },
      { id: 2, name: "Indian Ocean Garbage Patch", lat: -20.0000, lng: 80.0000, density: "Medium", size: "1.2M sq km", lastUpdate: "2 hours ago" },
      { id: 3, name: "Mediterranean Sea", lat: 35.0000, lng: 18.0000, density: "High", size: "0.8M sq km", lastUpdate: "4 hours ago" },
      { id: 4, name: "North Atlantic Garbage Patch", lat: 35.0000, lng: -40.0000, density: "Medium", size: "1.1M sq km", lastUpdate: "3 hours ago" },
    ],
    trendData: {
      labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Plastic Waste (million tons)',
          data: [120, 150, 180, 210, 250, 290, 330, 380, 430],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    },
    summary: {
      annualOceanPlastic: "11M tons",
      microplastics: "51 trillion particles",
      decompositionTime: "450+ years",
      alertLevel: "Severe"
    }
  };

  const ghgEmissionsData = {
    points: [
      { id: 1, name: "Industrial Zone, China", lat: 36.5618, lng: 114.4872, emissions: "High", co2: "12.5Gt", lastUpdate: "15 minutes ago" },
      { id: 2, name: "Oil Fields, Saudi Arabia", lat: 25.0000, lng: 45.0000, emissions: "Very High", co2: "8.2Gt", lastUpdate: "30 minutes ago" },
      { id: 3, name: "Coal Region, USA", lat: 39.0000, lng: -80.5000, emissions: "High", co2: "5.8Gt", lastUpdate: "1 hour ago" },
      { id: 4, name: "Industrial Zone, Germany", lat: 51.0000, lng: 9.0000, emissions: "Medium", co2: "3.2Gt", lastUpdate: "45 minutes ago" },
    ],
    trendData: {
      labels: ['1990', '1995', '2000', '2005', '2010', '2015', '2020', '2023'],
      datasets: [
        {
          label: 'Global CO2 Emissions (Gt)',
          data: [22.7, 24.2, 25.5, 29.5, 33.1, 35.7, 36.7, 37.5],
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
      ],
    },
    summary: {
      globalCO2: "37.5Gt in 2023",
      perCapita: "4.7 tons per person",
      warmingIncrease: "+1.2°C since pre-industrial",
      alertLevel: "Extreme"
    }
  };

  // Get current data based on active tab
  const getCurrentData = () => {
    switch(activeTab) {
      case 'deforestation': return deforestationData;
      case 'coral': return coralReefData;
      case 'plastic': return plasticWasteData;
      case 'ghg': return ghgEmissionsData;
      default: return deforestationData;
    }
  };

  const currentData = getCurrentData();

  // Function to get color based on value/status
  const getStatusColor = (value, type) => {
    if (type === 'health') {
      if (value >= 70) return '#2ecc71';
      if (value >= 50) return '#f1c40f';
      return '#e74c3c';
    }
    
    if (type === 'density') {
      if (value === 'High') return '#e74c3c';
      if (value === 'Medium') return '#f39c12';
      return '#2ecc71';
    }
    
    if (type === 'emissions') {
      if (value === 'Very High') return '#8e44ad';
      if (value === 'High') return '#e74c3c';
      if (value === 'Medium') return '#f39c12';
      return '#2ecc71';
    }
    
    // Default for deforestation loss
    if (value > 1000) return '#c0392b';
    if (value > 700) return '#e74c3c';
    if (value > 400) return '#f39c12';
    return '#27ae60';
  };

  // Function to get marker size based on value
  const getMarkerSize = (value, type) => {
    if (type === 'health') return 10 + (100 - value) / 2;
    if (type === 'density') {
      if (value === 'High') return 20;
      if (value === 'Medium') return 15;
      return 10;
    }
    if (type === 'emissions') {
      if (value === 'Very High') return 25;
      if (value === 'High') return 20;
      if (value === 'Medium') return 15;
      return 10;
    }
    // For deforestation
    return 10 + value / 100;
  };

  // Update map center when tab changes
  useEffect(() => {
    if (currentData.points && currentData.points.length > 0) {
      const firstPoint = currentData.points[0];
      setMapCenter([firstPoint.lat, firstPoint.lng]);
      setMapZoom(activeTab === 'plastic' ? 2 : 4);
    }
    
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Custom icons for map markers
  const createCustomIcon = (color) => {
    return new L.Icon({
      iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><circle cx="12" cy="12" r="10" /></svg>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  return (
    <section id="environmental-dashboards" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(to bottom, #f8f9fa, #e9f5f9)',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#1a6b8a', 
            marginBottom: '15px',
            fontWeight: '700'
          }}>
            Real-Time Environmental Dashboards
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#555', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Interactive visualizations powered by satellite imagery, IoT sensors, and crowdsourced data 
            for monitoring critical environmental indicators worldwide
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ 
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '5px solid #f3f3f3',
              borderTop: '5px solid #1a6b8a',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '20px', color: '#666' }}>Loading real-time data...</p>
          </div>
        ) : (
          <>
            <div className="dashboard-controls" style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '20px',
              background: '#fff',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <div className="tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  { id: 'deforestation', label: 'Deforestation Hotspots', icon: 'fas fa-tree' },
                  { id: 'coral', label: 'Coral Reef Health', icon: 'fas fa-water' },
                  { id: 'plastic', label: 'Plastic Waste Zones', icon: 'fas fa-trash' },
                  { id: 'ghg', label: 'GHG Emissions', icon: 'fas fa-smog' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '12px 24px',
                      background: activeTab === tab.id ? '#1a6b8a' : '#f0f7ff',
                      color: activeTab === tab.id ? 'white' : '#1a6b8a',
                      border: 'none',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className={tab.icon}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="filters" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '30px',
                    border: '1px solid #ddd',
                    background: 'white',
                    fontSize: '0.95rem'
                  }}
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="1y">Last Year</option>
                </select>
                
                <button className="btn" style={{ 
                  padding: '10px 20px',
                  background: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-download"></i>
                  Export Data
                </button>
              </div>
            </div>

            <div className="dashboard-summary" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {Object.entries(currentData.summary).map(([key, value], index) => (
                <div key={index} className="summary-card" style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                  borderTop: index === 3 ? '4px solid #e74c3c' : 
                            index === 2 ? '4px solid #f39c12' : 
                            index === 1 ? '4px solid #3498db' : '4px solid #2ecc71'
                }}>
                  <div style={{ 
                    fontSize: '1.1rem', 
                    color: '#777', 
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}>
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </div>
                  <div style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '700', 
                    color: '#1a6b8a',
                    lineHeight: '1.3'
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-content" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div className="map-container" style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                height: '500px',
                position: 'relative'
              }}>
                <MapContainer 
                  center={mapCenter} 
                  zoom={mapZoom} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {currentData.points.map((point) => {
                    let color;
                    let size;
                    
                    if (activeTab === 'deforestation') {
                      color = getStatusColor(point.loss, 'loss');
                      size = getMarkerSize(point.loss, 'loss');
                    } else if (activeTab === 'coral') {
                      color = getStatusColor(point.health, 'health');
                      size = getMarkerSize(point.health, 'health');
                    } else if (activeTab === 'plastic') {
                      color = getStatusColor(point.density, 'density');
                      size = getMarkerSize(point.density, 'density');
                    } else {
                      color = getStatusColor(point.emissions, 'emissions');
                      size = getMarkerSize(point.emissions, 'emissions');
                    }
                    
                    return (
                      <CircleMarker
                        key={point.id}
                        center={[point.lat, point.lng]}
                        radius={size}
                        color={color}
                        fillOpacity={0.7}
                      >
                        <Popup>
                          <div style={{ minWidth: '200px' }}>
                            <h4 style={{ marginBottom: '8px', color: '#1a6b8a' }}>{point.name}</h4>
                            {activeTab === 'deforestation' && (
                              <>
                                <p>Forest Loss: <strong>{point.loss} sq km</strong></p>
                                <p>Trend: <span style={{ 
                                  color: point.trend === 'increasing' ? '#e74c3c' : '#2ecc71',
                                  fontWeight: '600'
                                }}>{point.trend}</span></p>
                              </>
                            )}
                            {activeTab === 'coral' && (
                              <>
                                <p>Health Index: <strong>{point.health}/100</strong></p>
                                <p>Trend: <span style={{ 
                                  color: point.trend === 'declining' ? '#e74c3c' : point.trend === 'improving' ? '#2ecc71' : '#f39c12',
                                  fontWeight: '600'
                                }}>{point.trend}</span></p>
                              </>
                            )}
                            {activeTab === 'plastic' && (
                              <>
                                <p>Density: <strong>{point.density}</strong></p>
                                <p>Estimated Size: <strong>{point.size}</strong></p>
                              </>
                            )}
                            {activeTab === 'ghg' && (
                              <>
                                <p>Emissions Level: <strong>{point.emissions}</strong></p>
                                <p>Annual CO2: <strong>{point.co2}</strong></p>
                              </>
                            )}
                            <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '8px' }}>
                              <i className="fas fa-sync-alt" style={{ marginRight: '5px' }}></i>
                              Updated {point.lastUpdate}
                            </p>
                          </div>
                        </Popup>
                      </CircleMarker>
                    );
                  })}
                </MapContainer>
                
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  zIndex: 1000
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      background: '#27ae60', 
                      borderRadius: '50%', 
                      marginRight: '8px' 
                    }}></div>
                    <span>Low</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      background: '#f1c40f', 
                      borderRadius: '50%', 
                      marginRight: '8px' 
                    }}></div>
                    <span>Medium</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      background: '#e74c3c', 
                      borderRadius: '50%', 
                      marginRight: '8px' 
                    }}></div>
                    <span>High</span>
                  </div>
                  {activeTab === 'ghg' && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        background: '#8e44ad', 
                        borderRadius: '50%', 
                        marginRight: '8px' 
                      }}></div>
                      <span>Very High</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="charts-container" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
              }}>
                <div style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  flex: '1'
                }}>
                  <h3 style={{ 
                    marginBottom: '20px', 
                    color: '#1a6b8a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <i className={`fas ${activeTab === 'deforestation' ? 'fa-tree' : 
                                  activeTab === 'coral' ? 'fa-water' : 
                                  activeTab === 'plastic' ? 'fa-trash' : 'fa-smog'}`}></i>
                    {activeTab === 'deforestation' && 'Annual Deforestation Trends'}
                    {activeTab === 'coral' && 'Coral Health Index Over Time'}
                    {activeTab === 'plastic' && 'Global Plastic Waste Accumulation'}
                    {activeTab === 'ghg' && 'Global Greenhouse Gas Emissions'}
                  </h3>
                  <Line 
                    data={currentData.trendData} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: activeTab !== 'coral',
                          title: {
                            display: true,
                            text: activeTab === 'deforestation' ? 'Area (sq km)' : 
                                  activeTab === 'coral' ? 'Health Index' : 
                                  activeTab === 'plastic' ? 'Million Tons' : 'Gigatons CO2'
                          }
                        }
                      }
                    }}
                  />
                </div>
                
                <div style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  flex: '1'
                }}>
                  <h3 style={{ 
                    marginBottom: '20px', 
                    color: '#1a6b8a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <i className="fas fa-chart-bar"></i>
                    {activeTab === 'deforestation' && 'Top Deforestation Regions'}
                    {activeTab === 'coral' && 'Coral Health by Region'}
                    {activeTab === 'plastic' && 'Plastic Accumulation Zones'}
                    {activeTab === 'ghg' && 'Top GHG Emitting Regions'}
                  </h3>
                  <Bar
                    data={{
                      labels: currentData.points.map(p => p.name.split(',')[0]),
                      datasets: [
                        {
                          label: activeTab === 'deforestation' ? 'Forest Loss (sq km)' : 
                                 activeTab === 'coral' ? 'Health Index' : 
                                 activeTab === 'plastic' ? 'Density Level' : 'Emissions Level',
                          data: currentData.points.map(p => {
                            if (activeTab === 'deforestation') return p.loss;
                            if (activeTab === 'coral') return p.health;
                            if (activeTab === 'plastic') {
                              if (p.density === 'High') return 100;
                              if (p.density === 'Medium') return 70;
                              return 40;
                            }
                            if (p.emissions === 'Very High') return 100;
                            if (p.emissions === 'High') return 80;
                            if (p.emissions === 'Medium') return 60;
                            return 40;
                          }),
                          backgroundColor: currentData.points.map(p => {
                            if (activeTab === 'deforestation') return getStatusColor(p.loss, 'loss');
                            if (activeTab === 'coral') return getStatusColor(p.health, 'health');
                            if (activeTab === 'plastic') return getStatusColor(p.density, 'density');
                            return getStatusColor(p.emissions, 'emissions');
                          }),
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="data-sources" style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              textAlign: 'center',
              fontSize: '0.95rem',
              color: '#666'
            }}>
              <p>
                <i className="fas fa-satellite" style={{ marginRight: '8px', color: '#1a6b8a' }}></i>
                Data Sources: NASA Landsat & MODIS, ESA Sentinel, Global Forest Watch, NOAA Coral Reef Watch, 
                Ocean Cleanup Initiative, GHG Monitoring Network
              </p>
              <p style={{ marginTop: '8px' }}>
                <i className="fas fa-sync-alt" style={{ marginRight: '8px', color: '#1a6b8a' }}></i>
                Data updated every 15 minutes from satellite, IoT sensors, and crowdsourced reports
              </p>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default EnvironmentalDashboards;