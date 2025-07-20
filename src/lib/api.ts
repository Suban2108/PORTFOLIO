// API service functions for portfolio management

import axios from 'axios';

const API_BASE_URL = '/api';

// Generic API request function using axios
async function apiRequest(endpoint: string, options: any = {}) {
  const token = localStorage.getItem('portfolio_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };
  const axiosConfig = {
    method: options.method || 'GET',
    url: `${API_BASE_URL}${endpoint}`,
    headers,
    data: options.body ? JSON.parse(options.body) : undefined,
    ...options,
  };
  try {
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error: any) {
    const errData = error.response?.data || { error: error.message };
    // Log the error for debugging
    console.error('API Error:', errData.error || errData);
    throw new Error(errData.error || JSON.stringify(errData));
  }
}

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response;
  },

  verifyToken: async (token: string) => {
    const response = await apiRequest('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    return response;
  },
};

// Skills API
export const skillsAPI = {
  getAll: async () => {
    const response = await apiRequest('/skills');
    return response.data;
  },

  create: async (category: { title: string; skills?: any[] }) => {
    const response = await apiRequest('/skills', {
      method: 'POST',
      body: JSON.stringify(category),
    });
    return response.data;
  },

  update: async (id: number, category: { title?: string; skills?: any[] }) => {
    const response = await apiRequest('/skills', {
      method: 'PUT',
      body: JSON.stringify({ id, ...category }),
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiRequest(`/skills?id=${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await apiRequest('/projects');
    return response.data;
  },

  create: async (project: {
    title: string;
    description: string;
    image?: string;
    technologies?: string[];
    link?: string;
    github?: string;
  }) => {
    const response = await apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    return response.data;
  },

  update: async (id: number, project: {
    title?: string;
    description?: string;
    image?: string;
    technologies?: string[];
    link?: string;
    github?: string;
  }) => {
    const response = await apiRequest('/projects', {
      method: 'PUT',
      body: JSON.stringify({ id, ...project }),
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiRequest(`/projects?id=${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};

// Experience API
export const experienceAPI = {
  getAll: async () => {
    const response = await apiRequest('/experience');
    return response.data;
  },

  create: async (experience: {
    title: string;
    company: string;
    period?: string;
    description: string;
    achievements?: string[];
    iconUrl?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await apiRequest('/experience', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
    return response.data;
  },

  update: async (id: number, experience: {
    title?: string;
    company?: string;
    period?: string;
    description?: string;
    achievements?: string[];
    iconUrl?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await apiRequest('/experience', {
      method: 'PUT',
      body: JSON.stringify({ id, ...experience }),
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiRequest(`/experience?id=${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};

// Error handling utility
export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

// Response wrapper
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 