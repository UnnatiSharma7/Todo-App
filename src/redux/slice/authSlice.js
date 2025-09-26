import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    username:'', // Mock user data
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload; // Save mock user details
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
