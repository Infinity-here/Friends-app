import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const initialState = {
  user: localStorage.getItem('token') || null,
  decodedUser: localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.decodedUser = jwt_decode(action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.decodedUser = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
