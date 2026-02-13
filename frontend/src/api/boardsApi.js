import api from './axios';

export const boardsApi = {
  getAll: (projectId) => api.get(`/projects/${projectId}/boards`),
};
