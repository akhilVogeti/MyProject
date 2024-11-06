import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from './authThunk';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.status = 'idle'; 
      state.error = null;
    }
  },

  extraReducers: (builder) => {
   
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction< string >) => {
        state.status = 'succeeded';
        state.token = action.payload; 
      })
      .addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.error = action.payload instanceof Error ? action.payload.message : String(action.payload);
      })
      
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = 'failed';
        state.error = action.payload instanceof Error ? action.payload.message : String(action.payload);
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
