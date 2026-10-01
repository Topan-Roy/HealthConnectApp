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
    set({ user, accessToken, refreshToken });
    await get().persistAuthData(user, accessToken, refreshToken);
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
      await get().setAuth(user, accessToken);
      
      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.log('🔴 [LOGIN] Error →', error.message);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  logout: async () => {
    set({ user: null, accessToken: null, refreshToken: null });
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
      ]);
    } catch (error) {
      console.log('Failed to clear auth data:', error);
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
      console.log("Failed to persist auth data:", error);
      throw error;
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
