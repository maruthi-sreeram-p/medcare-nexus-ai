import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  role: 'ROLE_ADMIN' | 'ROLE_DOCTOR' | 'ROLE_PATIENT' | 'ROLE_STAFF';
  phone?: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

const initialState: AuthState = {
  token: savedToken,
  user: savedUser,
  isAuthenticated: !!savedToken,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: UserProfile }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
