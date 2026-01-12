// import { api } from './api';

// export const getCategories = () =>
//   api.get('/categories');

// export const createCategory = (data: any) =>
//   api.post('/categories', data);

// export const updateCategory = (id: string, data: any) =>
//   api.put(`/categories/${id}`, data);

// export const deleteCategory = (id: string) =>
//   api.delete(`/categories/${id}`);

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3002', // product-service
});

// 🔑 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET (public)
export const getCategories = () => API.get('/categories');

// ADMIN ONLY
export const createCategory = (data: any) =>
  API.post('/categories', data);

export const updateCategory = (id: string, data: any) =>
  API.put(`/categories/${id}`, data);

export const deleteCategory = (id: string) =>
  API.delete(`/categories/${id}`);
