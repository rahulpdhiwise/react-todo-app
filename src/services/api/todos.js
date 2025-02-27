import axios from 'axios';
import { getToken, refreshToken } from './auth';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Refresh token
        await refreshToken();
        
        // Update auth header with new token
        originalRequest.headers.Authorization = `Bearer ${getToken()}`;
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Get all todos
export const getTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch todos');
  }
};

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/todos', todoData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to create todo');
  }
};

// Update a todo
export const updateTodo = async (id, todoData) => {
  try {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update todo');
  }
};

// Update todo status
export const updateTodoStatus = async (id, completed) => {
  try {
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update todo status');
  }
};

// Update todo rating
export const updateTodoRating = async (id, rating) => {
  try {
    const response = await api.put(`/todos/${id}/rating`, { rating });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update todo rating');
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete todo');
  }
};
