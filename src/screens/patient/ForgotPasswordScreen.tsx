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
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Mail } from 'lucide-react-native';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSendOTP: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onSendOTP,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

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
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40 }}
        >
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
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
                source={require('../../../assets/logo.png')}
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
              />
            </View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', letterSpacing: -0.5, textAlign: 'center' }}>
              Forgot Password
            </Text>
            <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 8, lineHeight: 22, textAlign: 'center' }}>
              Enter your email or phone number and we'll send you a code to reset your password.
            </Text>
          </View>

          {/* Input */}
          <View style={{ marginBottom: 32 }}>
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

          {/* Button */}
          <TouchableOpacity
            onPress={onSendOTP}
            disabled={!emailOrPhone}
            activeOpacity={0.85}
            style={{
              backgroundColor: emailOrPhone ? '#2563EB' : '#93C5FD',
              height: 56,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: emailOrPhone ? 0.28 : 0,
              shadowRadius: 10,
              elevation: emailOrPhone ? 5 : 0,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>Send OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
