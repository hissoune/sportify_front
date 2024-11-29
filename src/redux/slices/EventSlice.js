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

export const createEvent = createAsyncThunk(
    'events/create',
    async (formdata,{ rejectWithValue })=>{
        try {
            const response = await EventsService.createEvent(formdata); 
            return response; 
        } catch (error) {
      
            return rejectWithValue(error.response ? error.response.data : 'An error occurred');
        }
    }
);

export const updateEvent = createAsyncThunk(
    'events/update',
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        const response = await EventsService.updateEvent(id, formData); 
        return  response ;
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
            })
            .addCase(createEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events = [...state.events, action.payload]; 
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = false;
                const { id, data } = action.payload;
                state.events = state.events.map((event) =>
                  event.id === id ? { ...event, ...data } : event
                );
              })
              .addCase(updateEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
    }
});

export default eventsSlice.reducer;
