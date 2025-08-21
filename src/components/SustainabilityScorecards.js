// src/components/SustainabilityScorecards.jsx
import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SustainabilityScorecards = () => {
  const [activeLevel, setActiveLevel] = useState('national');
  const [timeRange, setTimeRange] = useState('yearly');
  const [reportData, setReportData] = useState(null);
  
  // Mock data for demonstration
  const sdgData = {
    national: {
      sdg13: { current: 65, target: 85, trend: [58, 60, 62, 64, 65] },
      sdg14: { current: 42, target: 70, trend: [35, 37, 39, 40, 42] },
      sdg15: { current: 58, target: 80, trend: [50, 52, 54, 56, 58] },
    },
    regional: {
      sdg13: { current: 60, target: 85, trend: [52, 55, 57, 58, 60] },
      sdg14: { current: 38, target: 70, trend: [30, 32, 35, 36, 38] },
      sdg15: { current: 55, target: 80, trend: [48, 50, 52, 53, 55] },
    },
    local: {
      sdg13: { current: 70, target: 85, trend: [62, 64, 66, 68, 70] },
      sdg14: { current: 45, target: 70, trend: [38, 40, 42, 43, 45] },
      sdg15: { current: 62, target: 80, trend: [55, 57, 59, 60, 62] },
    }
  };
  
  const generateReport = () => {
    setReportData({
      title: "Sustainability Progress Report",
      date: new Date().toLocaleDateString(),
      level: activeLevel.charAt(0).toUpperCase() + activeLevel.slice(1),
      data: sdgData[activeLevel]
    });
  };
  
  const exportReport = () => {
    // In a real app, this would generate a PDF or CSV
    alert(`Report exported for ${activeLevel} level. In a real application, this would download a PDF or CSV file.`);
  };
  
  // Chart data for SDG progress
  const progressChartData = {
    labels: ['SDG 13: Climate Action', 'SDG 14: Life Below Water', 'SDG 15: Life on Land'],
    datasets: [
      {
        label: 'Current Progress',
        data: [
          sdgData[activeLevel].sdg13.current,
          sdgData[activeLevel].sdg14.current,
          sdgData[activeLevel].sdg15.current
        ],
        backgroundColor: ['#e5243b', '#0a97d9', '#56c02b'],
      },
      {
        label: 'Target',
        data: [
          sdgData[activeLevel].sdg13.target,
          sdgData[activeLevel].sdg14.target,
          sdgData[activeLevel].sdg15.target
        ],
        backgroundColor: 'rgba(100, 100, 100, 0.2)',
        borderColor: 'rgba(100, 100, 100, 1)',
        borderWidth: 1,
        type: 'bar',
      }
    ]
  };
  
  // Trend data for line charts
  const trendChartData = (sdg) => ({
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Progress',
        data: sdgData[activeLevel][sdg].trend,
        borderColor: sdg === 'sdg13' ? '#e5243b' : sdg === 'sdg14' ? '#0a97d9' : '#56c02b',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Target',
        data: Array(5).fill(sdgData[activeLevel][sdg].target),
        borderColor: 'rgba(100, 100, 100, 0.5)',
        borderDash: [5, 5],
        backgroundColor: 'rgba(100, 100, 100, 0)',
        pointRadius: 0,
      }
    ]
  });
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <section id="scorecards" className="scorecards" style={{ padding: '100px 0', background: '#f8f9fa' }}>
      <div className="container">
        <div className="section-title">
          <h2>Sustainability Scorecards</h2>
          <p>Track progress against SDG goals at local, regional, and national levels</p>
        </div>
        
        <div className="controls" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div className="level-selector" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['national', 'regional', 'local'].map(level => (
              <button
                key={level}
                className={`level-btn ${activeLevel === level ? 'active' : ''}`}
                onClick={() => setActiveLevel(level)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeLevel === level ? 'var(--secondary)' : 'white',
                  color: activeLevel === level ? 'white' : 'var(--dark)',
                  cursor: 'pointer',
                  fontWeight: '500',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                  textTransform: 'capitalize'
                }}
              >
                {level}
              </button>
            ))}
          </div>
          
          <div className="time-selector" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: '500' }}>Time Range:</span>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                padding: '10px 15px',
                borderRadius: '30px',
                border: '1px solid #ddd',
                background: 'white'
              }}
            >
              <option value="yearly">Yearly</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        
        <div className="overview" style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          marginBottom: '40px'
        }}>
          <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>SDG Progress Overview</h3>
          <div style={{ height: '400px' }}>
            <Bar data={progressChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="sdg-trends" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px',
          marginBottom: '40px'
        }}>
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#e5243b' }}>SDG 13: Climate Action</h3>
              <div style={{ 
                background: 'rgba(229, 36, 59, 0.1)', 
                color: '#e5243b', 
                padding: '5px 15px', 
                borderRadius: '20px',
                fontWeight: '600'
              }}>
                {sdgData[activeLevel].sdg13.current}%
              </div>
            </div>
            <div style={{ height: '250px' }}>
              <Line data={trendChartData('sdg13')} options={chartOptions} />
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Target: {sdgData[activeLevel].sdg13.target}%</span>
              <span>Gap: {sdgData[activeLevel].sdg13.target - sdgData[activeLevel].sdg13.current}%</span>
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#0a97d9' }}>SDG 14: Life Below Water</h3>
              <div style={{ 
                background: 'rgba(10, 151, 217, 0.1)', 
                color: '#0a97d9', 
                padding: '5px 15px', 
                borderRadius: '20px',
                fontWeight: '600'
              }}>
                {sdgData[activeLevel].sdg14.current}%
              </div>
            </div>
            <div style={{ height: '250px' }}>
              <Line data={trendChartData('sdg14')} options={chartOptions} />
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Target: {sdgData[activeLevel].sdg14.target}%</span>
              <span>Gap: {sdgData[activeLevel].sdg14.target - sdgData[activeLevel].sdg14.current}%</span>
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#56c02b' }}>SDG 15: Life on Land</h3>
              <div style={{ 
                background: 'rgba(86, 192, 43, 0.1)', 
                color: '#56c02b', 
                padding: '5px 15px', 
                borderRadius: '20px',
                fontWeight: '600'
              }}>
                {sdgData[activeLevel].sdg15.current}%
              </div>
            </div>
            <div style={{ height: '250px' }}>
              <Line data={trendChartData('sdg15')} options={chartOptions} />
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Target: {sdgData[activeLevel].sdg15.target}%</span>
              <span>Gap: {sdgData[activeLevel].sdg15.target - sdgData[activeLevel].sdg15.current}%</span>
            </div>
          </div>
        </div>
        
        <div className="reporting" style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--primary)' }}>Reporting & Decision Support</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={generateReport}
                className="btn"
                style={{ background: 'var(--secondary)', padding: '10px 20px' }}
              >
                Generate Report
              </button>
              <button 
                onClick={exportReport}
                className="btn"
                style={{ background: 'var(--primary)', padding: '10px 20px' }}
              >
                Export Data
              </button>
            </div>
          </div>
          
          {reportData ? (
            <div className="report-preview" style={{ 
              border: '1px solid #eee', 
              borderRadius: '10px', 
              padding: '20px',
              marginTop: '20px'
            }}>
              <h4 style={{ marginBottom: '15px' }}>{reportData.title} - {reportData.level} Level</h4>
              <p style={{ marginBottom: '20px' }}>Generated on: {reportData.date}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'rgba(229, 36, 59, 0.05)', padding: '15px', borderRadius: '8px' }}>
                  <h5 style={{ color: '#e5243b' }}>SDG 13: Climate Action</h5>
                  <p>Progress: {reportData.data.sdg13.current}%</p>
                  <p>Target: {reportData.data.sdg13.target}%</p>
                  <p>Trend: {reportData.data.sdg13.trend[reportData.data.sdg13.trend.length - 1] - reportData.data.sdg13.trend[0]}% improvement</p>
                </div>
                
                <div style={{ background: 'rgba(10, 151, 217, 0.05)', padding: '15px', borderRadius: '8px' }}>
                  <h5 style={{ color: '#0a97d9' }}>SDG 14: Life Below Water</h5>
                  <p>Progress: {reportData.data.sdg14.current}%</p>
                  <p>Target: {reportData.data.sdg14.target}%</p>
                  <p>Trend: {reportData.data.sdg14.trend[reportData.data.sdg14.trend.length - 1] - reportData.data.sdg14.trend[0]}% improvement</p>
                </div>
                
                <div style={{ background: 'rgba(86, 192, 43, 0.05)', padding: '15px', borderRadius: '8px' }}>
                  <h5 style={{ color: '#56c02b' }}>SDG 15: Life on Land</h5>
                  <p>Progress: {reportData.data.sdg15.current}%</p>
                  <p>Target: {reportData.data.sdg15.target}%</p>
                  <p>Trend: {reportData.data.sdg15.trend[reportData.data.sdg15.trend.length - 1] - reportData.data.sdg15.trend[0]}% improvement</p>
                </div>
              </div>
              
              <div style={{ marginTop: '30px' }}>
                <h5>Recommendations:</h5>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Prioritize investments in renewable energy to accelerate progress on SDG 13</li>
                  <li>Expand marine protected areas to improve SDG 14 metrics</li>
                  <li>Implement reforestation programs to boost SDG 15 progress</li>
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '200px',
              border: '2px dashed #eee',
              borderRadius: '10px',
              marginTop: '20px'
            }}>
              <p style={{ color: '#777' }}>Generate a report to see detailed insights and recommendations</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityScorecards;