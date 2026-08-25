import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        {/* Logo Image from assets */}
        <View style={{ marginBottom: 24 }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 140, height: 140, resizeMode: 'contain' }}
          />
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
