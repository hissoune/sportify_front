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
        
       
      try {
        const response = await ParticipantService.createParticipant(formData);
        return response; 
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : 'An error occurred');
      }
    }
  );

  export const updateParticipant =createAsyncThunk(
    'participant/update',
    async ({ id, formData }, { rejectWithValue })=>{
        try {
            const response = await ParticipantService.updateParticipant(id, formData); 
            return  response ;
          } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'An error occurred');
          }

    }
  );

  export const deleteParticipant = createAsyncThunk(
    'participants/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await ParticipantService.deleteParticipant(id); 
            return id; 
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'An error occurred');
        }
    }
  )

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
      })
      .addCase(updateParticipant.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParticipant.fulfilled, (state,action)=>{
        state.loading = false;
        const { id, data } = action.payload;
        state.participants = state.participants.map((participant) => 
            participant._id === id ? { ...participant, ...data } : participant
          );
          
      })
      .addCase(updateParticipant.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteParticipant.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParticipant.fulfilled, (state,action)=>{
        state.loading = false;
        state.participants = state.participants.filter(participant => participant.id !== action.payload);
      })
      .addCase(deleteParticipant.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetError } = participantSlice.actions; 

export default participantSlice.reducer;
