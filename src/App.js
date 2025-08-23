// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import EducationalResources from './components/EducationalResources';
import GlobalDataIntegration from './components/GlobalDataIntegration';
import SustainabilityScorecards from './components/SustainabilityScorecards';
import CollaborationPortal from './components/CollaborationPortal';
import RealTimeDashboards from './components/RealTimeDashboards';
import AuthSystem from './components/AuthSystem'; 
import CrowdsourcedDataCollection from './components/CrowdsourcedDataCollection';
import EnvironmentalDashboards from './components/EnvironmentalDashboards';
import Profile from './components/profile';
import MyContribution from './components/MyContribution';
import ApiTest from './components/ApiTest';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ApiTest />
          <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <CollaborationPortal />
              <CrowdsourcedDataCollection/>
              {/* <Route path="/Dashboard" element={<SustainabilityScorecards />} /> */} 
              {/* <Dashboard /> */}
              <RealTimeDashboards />
              <Impact />
              <SustainabilityScorecards />
              <GlobalDataIntegration />
              <EducationalResources />
              <CTA />
            </>
          } />
          
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/login" element={<AuthSystem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-contribution" element={<MyContribution />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;