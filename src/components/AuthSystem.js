
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';

// const AuthSystem = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     userType: 'citizen'
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   // Validation functions
//   const validateName = (name) => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/;
//     if (!name.trim()) return "Name is required";
//     if (!nameRegex.test(name)) return "Name should contain only letters and spaces (2-20 characters)";
//     return "";
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) return "Email is required";
//     if (!emailRegex.test(email)) return "Please enter a valid email address";
//     return "";
//   };

//   const validatePassword = (password) => {
//     if (!password) return "Password is required";
//     if (password.length < 8) return "Password must be at least 8 characters long";
//     if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) return "Password must contain both uppercase and lowercase letters";
//     if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
//     if (!/(?=.*[!@#$%^&*])/.test(password)) return "Password must contain at least one special character";
//     return "";
//   };

//   const validateConfirmPassword = (password, confirmPassword) => {
//     if (password !== confirmPassword) return "Passwords do not match";
//     return "";
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   // Validate all fields
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!isLogin) {
//       newErrors.firstName = validateName(formData.firstName);
//       newErrors.lastName = validateName(formData.lastName);
//     }
    
//     newErrors.email = validateEmail(formData.email);
//     newErrors.password = validatePassword(formData.password);
    
//     if (!isLogin) {
//       newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
//     }
    
//     setErrors(newErrors);
    
//     // Check if form is valid
//     return Object.values(newErrors).every(error => error === "");
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       // In a real application, you would send this data to your backend
//       console.log('Form data:', formData);
      
//       // Show success message
//       setSuccessMessage(isLogin ? 'Login successful!' : 'Account created successfully!');
      
//       // After successful login/signup, redirect to homepage
//       setTimeout(() => {
//         setSuccessMessage('');
        
//         if (isLogin) {
//           // Redirect to homepage after login
//           navigate('/');
//         } else {
//           // For signup, switch to login mode and clear form
//           setIsLogin(true);
//           setFormData({
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             userType: 'citizen'
//           });
//         }
//       }, 3000);
//     }
//   };

//   // Toggle between login and signup
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setErrors({});
//     setSuccessMessage('');
//   };

//   return (
//     <section id="auth-system" style={{ 
//       padding: '80px 0', 
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center'
//     }}>
//       <div className="container" style={{ 
//         maxWidth: '500px', 
//         margin: '0 auto', 
//         background: 'white', 
//         padding: '40px',
//         borderRadius: '15px',
//         boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
//       }}>
//         {!isLogin && (
//           <>
//             <h1 style={{ 
//               textAlign: 'center', 
//               marginBottom: '15px', 
//               color: '#1a6b8a',
//               fontSize: '2.2rem',
//               fontWeight: '700'
//             }}>
//               Join EcoHarmony
//             </h1>
//             <p style={{
//               textAlign: 'center',
//               color: '#666',
//               marginBottom: '30px',
//               fontSize: '1.1rem',
//               lineHeight: '1.5'
//             }}>
//               Create an account to contribute to ecological harmony.
//             </p>
//           </>
//         )}
        
//         {isLogin && (
//           <h2 style={{ 
//             textAlign: 'center', 
//             marginBottom: '30px', 
//             color: '#1a6b8a',
//             fontSize: '2rem'
//           }}>
//             Login to Your Account
//           </h2>
//         )}
        
//         {successMessage && (
//           <div style={{
//             padding: '15px',
//             background: '#d4edda',
//             color: '#155724',
//             borderRadius: '5px',
//             marginBottom: '20px',
//             textAlign: 'center'
//           }}>
//             {successMessage}
//             {isLogin && <p style={{margin: '10px 0 0', fontSize: '0.9rem'}}>Redirecting to homepage...</p>}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
//               <div style={{ flex: 1 }}>
//                 <label htmlFor="firstName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '12px 15px',
//                     border: `2px solid ${errors.firstName ? '#e74c3c' : '#ddd'}`,
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     transition: 'border-color 0.3s'
//                   }}
//                   placeholder="Enter your first name"
//                 />
//                 {errors.firstName && (
//                   <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                     {errors.firstName}
//                   </div>
//                 )}
//               </div>
              
//               <div style={{ flex: 1 }}>
//                 <label htmlFor="lastName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '12px 15px',
//                     border: `2px solid ${errors.lastName ? '#e74c3c' : '#ddd'}`,
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     transition: 'border-color 0.3s'
//                   }}
//                   placeholder="Enter your last name"
//                 />
//                 {errors.lastName && (
//                   <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                     {errors.lastName}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
          
//           <div style={{ marginBottom: '20px' }}>
//             <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               style={{
//                 width: '100%',
//                 padding: '12px 15px',
//                 border: `2px solid ${errors.email ? '#e74c3c' : '#ddd'}`,
//                 borderRadius: '8px',
//                 fontSize: '1rem',
//                 transition: 'border-color 0.3s'
//               }}
//               placeholder="Enter your email address"
//             />
//             {errors.email && (
//               <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                 {errors.email}
//               </div>
//             )}
//           </div>
          
//           <div style={{ marginBottom: '20px' }}>
//             <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               style={{
//                 width: '100%',
//                 padding: '12px 15px',
//                 border: `2px solid ${errors.password ? '#e74c3c' : '#ddd'}`,
//                 borderRadius: '8px',
//                 fontSize: '1rem',
//                 transition: 'border-color 0.3s'
//               }}
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                 {errors.password}
//               </div>
//             )}
            
//             {!isLogin && (
//               <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
//                 Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.
//               </div>
//             )}
//           </div>
          
//           {!isLogin && (
//             <div style={{ marginBottom: '25px' }}>
//               <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 style={{
//                   width: '100%',
//                   padding: '12px 15px',
//                   border: `2px solid ${errors.confirmPassword ? '#e74c3c' : '#ddd'}`,
//                   borderRadius: '8px',
//                   fontSize: '1rem',
//                   transition: 'border-color 0.3s'
//                 }}
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && (
//                 <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                   {errors.confirmPassword}
//                 </div>
//               )}
//             </div>
//           )}
          
//           {!isLogin && (
//             <div style={{ marginBottom: '25px' }}>
//               <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600' }}>
//                 I am a:
//               </label>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
//                 <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="citizen"
//                     checked={formData.userType === 'citizen'}
//                     onChange={handleInputChange}
//                     style={{ marginRight: '10px' }}
//                   />
//                   <div style={{
//                     padding: '10px 10px',
//                     border: `2px solid ${formData.userType === 'citizen' ? '#1a6b8a' : '#ddd'}`,
//                     borderRadius: '8px',
//                     flex: 1,
//                     backgroundColor: formData.userType === 'citizen' ? '#f0f7ff' : 'white',
//                     transition: 'all 0.3s'
//                   }}>
//                     <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Citizen</span>
//                   </div>
//                 </label>
                
//                 <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="researcher"
//                     checked={formData.userType === 'researcher'}
//                     onChange={handleInputChange}
//                     style={{ marginRight: '10px' }}
//                   />
//                   <div style={{
//                     padding: '10px 10px',
//                     border: `2px solid ${formData.userType === 'researcher' ? '#1a6b8a' : '#ddd'}`,
//                     borderRadius: '8px',
//                     flex: 1,
//                     backgroundColor: formData.userType === 'researcher' ? '#f0f7ff' : 'white',
//                     transition: 'all 0.3s'
//                   }}>
//                     <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Researcher</span>
//                   </div>
//                 </label>
                
//                 <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="organization"
//                     checked={formData.userType === 'organization'}
//                     onChange={handleInputChange}
//                     style={{ marginRight: '10px' }}
//                   />
//                   <div style={{
//                     padding: '10px 10px',
//                     border: `2px solid ${formData.userType === 'organization' ? '#1a6b8a' : '#ddd'}`,
//                     borderRadius: '8px',
//                     flex: 1,
//                     backgroundColor: formData.userType === 'organization' ? '#f0f7ff' : 'white',
//                     transition: 'all 0.3s'
//                   }}>
//                     <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Organization</span>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           )}
          
//           <button
//             type="submit"
//             style={{
//               width: '100%',
//               padding: '14px',
//               background: 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               fontSize: '1.1rem',
//               fontWeight: '600',
//               cursor: 'pointer',
//               transition: 'transform 0.2s, box-shadow 0.2s'
//             }}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = 'none';
//             }}
//           >
//             {isLogin ? 'Login' : 'Create Account'}
//           </button>
//         </form>
        
//         <div style={{ textAlign: 'center', marginTop: '25px' }}>
//           <p style={{ color: '#666' }}>
//             {isLogin ? "Don't have an account? " : "Already have an account? "}
//             <button
//               onClick={toggleAuthMode}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 color: '#1a6b8a',
//                 textDecoration: 'underline',
//                 cursor: 'pointer',
//                 fontSize: '1rem',
//                 fontWeight: '600'
//               }}
//             >
//               {isLogin ? 'Sign up' : 'Login'}
//             </button>
//           </p>
//         </div>
        
//         <div style={{ 
//           marginTop: '30px', 
//           padding: '20px', 
//           background: '#f8f9fa', 
//           borderRadius: '8px',
//           fontSize: '0.9rem'
//         }}>
//           <h4 style={{ marginBottom: '10px', color: '#1a6b8a' }}>Validation :</h4>
//           <ul style={{ paddingLeft: '20px', margin: 0 }}>
//             <li>Name: 2-20 characters, letters and spaces only</li>
//             <li>Email: Valid email format</li>
//             <li>Password: Minimum 8 characters, uppercase, lowercase, number, and special character</li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AuthSystem;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
// import { Line } from 'react-chartjs-2';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement
// } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement
// );

// const AuthSystem = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     userType: 'citizen'
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   // Plastic Waste Dashboard State
//   const [mapCenter, setMapCenter] = useState([20, 0]);
//   const [mapZoom, setMapZoom] = useState(2);

//   // Plastic waste data
//   const plasticWasteData = {
//     points: [
//       { id: 1, name: "Great Pacific Garbage Patch", lat: 35.0000, lng: -145.0000, density: "High", size: "1.6M sq km", lastUpdate: "1 hour ago" },
//       { id: 2, name: "Indian Ocean Garbage Patch", lat: -20.0000, lng: 80.0000, density: "Medium", size: "1.2M sq km", lastUpdate: "2 hours ago" },
//       { id: 3, name: "Mediterranean Sea", lat: 35.0000, lng: 18.0000, density: "High", size: "0.8M sq km", lastUpdate: "4 hours ago" },
//       { id: 4, name: "North Atlantic Garbage Patch", lat: 35.0000, lng: -40.0000, density: "Medium", size: "1.1M sq km", lastUpdate: "3 hours ago" },
//     ],
//     trendData: {
//       labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
//       datasets: [
//         {
//           label: 'Plastic Waste (million tons)',
//           data: [120, 150, 180, 210, 250, 290, 330, 380, 430],
//           borderColor: 'rgb(75, 192, 192)',
//           backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         },
//       ],
//     },
//     summary: {
//       annualOceanPlastic: "11M tons",
//       microplastics: "51 trillion particles",
//       decompositionTime: "450+ years",
//       alertLevel: "Severe"
//     }
//   };

//   // Function to get color based on value/status
//   const getStatusColor = (value, type) => {
//     if (type === 'density') {
//       if (value === 'High') return '#e74c3c';
//       if (value === 'Medium') return '#f39c12';
//       return '#2ecc71';
//     }
//     return '#27ae60';
//   };

//   // Function to get marker size based on value
//   const getMarkerSize = (value, type) => {
//     if (type === 'density') {
//       if (value === 'High') return 20;
//       if (value === 'Medium') return 15;
//       return 10;
//     }
//     return 10;
//   };

//   // Update map center when tab changes
//   useEffect(() => {
//     if (plasticWasteData.points && plasticWasteData.points.length > 0) {
//       const firstPoint = plasticWasteData.points[0];
//       setMapCenter([firstPoint.lat, firstPoint.lng]);
//       setMapZoom(2);
//     }
//   }, []);

//   // Validation functions
//   const validateName = (name) => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/;
//     if (!name.trim()) return "Name is required";
//     if (!nameRegex.test(name)) return "Name should contain only letters and spaces (2-20 characters)";
//     return "";
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) return "Email is required";
//     if (!emailRegex.test(email)) return "Please enter a valid email address";
//     return "";
//   };

//   const validatePassword = (password) => {
//     if (!password) return "Password is required";
//     if (password.length < 8) return "Password must be at least 8 characters long";
//     if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) return "Password must contain both uppercase and lowercase letters";
//     if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
//     if (!/(?=.*[!@#$%^&*])/.test(password)) return "Password must contain at least one special character";
//     return "";
//   };

//   const validateConfirmPassword = (password, confirmPassword) => {
//     if (password !== confirmPassword) return "Passwords do not match";
//     return "";
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   // Validate all fields
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!isLogin) {
//       newErrors.firstName = validateName(formData.firstName);
//       newErrors.lastName = validateName(formData.lastName);
//     }
    
//     newErrors.email = validateEmail(formData.email);
//     newErrors.password = validatePassword(formData.password);
    
//     if (!isLogin) {
//       newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
//     }
    
//     setErrors(newErrors);
    
//     // Check if form is valid
//     return Object.values(newErrors).every(error => error === "");
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       // In a real application, you would send this data to your backend
//       console.log('Form data:', formData);
      
//       // Show success message
//       setSuccessMessage(isLogin ? 'Login successful!' : 'Account created successfully!');
      
//       // After successful login/signup, redirect to homepage
//       setTimeout(() => {
//         setSuccessMessage('');
        
//         if (isLogin) {
//           // Redirect to homepage after login
//           navigate('/');
//         } else {
//           // For signup, switch to login mode and clear form
//           setIsLogin(true);
//           setFormData({
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             userType: 'citizen'
//           });
//         }
//       }, 3000);
//     }
//   };

//   // Toggle between login and signup
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setErrors({});
//     setSuccessMessage('');
//   };

//   return (
//     <section id="auth-system" style={{ 
//       padding: '0', 
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center'
//     }}>
//       <div style={{ 
//         width: '100%', 
//         display: 'flex',
//         flexDirection: 'row',
//         minHeight: '100vh'
//       }}>
//         {/* Left side - Data Panel */}
//         <div style={{ 
//           flex: '1', 
//           background: 'rgba(26, 107, 138, 0.8)',
//           color: 'white',
//           padding: '30px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center'
//         }}>
//           <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
//             <h2 style={{ 
//               fontSize: '1.8rem', 
//               marginBottom: '20px',
//               fontWeight: '700',
//               textAlign: 'center'
//             }}>
//               Global Plastic Waste Crisis
//             </h2>
            
//             <div className="dashboard-summary" style={{
//               display: 'grid',
//               gridTemplateColumns: '1fr',
//               gap: '15px',
//               marginBottom: '30px'
//             }}>
//               {Object.entries(plasticWasteData.summary).map(([key, value], index) => (
//                 <div key={index} className="summary-card" style={{
//                   background: 'rgba(255, 255, 255, 0.1)',
//                   borderRadius: '10px',
//                   padding: '15px',
//                   textAlign: 'center',
//                   backdropFilter: 'blur(10px)',
//                   border: '1px solid rgba(255, 255, 255, 0.2)'
//                 }}>
//                   <div style={{ 
//                     fontSize: '0.9rem', 
//                     marginBottom: '8px',
//                     textTransform: 'uppercase',
//                     fontWeight: '600',
//                     letterSpacing: '0.5px',
//                     opacity: 0.8
//                   }}>
//                     {key.split(/(?=[A-Z])/).join(' ')}
//                   </div>
//                   <div style={{ 
//                     fontSize: '1.3rem', 
//                     fontWeight: '700', 
//                     lineHeight: '1.3'
//                   }}>
//                     {value}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               borderRadius: '12px',
//               padding: '20px',
//               backdropFilter: 'blur(10px)',
//               border: '1px solid rgba(255, 255, 255, 0.2)',
//               marginBottom: '20px'
//             }}>
//               <h3 style={{ 
//                 marginBottom: '15px', 
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 fontSize: '1.1rem'
//               }}>
//                 <i className="fas fa-chart-line"></i>
//                 Plastic Waste Trend
//               </h3>
//               <div style={{ height: '200px' }}>
//                 <Line 
//                   data={plasticWasteData.trendData} 
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                       legend: {
//                         position: 'top',
//                         labels: {
//                           color: 'white'
//                         }
//                       },
//                     },
//                     scales: {
//                       y: {
//                         beginAtZero: true,
//                         ticks: {
//                           color: 'rgba(255, 255, 255, 0.7)'
//                         },
//                         grid: {
//                           color: 'rgba(255, 255, 255, 0.1)'
//                         }
//                       },
//                       x: {
//                         ticks: {
//                           color: 'rgba(255, 255, 255, 0.7)'
//                         },
//                         grid: {
//                           color: 'rgba(255, 255, 255, 0.1)'
//                         }
//                       }
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             <div style={{
//               textAlign: 'center',
//               fontSize: '0.9rem',
//               opacity: 0.8
//             }}>
//               <p>
//                 <i className="fas fa-satellite" style={{ marginRight: '8px' }}></i>
//                 Data Sources: NASA MODIS, ESA Sentinel, Ocean Cleanup Initiative
//               </p>
//               <p style={{ marginTop: '5px' }}>
//                 <i className="fas fa-sync-alt" style={{ marginRight: '8px' }}></i>
//                 Updated every 15 minutes from satellite and sensor data
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Middle - Auth Form */}
//         <div style={{ 
//           width: '500px', 
//           background: 'white', 
//           padding: '40px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
//           zIndex: 10
//         }}>
//           <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
//             {!isLogin && (
//               <>
//                 <h1 style={{ 
//                   textAlign: 'center', 
//                   marginBottom: '15px', 
//                   color: '#1a6b8a',
//                   fontSize: '2.2rem',
//                   fontWeight: '700'
//                 }}>
//                   Join EcoHarmony
//                 </h1>
//                 <p style={{
//                   textAlign: 'center',
//                   color: '#666',
//                   marginBottom: '30px',
//                   fontSize: '1.1rem',
//                   lineHeight: '1.5'
//                 }}>
//                   Create an account to contribute to ecological harmony.
//                 </p>
//               </>
//             )}
            
//             {isLogin && (
//               <h2 style={{ 
//                 textAlign: 'center', 
//                 marginBottom: '30px', 
//                 color: '#1a6b8a',
//                 fontSize: '2rem'
//               }}>
//                 Login to Your Account
//               </h2>
//             )}
            
//             {successMessage && (
//               <div style={{
//                 padding: '15px',
//                 background: '#d4edda',
//                 color: '#155724',
//                 borderRadius: '5px',
//                 marginBottom: '20px',
//                 textAlign: 'center'
//               }}>
//                 {successMessage}
//                 {isLogin && <p style={{margin: '10px 0 0', fontSize: '0.9rem'}}>Redirecting to homepage...</p>}
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit}>
//               {!isLogin && (
//                 <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
//                   <div style={{ flex: 1 }}>
//                     <label htmlFor="firstName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       style={{
//                         width: '100%',
//                         padding: '12px 15px',
//                         border: `2px solid ${errors.firstName ? '#e74c3c' : '#ddd'}`,
//                         borderRadius: '8px',
//                         fontSize: '1rem',
//                         transition: 'border-color 0.3s'
//                       }}
//                       placeholder="Enter your first name"
//                     />
//                     {errors.firstName && (
//                       <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                         {errors.firstName}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div style={{ flex: 1 }}>
//                     <label htmlFor="lastName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       style={{
//                         width: '100%',
//                         padding: '12px 15px',
//                         border: `2px solid ${errors.lastName ? '#e74c3c' : '#ddd'}`,
//                         borderRadius: '8px',
//                         fontSize: '1rem',
//                         transition: 'border-color 0.3s'
//                       }}
//                       placeholder="Enter your last name"
//                     />
//                     {errors.lastName && (
//                       <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                         {errors.lastName}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '12px 15px',
//                     border: `2px solid ${errors.email ? '#e74c3c' : '#ddd'}`,
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     transition: 'border-color 0.3s'
//                   }}
//                   placeholder="Enter your email address"
//                 />
//                 {errors.email && (
//                   <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                     {errors.email}
//                   </div>
//                 )}
//               </div>
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '12px 15px',
//                     border: `2px solid ${errors.password ? '#e74c3c' : '#ddd'}`,
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     transition: 'border-color 0.3s'
//                   }}
//                   placeholder="Enter your password"
//                 />
//                 {errors.password && (
//                   <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                     {errors.password}
//                   </div>
//                 )}
                
//                 {!isLogin && (
//                   <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
//                     Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.
//                   </div>
//                 )}
//               </div>
              
//               {!isLogin && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 15px',
//                       border: `2px solid ${errors.confirmPassword ? '#e74c3c' : '#ddd'}`,
//                       borderRadius: '8px',
//                       fontSize: '1rem',
//                       transition: 'border-color 0.3s'
//                     }}
//                     placeholder="Confirm your password"
//                   />
//                   {errors.confirmPassword && (
//                     <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                       {errors.confirmPassword}
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {!isLogin && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600' }}>
//                     I am a:
//                   </label>
//                   <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
//                     <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="citizen"
//                         checked={formData.userType === 'citizen'}
//                         onChange={handleInputChange}
//                         style={{ marginRight: '10px' }}
//                       />
//                       <div style={{
//                         padding: '10px 10px',
//                         border: `2px solid ${formData.userType === 'citizen' ? '#1a6b8a' : '#ddd'}`,
//                         borderRadius: '8px',
//                         flex: 1,
//                         backgroundColor: formData.userType === 'citizen' ? '#f0f7ff' : 'white',
//                         transition: 'all 0.3s'
//                       }}>
//                         <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Citizen</span>
//                       </div>
//                     </label>
                    
//                     <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="researcher"
//                         checked={formData.userType === 'researcher'}
//                         onChange={handleInputChange}
//                         style={{ marginRight: '10px' }}
//                       />
//                       <div style={{
//                         padding: '10px 10px',
//                         border: `2px solid ${formData.userType === 'researcher' ? '#1a6b8a' : '#ddd'}`,
//                         borderRadius: '8px',
//                         flex: 1,
//                         backgroundColor: formData.userType === 'researcher' ? '#f0f7ff' : 'white',
//                         transition: 'all 0.3s'
//                       }}>
//                         <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Researcher</span>
//                       </div>
//                     </label>
                    
//                     <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="organization"
//                         checked={formData.userType === 'organization'}
//                         onChange={handleInputChange}
//                         style={{ marginRight: '10px' }}
//                       />
//                       <div style={{
//                         padding: '10px 10px',
//                         border: `2px solid ${formData.userType === 'organization' ? '#1a6b8a' : '#ddd'}`,
//                         borderRadius: '8px',
//                         flex: 1,
//                         backgroundColor: formData.userType === 'organization' ? '#f0f7ff' : 'white',
//                         transition: 'all 0.3s'
//                       }}>
//                         <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Organization</span>
//                       </div>
//                     </label>
//                   </div>
//                 </div>
//               )}
              
//               <button
//                 type="submit"
//                 style={{
//                   width: '100%',
//                   padding: '14px',
//                   background: 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '8px',
//                   fontSize: '1.1rem',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'transform 0.2s, box-shadow 0.2s'
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.transform = 'translateY(-2px)';
//                   e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               >
//                 {isLogin ? 'Login' : 'Create Account'}
//               </button>
//             </form>
            
//             <div style={{ textAlign: 'center', marginTop: '25px' }}>
//               <p style={{ color: '#666' }}>
//                 {isLogin ? "Don't have an account? " : "Already have an account? "}
//                 <button
//                   onClick={toggleAuthMode}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: '#1a6b8a',
//                     textDecoration: 'underline',
//                     cursor: 'pointer',
//                     fontSize: '1rem',
//                     fontWeight: '600'
//                   }}
//                 >
//                   {isLogin ? 'Sign up' : 'Login'}
//                 </button>
//               </p>
//             </div>
            
//             <div style={{ 
//               marginTop: '30px', 
//               padding: '20px', 
//               background: '#f8f9fa', 
//               borderRadius: '8px',
//               fontSize: '0.9rem'
//             }}>
//               <h4 style={{ marginBottom: '10px', color: '#1a6b8a' }}>Validation :</h4>
//               <ul style={{ paddingLeft: '20px', margin: 0 }}>
//                 <li>Name: 2-20 characters, letters and spaces only</li>
//                 <li>Email: Valid email format</li>
//                 <li>Password: Minimum 8 characters, uppercase, lowercase, number, and special character</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Map Panel */}
//         <div style={{ 
//           flex: '1', 
//           background: 'rgba(58, 155, 124, 0.8)',
//           padding: '30px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center'
//         }}>
//           <div style={{ maxWidth: '100%', margin: '0 auto', width: '100%', height: '100%' }}>
//             <h2 style={{ 
//               fontSize: '1.8rem', 
//               marginBottom: '20px',
//               fontWeight: '700',
//               textAlign: 'center',
//               color: 'white'
//             }}>
//               Plastic Waste Zones
//             </h2>
            
//             <div className="map-container" style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               height: '70%',
//               position: 'relative',
//               marginBottom: '20px',
//               border: '1px solid rgba(255, 255, 255, 0.2)'
//             }}>
//               <MapContainer 
//                 center={mapCenter} 
//                 zoom={mapZoom} 
//                 style={{ height: '100%', width: '100%' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
                
//                 {plasticWasteData.points.map((point) => {
//                   const color = getStatusColor(point.density, 'density');
//                   const size = getMarkerSize(point.density, 'density');
                  
//                   return (
//                     <CircleMarker
//                       key={point.id}
//                       center={[point.lat, point.lng]}
//                       radius={size}
//                       color={color}
//                       fillOpacity={0.7}
//                     >
//                       <Popup>
//                         <div style={{ minWidth: '200px' }}>
//                           <h4 style={{ marginBottom: '8px', color: '#1a6b8a' }}>{point.name}</h4>
//                           <p>Density: <strong>{point.density}</strong></p>
//                           <p>Estimated Size: <strong>{point.size}</strong></p>
//                           <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '8px' }}>
//                             <i className="fas fa-sync-alt" style={{ marginRight: '5px' }}></i>
//                             Updated {point.lastUpdate}
//                           </p>
//                         </div>
//                       </Popup>
//                     </CircleMarker>
//                   );
//                 })}
//               </MapContainer>
//             </div>

//             <div style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               borderRadius: '8px',
//               padding: '15px',
//               backdropFilter: 'blur(10px)',
//               border: '1px solid rgba(255, 255, 255, 0.2)'
//             }}>
//               <h4 style={{ 
//                 marginBottom: '10px', 
//                 color: 'white',
//                 textAlign: 'center'
//               }}>
//                 Legend
//               </h4>
//               <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <div style={{ 
//                     width: '12px', 
//                     height: '12px', 
//                     background: '#e74c3c', 
//                     borderRadius: '50%', 
//                     marginRight: '5px' 
//                   }}></div>
//                   <span style={{ color: 'white', fontSize: '0.9rem' }}>High Density</span>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <div style={{ 
//                     width: '12px', 
//                     height: '12px', 
//                     background: '#f39c12', 
//                     borderRadius: '50%', 
//                     marginRight: '5px' 
//                   }}></div>
//                   <span style={{ color: 'white', fontSize: '0.9rem' }}>Medium Density</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AuthSystem;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';

// const AuthSystem = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     userType: 'citizen'
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   // Plastic waste information data
//   const plasticWasteInfo = {
//     title: "The Plastic Waste Crisis",
//     description: "EcoHarmony is committed to addressing the global plastic pollution problem through innovative solutions and community engagement.",
//     stats: [
//       { value: "8 Million", label: "Tons of plastic enter our oceans each year" },
//       { value: "5 Trillion", label: "Plastic pieces floating in our oceans" },
//       { value: "100,000", label: "Marine animals killed by plastic annually" },
//       { value: "50%", label: "Of plastic produced is for single-use" }
//     ],
//     solutions: [
//       "Reducing single-use plastic consumption",
//       "Improving waste management systems",
//       "Developing biodegradable alternatives",
//       "Promoting circular economy principles"
//     ]
//   };

//   // Validation functions
//   const validateName = (name) => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/;
//     if (!name.trim()) return "Name is required";
//     if (!nameRegex.test(name)) return "Name should contain only letters and spaces (2-20 characters)";
//     return "";
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) return "Email is required";
//     if (!emailRegex.test(email)) return "Please enter a valid email address";
//     return "";
//   };

//   const validatePassword = (password) => {
//     if (!password) return "Password is required";
//     if (password.length < 8) return "Password must be at least 8 characters long";
//     if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) return "Password must contain both uppercase and lowercase letters";
//     if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
//     if (!/(?=.*[!@#$%^&*])/.test(password)) return "Password must contain at least one special character";
//     return "";
//   };

//   const validateConfirmPassword = (password, confirmPassword) => {
//     if (password !== confirmPassword) return "Passwords do not match";
//     return "";
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   // Validate all fields
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!isLogin) {
//       newErrors.firstName = validateName(formData.firstName);
//       newErrors.lastName = validateName(formData.lastName);
//     }
    
//     newErrors.email = validateEmail(formData.email);
//     newErrors.password = validatePassword(formData.password);
    
//     if (!isLogin) {
//       newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
//     }
    
//     setErrors(newErrors);
    
//     // Check if form is valid
//     return Object.values(newErrors).every(error => error === "");
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       // In a real application, you would send this data to your backend
//       console.log('Form data:', formData);
      
//       // Show success message
//       setSuccessMessage(isLogin ? 'Login successful!' : 'Account created successfully!');
      
//       // After successful login/signup, redirect to homepage
//       setTimeout(() => {
//         setSuccessMessage('');
        
//         if (isLogin) {
//           // Redirect to homepage after login
//           navigate('/');
//         } else {
//           // For signup, switch to login mode and clear form
//           setIsLogin(true);
//           setFormData({
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             userType: 'citizen'
//           });
//         }
//       }, 3000);
//     }
//   };

//   // Toggle between login and signup
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setErrors({});
//     setSuccessMessage('');
//   };

//   return (
//     <section id="auth-system" style={{ 
//       padding: '0', 
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center'
//     }}>
//       <div style={{ 
//         width: '100%', 
//         display: 'flex',
//         flexDirection: 'row',
//         minHeight: '100vh'
//       }}>
//         {/* Left side - EcoHarmony Information */}
//         <div style={{ 
//           flex: '1', 
//           background: 'linear-gradient(to bottom right, #1a6b8a, #3a9b7c)',
//           color: 'white',
//           padding: '50px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center'
//         }}>
//           <div style={{ maxWidth: '500px', margin: '0 auto' }}>
//             <h1 style={{ 
//               fontSize: '2.5rem', 
//               marginBottom: '20px',
//               fontWeight: '700'
//             }}>
//               EcoHarmony
//             </h1>
//             <h2 style={{ 
//               fontSize: '1.8rem', 
//               marginBottom: '25px',
//               fontWeight: '600'
//             }}>
//               {plasticWasteInfo.title}
//             </h2>
            
//             <p style={{ 
//               fontSize: '1.1rem', 
//               marginBottom: '40px',
//               lineHeight: '1.6'
//             }}>
//               {plasticWasteInfo.description}
//             </p>
            
//             <div style={{ marginBottom: '40px' }}>
//               <h3 style={{ 
//                 fontSize: '1.4rem', 
//                 marginBottom: '20px',
//                 fontWeight: '600'
//               }}>
//                 Key Statistics
//               </h3>
//               <div style={{ 
//                 display: 'grid', 
//                 gridTemplateColumns: 'repeat(2, 1fr)', 
//                 gap: '20px' 
//               }}>
//                 {plasticWasteInfo.stats.map((stat, index) => (
//                   <div key={index} style={{
//                     background: 'rgba(255, 255, 255, 0.1)',
//                     padding: '20px',
//                     borderRadius: '10px',
//                     textAlign: 'center'
//                   }}>
//                     <div style={{ 
//                       fontSize: '1.5rem', 
//                       fontWeight: '700', 
//                       marginBottom: '8px' 
//                     }}>
//                       {stat.value}
//                     </div>
//                     <div style={{ fontSize: '0.9rem' }}>
//                       {stat.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <h3 style={{ 
//                 fontSize: '1.4rem', 
//                 marginBottom: '20px',
//                 fontWeight: '600'
//               }}>
//                 Our Solutions
//               </h3>
//               <ul style={{ paddingLeft: '20px' }}>
//                 {plasticWasteInfo.solutions.map((solution, index) => (
//                   <li key={index} style={{ 
//                     marginBottom: '12px', 
//                     fontSize: '1.1rem' 
//                   }}>
//                     {solution}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Login Form */}
//         <div style={{ 
//           flex: '1', 
//           background: 'white', 
//           padding: '50px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center'
//         }}>
//           <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
//             {!isLogin && (
//               <>
//                 <h1 style={{ 
//                   textAlign: 'center', 
//                   marginBottom: '15px', 
//                   color: '#1a6b8a',
//                   fontSize: '2.2rem',
//                   fontWeight: '700'
//                 }}>
//                   Join EcoHarmony
//                 </h1>
//                 <p style={{
//                   textAlign: 'center',
//                   color: '#666',
//                   marginBottom: '30px',
//                   fontSize: '1.1rem',
//                   lineHeight: '1.5'
//                 }}>
//                   Create an account to contribute to ecological harmony.
//                 </p>
//               </>
//             )}
            
//             {isLogin && (
//               <h2 style={{ 
//                 textAlign: 'center', 
//                 marginBottom: '30px', 
//                 color: '#1a6b8a',
//                 fontSize: '2rem'
//               }}>
//                 Login to Your Account
//               </h2>
//             )}
            
//             {successMessage && (
//               <div style={{
//                 padding: '15px',
//                 background: '#d4edda',
//                 color: '#155724',
//                 borderRadius: '5px',
//                 marginBottom: '20px',
//                 textAlign: 'center'
//               }}>
//                 {successMessage}
//                 {isLogin && <p style={{margin: '10px 0 0', fontSize: '0.9rem'}}>Redirecting to homepage...</p>}
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit}>
//               {!isLogin && (
//                 <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
//                   <div style={{ flex: 1 }}>
//                     <label htmlFor="firstName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       style={{
//                         width: '100%',
//                         padding: '12px 15px',
//                         border: `2px solid ${errors.firstName ? '#e74c3c' : '#ddd'}`,
//                         borderRadius: '8px',
//                         fontSize: '1rem',
//                         transition: 'border-color 0.3s'
//                       }}
//                       placeholder="Enter your first name"
//                     />
//                     {errors.firstName && (
//                       <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                         {errors.firstName}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div style={{ flex: 1 }}>
//                     <label htmlFor="lastName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       style={{
//                         width: '100%',
//                         padding: '12px 15px',
//                         border: `2px solid ${errors.lastName ? '#e74c3c' : '#ddd'}`,
//                         borderRadius: '8px',
//                         fontSize: '1rem',
//                         transition: 'border-color 0.3s'
//                       }}
//                       placeholder="Enter your last name"
//                     />
//                     {errors.lastName && (
//                       <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                         {errors.lastName}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '12px 15px',
//                     border: `2px solid ${errors.email ? '#e74c3c' : '#ddd'}`,
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     transition: 'border-color 0.3s'
//                   }}
//                   placeholder="Enter your email address"
//                 />
//                 {errors.email && (
//                   <div style={{ color: 'var(--error)', fontSize: '0.9rem', marginTop: '5px' }}>
//                     {errors.email}
//                   </div>
//                 )}
//               </div>
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   style={{
//                     width: '100%',
//                     padding: '12px 15px',
//                     border: `2px solid ${errors.password ? '#e74c3c' : '#ddd'}`,
//                     borderRadius: '8px',
//                     fontSize: '1rem',
//                     transition: 'border-color 0.3s'
//                   }}
//                   placeholder="Enter your password"
//                 />
//                 {errors.password && (
//                   <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                     {errors.password}
//                   </div>
//                 )}
                
//                 {!isLogin && (
//                   <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
//                     Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.
//                   </div>
//                 )}
//               </div>
              
//               {!isLogin && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 15px',
//                       border: `2px solid ${errors.confirmPassword ? '#e74c3c' : '#ddd'}`,
//                       borderRadius: '8px',
//                       fontSize: '1rem',
//                       transition: 'border-color 0.3s'
//                     }}
//                     placeholder="Confirm your password"
//                   />
//                   {errors.confirmPassword && (
//                     <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
//                       {errors.confirmPassword}
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {!isLogin && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600' }}>
//                     I am a:
//                   </label>
//                   <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
//                     <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="citizen"
//                         checked={formData.userType === 'citizen'}
//                         onChange={handleInputChange}
//                         style={{ marginRight: '10px' }}
//                       />
//                       <div style={{
//                         padding: '10px 10px',
//                         border: `2px solid ${formData.userType === 'citizen' ? '#1a6b8a' : '#ddd'}`,
//                         borderRadius: '8px',
//                         flex: 1,
//                         backgroundColor: formData.userType === 'citizen' ? '#f0f7ff' : 'white',
//                         transition: 'all 0.3s'
//                       }}>
//                         <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Citizen</span>
//                       </div>
//                     </label>
                    
//                     <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="researcher"
//                         checked={formData.userType === 'researcher'}
//                         onChange={handleInputChange}
//                         style={{ marginRight: '10px' }}
//                       />
//                       <div style={{
//                         padding: '10px 10px',
//                         border: `2px solid ${formData.userType === 'researcher' ? '#1a6b8a' : '#ddd'}`,
//                         borderRadius: '8px',
//                         flex: 1,
//                         backgroundColor: formData.userType === 'researcher' ? '#f0f7ff' : 'white',
//                         transition: 'all 0.3s'
//                       }}>
//                         <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Researcher</span>
//                       </div>
//                     </label>
                    
//                     <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="userType"
//                         value="organization"
//                         checked={formData.userType === 'organization'}
//                         onChange={handleInputChange}
//                         style={{ marginRight: '10px' }}
//                       />
//                       <div style={{
//                         padding: '10px 10px',
//                         border: `2px solid ${formData.userType === 'organization' ? '#1a6b8a' : '#ddd'}`,
//                         borderRadius: '8px',
//                         flex: 1,
//                         backgroundColor: formData.userType === 'organization' ? '#f0f7ff' : 'white',
//                         transition: 'all 0.3s'
//                       }}>
//                         <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Organization</span>
//                       </div>
//                     </label>
//                   </div>
//                 </div>
//               )}
              
//               <button
//                 type="submit"
//                 style={{
//                   width: '100%',
//                   padding: '14px',
//                   background: 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '8px',
//                   fontSize: '1.1rem',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   transition: 'transform 0.2s, box-shadow 0.2s'
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.transform = 'translateY(-2px)';
//                   e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               >
//                 {isLogin ? 'Login' : 'Create Account'}
//               </button>
//             </form>
            
//             <div style={{ textAlign: 'center', marginTop: '25px' }}>
//               <p style={{ color: '#666' }}>
//                 {isLogin ? "Don't have an account? " : "Already have an account? "}
//                 <button
//                   onClick={toggleAuthMode}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: '#1a6b8a',
//                     textDecoration: 'underline',
//                     cursor: 'pointer',
//                     fontSize: '1rem',
//                     fontWeight: '600'
//                   }}
//                 >
//                   {isLogin ? 'Sign up' : 'Login'}
//                 </button>
//               </p>
//             </div>
            
//             <div style={{ 
//               marginTop: '30px', 
//               padding: '20px', 
//               background: '#f8f9fa', 
//               borderRadius: '8px',
//               fontSize: '0.9rem'
//             }}>
//               <h4 style={{ marginBottom: '10px', color: '#1a6b8a' }}>Validation :</h4>
//               <ul style={{ paddingLeft: '20px', margin: 0 }}>
//                 <li>Name: 2-20 characters, letters and spaces only</li>
//                 <li>Email: Valid email format</li>
//                 <li>Password: Minimum 8 characters, uppercase, lowercase, number, and special character</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AuthSystem;


import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const AuthSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'citizen'
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const {login}=useAuth();

  // Plastic waste information data
  const plasticWasteInfo = {
    title: "The Plastic Waste Crisis",
    description: "EcoHarmony is committed to addressing the global plastic pollution problem through innovative solutions and community engagement.",
    stats: [
      { value: "8 Million", label: "Tons of plastic enter our oceans each year" },
      { value: "5 Trillion", label: "Plastic pieces floating in our oceans" },
      { value: "100,000", label: "Marine animals killed by plastic annually" },
      { value: "50%", label: "Of plastic produced is for single-use" }
    ],
    solutions: [
      "Reducing single-use plastic consumption",
      "Improving waste management systems",
      "Developing biodegradable alternatives",
      "Promoting circular economy principles"
    ]
  };

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,20}$/;
    if (!name.trim()) return "Name is required";
    if (!nameRegex.test(name)) return "Name should contain only letters and spaces (2-20 characters)";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) return "Password must contain both uppercase and lowercase letters";
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
    if (!/(?=.*[!@#$%^&*])/.test(password)) return "Password must contain at least one special character";
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin) {
      newErrors.firstName = validateName(formData.firstName);
      newErrors.lastName = validateName(formData.lastName);
    }
    
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    
    if (!isLogin) {
      newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    }
    
    setErrors(newErrors);
    
    // Check if form is valid
    return Object.values(newErrors).every(error => error === "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (isLogin) {
          // Login API call
          setSuccessMessage('Logging in...');
          const response = await apiService.login({
            email: formData.email,
            password: formData.password
          });

          if (response.success) {
            // Set user data in auth context
            login({
              id: response.data.user.id,
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              email: response.data.user.email,
              userType: response.data.user.userType,
              joinedDate: response.data.user.createdAt ? new Date(response.data.user.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });

            setSuccessMessage('Login successful!');
            setTimeout(() => {
              navigate('/profile');
            }, 1500);
          }
        } else {
          // Register API call
          setSuccessMessage('Creating account...');
          const response = await apiService.register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            userType: formData.userType
          });

          if (response.success) {
            setSuccessMessage('Account created successfully! Please check your email for verification.');

            // Clear form and switch to login mode
            setTimeout(() => {
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                userType: 'citizen'
              });
              setIsLogin(true);
              setSuccessMessage('');
            }, 3000);
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setErrors({ submit: error.message || 'Authentication failed. Please try again.' });
        setSuccessMessage('');
      }
    }
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <section id="auth-system" style={{ 
      padding: '40px 20px', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
        maxWidth: '1200px',
        width: '100%'
      }}>
        {/* EcoHarmony Information Card */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          flex: '1',
          minWidth: '300px',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
            color: 'white',
            padding: '25px',
            borderRadius: '10px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              fontSize: '2.2rem', 
              marginBottom: '15px',
              fontWeight: '700'
            }}>
              EcoHarmony
            </h1>
            <h2 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '15px',
              fontWeight: '600'
            }}>
              {plasticWasteInfo.title}
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.5',
              opacity: '0.9'
            }}>
              {plasticWasteInfo.description}
            </p>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '20px',
              color: '#1a6b8a',
              fontWeight: '600',
              paddingBottom: '10px',
              borderBottom: '2px solid #f0f0f0'
            }}>
              Key Statistics
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
              gap: '15px' 
            }}>
              {plasticWasteInfo.stats.map((stat, index) => (
                <div key={index} style={{
                  background: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '700', 
                    marginBottom: '8px',
                    color: '#1a6b8a'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#6c757d'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '20px',
              color: '#1a6b8a',
              fontWeight: '600',
              paddingBottom: '10px',
              borderBottom: '2px solid #f0f0f0'
            }}>
              Our Solutions
            </h3>
            <ul style={{ 
              paddingLeft: '20px',
              listStyleType: 'none'
            }}>
              {plasticWasteInfo.solutions.map((solution, index) => (
                <li key={index} style={{ 
                  marginBottom: '12px', 
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{
                    color: '#3a9b7c',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}>•</span>
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Login Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          flex: '1',
          minWidth: '300px',
          maxWidth: '500px'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
              color: 'white',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              marginBottom: '20px'
            }}>
              <i className="fas fa-leaf" style={{ fontSize: '30px' }}></i>
            </div>
            
            {!isLogin ? (
              <>
                <h1 style={{ 
                  marginBottom: '15px', 
                  color: '#1a6b8a',
                  fontSize: '1.8rem',
                  fontWeight: '700'
                }}>
                  Join EcoHarmony
                </h1>
                <p style={{
                  color: '#666',
                  marginBottom: '0',
                  fontSize: '1rem'
                }}>
                  Create an account to contribute to ecological harmony.
                </p>
              </>
            ) : (
              <h2 style={{ 
                marginBottom: '0', 
                color: '#1a6b8a',
                fontSize: '1.8rem',
                fontWeight: '700'
              }}>
                Login to Your Account
              </h2>
            )}
          </div>
          
          {successMessage && (
            <div style={{
              padding: '15px',
              background: '#d4edda',
              color: '#155724',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              border: '1px solid #c3e6cb'
            }}>
              {successMessage}
              {isLogin && <p style={{margin: '10px 0 0', fontSize: '0.9rem'}}>Redirecting to homepage...</p>}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="firstName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#495057' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: `2px solid ${errors.firstName ? '#e74c3c' : '#e9ecef'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                      backgroundColor: errors.firstName ? '#fff5f5' : '#fff'
                    }}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <div style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                      {errors.firstName}
                    </div>
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <label htmlFor="lastName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#495057' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: `2px solid ${errors.lastName ? '#e74c3c' : '#e9ecef'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                      backgroundColor: errors.lastName ? '#fff5f5' : '#fff'
                    }}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <div style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#495057' }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: `2px solid ${errors.email ? '#e74c3c' : '#e9ecef'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s',
                  backgroundColor: errors.email ? '#fff5f5' : '#fff'
                }}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <div style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                  {errors.email}
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#495057' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: `2px solid ${errors.password ? '#e74c3c' : '#e9ecef'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s',
                  backgroundColor: errors.password ? '#fff5f5' : '#fff'
                }}
                placeholder="Enter your password"
              />
              {errors.password && (
                <div style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                  {errors.password}
                </div>
              )}
              
              {!isLogin && (
                <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '8px' }}>
                  Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.
                </div>
              )}
            </div>
            
            {!isLogin && (
              <div style={{ marginBottom: '25px' }}>
                <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#495057' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: `2px solid ${errors.confirmPassword ? '#e74c3c' : '#e9ecef'}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    backgroundColor: errors.confirmPassword ? '#fff5f5' : '#fff'
                  }}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}
            
            {!isLogin && (
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600', color: '#495057' }}>
                  I am a:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['citizen', 'researcher', 'organization'].map((type) => (
                    <label key={type} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      cursor: 'pointer',
                      padding: '12px 15px',
                      border: `2px solid ${formData.userType === type ? '#1a6b8a' : '#e9ecef'}`,
                      borderRadius: '8px',
                      backgroundColor: formData.userType === type ? '#f0f7ff' : '#fff',
                      transition: 'all 0.3s'
                    }}>
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={formData.userType === type}
                        onChange={handleInputChange}
                        style={{ marginRight: '10px' }}
                      />
                      <span style={{ 
                        fontWeight: '600', 
                        color: formData.userType === type ? '#1a6b8a' : '#495057',
                        textTransform: 'capitalize'
                      }}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {errors.submit && (
              <div style={{
                padding: '12px 15px',
                background: '#fff5f5',
                color: '#e74c3c',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '0.9rem',
                border: '1px solid #f5c6cb'
              }}>
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #1a6b8a 0%, #3a9b7c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginBottom: '20px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 12px rgba(26, 107, 138, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <p style={{ color: '#6c757d', margin: '0' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1a6b8a',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
          
          <div style={{ 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            fontSize: '0.85rem',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ marginBottom: '10px', color: '#1a6b8a', fontSize: '0.9rem' }}>Validation Requirements:</h4>
            <ul style={{ paddingLeft: '20px', margin: '0', color: '#6c757d' }}>
              <li>Name: 2-20 characters, letters and spaces only</li>
              <li>Email: Valid email format</li>
              <li>Password: Minimum 8 characters, uppercase, lowercase, number, and special character</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthSystem;
