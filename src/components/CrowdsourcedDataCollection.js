import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CrowdsourcedDataCollection = () => {
  const [activeCategory, setActiveCategory] = useState('deforestation');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: 'deforestation',
    description: '',
    severity: 'medium',
    image: null,
    latitude: '',
    longitude: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0]
  });

  // Sample recent submissions data
  const sampleSubmissions = [
    {
      id: 1,
      category: 'deforestation',
      description: 'Illegal logging activity spotted in protected area',
      location: { lat: -3.4653, lng: -62.2159 },
      date: '2023-10-15',
      user: 'Environmental Volunteer',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      category: 'marine',
      description: 'Large plastic waste accumulation near beach',
      location: { lat: 18.2208, lng: -87.4694 },
      date: '2023-10-14',
      user: 'Beach Cleanup Group',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      category: 'species',
      description: 'Rare bird species spotted in urban area',
      location: { lat: 1.3733, lng: 127.8083 },
      date: '2023-10-13',
      user: 'Bird Watcher',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      category: 'emissions',
      description: 'Industrial plant emitting dark smoke',
      location: { lat: 36.5618, lng: 114.4872 },
      date: '2023-10-12',
      user: 'Concerned Citizen',
      status: 'under_review',
      image: 'https://terrapass.com/wp-content/uploads/2022/08/carbon-dioxide-emissions-from-electricity-photo-of-factory-smoke.jpg'
    }
  ];

  // Map click handler component
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng);
        setFormData({
          ...formData,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        });
      },
    });
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSubmission = {
        id: submissions.length + 1,
        category: formData.category,
        description: formData.description,
        location: { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) },
        date: formData.date,
        user: 'You',
        status: 'pending',
        image: formData.image
      };
      
      setSubmissions([newSubmission, ...submissions]);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        category: 'deforestation',
        description: '',
        severity: 'medium',
        image: null,
        latitude: '',
        longitude: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0]
      });
      setSelectedPosition(null);
      
      alert('Thank you for your submission! Your data will help in environmental conservation efforts.');
    }, 1500);
  };

  const categories = [
    { id: 'deforestation', name: 'Deforestation', icon: 'fas fa-tree', color: '#27ae60' },
    { id: 'marine', name: 'Marine Pollution', icon: 'fas fa-water', color: '#3498db' },
    { id: 'species', name: 'Species Sightings', icon: 'fas fa-paw', color: '#8e44ad' },
    { id: 'emissions', name: 'Carbon Emissions', icon: 'fas fa-smog', color: '#e74c3c' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { text: 'Verified', color: '#27ae60' },
      pending: { text: 'Pending Review', color: '#f39c12' },
      under_review: { text: 'Under Review', color: '#3498db' }
    };
    
    const config = statusConfig[status] || { text: 'Unknown', color: '#95a5a6' };
    
    return (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: `${config.color}20`,
        color: config.color
      }}>
        {config.text}
      </span>
    );
  };

  return (
    <section id="datacollection" style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(to bottom, #f8f9fa, #e9f5f9)'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#1a6b8a', 
            marginBottom: '15px',
            fontWeight: '700'
          }}>
            Crowdsourced Data Collection
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#555', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Contribute to environmental monitoring by reporting deforestation, marine pollution, 
            species sightings, and carbon emissions from anywhere in the world.
          </p>
        </div>

        <div className="data-collection-content" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '50px'
        }}>
          <div className="submission-form" style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              marginBottom: '25px', 
              color: '#1a6b8a',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-plus-circle"></i>
              Submit Environmental Data
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Category
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category.id);
                        setFormData({...formData, category: category.id});
                      }}
                      style={{
                        flex: '1',
                        minWidth: '120px',
                        padding: '12px 15px',
                        background: activeCategory === category.id ? category.color : '#f8f9fa',
                        color: activeCategory === category.id ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className={category.icon}></i>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    resize: 'vertical'
                  }}
                  placeholder="Describe what you observed..."
                  required
                ></textarea>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="severity" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Severity Level
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s'
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Location
                </label>
                <div style={{ 
                  height: '200px', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  marginBottom: '10px',
                  border: '2px solid #ddd'
                }}>
                  <MapContainer 
                    center={[20, 0]} 
                    zoom={2} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler />
                    {selectedPosition && (
                      <Marker position={selectedPosition}>
                        <Popup>Your reported location</Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="Latitude"
                    step="any"
                    style={{
                      flex: 1,
                      padding: '10px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    required
                  />
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="Longitude"
                    step="any"
                    style={{
                      flex: 1,
                      padding: '10px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    required
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="image" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px dashed #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                />
                {formData.image && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      style={{ 
                        width: '100%', 
                        maxHeight: '200px', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }} 
                    />
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="date" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="time" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: isSubmitting ? '#95a5a6' : 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt" style={{ marginRight: '8px' }}></i>
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="recent-submissions" style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              marginBottom: '25px', 
              color: '#1a6b8a',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-history"></i>
              Recent Community Submissions
            </h3>
            
            <div className="submissions-list" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {sampleSubmissions.map(submission => (
                <div key={submission.id} className="submission-card" style={{
                  padding: '15px',
                  borderLeft: `4px solid ${categories.find(c => c.id === submission.category).color}`,
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  display: 'flex',
                  gap: '15px'
                }}>
                  <div style={{ flex: '0 0 80px' }}>
                    <img 
                      src={submission.image} 
                      alt="Submission" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <h4 style={{ 
                        margin: 0, 
                        fontSize: '1rem',
                        color: '#2c3e50'
                      }}>
                        {submission.description}
                      </h4>
                      {getStatusBadge(submission.status)}
                    </div>
                    <p style={{ 
                      margin: '5px 0', 
                      fontSize: '0.9rem', 
                      color: '#7f8c8d',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <i className={`fas ${categories.find(c => c.id === submission.category).icon}`} 
                         style={{ color: categories.find(c => c.id === submission.category).color }}></i>
                      {categories.find(c => c.id === submission.category).name}
                    </p>
                    <p style={{ 
                      margin: '5px 0', 
                      fontSize: '0.85rem', 
                      color: '#95a5a6',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <i className="fas fa-user"></i>
                      {submission.user} • {submission.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="features-section" style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '25px', color: '#1a6b8a' }}>
            How Your Data Makes a Difference
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            <div className="feature" style={{ padding: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(26, 107, 138, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '1.5rem',
                color: '#1a6b8a'
              }}>
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>Early Detection</h4>
              <p style={{ color: '#7f8c8d', lineHeight: '1.5' }}>
                Help identify environmental issues before they become critical problems
              </p>
            </div>
            
            <div className="feature" style={{ padding: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(58, 155, 124, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '1.5rem',
                color: '#3a9b7c'
              }}>
                <i className="fas fa-users"></i>
              </div>
              <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>Community Power</h4>
              <p style={{ color: '#7f8c8d', lineHeight: '1.5' }}>
                Join a global community of environmental monitors and activists
              </p>
            </div>
            
            <div className="feature" style={{ padding: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(52, 152, 219, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '1.5rem',
                color: '#3498db'
              }}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>Data-Driven Action</h4>
              <p style={{ color: '#7f8c8d', lineHeight: '1.5' }}>
                Provide crucial data for researchers and policymakers to take action
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrowdsourcedDataCollection;