import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from './apiConfig';

const STORAGE_KEYS = {
  USER: '@auth_user',
  ACCESS_TOKEN: '@auth_access_token',
  REFRESH_TOKEN: '@auth_refresh_token',
};

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  setAuth: (user: any, accessToken: string, refreshToken?: string) => void;
  login: (data: { email: string; password: string }) => Promise<any>;
  logout: () => void;
  persistAuthData: (user: any, accessToken: string, refreshToken?: string) => Promise<void>;
  initializeAuth: () => Promise<{ user: any; accessToken: string | null }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isInitialized: false,
  isLoading: false,
  error: null,

  setAuth: async (user, accessToken, refreshToken = '') => {
    // Update in-memory state immediately — never block on storage
    set({ user, accessToken, refreshToken });
    // Fire-and-forget persistence; storage errors won't break the session
    get().persistAuthData(user, accessToken, refreshToken).catch((e) =>
      console.log('[setAuth] Storage persistence failed (session still active):', e)
    );
  },

  login: async (data) => {
    set({ isLoading: true, error: null });
    console.log('\n🔵 [LOGIN] Request →', ENDPOINTS.AUTH.LOGIN);
    console.log('🔵 [LOGIN] Body →', JSON.stringify(data, null, 2));
    try {
      const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('🟢 [LOGIN] Status →', response.status);
      console.log('🟢 [LOGIN] Response →', JSON.stringify(result, null, 2));

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed');
      }

      const { user, accessToken } = result.data;
      // setAuth is now fire-and-forget for storage; in-memory state is set immediately
      get().setAuth(user, accessToken);

      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.log('🔴 [LOGIN] Error →', error.message);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  logout: async () => {
    const { accessToken } = get();

    // Call logout API to invalidate the token server-side
    try {
      console.log('\n🔵 [LOGOUT] Request →', ENDPOINTS.AUTH.LOGOUT);
      const response = await fetch(ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      });
      const result = await response.json().catch(() => ({}));
      console.log('🟢 [LOGOUT] Status →', response.status);
      console.log('🟢 [LOGOUT] Response →', JSON.stringify(result, null, 2));
    } catch (error: any) {
      // Network error or server down — still proceed with local logout
      console.log('🔴 [LOGOUT] API call failed (proceeding with local logout):', error.message);
    }

    // Always clear in-memory state
    set({ user: null, accessToken: null, refreshToken: null, error: null });

    // Clear persisted storage (best-effort)
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
      ]);
    } catch (error) {
      console.log('[logout] Failed to clear AsyncStorage (session cleared in-memory):', error);
    }
  },

  persistAuthData: async (user: any, accessToken: any, refreshToken: any) => {
    try {
      const promises = [
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
      ];

      if (accessToken) {
        promises.push(
          AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
        );
      }

      if (refreshToken) {
        promises.push(
          AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
        );
      }

      await Promise.all(promises);
    } catch (error) {
      // Log but do NOT re-throw — a storage failure must not break the login session
      console.log('[persistAuthData] AsyncStorage unavailable, session is in-memory only:', error);
    }
  },

  initializeAuth: async () => {
    try {
      const [userStr, accessToken, refreshToken] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
      ]);

      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        set({
          user: parsedUser,
          accessToken: accessToken || null,
          refreshToken: refreshToken || null,
          isInitialized: true,
        });
        return { user: parsedUser, accessToken };
      } else {
        set({ isInitialized: true });
        return { user: null, accessToken: null };
      }
    } catch (error) {
      console.log("Failed to initialize auth:", error);
      set({ isInitialized: true });
      return { user: null, accessToken: null };
    }
  },
}));
