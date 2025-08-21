// src/components/SignUp.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     userType: 'citizen'
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Simple validation
//     if (!formData.name || !formData.email || !formData.password) {
//       setError('All fields are required');
//       return;
//     }
    
//     // Check if email is valid
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
    
//     // Save to localStorage
//     const users = JSON.parse(localStorage.getItem('ecosynergyUsers') || '[]');
    
//     // Check if user already exists
//     if (users.some(user => user.email === formData.email)) {
//       setError('User with this email already exists');
//       return;
//     }
    
//     // Add new user
//     const newUser = {
//       id: Date.now(),
//       ...formData,
//       createdAt: new Date().toISOString()
//     };
    
//     users.push(newUser);
//     localStorage.setItem('ecosynergyUsers', JSON.stringify(users));
    
//     // Show success message
//     setSuccess(true);
//     setError('');
    
//     // Redirect after 2 seconds
//     setTimeout(() => {
//       navigate('/');
//     }, 2000);
//   };

//   return (
//     <section className="signup" style={{ padding: '100px 0', background: '#f8f9fa', minHeight: '80vh' }}>
//       <div className="container">
//         <div className="section-title">
//           <h2>Create an Account</h2>
//           <p>Join our community to contribute to climate action and conservation</p>
//         </div>
        
//         {success ? (
//           <div className="success-message" style={{ 
//             background: '#d4edda', 
//             color: '#155724', 
//             padding: '20px', 
//             borderRadius: '8px', 
//             textAlign: 'center',
//             maxWidth: '500px',
//             margin: '0 auto'
//           }}>
//             <i className="fas fa-check-circle" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
//             <h3>Account Created Successfully!</h3>
//             <p>You'll be redirected to the homepage shortly.</p>
//           </div>
//         ) : (
//           <div className="signup-form" style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' }}>
//             {error && <p style={{ color: 'var(--accent)', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group" style={{ marginBottom: '20px' }}>
//                 <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
//                   placeholder="Enter your full name"
//                 />
//               </div>
              
//               <div className="form-group" style={{ marginBottom: '20px' }}>
//                 <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
//                   placeholder="Enter your email"
//                 />
//               </div>
              
//               <div className="form-group" style={{ marginBottom: '20px' }}>
//                 <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
//                   placeholder="Create a password"
//                 />
//               </div>
              
//               <div className="form-group" style={{ marginBottom: '20px' }}>
//                 <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>I am a:</label>
//                 <div style={{ display: 'flex', gap: '15px' }}>
//                   <label style={{ display: 'flex', alignItems: 'center' }}>
//                     <input
//                       type="radio"
//                       name="userType"
//                       value="citizen"
//                       checked={formData.userType === 'citizen'}
//                       onChange={handleChange}
//                       style={{ marginRight: '8px' }}
//                     />
//                     Concerned Citizen
//                   </label>
//                   <label style={{ display: 'flex', alignItems: 'center' }}>
//                     <input
//                       type="radio"
//                       name="userType"
//                       value="researcher"
//                       checked={formData.userType === 'researcher'}
//                       onChange={handleChange}
//                       style={{ marginRight: '8px' }}
//                     />
//                     Researcher
//                   </label>
//                   <label style={{ display: 'flex', alignItems: 'center' }}>
//                     <input
//                       type="radio"
//                       name="userType"
//                       value="organization"
//                       checked={formData.userType === 'organization'}
//                       onChange={handleChange}
//                       style={{ marginRight: '8px' }}
//                     />
//                     Organization
//                   </label>
//                 </div>
//               </div>
              
//               <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>
//                 Create Account
//               </button>
              
//               <p style={{ textAlign: 'center', marginTop: '20px' }}>
//                 Already have an account? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sign In</a>
//               </p>
//             </form>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SignUp;