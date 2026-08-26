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
import { Lock, Eye, EyeOff } from 'lucide-react-native';

interface ResetPasswordScreenProps {
  onBack: () => void;
  onResetSuccess: () => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
  onResetSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  useEffect(() => {
    const handleHardwareBack = () => {
      onBack();
      return true;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => subscription.remove();
  }, [onBack]);

  const isValid = password.length > 5 && password === confirmPassword;

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
              Reset Password
            </Text>
            <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 8, lineHeight: 22, textAlign: 'center' }}>
              Create a new secure password for your account.
            </Text>
          </View>

          <View style={{ gap: 20, marginBottom: 32 }}>
            {/* Password Input */}
            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>
                New Password
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
                  placeholder="Enter new password"
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

            {/* Confirm Password Input */}
            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>
                Confirm Password
              </Text>
              <View
                style={{
                  backgroundColor: isConfirmPasswordFocused ? '#FFFFFF' : '#F8FAFC',
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: isConfirmPasswordFocused ? '#2563EB' : '#E2E8F0',
                  paddingHorizontal: 16,
                  height: 56,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: isConfirmPasswordFocused ? '#2563EB' : '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isConfirmPasswordFocused ? 0.1 : 0.02,
                  shadowRadius: 6,
                  elevation: isConfirmPasswordFocused ? 2 : 0,
                }}
              >
                <Lock size={20} color={isConfirmPasswordFocused ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
                <TextInput
                  placeholder="Confirm new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                  style={{ flex: 1, fontSize: 15, color: '#111827' }}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ padding: 4 }}>
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={onResetSuccess}
            disabled={!isValid}
            activeOpacity={0.85}
            style={{
              backgroundColor: isValid ? '#2563EB' : '#93C5FD',
              height: 56,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: isValid ? 0.28 : 0,
              shadowRadius: 10,
              elevation: isValid ? 5 : 0,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
