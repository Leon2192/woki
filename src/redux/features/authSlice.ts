import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/interfaces';

const initialState = {
  user: null as IUser | null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    loadUserFromStorage(state) {
      const user = localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
      }
    }
  },
});

export const { setUser, setLoading, setError, clearError, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
