import React from 'react';
import { useAuth } from '../context/AuthContext';

const MyContribution = () => {
  const { user } = useAuth();
  if (!user) return <div>Please login to view your contributions.</div>;
  return (
    <div style={{padding: '40px'}}>
      <h2>My Contribution</h2>
      <p>Here you can see your contributions to EcoHarmony.</p>
      {/* Add actual contribution data here */}
    </div>
  );
};

export default MyContribution;