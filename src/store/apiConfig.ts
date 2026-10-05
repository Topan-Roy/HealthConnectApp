if (!process.env.EXPO_PUBLIC_API_URL) {
  console.warn('⚠️ [apiConfig] EXPO_PUBLIC_API_URL is not set! Check your .env file and restart Metro.');
}

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/users/logout`,
  },
  PATIENT: {
    INITIATE: `${BASE_URL}/auth/patient/initiate`,
    VERIFY_OTP: `${BASE_URL}/auth/patient/verify-otp`,
    COMPLETE_PROFILE: `${BASE_URL}/auth/patient/complete-profile`,
  },
  // DOCTOR endpoints can be added here later
};
