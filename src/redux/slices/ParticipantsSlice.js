import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ParticipantService from '../../services/ParticipantService';

export const getAllParticipants = createAsyncThunk(
  'participants/getAll', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await ParticipantService.getAllParticipants();
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
      });
  },
});

export const { resetError } = participantSlice.actions; 

export default participantSlice.reducer;
