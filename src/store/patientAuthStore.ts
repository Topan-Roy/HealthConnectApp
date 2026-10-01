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
    console.log('\n🔵 [REGISTER] Request →', ENDPOINTS.PATIENT.INITIATE);
    console.log('🔵 [REGISTER] Body →', JSON.stringify(data, null, 2));
    try {
      const response = await fetch(ENDPOINTS.PATIENT.INITIATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('🟢 [REGISTER] Status →', response.status);
      console.log('🟢 [REGISTER] Response →', JSON.stringify(result, null, 2));
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to initiate registration');
      }
      
      set({ isLoading: false, registrationData: { email: data.email } });
      return result;
    } catch (error: any) {
      console.log('🔴 [REGISTER] Error →', error.message);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  verifyOTP: async (data) => {
    set({ isLoading: true, error: null });
    console.log('\n🔵 [VERIFY OTP] Request →', ENDPOINTS.PATIENT.VERIFY_OTP);
    console.log('🔵 [VERIFY OTP] Body →', JSON.stringify(data, null, 2));
    try {
      const response = await fetch(ENDPOINTS.PATIENT.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('🟢 [VERIFY OTP] Status →', response.status);
      console.log('🟢 [VERIFY OTP] Response →', JSON.stringify(result, null, 2));
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'OTP verification failed');
      }
      
      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.log('🔴 [VERIFY OTP] Error →', error.message);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  completeProfile: async (data, token) => {
    set({ isLoading: true, error: null });
    console.log('\n🔵 [COMPLETE PROFILE] Request →', ENDPOINTS.PATIENT.COMPLETE_PROFILE);
    console.log('🔵 [COMPLETE PROFILE] Body →', JSON.stringify(data, null, 2));
    console.log('🔵 [COMPLETE PROFILE] Token →', token ? token.substring(0, 20) + '...' : 'NO TOKEN!');
    try {
      const response = await fetch(ENDPOINTS.PATIENT.COMPLETE_PROFILE, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('🟢 [COMPLETE PROFILE] Status →', response.status);
      console.log('🟢 [COMPLETE PROFILE] Response →', JSON.stringify(result, null, 2));
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to complete profile');
      }
      
      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.log('🔴 [COMPLETE PROFILE] Error →', error.message);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
}));
