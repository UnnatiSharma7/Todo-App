import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slice/weatherSlice'; // Your slice file
import authReducer from './slice/authSlice';
import {thunk} from 'redux-thunk'; // Corrected import

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    auth: authReducer, // Register reducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Apply redux-thunk
});

export default store;
