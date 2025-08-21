// src/components/Dashboard.js
// import React, { useState } from 'react';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('Deforestation');
  
//   const tabs = ['Deforestation', 'Marine Health', 'Biodiversity', 'Carbon Emissions'];
  
//   const statsData = [
//     { title: "Forest Cover Lost (2023)", value: "4.1M ha" },
//     { title: "Protected Areas", value: "217,155" },
//     { title: "Reforestation Projects", value: "14,682" },
//     { title: "Community Participants", value: "2.4M+" }
//   ];
  
//   return (
//     <section id="dashboard" className="dashboard">
//       <div className="container">
//         <div className="section-title">
//           <h2>Real-Time Environmental Dashboard</h2>
//           <p>Interactive visualizations of global environmental data for informed decision-making</p>
//         </div>
        
//         <div className="dashboard-container">
//           <div className="dashboard-header">
//             <h3>Global Environmental Monitoring</h3>
//             <ul className="dashboard-tabs">
//               {tabs.map(tab => (
//                 <li 
//                   key={tab} 
//                   className={activeTab === tab ? 'active' : ''}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab}
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div className="dashboard-content">
//             <div className="map-container">
//               <div className="map-overlay">
//                 <h4>Global {activeTab} {activeTab === 'Deforestation' ? 'Hotspots' : 'Metrics'}</h4>
//                 <p>Real-time monitoring with satellite and crowdsourced data</p>
//               </div>
//             </div>
            
//             <div className="stats-container">
//               {statsData.map((stat, index) => (
//                 <div key={index} className="stat-card">
//                   <h4>{stat.title}</h4>
//                   <div className="stat-value">{stat.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Dashboard;