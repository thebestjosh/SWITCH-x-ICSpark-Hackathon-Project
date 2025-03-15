import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
const authAPI = {
  register: async (userData: { username: string; email: string; password: string; name: string }) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  updatePreferences: async (userId: string, preferences: any) => {
    const response = await api.put(`/users/${userId}/preferences`, preferences);
    return response.data;
  },
  
  deleteAccount: async (userId: string) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  }
};

// Forum API
const forumAPI = {
  getAllPosts: async () => {
    const response = await api.get('/forum');
    return response.data;
  },
  
  getPostById: async (postId: string) => {
    const response = await api.get(`/forum/${postId}`);
    return response.data;
  },
  
  getPostsByCategory: async (category: string) => {
    const response = await api.get(`/forum/category/${category}`);
    return response.data;
  },
  
  createPost: async (postData: any) => {
    const response = await api.post('/forum', postData);
    return response.data;
  },
  
  addComment: async (postId: string, commentData: any) => {
    const response = await api.post(`/forum/${postId}/comments`, commentData);
    return response.data;
  },
  
  likePost: async (postId: string) => {
    const response = await api.post(`/forum/${postId}/like`);
    return response.data;
  }
};

// Resources API
const resourcesAPI = {
  getAllResources: async () => {
    const response = await api.get('/resources');
    return response.data;
  },
  
  getResourcesByCategory: async (category: string) => {
    const response = await api.get(`/resources/category/${category}`);
    return response.data;
  }
};

// Learning API
const learningAPI = {
  getAllModules: async () => {
    const response = await api.get('/learning/modules');
    return response.data;
  },
  
  getModuleById: async (moduleId: string) => {
    const response = await api.get(`/learning/modules/${moduleId}`);
    return response.data;
  },
  
  getModulesByCategory: async (category: string) => {
    const response = await api.get(`/learning/modules/category/${category}`);
    return response.data;
  },
  
  markModuleCompleted: async (moduleId: string, userId: string) => {
    const response = await api.post(`/learning/modules/${moduleId}/complete`, { userId });
    return response.data;
  }
};

// Quiz API
const quizAPI = {
  submitQuizResult: async (quizResult: any) => {
    const response = await api.post('/learning/quiz-results', quizResult);
    return response.data;
  },
  
  getQuizResults: async (userId: string) => {
    const response = await api.get(`/learning/quiz-results/${userId}`);
    return response.data;
  },
  
  getQuizResultsByModule: async (moduleId: string) => {
    const response = await api.get(`/learning/quiz-results/module/${moduleId}`);
    return response.data;
  }
};

export { authAPI, forumAPI, resourcesAPI, learningAPI, quizAPI };