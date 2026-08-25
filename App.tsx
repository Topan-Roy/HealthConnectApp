import './global.css';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { WelcomeAuthScreen } from './src/screens/WelcomeAuthScreen';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';
import { PatientLoginScreen } from './src/screens/PatientLoginScreen';
import { PatientSignupScreen } from './src/screens/PatientSignupScreen';

type ScreenState =
  | 'splash'
  | 'onboarding'
  | 'welcome'
  | 'role-selection'
  | 'patient-login'
  | 'patient-signup';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);

  const handleSelectRole = (role: 'patient' | 'doctor') => {
    setUserRole(role);
    setScreen('patient-login');
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
          onSignupSuccess={() => setScreen('patient-login')}
          onGoToLogin={() => setScreen('patient-login')}
        />
      )}
    </>
  );
}
