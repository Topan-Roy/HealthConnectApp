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
} from 'react-native';
import { Eye, EyeOff, Check } from 'lucide-react-native';
import { BackButton } from '../components/common/BackButton';

interface PatientSignupScreenProps {
  onBack: () => void;
  onSignupSuccess: () => void;
  onGoToLogin: () => void;
}

export const PatientSignupScreen: React.FC<PatientSignupScreenProps> = ({
  onBack,
  onSignupSuccess,
  onGoToLogin,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

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

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
        {/* Title & Subtitle */}
        <View style={{ marginBottom: 28 }}>
          <Text style={{ fontSize: 30, fontWeight: '800', color: '#111827', letterSpacing: -0.5 }}>
            Create Account
          </Text>
          <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 6 }}>
            Join us today!
          </Text>
        </View>

        {/* Input Fields */}
        <View style={{ gap: 18 }}>
          {/* Full Name */}
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 6 }}>
              Full Name
            </Text>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                paddingHorizontal: 16,
                height: 52,
                justifyContent: 'center',
              }}
            >
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
                style={{ fontSize: 15, color: '#111827' }}
              />
            </View>
          </View>

          {/* Email */}
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 6 }}>
              Email
            </Text>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                paddingHorizontal: 16,
                height: 52,
                justifyContent: 'center',
              }}
            >
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={{ fontSize: 15, color: '#111827' }}
              />
            </View>
          </View>

          {/* Phone */}
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 6 }}>
              Phone
            </Text>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                paddingHorizontal: 16,
                height: 52,
                justifyContent: 'center',
              }}
            >
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={{ fontSize: 15, color: '#111827' }}
              />
            </View>
          </View>

          {/* Password */}
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 6 }}>
              Password
            </Text>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                paddingHorizontal: 16,
                height: 52,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={{ flex: 1, fontSize: 15, color: '#111827' }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                {showPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 6 }}>
              Confirm Password
            </Text>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E2E8F0',
                paddingHorizontal: 16,
                height: 52,
                justifyContent: 'center',
              }}
            >
              <TextInput
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={{ fontSize: 15, color: '#111827' }}
              />
            </View>
          </View>
        </View>

        {/* Terms & Privacy Policy Checkbox */}
        <TouchableOpacity
          onPress={() => setAgreeTerms(!agreeTerms)}
          activeOpacity={0.8}
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 28 }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              borderWidth: 1.5,
              borderColor: agreeTerms ? '#2563EB' : '#CBD5E1',
              backgroundColor: agreeTerms ? '#2563EB' : '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            {agreeTerms && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
          </View>
          <Text style={{ fontSize: 13, color: '#475569', flex: 1 }}>
            I agree to{' '}
            <Text style={{ fontWeight: '700', color: '#2563EB' }}>Terms & Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity
          onPress={onSignupSuccess}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#2563EB',
            height: 56,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 4,
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>Create Account</Text>
        </TouchableOpacity>

        {/* Footer: Login Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>Already have an account? </Text>
          <TouchableOpacity onPress={onGoToLogin}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#2563EB' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
