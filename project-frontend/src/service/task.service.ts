import axios from 'axios';

export interface Task {
  _id : string,
  title: string,
  completed: boolean,
  description: string,
}

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
      },
});

export const getTasks = (token : string | null) => api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (taskData : Task, token : string | null) => api.post('/tasks', taskData, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id : string, taskData: Task, token : string | null) => {
  return api.put(`/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } })
};
export const deleteTask = (id : string, token : string | null) => api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });


