// src/components/Header.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router';

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <header>
//       <div className="container">
//         <nav className="navbar">
//           <div className="logo">
//             <Link to="/" className="logo-text">Eco<span>Harmony</span></Link>
//           </div>
          
//           <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
//             <a href="#features">Features</a>
//             <a href="#collaboration">Collaboration</a>
//             <a href="#datacollection">DataCollection</a>
//             <a href="#dashboard">Dashboard</a>
//             <a href="#impact">Impact</a>
//             {/* <a href="#scorecards">Scorecards</a> */}
//             <a href="#global-data">GlobalData</a>
//             <a href="#resources">Resources</a>
//             <Link to="/login" className="btn btn-outline">Login</Link>
//             {/* <Link to="/signup" className="btn btn-outline">Sign Up</Link> */}
//           </div>
          
//           <div className="mobile-menu-icon" onClick={toggleMenu}>
//             <i className={`fas ${menuOpen ? 'fa-times' : ''}`}></i>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/" className="logo-text">Eco<span>Harmony</span></Link>
          </div>
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}> 
            <a href="#features">Features</a>
            <a href="#collaboration">Collaboration</a>
            <a href="#datacollection">DataCollection</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#impact">Impact</a>
            {/* <a href="#scorecards">Scorecards</a> */}
            <a href="#global-data">GlobalData</a>
            <a href="#resources">Resources</a>
            {!user ? (
              <Link to="/login" className="btn btn-outline">Login</Link>
            ) : (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button
                  className="btn btn-outline"
                  style={{
                    borderRadius: '50px',
                    height: 40,
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #1a6b8a 0%, #2d9a6e 100%)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(26,107,138,0.10)',
                    border: 'none'
                  }}
                  onClick={handleProfileClick}
                  aria-label="Profile"
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffd166 0%, #27ae60 100%)',
                    marginRight: 8,
                    boxShadow: '0 2px 8px rgba(39,174,96,0.10)'
                  }}>
                    <i className="fas fa-user" style={{ fontSize: 18, color: '#1a6b8a' }}></i>
                  </span>
                  <span style={{ color: 'white', fontWeight: 600 }}>
                    {user.firstName} {user.lastName}
                  </span>
                </button>
                {profileMenuOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 45, background: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', borderRadius: 12, minWidth: 200, zIndex: 100, overflow: 'hidden', fontFamily: 'Montserrat, sans-serif' }}>
                    <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 24px', color: '#1a6b8a', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }} onClick={()=>setProfileMenuOpen(false)}>
                      <i className="fas fa-user-circle" style={{ fontSize: 18, color: '#1a6b8a' }}></i> My Profile
                    </Link>
                    <Link to="/my-contribution" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 24px', color: '#1a6b8a', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }} onClick={()=>setProfileMenuOpen(false)}>
                      <i className="fas fa-leaf" style={{ fontSize: 18, color: '#27ae60' }}></i> My Contribution
                    </Link>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '16px 24px', background: 'none', border: 'none', color: '#e74c3c', fontWeight: 700, fontSize: '1rem', textAlign: 'left', cursor: 'pointer', transition: 'background 0.2s', borderTop: '1px solid #f0f0f0' }}>
                      <i className="fas fa-sign-out-alt" style={{ fontSize: 18, color: '#e74c3c' }}></i> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mobile-menu-icon" onClick={toggleMenu}>
            <i className={`fas ${menuOpen ? 'fa-times' : ''}`}></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;