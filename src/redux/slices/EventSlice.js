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
        console.log(formdata);
        
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


  export const deleteEvent = createAsyncThunk(
    'events/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await EventsService.delteEvent(id); 
            return id; 
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'An error occurred');
        }
    }
);
export const getEventById = createAsyncThunk(
    'events/getEventById', 
    async (id, { rejectWithValue }) => {
        try {
            const response = await EventsService.getEventById(id); 
            return response; 
        } catch (error) {
      
            return rejectWithValue(error.response ? error.response.data : 'An error occurred');
        }
    }
)

export const removeParticipant = createAsyncThunk(
    'events/removeparticipant',
    async ({participantId,eventId}, { rejectWithValue }) => {
        console.log('parra',participantId);
        
        try {
            const response = await EventsService.removeParticipant(participantId,eventId);
            console.log(response);
             
            return response; 
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'An error occurred');
        }
    }
)

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
              })
              .addCase(getEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.event = action.payload;  
            })
            .addCase(getEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeParticipant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeParticipant.fulfilled, (state, action) => {
                state.loading = false;
                const { participantId, eventId } = action.payload;
                
                if (state.event.id === eventId) {
                    state.event.participants = state.event.participants.filter(p => p.id !== participantId);
                } else {
                    state.events = state.events.map((event) =>
                        event.id === eventId
                            ? { ...event, participants: event.participants.filter(p => p.id !== participantId) }
                            : event
                    );
                }
            })
            .addCase(removeParticipant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
              .addCase(deleteEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events = state.events.filter(event => event.id !== action.payload);
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
    }
});

export default eventsSlice.reducer;
