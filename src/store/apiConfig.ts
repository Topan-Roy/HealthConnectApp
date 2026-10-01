export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://tablet-catalogue-antivirus-regions.trycloudflare.com/api/v1';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
  },
  PATIENT: {
    INITIATE: `${BASE_URL}/auth/patient/initiate`,
    VERIFY_OTP: `${BASE_URL}/auth/patient/verify-otp`,
    COMPLETE_PROFILE: `${BASE_URL}/auth/patient/complete-profile`,
  },
  // DOCTOR endpoints can be added here later
};
