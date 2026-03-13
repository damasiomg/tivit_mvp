import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { loginStart, loginSuccess, loginFailure, logoutAction, restoreSession, clearError } from './authSlice';
import * as authService from './authService';
import type { LoginCredentials } from '@/types/user';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state?.auth ?? { user: null, isAuthenticated: false, isLoading: false, error: null }
  );

  useEffect(() => {
    const stored = authService.getStoredAuth();
    if (stored?.token && !isAuthenticated) {
      dispatch(restoreSession({
        username: stored?.username ?? '',
        role: (stored?.role as 'user' | 'admin') ?? 'user',
        token: stored?.token ?? '',
      }));
    }
  }, [dispatch, isAuthenticated]);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    dispatch(loginStart());
    try {
      const result = await authService.login(credentials);
      dispatch(loginSuccess({
        username: result?.username ?? '',
        role: (result?.role as 'user' | 'admin') ?? 'user',
        token: result?.token ?? '',
      }));
      return result;
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string | Array<{ msg?: string }> } } };
      const detail = axiosErr?.response?.data?.detail;
      let message = 'Erro ao fazer login';
      if (typeof detail === 'string') {
        message = detail;
      } else if (Array.isArray(detail) && detail?.[0]?.msg) {
        message = detail[0].msg;
      }
      dispatch(loginFailure(message));
      throw new Error(message);
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
    authService.logout();
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearApiError: handleClearError,
  };
}
