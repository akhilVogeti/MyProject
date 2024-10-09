import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
      },
});

export interface Credentials {
    username: string,
    password: string
}

export interface Task {
    _id : string,
    title: string,
    completed: boolean,
    description: string,
}

export const login = (credentials : Credentials) => api.post('/auth/login', credentials);
export const register = (userData : Credentials) => api.post('/auth/register', userData);
export const getTasks = (token : string | null) => api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (taskData : Task, token : string) => api.post('/tasks', taskData, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id : string, taskData: Task, token : string) => {
  console.log(`in the updatetask in api.ts in frontend`);
  console.log(`id is ${id}`);
  console.log(`taskdata is ${JSON.stringify(taskData)}`)
  api.put(`/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } })
};

export const deleteTask = (id : string, token : string) => api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const logout = () => {
  localStorage.removeItem('token');
};


