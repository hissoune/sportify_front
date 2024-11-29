import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import eventReducer from './slices/EventSlice';
import participantReducer from './slices/ParticipantsSlice';

const store = configureStore({
    
  reducer: {
    auth: authReducer, 
    events: eventReducer, 
    participants: participantReducer,
  },
});

export default store;