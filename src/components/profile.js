import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  if (!user) return (
    <div style={{padding: '60px 0', textAlign: 'center'}}>
      <div style={{display: 'inline-block', background: '#fff3f3', color: '#e74c3c', padding: '24px 40px', borderRadius: 12, fontWeight: 600, fontSize: '1.2rem', boxShadow: '0 4px 16px rgba(231,76,60,0.08)'}}>
        Please login to view your profile.
      </div>
    </div>
  );
  return (
    <div style={{padding: '60px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fc 100%)'}}>
      <div style={{background: 'white', borderRadius: 18, boxShadow: '0 8px 32px rgba(26,107,138,0.10)', padding: '40px 48px', minWidth: 340, maxWidth: 400, textAlign: 'center', fontFamily: 'Montserrat, sans-serif'}}>
        <div style={{marginBottom: 24}}>
          <i className="fas fa-user-circle" style={{fontSize: 64, color: '#1a6b8a'}}></i>
        </div>
        <h2 style={{fontSize: '2rem', color: '#1a6b8a', fontWeight: 700, marginBottom: 10}}>My Profile</h2>
        <div style={{marginBottom: 18, fontSize: '1.1rem', color: '#2c3e50'}}>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </div>
        <div style={{marginBottom: 18, fontSize: '1.1rem', color: '#2c3e50'}}>
          <strong>Email:</strong> {user.email}
        </div>
        <div style={{marginBottom: 18, fontSize: '1.1rem', color: '#2d9a6e'}}>
          <strong>User Type:</strong> {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
        </div>
        <div style={{marginTop: 24, fontSize: '0.95rem', color: '#888'}}>
          Welcome to EcoHarmony! Here you can view and update your profile information.
        </div>
      </div>
    </div>
  );
};

export default Profile;