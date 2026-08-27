import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  BackHandler,
  ImageBackground,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface SetupCompleteScreenProps {
  onGoToLogin: () => void;
}

const CheckCircleIcon: React.FC = () => (
  <Svg width={80} height={80} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke="#16A34A" strokeWidth={1.8} />
    <Path
      d="M7 12.5l3.5 3.5 6.5-7"
      stroke="#16A34A"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SetupCompleteScreen: React.FC<SetupCompleteScreenProps> = ({ onGoToLogin }) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onGoToLogin();
      return true;
    });
    return () => subscription.remove();
  }, [onGoToLogin]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 32,
          }}
        >
          {/* Success Icon */}
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              backgroundColor: '#F0FDF4',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
              shadowColor: '#16A34A',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.18,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <CheckCircleIcon />
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 30,
              fontWeight: '800',
              color: '#111827',
              textAlign: 'center',
              letterSpacing: -0.5,
              marginBottom: 12,
            }}
          >
            You're all set!
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 15,
              color: '#48494dff',
              textAlign: 'center',
              lineHeight: 24,
              marginBottom: 48,
            }}
          >
            Your profile is ready to use.{'\n'}
            Welcome to HealthConnect!
          </Text>

          {/* Go to Home Button */}
          <TouchableOpacity
            onPress={onGoToLogin}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#2563EB',
              borderRadius: 14,
              paddingVertical: 16,
              paddingHorizontal: 48,
              alignItems: 'center',
              width: '100%',
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 14,
              elevation: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 }}>
              Go to Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
