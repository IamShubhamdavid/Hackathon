// API service layer for handling HTTP requests to the backend
const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    try {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid response from server');
      }
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData)
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials)
      });

      const data = await this.handleResponse(response);

      // Store token in localStorage
      if (data.success && data.data.token) {
        localStorage.setItem('authToken', data.data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        apiUrl: `${this.baseURL}/auth/login`
      });

      // Handle specific error types
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(`Unable to connect to server at ${this.baseURL}. Please check if the backend is running.`);
      }

      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${this.baseURL}/auth/me`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Profile management endpoints
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Contributions endpoints
  async submitEnvironmentalData(dataSubmission) {
    try {
      const response = await fetch(`${this.baseURL}/contributions/environmental-data`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(dataSubmission)
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Submit environmental data error:', error);
      throw error;
    }
  }

  async submitBlogPost(blogData) {
    try {
      const response = await fetch(`${this.baseURL}/contributions/blog-posts`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(blogData)
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Submit blog post error:', error);
      throw error;
    }
  }

  async getUserContributions() {
    try {
      const response = await fetch(`${this.baseURL}/contributions/my-contributions`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Get user contributions error:', error);
      throw error;
    }
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      console.log('API connection test successful:', data);
      return data;
    } catch (error) {
      console.error('API connection test failed:', error);
      throw error;
    }
  }

  // Utility methods
  logout() {
    localStorage.removeItem('authToken');
  }

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  getToken() {
    return localStorage.getItem('authToken');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
