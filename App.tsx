import './global.css';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';

type ScreenState = 'splash' | 'onboarding' | 'home';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('splash');

  return (
    <>
      <StatusBar style={screen === 'home' ? 'dark' : 'dark'} />
      {screen === 'splash' && (
        <SplashScreen onFinish={() => setScreen('onboarding')} />
      )}
      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={() => setScreen('home')} />
      )}
      {screen === 'home' && (
        <HomeScreen onRestartOnboarding={() => setScreen('splash')} />
      )}
    </>
  );
}
