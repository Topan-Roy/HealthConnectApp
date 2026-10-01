import { create } from 'zustand';
import { ENDPOINTS } from './apiConfig';
import { useAuthStore } from './authStore'; // To save token after successful auth if needed

interface PatientAuthStore {
  isLoading: boolean;
  error: string | null;
  registrationData: any; 
  setRegistrationData: (data: any) => void;
  
  // API Calls
  initiateRegistration: (data: { name: string; email: string; password: string; phone: string }) => Promise<any>;
  verifyOTP: (data: { email: string; otp: string }) => Promise<any>;
  completeProfile: (data: any, token: string) => Promise<any>;
}

export const usePatientAuthStore = create<PatientAuthStore>((set, get) => ({
  isLoading: false,
  error: null,
  registrationData: null,

  setRegistrationData: (data) => set({ registrationData: data }),

  initiateRegistration: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(ENDPOINTS.PATIENT.INITIATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to initiate registration');
      }
      
      set({ isLoading: false, registrationData: { email: data.email } });
      return result;
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  verifyOTP: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(ENDPOINTS.PATIENT.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'OTP verification failed');
      }
      
      set({ isLoading: false });
      return result;
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  completeProfile: async (data, token) => {
    set({ isLoading: true, error: null });
    try {
      // Assuming complete-profile needs an authorization token. 
      // If not, you can remove the Authorization header.
      const response = await fetch(ENDPOINTS.PATIENT.COMPLETE_PROFILE, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to complete profile');
      }
      
      set({ isLoading: false });
      return result;
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
}));
