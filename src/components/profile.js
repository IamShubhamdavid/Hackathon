import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import apiService from '../services/api';

const Profile = () => {
  const { user, logout, updateUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    userType: user?.userType || 'citizen'
  });
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    content: '',
    category: 'environmental-tips',
    tags: ''
  });
  const [contributions, setContributions] = useState({
    contributions: [],
    stats: {
      total: 0,
      environmentalData: 0,
      blogPosts: 0,
      approved: 0,
      pending: 0
    }
  });

  // Fetch user contributions
  const fetchContributions = async () => {
    try {
      const response = await apiService.getUserContributions();
      if (response.success) {
        setContributions(response.data);
      }
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  // Sync edit form data with user data when user changes
  useEffect(() => {
    if (user) {
      setEditFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        userType: user.userType || 'citizen'
      });
      // Fetch contributions when user is loaded
      fetchContributions();
    }
  }, [user]);

  if (loading) return (
    <div style={{padding: '60px 0', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'inline-block', background: '#f0f7ff', color: '#1a6b8a', padding: '24px 40px', borderRadius: 12, fontWeight: 600, fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(26,107,138,0.08)'}}>
        Loading...
      </div>
    </div>
  );

  if (!user) return (
    <div style={{padding: '60px 0', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'inline-block', background: '#fff3f3', color: '#e74c3c', padding: '24px 40px', borderRadius: 12, fontWeight: 600, fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(231,76,60,0.08)'}}>
        Please login to view your profile.
      </div>
    </div>
  );

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Call API to update profile
      const response = await apiService.updateProfile(editFormData);

      if (response.success) {
        // Update the user data in the auth context
        updateUser({
          ...editFormData,
          joinedDate: user.joinedDate // Preserve joined date
        });
        setIsEditing(false);

        // Show success message
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original user data
    setEditFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      userType: user.userType || 'citizen'
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDataCollectionRedirect = () => {
    // Navigate to homepage and scroll to data collection section
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('datacollection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBlogInputChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to submit blog post
      const response = await apiService.submitBlogPost(blogFormData);

      if (response.success) {
        alert('Blog submitted successfully! It will be reviewed before publication.');
        setBlogFormData({
          title: '',
          content: '',
          category: 'environmental-tips',
          tags: ''
        });
        // Refresh contributions to show the new blog post
        fetchContributions();
      }
    } catch (error) {
      console.error('Blog submission error:', error);
      alert('Failed to submit blog: ' + error.message);
    }
  };

  return (
    <div style={{
      padding: '80px 0 40px',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fc 100%)',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header Section */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(26,107,138,0.08)',
          padding: '40px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          {/* Avatar Section */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a6b8a 0%, #27ae60 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              boxShadow: '0 8px 24px rgba(26,107,138,0.15)'
            }}>
              <i className="fas fa-user" style={{ fontSize: '48px', color: 'white' }}></i>
            </div>
            <button
              onClick={() => isEditing ? handleCancelEdit() : setIsEditing(true)}
              style={{
                background: 'linear-gradient(135deg, #1a6b8a 0%, #27ae60 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '8px 20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <i className="fas fa-edit" style={{ marginRight: '8px' }}></i>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {/* User Info Section */}
          <div style={{ flex: 1 }}>
            {!isEditing ? (
              <>
                <h1 style={{
                  fontSize: '2.5rem',
                  color: '#1a6b8a',
                  fontWeight: '700',
                  marginBottom: '10px',
                  lineHeight: '1.2'
                }}>
                  {user.firstName} {user.lastName}
                </h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className="fas fa-envelope" style={{ color: '#1a6b8a', fontSize: '18px' }}></i>
                    <span style={{ fontSize: '1.1rem', color: '#2c3e50' }}>{user.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className="fas fa-user-tag" style={{ color: '#27ae60', fontSize: '18px' }}></i>
                    <span style={{ fontSize: '1.1rem', color: '#2c3e50', textTransform: 'capitalize' }}>{user.userType}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className="fas fa-calendar-alt" style={{ color: '#f39c12', fontSize: '18px' }}></i>
                    <span style={{ fontSize: '1.1rem', color: '#2c3e50' }}>
                      Joined: {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>User Type</label>
                  <select
                    name="userType"
                    value={editFormData.userType}
                    onChange={handleEditInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="citizen">Citizen</option>
                    <option value="researcher">Researcher</option>
                    <option value="organization">Organization</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button
                    onClick={handleSaveProfile}
                    style={{
                      background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
              Logout
            </button>
          </div>
        </div>

        {/* My Contributions Section */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(26,107,138,0.08)',
          padding: '40px',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#1a6b8a',
            fontWeight: '700',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <i className="fas fa-leaf" style={{ color: '#27ae60' }}></i>
            My Contributions
          </h2>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '15px'
          }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                background: activeTab === 'profile' ? 'linear-gradient(135deg, #1a6b8a 0%, #27ae60 100%)' : 'transparent',
                color: activeTab === 'profile' ? 'white' : '#1a6b8a',
                border: activeTab === 'profile' ? 'none' : '2px solid #1a6b8a',
                borderRadius: '25px',
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Profile Overview
            </button>
            <button
              onClick={() => setActiveTab('contributions')}
              style={{
                background: activeTab === 'contributions' ? 'linear-gradient(135deg, #1a6b8a 0%, #27ae60 100%)' : 'transparent',
                color: activeTab === 'contributions' ? 'white' : '#1a6b8a',
                border: activeTab === 'contributions' ? 'none' : '2px solid #1a6b8a',
                borderRadius: '25px',
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              My Contributions
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'center'
              }}>
                <i className="fas fa-chart-line" style={{ fontSize: '48px', color: '#1a6b8a', marginBottom: '15px' }}></i>
                <h3 style={{ color: '#1a6b8a', marginBottom: '10px' }}>Data Submissions</h3>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#27ae60', marginBottom: '5px' }}>
                  {contributions.stats.environmentalData}
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Environmental data points submitted</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'center'
              }}>
                <i className="fas fa-blog" style={{ fontSize: '48px', color: '#1a6b8a', marginBottom: '15px' }}></i>
                <h3 style={{ color: '#1a6b8a', marginBottom: '10px' }}>Blog Posts</h3>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#27ae60', marginBottom: '5px' }}>
                  {contributions.stats.blogPosts}
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Educational resources shared</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'center'
              }}>
                <i className="fas fa-award" style={{ fontSize: '48px', color: '#1a6b8a', marginBottom: '15px' }}></i>
                <h3 style={{ color: '#1a6b8a', marginBottom: '10px' }}>Impact Score</h3>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#27ae60', marginBottom: '5px' }}>
                  {contributions.stats.approved * 10 + contributions.stats.pending * 5}
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Environmental impact points</p>
              </div>
            </div>
          )}

          {activeTab === 'contributions' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '30px'
            }}>
              {/* Submit Environmental Data Section */}
              <div style={{
                background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
                borderRadius: '15px',
                padding: '30px',
                border: '2px solid #27ae60'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <i className="fas fa-database" style={{ fontSize: '48px', color: '#27ae60', marginBottom: '15px' }}></i>
                  <h3 style={{ color: '#1a6b8a', fontSize: '1.5rem', fontWeight: '700', marginBottom: '10px' }}>
                    Submit Environmental Data
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Contribute to our global environmental database by submitting real-time data from your location.
                  </p>
                </div>
                <button
                  onClick={handleDataCollectionRedirect}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '15px 25px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <i className="fas fa-plus-circle" style={{ marginRight: '10px' }}></i>
                  Submit Data
                </button>
              </div>

              {/* Add Resources Section */}
              <div style={{
                background: 'linear-gradient(135deg, #e8f4fc 0%, #f0f7ff 100%)',
                borderRadius: '15px',
                padding: '30px',
                border: '2px solid #1a6b8a'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <i className="fas fa-pen-fancy" style={{ fontSize: '48px', color: '#1a6b8a', marginBottom: '15px' }}></i>
                  <h3 style={{ color: '#1a6b8a', fontSize: '1.5rem', fontWeight: '700', marginBottom: '10px' }}>
                    Add Resources
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Share your knowledge by writing educational blog posts and resources for the community.
                  </p>
                </div>

                {/* Blog Writing Form */}
                <form onSubmit={handleBlogSubmit} style={{ marginTop: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>
                      Blog Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={blogFormData.title}
                      onChange={handleBlogInputChange}
                      placeholder="Enter your blog title..."
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>
                      Category
                    </label>
                    <select
                      name="category"
                      value={blogFormData.category}
                      onChange={handleBlogInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="environmental-tips">Environmental Tips</option>
                      <option value="climate-change">Climate Change</option>
                      <option value="sustainability">Sustainability</option>
                      <option value="conservation">Conservation</option>
                      <option value="renewable-energy">Renewable Energy</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={blogFormData.content}
                      onChange={handleBlogInputChange}
                      placeholder="Write your blog content here..."
                      required
                      rows="6"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a6b8a' }}>
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={blogFormData.tags}
                      onChange={handleBlogInputChange}
                      placeholder="e.g., environment, sustainability, tips"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '15px 25px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <i className="fas fa-paper-plane" style={{ marginRight: '10px' }}></i>
                    Publish Blog
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;