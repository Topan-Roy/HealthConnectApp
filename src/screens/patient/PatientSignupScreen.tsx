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
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { User, Mail, Phone, Lock, Eye, EyeOff, Check } from 'lucide-react-native';

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

  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const handleHardwareBack = () => {
      onBack();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => subscription.remove();
  }, [onBack]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

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
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  backgroundColor: '#EFF6FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{ width: 44, height: 44, resizeMode: 'contain' }}
                />
              </View>

              <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', letterSpacing: -0.5, textAlign: 'center' }}>
                Create Account
              </Text>
              <Text style={{ fontSize: 14, color: '#48494dff', marginTop: 4, textAlign: 'center' }}>
                Join us today to manage your health seamlessly
              </Text>
            </View>

            {/* Input Form Fields */}
            <View style={{ gap: 16 }}>
              {/* Full Name */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 6 }}>
                  Full Name
                </Text>
                <View
                  style={{
                    backgroundColor: focusedField === 'fullName' ? '#FFFFFF' : '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: focusedField === 'fullName' ? '#2563EB' : '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 54,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <User size={20} color={focusedField === 'fullName' ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                </View>
              </View>

              {/* Email */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 6 }}>
                  Email
                </Text>
                <View
                  style={{
                    backgroundColor: focusedField === 'email' ? '#FFFFFF' : '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: focusedField === 'email' ? '#2563EB' : '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 54,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Mail size={20} color={focusedField === 'email' ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                </View>
              </View>

              {/* Phone */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 6 }}>
                  Phone
                </Text>
                <View
                  style={{
                    backgroundColor: focusedField === 'phone' ? '#FFFFFF' : '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: focusedField === 'phone' ? '#2563EB' : '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 54,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Phone size={20} color={focusedField === 'phone' ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Enter your phone number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                </View>
              </View>

              {/* Password */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 6 }}>
                  Password
                </Text>
                <View
                  style={{
                    backgroundColor: focusedField === 'password' ? '#FFFFFF' : '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: focusedField === 'password' ? '#2563EB' : '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 54,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Lock size={20} color={focusedField === 'password' ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Create a password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                    {showPassword ? <EyeOff size={20} color="#48494dff" /> : <Eye size={20} color="#48494dff" />}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 6 }}>
                  Confirm Password
                </Text>
                <View
                  style={{
                    backgroundColor: focusedField === 'confirmPassword' ? '#FFFFFF' : '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: focusedField === 'confirmPassword' ? '#2563EB' : '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 54,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Lock size={20} color={focusedField === 'confirmPassword' ? '#2563EB' : '#9CA3AF'} style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Confirm your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
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
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.28,
                shadowRadius: 10,
                elevation: 5,
                marginBottom: 24,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>Create Account</Text>
            </TouchableOpacity>

            {/* Footer: Login Link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#48494dff' }}>Already have an account? </Text>
              <TouchableOpacity onPress={onGoToLogin} activeOpacity={0.7}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#2563EB' }}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
