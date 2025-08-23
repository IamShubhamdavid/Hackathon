// import React, { useState } from 'react';

// const AuthSystem = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     userType: 'citizen' // Default user type
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');

//   // Validation functions (same as before)
//   const validateName = (name) => {
//     const nameRegex = /^[A-Za-z\s]{2,50}$/;
//     if (!name.trim()) return "Name is required";
//     if (!nameRegex.test(name)) return "Name should contain only letters and spaces (2-50 characters)";
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
      
//       // Reset form after successful submission
//       setTimeout(() => {
//         setSuccessMessage('');
//         if (!isLogin) {
//           setIsLogin(true);
//           setFormData({
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             userType: 'citizen'
//           });
//         } else {
//           setFormData({
//             ...formData,
//             password: ''
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
//                     <span style={{ fontWeight: '600', color: '#1a6b8a' }}>Concerneds</span>
//                     {/* <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#666' }}>
//                       Join as an individual to track your environmental impact and participate in community initiatives.
//                     </p> */}
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
//                     {/* <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#666' }}>
//                       Access detailed environmental data, contribute to research projects, and collaborate with other scientists.
//                     </p> */}
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
//                     {/* <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#666' }}>
//                       Register your NGO, business, or government agency to manage sustainability projects and track collective impact.
//                     </p> */}
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



import React, { useState } from 'react';
import { useNavigate } from 'react-router';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send this data to your backend
      console.log('Form data:', formData);
      
      // Show success message
      setSuccessMessage(isLogin ? 'Login successful!' : 'Account created successfully!');
      
      // After successful login/signup, redirect to homepage
      setTimeout(() => {
        setSuccessMessage('');
        
        if (isLogin) {
          // Redirect to homepage after login
          navigate('/');
        } else {
          // For signup, switch to login mode and clear form
          setIsLogin(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: 'citizen'
          });
        }
      }, 3000);
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