import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/authService';


export const login = createAsyncThunk(
  'auth/login', 
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(email, password);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null, 
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token'); 
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; 
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
