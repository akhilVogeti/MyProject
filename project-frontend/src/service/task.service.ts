import {APIService} from './api.service';

export interface Task {
  _id : string,
  title: string,
  completed: boolean,
  description: string,
}

const apiService = new APIService();

export const getTasks = (token : string ) => {
    apiService.setAuthHeaders(token);
    return apiService.get('/tasks');
}

export const createTask = (taskData : Task, token : string ) => {
  apiService.setAuthHeaders(token);
  return apiService.post('/tasks', taskData);
}

export const updateTask = (id : string, taskData: Task, token : string ) => {
  apiService.setAuthHeaders(token);
  return apiService.put(`/tasks/${id}`, taskData);
};


export const deleteTask = (id : string, token : string | null) => {
  apiService.setAuthHeaders(token);
  return apiService.delete(`/tasks/${id}`);
}


