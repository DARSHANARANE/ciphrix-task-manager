import axiosInstance from '../api/axiosInstance';

export const getTasks = (page=1, limit=10) => axiosInstance.get(`/tasks?page=${page}&limit=${limit}`);
export const createTask = data => axiosInstance.post('/tasks', data);
export const updateTask = (id, data) => axiosInstance.put(`/tasks/${id}`, data);
export const deleteTask = id => axiosInstance.delete(`/tasks/${id}`);
