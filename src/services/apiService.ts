// API service for communicating with the Node.js backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  token?: string;
  user?: any;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data: ApiResponse<T> = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }
    
    return data;
  }

  // Auth endpoints
  async register(userData: { name: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    const result = await this.handleResponse(response);
    
    if (result.success && result.token) {
      localStorage.setItem('authToken', result.token);
    }
    
    return result.data;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials)
    });
    
    const result = await this.handleResponse(response);
    
    if (result.success && result.token) {
      localStorage.setItem('authToken', result.token);
    }
    
    return result;
  }

  async verifyToken() {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: this.getAuthHeaders()
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  // Analysis endpoints
  async generateAnalysis(questionnaireData: any) {
    const response = await fetch(`${API_BASE_URL}/analysis/generate`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ questionnaireData })
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  async getAnalysisHistory(page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/analysis/history?page=${page}&limit=${limit}`, {
      headers: this.getAuthHeaders()
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  async getAnalysis(id: string) {
    const response = await fetch(`${API_BASE_URL}/analysis/${id}`, {
      headers: this.getAuthHeaders()
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  async deleteAnalysis(id: string) {
    const response = await fetch(`${API_BASE_URL}/analysis/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  // User endpoints
  async getUserProfile() {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getAuthHeaders()
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  async updateProfile(profileData: { name: string; email: string }) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  async changePassword(passwordData: { currentPassword: string; newPassword: string }) {
    const response = await fetch(`${API_BASE_URL}/users/password`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(passwordData)
    });
    
    const result = await this.handleResponse(response);
    return result.data;
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await this.handleResponse(response);
    return result.data;
  }
}

export const apiService = new ApiService();
export default apiService;