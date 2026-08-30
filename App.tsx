import './global.css';

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BackHandler } from 'react-native';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { WelcomeAuthScreen } from './src/screens/WelcomeAuthScreen';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';
import { PatientLoginScreen } from './src/screens/patient/PatientLoginScreen';
import { PatientSignupScreen } from './src/screens/patient/PatientSignupScreen';
import { OTPVerificationScreen } from './src/screens/patient/OTPVerificationScreen';
import { ProfileSetupScreen } from './src/screens/patient/ProfileSetupScreen';
import { SetupCompleteScreen } from './src/screens/patient/SetupCompleteScreen';
import { ForgotPasswordScreen } from './src/screens/patient/ForgotPasswordScreen';
import { ResetPasswordScreen } from './src/screens/patient/ResetPasswordScreen';
import { PatientHomeScreen } from './src/screens/patient/PatientHomeScreen';
import { FindDoctorScreen } from './src/screens/patient/FindDoctorScreen';
import { DoctorProfileScreen } from './src/screens/patient/DoctorProfileScreen';
import { BookingScreen } from './src/screens/patient/BookingScreen';
import { BookingSummaryScreen } from './src/screens/patient/BookingSummaryScreen';
import { PaymentScreen } from './src/screens/patient/PaymentScreen';
import { AppointmentConfirmedScreen } from './src/screens/patient/AppointmentConfirmedScreen';
import { MyAppointmentsScreen } from './src/screens/patient/MyAppointmentsScreen';
import { AppointmentCompletedScreen } from './src/screens/patient/AppointmentCompletedScreen';
import { RateReviewDoctorScreen } from './src/screens/patient/RateReviewDoctorScreen';
import { MessagesListScreen } from './src/screens/patient/MessagesListScreen';
import { ChatScreen } from './src/screens/patient/ChatScreen';
import { PatientProfileScreen } from './src/screens/patient/PatientProfileScreen';
import { PersonalInfoScreen } from './src/screens/patient/PersonalInfoScreen';
import { HealthInfoScreen } from './src/screens/patient/HealthInfoScreen';
import { MedicinesScreen } from './src/screens/patient/MedicinesScreen';
import { ReportsScreen } from './src/screens/patient/ReportsScreen';
import { EmergencyContactScreen } from './src/screens/patient/EmergencyContactScreen';
import { PaymentMethodsScreen } from './src/screens/patient/PaymentMethodsScreen';
import { SettingsScreen } from './src/screens/patient/SettingsScreen';
import { HelpSupportScreen } from './src/screens/patient/HelpSupportScreen';
import { PrivacySecurityScreen } from './src/screens/patient/PrivacySecurityScreen';
import { FaqScreen } from './src/screens/patient/FaqScreen';
import { ContactSupportScreen } from './src/screens/patient/ContactSupportScreen';
import { DoctorLoginScreen } from './src/screens/doctor/DoctorLoginScreen';
import { DoctorSignupScreen } from './src/screens/doctor/DoctorSignupScreen';
import { DoctorHomeScreen } from './src/screens/doctor/DoctorHomeScreen';
import { DoctorOTPVerificationScreen } from './src/screens/doctor/DoctorOTPVerificationScreen';
import { DoctorProfessionalInfoScreen } from './src/screens/doctor/DoctorProfessionalInfoScreen';
import { DoctorMedicalLicenseScreen } from './src/screens/doctor/DoctorMedicalLicenseScreen';
import { DoctorVerificationDocumentsScreen } from './src/screens/doctor/DoctorVerificationDocumentsScreen';
import { DoctorVerificationPendingScreen } from './src/screens/doctor/DoctorVerificationPendingScreen';
import { Doctor } from './src/data/doctors';

