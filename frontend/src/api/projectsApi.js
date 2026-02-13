import api from './axios';

export const projectsApi = {
  getAll: () => api.get('/projects'),
};
