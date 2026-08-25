import './global.css';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { WelcomeAuthScreen } from './src/screens/WelcomeAuthScreen';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';
import { HomeScreen } from './src/screens/HomeScreen';

type ScreenState = 'splash' | 'onboarding' | 'welcome' | 'role-selection' | 'home';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);

  const handleSelectRole = (role: 'patient' | 'doctor') => {
    setUserRole(role);
    setScreen('home');
  };

  return (
    <>
      <StatusBar style={screen === 'welcome' ? 'light' : 'dark'} />

      {/* 1. Splash Screen */}
      {screen === 'splash' && (
        <SplashScreen onFinish={() => setScreen('onboarding')} />
      )}

      {/* 2. Onboarding 01, 02, 03 Screens */}
      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={() => setScreen('welcome')} />
      )}

      {/* 3. Welcome / Auth Options Screen */}
      {screen === 'welcome' && (
        <WelcomeAuthScreen
          onGetStarted={() => setScreen('role-selection')}
          onLogin={() => setScreen('role-selection')}
        />
      )}

      {/* 4. Role Selection Screen */}
      {screen === 'role-selection' && (
        <RoleSelectionScreen
          onBack={() => setScreen('welcome')}
          onSelectRole={handleSelectRole}
        />
      )}

      {/* 5. Home Dashboard */}
      {screen === 'home' && (
        <HomeScreen onRestartOnboarding={() => setScreen('splash')} />
      )}
    </>
  );
}
