import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, createTask, updateTask, deleteTask } from '../../service/task.service';
import { Task } from '../../service/task.service';



export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (token: string) => {
  try {
    const response = await getTasks(token);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
});

export const createNewTask = createAsyncThunk('tasks/createTask', async ({ task, token }: { task: Task; token: string }) => { 
  try {
    const response = await createTask(task, token);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
});

export const updateExistingTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ taskId, updatedTask, token }: { taskId: string; updatedTask: Task; token: string }) => {
     
      try {
        
        const response = await updateTask(taskId, updatedTask, token);
        return response.data; 
      } catch (error: any) {
        console.log(error);
        
      }
    }
  );
  

export const deleteExistingTask = createAsyncThunk('tasks/deleteTask', async ({taskId, token}: {taskId: string; token: string}) => {
  
 
  try {
    await deleteTask(taskId, token);
    return taskId;
  } catch (error: any) {
    console.log(error);
  }
});


