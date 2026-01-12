import { api } from './api';

export const getRegions = () => api.get('/gi-regions');

export const createRegion = (data: any) =>
  api.post('/gi-regions', data);

export const updateRegion = (id: string, data: any) =>
  api.put(`/gi-regions/${id}`, data);

export const deleteRegion = (id: string) =>
  api.delete(`/gi-regions/${id}`);
