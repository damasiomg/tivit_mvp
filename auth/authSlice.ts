import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types/user';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action?.payload ?? null;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action?.payload ?? 'Erro desconhecido';
    },
    logoutAction(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    restoreSession(state, action: PayloadAction<AuthUser>) {
      state.user = action?.payload ?? null;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutAction, restoreSession, clearError } = authSlice.actions;
export default authSlice.reducer;
