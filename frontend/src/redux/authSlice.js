import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const email = localStorage.getItem('email');
const userId = localStorage.getItem('userId');

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  role: role || null,
  email: email || null,
  userId: userId || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.userId = action.payload.id;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('userId', action.payload.id);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.email = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
    },
    updateProfile: (state, action) => {
      state.email = action.payload.email || state.email;
      if (action.payload.email) localStorage.setItem('email', action.payload.email);
    }
  },
});

export const { loginSuccess, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
