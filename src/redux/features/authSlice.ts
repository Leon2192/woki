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
  },
});

export const { setUser, setLoading, setError, clearError } = authSlice.actions;

export default authSlice.reducer;
