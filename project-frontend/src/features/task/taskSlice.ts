import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, createNewTask, updateExistingTask, deleteExistingTask } from './taskThunk';
import { Task } from '../../service/task.service';

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;  
      })
      .addCase(fetchTasks.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.error = action.payload instanceof Error ? action.payload.message : String(action.payload);
      })
      .addCase(createNewTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);  
      })
      .addCase(createNewTask.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.error = action.payload instanceof Error ? action.payload.message : String(action.payload);
      })
      .addCase(updateExistingTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExistingTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;  
        }
      })
      .addCase(updateExistingTask.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.error = action.payload instanceof Error ? action.payload.message : String(action.payload);
      })
      .addCase(deleteExistingTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteExistingTask.fulfilled, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter((task) => task._id !== action.payload); 
      })
      .addCase(deleteExistingTask.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.error = action.payload instanceof Error ? action.payload.message : String(action.payload);
      });
  },
});

export default tasksSlice.reducer;






