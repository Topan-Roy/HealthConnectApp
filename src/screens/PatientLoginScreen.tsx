import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

interface PatientLoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onGoToSignup: () => void;
}

// Google Logo Icon SVG
const GoogleIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </Svg>
);

// Apple Logo Icon SVG
const AppleIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#000000">
    <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.64-2.82 1.44-.61.71-1.15 1.88-.99 3.01 1.08.08 2.16-.54 2.82-1.35z" />
  </Svg>
);

export const PatientLoginScreen: React.FC<PatientLoginScreenProps> = ({
  onBack,
  onLoginSuccess,
  onGoToSignup,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    const handleHardwareBack = () => {
      onBack();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => subscription.remove();
  }, [onBack]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 }}
        >
        {/* Top Header Logo Badge */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              backgroundColor: '#EFF6FF',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
            />
          </View>

          <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', letterSpacing: -0.5, textAlign: 'center' }}>
            Login
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 6, textAlign: 'center' }}>
            Welcome back! Please login to your account
          </Text>
        </View>

        {/* Input Form Fields */}
        <View style={{ gap: 20 }}>
          {/* Email or Phone Input */}
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>
              Email or Phone
            </Text>
            <View
              style={{
                backgroundColor: isEmailFocused ? '#FFFFFF' : '#F8FAFC',
                borderRadius: 16,
                borderWidth: 1.5,
                borderColor: isEmailFocused ? '#2563EB' : '#E2E8F0',
                paddingHorizontal: 16,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: isEmailFocused ? '#2563EB' : '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isEmailFocused ? 0.1 : 0.02,
                shadowRadius: 6,
                elevation: isEmailFocused ? 2 : 0,
              }}
            >
              <Mail size={20} color={isEmailFocused ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
              <TextInput
                placeholder="Enter your email or phone"
                placeholderTextColor="#9CA3AF"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                style={{ flex: 1, fontSize: 15, color: '#111827' }}
              />
            </View>
          </View>

          {/* Password Input */}
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>
              Password
            </Text>
            <View
              style={{
                backgroundColor: isPasswordFocused ? '#FFFFFF' : '#F8FAFC',
                borderRadius: 16,
                borderWidth: 1.5,
                borderColor: isPasswordFocused ? '#2563EB' : '#E2E8F0',
                paddingHorizontal: 16,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: isPasswordFocused ? '#2563EB' : '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isPasswordFocused ? 0.1 : 0.02,
                shadowRadius: 6,
                elevation: isPasswordFocused ? 2 : 0,
              }}
            >
              <Lock size={20} color={isPasswordFocused ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                style={{ flex: 1, fontSize: 15, color: '#111827' }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Forgot Password Link */}
        <View style={{ alignItems: 'flex-end', marginTop: 12, marginBottom: 28 }}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#2563EB' }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Primary Button */}
        <TouchableOpacity
          onPress={onLoginSuccess}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#2563EB',
            height: 56,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.28,
            shadowRadius: 10,
            elevation: 5,
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>Login</Text>
        </TouchableOpacity>

        {/* Social Login Divider & Options */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#9CA3AF', marginHorizontal: 14 }}>
              or continue with
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
          </View>

          <View style={{ flexDirection: 'row', gap: 16 }}>
            {/* Google Button */}
            <TouchableOpacity
              activeOpacity={0.75}
              style={{
                flex: 1,
                height: 54,
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E2E8F0',
                gap: 8,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <GoogleIcon />
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1E293B' }}>Google</Text>
            </TouchableOpacity>

            {/* Apple Button */}
            <TouchableOpacity
              activeOpacity={0.75}
              style={{
                flex: 1,
                height: 54,
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E2E8F0',
                gap: 8,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <AppleIcon />
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1E293B' }}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Link to Signup */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={onGoToSignup} activeOpacity={0.7}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#2563EB' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
};
