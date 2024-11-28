import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EventsService from '../../services/EventsService';

export const getAllEvents = createAsyncThunk(
    'events/getAll', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await EventsService.getAllEvents(); 
            return response; 
        } catch (error) {
      
            return rejectWithValue(error.response ? error.response.data : 'An error occurred');
        }
    }
);

const initialState = {
    events: [],
    event:{},
    loading: false,
    error: null
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(getAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default eventsSlice.reducer;
