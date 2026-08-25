import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashLogo } from '../components/illustrations/SplashLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
        {/* Logo */}
        <View style={{ marginBottom: 24 }}>
          <SplashLogo size={130} />
        </View>

        {/* Title */}
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#2563EB', letterSpacing: -0.5 }}>
          HealthConnect
        </Text>

        {/* Subtitle */}
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#6B7280', marginTop: 8 }}>
          Your Health, Our Priority
        </Text>

        {/* Loading Spinner at Bottom */}
        <View style={{ position: 'absolute', bottom: 60 }}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </View>
    </SafeAreaView>
  );
};