type ScreenState =
  | 'splash'
  | 'onboarding'
  | 'welcome'
  | 'role-selection'
  | 'doctor-login'
  | 'doctor-signup'
  | 'doctor-home'
  | 'doctor-otp'
  | 'doctor-professional-info'
  | 'doctor-medical-license'
  | 'doctor-verification-documents'
  | 'doctor-pending'
  | 'patient-login'
  | 'patient-signup'
  | 'otp-verification'
  | 'profile-setup'
  | 'setup-complete'
  | 'patient-home'
  | 'find-doctor'
  | 'doctor-profile'
  | 'booking'
  | 'booking-summary'
  | 'payment'
  | 'appointment-confirmed'
  | 'my-appointments'
  | 'appointment-completed'
  | 'rate-review-doctor'
  | 'messages-list'
  | 'chat'
  | 'patient-profile'
  | 'personal-info'
  | 'health-info'
  | 'medicines'
  | 'reports'
  | 'emergency-contact'
  | 'payment-methods'
  | 'settings'
  | 'help-support'
  | 'change-password'
  | 'privacy-security'
  | 'faqs'
  | 'contact-support'
  | 'forgot-password'
  | 'forgot-password-otp'
  | 'reset-password';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [chatDoctor, setChatDoctor] = useState<Doctor | null>(null);
  
  // To handle the back flow correctly when coming from different paths
  const [previousScreen, setPreviousScreen] = useState<ScreenState | null>(null);

  const navigateTo = (nextScreen: ScreenState) => {
    setPreviousScreen(screen);
    setScreen(nextScreen);
  };

  useEffect(() => {
    const backAction = () => {
      switch (screen) {
        case 'onboarding':
          setScreen('splash');
          return true;
        case 'welcome':
          setScreen('onboarding');
          return true;
        case 'role-selection':
          setScreen('welcome');
          return true;
        case 'doctor-login':
          setScreen('role-selection');
          return true;
        case 'doctor-home':
          setScreen('doctor-login');
          return true;
        case 'doctor-signup':
          setScreen('doctor-login');
          return true;
        case 'doctor-otp':
          setScreen('doctor-signup');
          return true;
        case 'doctor-professional-info':
          setScreen('doctor-otp');
          return true;
        case 'doctor-medical-license':
          setScreen('doctor-professional-info');
          return true;
        case 'doctor-verification-documents':
          setScreen('doctor-medical-license');
          return true;
        case 'doctor-pending':
          setScreen('doctor-verification-documents');
          return true;
        case 'patient-login':
          setScreen('role-selection');
          return true;
        case 'patient-signup':
        case 'forgot-password':
        case 'patient-home':
          setScreen('patient-login');
          return true;
        case 'find-doctor':
          setScreen('patient-home');
          return true;
        case 'doctor-profile':
          setScreen('find-doctor');
          return true;
        case 'booking':
          setScreen('doctor-profile');
          return true;
        case 'booking-summary':
          setScreen('booking');
          return true;
        case 'payment':
          setScreen('booking-summary');
          return true;
        case 'appointment-confirmed':
          setScreen('patient-home');
          return true;
        case 'my-appointments':
          setScreen('patient-home');
          return true;
        case 'appointment-completed':
          setScreen('my-appointments');
          return true;
        case 'rate-review-doctor':
          setScreen('appointment-completed');
          return true;
        case 'messages-list':
          setScreen('patient-home');
          return true;
        case 'patient-profile':
          setScreen('patient-home');
          return true;
        case 'medicines':
        case 'reports':
          setScreen('patient-home');
          return true;
        case 'personal-info':
        case 'health-info':
        case 'emergency-contact':
        case 'payment-methods':
        case 'settings':
        case 'help-support':
        case 'change-password':
        case 'privacy-security':
        case 'faqs':
        case 'contact-support':
          setScreen('patient-profile');
          return true;
        case 'chat':
          setScreen('messages-list');
          return true;
        case 'otp-verification':
          setScreen(previousScreen === 'forgot-password' ? 'forgot-password' : 'patient-signup');
          return true;
        case 'profile-setup':
          setScreen('otp-verification');
          return true;
        case 'forgot-password-otp':
          setScreen('forgot-password');
          return true;
        case 'reset-password':
          setScreen('patient-login');
          return true;
        case 'setup-complete':
        case 'splash':
        default:
          return false; // Exit app
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [screen, previousScreen]);

  const handleSelectRole = (role: 'patient' | 'doctor') => {
    setUserRole(role);
    if (role === 'patient') {
      navigateTo('patient-login');
    } else if (role === 'doctor') {
      navigateTo('doctor-login');
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style={screen === 'welcome' ? 'light' : 'dark'} />

      {/* 1. Splash Screen */}
      {screen === 'splash' && (
        <SplashScreen onFinish={() => setScreen('onboarding')} />
      )}

      {/* 2. Onboarding Screens (01, 02, 03) */}
      {screen === 'onboarding' && (
        <OnboardingScreen
          onComplete={() => setScreen('welcome')}
          onBack={() => setScreen('splash')}
        />
      )}

      {/* 3. Welcome / Auth Options Screen */}
      {screen === 'welcome' && (
        <WelcomeAuthScreen
          onGetStarted={() => setScreen('role-selection')}
          onLogin={() => setScreen('role-selection')}
          onBack={() => setScreen('onboarding')}
        />
      )}

      {/* 4. Role Selection Screen */}
      {screen === 'role-selection' && (
        <RoleSelectionScreen
          onBack={() => setScreen('welcome')}
          onSelectRole={handleSelectRole}
        />
      )}

      {/* 5. Doctor Login Screen */}
      {screen === 'doctor-login' && (
        <DoctorLoginScreen
          onBack={() => setScreen('role-selection')}
          onLoginSuccess={() => setScreen('doctor-home')}
          onGoToSignup={() => setScreen('doctor-signup')}
        />
      )}

      {screen === 'doctor-signup' && (
        <DoctorSignupScreen
          onBack={() => setScreen('doctor-login')}
          onSignupSuccess={() => setScreen('doctor-otp')}
          onGoToLogin={() => setScreen('doctor-login')}
        />
      )}

      {screen === 'doctor-home' && (
        <DoctorHomeScreen
          onBack={() => setScreen('doctor-login')}
          onLogout={() => setScreen('doctor-login')}
        />
      )}

      {screen === 'doctor-otp' && (
        <DoctorOTPVerificationScreen
          onBack={() => setScreen('doctor-signup')}
          onVerifySuccess={() => setScreen('doctor-professional-info')}
        />
      )}

      {screen === 'doctor-professional-info' && (
        <DoctorProfessionalInfoScreen
          onBack={() => setScreen('doctor-otp')}
          onContinue={() => setScreen('doctor-medical-license')}
        />
      )}

      {screen === 'doctor-medical-license' && (
        <DoctorMedicalLicenseScreen
          onBack={() => setScreen('doctor-professional-info')}
          onContinue={() => setScreen('doctor-verification-documents')}
        />
      )}

      {screen === 'doctor-verification-documents' && (
        <DoctorVerificationDocumentsScreen
          onBack={() => setScreen('doctor-medical-license')}
          onContinue={() => setScreen('doctor-pending')}
        />
      )}

      {screen === 'doctor-pending' && (
        <DoctorVerificationPendingScreen
          onBackToHome={() => setScreen('welcome')}
          onGoToLogin={() => setScreen('doctor-login')}
        />
      )}

      {/* 6. Patient Login Screen */}
      {screen === 'patient-login' && (
        <PatientLoginScreen
          onBack={() => setScreen('role-selection')}
          onLoginSuccess={() => setScreen('patient-home')}
          onGoToSignup={() => setScreen('patient-signup')}
          onForgotPassword={() => setScreen('forgot-password')}
        />
      )}

      {/* 7. Patient Signup Screen */}
      {screen === 'patient-signup' && (
        <PatientSignupScreen
          onBack={() => setScreen('patient-login')}
          onSignupSuccess={() => setScreen('otp-verification')}
          onGoToLogin={() => setScreen('patient-login')}
        />
      )}

      {/* 7. OTP Verification Screen */}
      {screen === 'otp-verification' && (
        <OTPVerificationScreen
          onBack={() => setScreen('patient-signup')}
          onVerifySuccess={() => setScreen('profile-setup')}
        />
      )}

      {/* 8. Profile Setup Screen (5 steps internally) */}
      {screen === 'profile-setup' && (
        <ProfileSetupScreen
          onBack={() => setScreen('otp-verification')}
          onComplete={() => setScreen('setup-complete')}
        />
      )}

      {/* 9. Setup Complete Screen */}
      {screen === 'setup-complete' && (
        <SetupCompleteScreen
          onGoToLogin={() => setScreen('patient-login')}
        />
      )}

      {/* 10. Patient Home Screen */}
      {screen === 'patient-home' && (
        <PatientHomeScreen
          onBack={() => setScreen('patient-login')}
          onFindDoctor={() => navigateTo('find-doctor')}
          onAppointments={() => navigateTo('my-appointments')}
          onMedicines={() => navigateTo('medicines')}
          onReports={() => navigateTo('reports')}
          onMessages={() => navigateTo('messages-list')}
          onProfile={() => navigateTo('patient-profile')}
        />
      )}

      {screen === 'medicines' && (
        <MedicinesScreen onBack={() => setScreen('patient-home')} />
      )}

      {screen === 'reports' && (
        <ReportsScreen onBack={() => setScreen('patient-home')} />
      )}

      {/* 11. Find Doctor Screen */}
      {screen === 'find-doctor' && (
        <FindDoctorScreen
          onBack={() => setScreen('patient-home')}
          onDoctorPress={(doctor) => {
            setSelectedDoctor(doctor);
            navigateTo('doctor-profile');
          }}
          onHome={() => setScreen('patient-home')}
          onAppointments={() => navigateTo('my-appointments')}
          onMessages={() => navigateTo('messages-list')}
          onProfile={() => navigateTo('patient-profile')}
        />
      )}

      {/* 12. Doctor Profile Screen */}
      {screen === 'doctor-profile' && selectedDoctor && (
        <DoctorProfileScreen
          doctor={selectedDoctor}
          onBack={() => setScreen('find-doctor')}
          onBookAppointment={() => navigateTo('booking')}
          onChat={(doctor) => {
            setChatDoctor(doctor);
            navigateTo('chat');
          }}
        />
      )}

      {/* 13. Booking Screen */}
      {screen === 'booking' && selectedDoctor && (
        <BookingScreen
          doctor={selectedDoctor}
          onBack={() => setScreen('doctor-profile')}
          onConfirmed={(date, time) => {
            setBookingDate(date);
            setBookingTime(time);
            navigateTo('booking-summary');
          }}
        />
      )}

      {/* 14. Booking Summary */}
      {screen === 'booking-summary' && selectedDoctor && (
        <BookingSummaryScreen
          doctor={selectedDoctor}
          selectedDate={bookingDate}
          selectedTime={bookingTime}
          onBack={() => setScreen('booking')}
          onProceed={() => navigateTo('payment')}
        />
      )}

      {/* 15. Payment */}
      {screen === 'payment' && selectedDoctor && (
        <PaymentScreen
          totalAmount={parseInt(selectedDoctor.price) + 50}
          onBack={() => setScreen('booking-summary')}
          onPaymentSuccess={() => navigateTo('appointment-confirmed')}
        />
      )}

      {/* 16. Appointment Confirmed */}
      {screen === 'appointment-confirmed' && selectedDoctor && (
        <AppointmentConfirmedScreen
          doctor={selectedDoctor}
          selectedDate={bookingDate}
          selectedTime={bookingTime}
          onViewAppointment={() => setScreen('my-appointments')}
          onBackToHome={() => setScreen('patient-home')}
        />
      )}

      {/* 17. My Appointments */}
      {screen === 'my-appointments' && (
        <MyAppointmentsScreen
          onBack={() => setScreen('patient-home')}
          onJoinAppointment={() => setScreen('appointment-completed')} // Mocking join leading to completed for demo
          onViewCompleted={() => setScreen('appointment-completed')}
          onHome={() => setScreen('patient-home')}
          onDoctors={() => navigateTo('find-doctor')}
          onMessages={() => navigateTo('messages-list')}
          onProfile={() => navigateTo('patient-profile')}
        />
      )}

      {/* 18. Appointment Completed */}
      {screen === 'appointment-completed' && (
        <AppointmentCompletedScreen
          onBackToHome={() => setScreen('patient-home')}
          onRateDoctor={() => setScreen('rate-review-doctor')}
        />
      )}

      {/* 19. Rate and Review Doctor */}
      {screen === 'rate-review-doctor' && (
        <RateReviewDoctorScreen
          onBack={() => setScreen('appointment-completed')}
          onSubmitReview={() => setScreen('patient-home')}
        />
      )}

      {/* 20. Messages List (Inbox) */}
      {screen === 'messages-list' && (
        <MessagesListScreen
          onBack={() => setScreen('patient-home')}
          onHome={() => setScreen('patient-home')}
          onDoctors={() => navigateTo('find-doctor')}
          onAppointments={() => navigateTo('my-appointments')}
          onProfile={() => navigateTo('patient-profile')}
          onOpenChat={(doctor) => {
            setChatDoctor(doctor);
            navigateTo('chat');
          }}
        />
      )}

      {/* 21. Chat Screen */}
      {screen === 'chat' && chatDoctor && (
        <ChatScreen
          doctor={chatDoctor}
          onBack={() => setScreen('messages-list')}
        />
      )}

      {/* 22. Patient Profile */}
      {screen === 'patient-profile' && (
        <PatientProfileScreen
          onPersonalInfo={() => navigateTo('personal-info')}
          onHealthInfo={() => navigateTo('health-info')}
          onEmergencyContact={() => navigateTo('emergency-contact')}
          onPaymentMethods={() => navigateTo('payment-methods')}
          onSettings={() => navigateTo('settings')}
          onHelpSupport={() => navigateTo('help-support')}
          onHome={() => setScreen('patient-home')}
          onFindDoctor={() => navigateTo('find-doctor')}
          onAppointments={() => navigateTo('my-appointments')}
          onMessages={() => navigateTo('messages-list')}
          onLogout={() => setScreen('patient-login')}
        />
      )}

      {screen === 'personal-info' && (
        <PersonalInfoScreen onBack={() => setScreen('patient-profile')} />
      )}

      {screen === 'health-info' && (
        <HealthInfoScreen onBack={() => setScreen('patient-profile')} />
      )}

      {screen === 'emergency-contact' && (
        <EmergencyContactScreen onBack={() => setScreen('patient-profile')} />
      )}

      {screen === 'payment-methods' && (
        <PaymentMethodsScreen onBack={() => setScreen('patient-profile')} />
      )}

      {screen === 'settings' && (
        <SettingsScreen
          onBack={() => setScreen('patient-profile')}
          onChangePassword={() => navigateTo('change-password')}
          onPrivacySecurity={() => navigateTo('privacy-security')}
        />
      )}

      {screen === 'help-support' && <HelpSupportScreen onBack={() => setScreen('patient-profile')} onFaq={() => navigateTo('faqs')} onContactSupport={() => navigateTo('contact-support')} />}

      {screen === 'change-password' && (
        <ResetPasswordScreen onBack={() => setScreen('settings')} onResetSuccess={() => setScreen('settings')} />
      )}

      {screen === 'privacy-security' && (
        <PrivacySecurityScreen onBack={() => setScreen('settings')} />
      )}

      {screen === 'faqs' && <FaqScreen onBack={() => setScreen('help-support')} />}

      {screen === 'contact-support' && <ContactSupportScreen onBack={() => setScreen('help-support')} />}

      {/* Forgot Password Flow */}
      {screen === 'forgot-password' && (
        <ForgotPasswordScreen
          onBack={() => setScreen('patient-login')}
          onSendOTP={() => setScreen('forgot-password-otp')}
        />
      )}

      {screen === 'forgot-password-otp' && (
        <OTPVerificationScreen
          onBack={() => setScreen('forgot-password')}
          onVerifySuccess={() => setScreen('reset-password')}
        />
      )}

      {screen === 'reset-password' && (
        <ResetPasswordScreen
          onBack={() => setScreen('forgot-password')}
          onResetSuccess={() => setScreen('patient-login')}
        />
      )}
    </SafeAreaProvider>
  );
}
