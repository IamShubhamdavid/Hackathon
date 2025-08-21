// src/components/EducationalResources.jsx
import React, { useState } from 'react';

const EducationalResources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'books', name: 'Books' },
    { id: 'courses', name: 'Online Courses' },
    { id: 'tools', name: 'Interactive Tools' },
    { id: 'challenges', name: 'Community Challenges' }
  ];

  const resources = [
    {
      id: 1,
      title: 'The Uninhabitable Earth',
      author: 'David Wallace-Wells',
      description: 'A must-read exploration of climate change impacts and our future on Earth. This book provides a stark look at what might happen if we fail to act.',
      category: 'books',
      type: 'Book',
      year: 2019,
      link: 'https://www.penguinrandomhouse.com/books/586541/the-uninhabitable-earth-by-david-wallace-wells/',
      featured: true
    },
    {
      id: 2,
      title: 'Drawdown: The Most Comprehensive Plan Ever Proposed to Reverse Global Warming',
      author: 'Paul Hawken',
      description: 'This New York Times bestseller offers 100 solutions to reverse global warming, based on research by leading scientists and policymakers.',
      category: 'books',
      type: 'Book',
      year: 2017,
      link: 'https://drawdown.org/the-book',
      featured: true
    },
    {
      id: 3,
      title: 'Climate Literacy MOOC',
      author: 'UN Climate Change',
      description: 'A free online course covering the science of climate change, its impacts, and solutions. Perfect for beginners and educators.',
      category: 'courses',
      type: 'Online Course',
      duration: '6 weeks',
      link: 'https://unccelearn.org/',
    },
    {
      id: 4,
      title: 'Plastic-Free Challenge',
      author: 'EcoSynergy Community',
      description: 'Join our 30-day challenge to reduce plastic consumption. Track your progress, earn badges, and compete with others!',
      category: 'challenges',
      type: 'Community Challenge',
      duration: '30 days',
      participants: '24,500+',
      link: '#',
    },
    {
      id: 5,
      title: 'The Sixth Extinction: An Unnatural History',
      author: 'Elizabeth Kolbert',
      description: 'Pulitzer Prize-winning book exploring the current mass extinction event caused by human activities.',
      category: 'books',
      type: 'Book',
      year: 2014,
      link: 'https://www.penguinrandomhouse.com/books/304515/the-sixth-extinction-by-elizabeth-kolbert/',
    },
    {
      id: 6,
      title: 'Carbon Footprint Calculator',
      author: 'Global Footprint Network',
      description: 'Calculate your personal ecological footprint and learn how to reduce your impact on the planet.',
      category: 'tools',
      type: 'Interactive Tool',
      link: 'https://www.footprintcalculator.org/',
    },
    {
      id: 7,
      title: 'Marine Biology and Conservation',
      author: 'Coursera & Duke University',
      description: 'Learn about marine ecosystems, biodiversity, and conservation strategies in this comprehensive online course.',
      category: 'courses',
      type: 'Online Course',
      duration: '8 weeks',
      link: 'https://www.coursera.org/learn/marine-biology',
    },
    {
      id: 8,
      title: 'Urban Tree Planting Initiative',
      author: 'EcoSynergy Community',
      description: 'Join our city-wide effort to plant 10,000 trees this year. Track your plantings and see collective impact.',
      category: 'challenges',
      type: 'Community Challenge',
      duration: 'Ongoing',
      participants: '8,200+',
      link: '#',
    },
    {
      id: 9,
      title: 'Braiding Sweetgrass',
      author: 'Robin Wall Kimmerer',
      description: 'A beautiful exploration of indigenous wisdom and scientific knowledge regarding our relationship with nature.',
      category: 'books',
      type: 'Book',
      year: 2013,
      link: 'https://milkweed.org/book/braiding-sweetgrass',
    },
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <section id="resources" className="resources" style={{ padding: '100px 0', background: '#f8f9fa' }}>
      <div className="container">
        <div className="section-title">
          <h2>Educational Resources</h2>
          <p>Expand your climate knowledge with our curated collection of books, courses, and tools</p>
        </div>
        
        <div className="categories" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: 'none',
                background: activeCategory === category.id ? 'var(--secondary)' : 'white',
                color: activeCategory === category.id ? 'white' : 'var(--dark)',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="resources-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {filteredResources.map(resource => (
            <div 
              key={resource.id} 
              className="resource-card"
              style={{
                background: '#eeddcc',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                borderTop: resource.featured ? '4px solid var(--accent)' : '4px solid var(--secondary)'
              }}
            >
              <div className="resource-header" style={{ padding: '25px', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{
                    background: resource.category === 'books' ? '#1a6b8a' : 
                              resource.category === 'courses' ? '#d35400' : 
                              resource.category === 'challenges' ? '#27ae60' : '#9b59b6',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {resource.type}
                  </span>
                  {resource.year && <span style={{ color: '#777' }}>{resource.year}</span>}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{resource.title}</h3>
                <p style={{ color: '#555', fontWeight: '500' }}>By {resource.author}</p>
              </div>
              
              <div className="resource-body" style={{ padding: '25px' }}>
                <p style={{ marginBottom: '20px', color: '#555' }}>{resource.description}</p>
                
                {resource.duration && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <i className="fas fa-clock" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                    <span>{resource.duration}</span>
                  </div>
                )}
                
                {resource.participants && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <i className="fas fa-users" style={{ color: 'var(--primary)', marginRight: '10px' }}></i>
                    <span>{resource.participants} participants</span>
                  </div>
                )}
                
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {resource.category === 'books' ? 'View Book' : 
                   resource.category === 'challenges' ? 'Join Challenge' : 'Explore Resource'}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="newsletter" style={{ marginTop: '60px', background: 'white', borderRadius: '15px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Stay Updated with Climate Education</h3>
          <p style={{ maxWidth: '600px', margin: '0 auto 30px', color: '#555' }}>
            Subscribe to our monthly newsletter for new book recommendations, course updates, and challenge announcements
          </p>
          <div style={{ display: 'flex', maxWidth: '500px', margin: '0 auto' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{
                flex: '1',
                padding: '15px 20px',
                border: '1px solid #ddd',
                borderRadius: '30px 0 0 30px',
                fontSize: '1rem'
              }}
            />
            <button style={{
              background: 'var(--secondary)',
              color: 'white',
              border: 'none',
              padding: '0 30px',
              borderRadius: '0 30px 30px 0',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalResources;