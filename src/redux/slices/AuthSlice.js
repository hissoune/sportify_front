import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';


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

export  const register = createAsyncThunk(
    'auth/register',
    async (formData,{rejectWithValue})=>{
        try {
            const response = await AuthService.register(formData)
            return response;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem('token') || null, 
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); 
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
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })
      .addCase(register.pending, (state)=>{
        state.isLoading=true;
        state.error = null;
    
      })
      .addCase(register.fulfilled, (state,action)=>{
        state.isLoading=false;
        state.user = action.payload.user
      })
      .addCase(register.rejected,(state,action)=>{
         state.isLoading= false;
         state.error = action.payload;
      })
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
