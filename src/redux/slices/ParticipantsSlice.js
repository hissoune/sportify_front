import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ParticipantService from '../../services/ParticipantService';

export const getAllParticipants = createAsyncThunk(
  'participants/getAll', 
  async (_, { rejectWithValue }) => {
    
    try {
      const response = await ParticipantService.getAllParticipants();
      console.log(response);
      
      return response; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
  }
);

export const createParticipant = createAsyncThunk(
    'participants/create',
    async (formData, { rejectWithValue }) => {
        console.log(formData);
        
        console.log(name)
      try {
        const response = await ParticipantService.createParticipant(formData);
        return response; 
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : 'An error occurred');
      }
    }
  );

const initialState = {
  participants: [],
  participant: {}, 
  loading: false,
  error: null,
};

const participantSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllParticipants.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(getAllParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload; 
      })
      .addCase(getAllParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(createParticipant.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createParticipant.fulfilled, (state, action) => {
        state.createLoading = false;
        state.participants.push(action.payload);
      })
      .addCase(createParticipant.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload; 
      });
  },
});

export const { resetError } = participantSlice.actions; 

export default participantSlice.reducer;
