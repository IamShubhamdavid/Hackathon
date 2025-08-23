import React, { useState } from 'react';
import apiService from '../services/api';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    try {
      const result = await apiService.testConnection();
      setTestResult(`✅ API Connection Successful: ${JSON.stringify(result)}`);
    } catch (error) {
      setTestResult(`❌ API Connection Failed: ${error.message}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await apiService.login({
        email: 'jane.smith@example.com',
        password: 'SecurePass123!'
      });
      setTestResult(`✅ Login Test Successful: ${JSON.stringify(result)}`);
    } catch (error) {
      setTestResult(`❌ Login Test Failed: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '2px solid #1a6b8a',
      borderRadius: '8px',
      padding: '15px',
      zIndex: 9999,
      maxWidth: '300px',
      fontSize: '12px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#1a6b8a' }}>API Debug Panel</h4>
      
      <button 
        onClick={testApiConnection}
        disabled={loading}
        style={{
          background: '#1a6b8a',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          marginRight: '5px',
          cursor: 'pointer'
        }}
      >
        Test Connection
      </button>
      
      <button 
        onClick={testLogin}
        disabled={loading}
        style={{
          background: '#27ae60',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Login
      </button>
      
      {loading && <div style={{ marginTop: '10px' }}>Testing...</div>}
      
      {testResult && (
        <div style={{
          marginTop: '10px',
          padding: '8px',
          background: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
          borderRadius: '4px',
          wordBreak: 'break-word'
        }}>
          {testResult}
        </div>
      )}
    </div>
  );
};

export default ApiTest;
