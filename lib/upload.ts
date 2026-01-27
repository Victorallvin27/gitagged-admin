import { api } from './api';

export const uploadProductImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/products/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadCategoryImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/categories/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadGiRegionImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/gi-regions/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
