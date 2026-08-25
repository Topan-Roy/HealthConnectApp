import './global.css';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { WelcomeAuthScreen } from './src/screens/WelcomeAuthScreen';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';
import { PatientLoginScreen } from './src/screens/patient/PatientLoginScreen';
import { PatientSignupScreen } from './src/screens/patient/PatientSignupScreen';
import { OTPVerificationScreen } from './src/screens/patient/OTPVerificationScreen';
import { ProfileSetupScreen } from './src/screens/patient/ProfileSetupScreen';
import { SetupCompleteScreen } from './src/screens/patient/SetupCompleteScreen';

type ScreenState =
  | 'splash'
  | 'onboarding'
  | 'welcome'
  | 'role-selection'
  | 'patient-login'
  | 'patient-signup'
  | 'otp-verification'
  | 'profile-setup'
  | 'setup-complete';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);

  const handleSelectRole = (role: 'patient' | 'doctor') => {
    setUserRole(role);
    if (role === 'patient') {
      setScreen('patient-login');
    }
    // Doctor: কোনো পেজ আসবে না এখনো
  };

  return (
    <>
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

      {/* 5. Patient Login Screen */}
      {screen === 'patient-login' && (
        <PatientLoginScreen
          onBack={() => setScreen('role-selection')}
          onLoginSuccess={() => setScreen('patient-login')}
          onGoToSignup={() => setScreen('patient-signup')}
        />
      )}

      {/* 6. Patient Signup Screen */}
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
          onGoToHome={() => setScreen('splash')}
        />
      )}
    </>
  );
}
