import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { SplashLogo } from '../components/illustrations/SplashLogo';

interface WelcomeAuthScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onBack?: () => void;
}

const { width } = Dimensions.get('window');

// Doctor Illustration with Clipboard & Floating Icons
const DoctorWelcomeIllustration: React.FC = () => {
  return (
    <Svg width={260} height={220} viewBox="0 0 260 220" fill="none">
      {/* Floating icon bubbles in background */}
      <Circle cx="40" cy="50" r="18" fill="#FFFFFF" fillOpacity={0.15} />
      <Path d="M34 50H46M40 44V56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      <Circle cx="220" cy="40" r="16" fill="#FFFFFF" fillOpacity={0.15} />
      <Circle cx="220" cy="40" r="8" fill="#FFFFFF" fillOpacity={0.25} />

      <Circle cx="190" cy="110" r="20" fill="#FFFFFF" fillOpacity={0.15} />
      <Path d="M182 110 L190 102 L198 110 L190 118 Z" fill="#FFFFFF" opacity={0.6} />

      <Circle cx="60" cy="130" r="18" fill="#FFFFFF" fillOpacity={0.15} />
      <Rect x="54" y="126" width="12" height="8" rx="4" fill="#FFFFFF" opacity={0.6} />

      {/* Male Doctor */}
      <G transform="translate(70, 20)">
        {/* Face & Hair */}
        <Circle cx="60" cy="30" r="18" fill="#FCA5A5" />
        {/* Hair */}
        <Path d="M42 28C42 16 50 8 60 8C70 8 78 16 78 28C78 30 74 20 60 20C46 20 42 30 42 28Z" fill="#1E293B" />

        {/* Doctor White Coat & Blue Tie */}
        <Path d="M25 70 L60 50 L95 70 L90 180 L30 180 Z" fill="#FFFFFF" />
        <Path d="M52 50 L60 62 L68 50 Z" fill="#1E3A8A" /> {/* Tie */}
        <Path d="M60 62 V180" stroke="#E2E8F0" strokeWidth="2" />

        {/* Stethoscope around neck */}
        <Path d="M42 54 Q60 80 78 54" stroke="#1E293B" strokeWidth="4" fill="none" />
        <Circle cx="78" cy="54" r="4" fill="#64748B" />

        {/* Dark Arm holding black clipboard */}
        <Path d="M28 72 L-10 100 L30 110" stroke="#FCA5A5" strokeWidth="8" strokeLinecap="round" />
        {/* Black Clipboard */}
        <Rect x="-25" y="90" width="60" height="75" rx="6" fill="#0F172A" transform="rotate(-10)" />
        <Rect x="-15" y="86" width="24" height="8" rx="2" fill="#64748B" transform="rotate(-10)" />
        <Rect x="-18" y="102" width="40" height="4" rx="2" fill="#334155" transform="rotate(-10)" />
        <Rect x="-18" y="112" width="30" height="4" rx="2" fill="#334155" transform="rotate(-10)" />
      </G>
    </Svg>
  );
};

export const WelcomeAuthScreen: React.FC<WelcomeAuthScreenProps> = ({ onGetStarted, onLogin, onBack }) => {
  useEffect(() => {
    const handleHardwareBack = () => {
      if (onBack) {
        onBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => subscription.remove();
  }, [onBack]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563EB' }}>
      <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Top Header Branding */}
        <View style={{ alignItems: 'center', paddingTop: 28, paddingHorizontal: 24 }}>
          {/* Logo */}
          <View style={{ marginBottom: 16 }}>
            <SplashLogo size={100} />
          </View>
          <Text style={{ fontSize: 30, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 }}>
            HealthConnect
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color: '#DBEAFE', marginTop: 6 }}>
            Your Health, Our Priority
          </Text>
        </View>

        {/* Doctor Center Illustration */}
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <DoctorWelcomeIllustration />
        </View>

        {/* Bottom Card Modal */}
        <View
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 36,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Get Started Button */}
          <TouchableOpacity
            onPress={onGetStarted}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#1D4ED8',
              height: 54,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 14,
              shadowColor: '#1D4ED8',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>Get Started</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={onLogin}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#F1F5F9',
              height: 54,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#2563EB' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
