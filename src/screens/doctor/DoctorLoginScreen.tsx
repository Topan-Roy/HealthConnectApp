import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

interface DoctorLoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onGoToSignup: () => void;
}

export const DoctorLoginScreen: React.FC<DoctorLoginScreenProps> = ({
  onBack,
  onLoginSuccess,
  onGoToSignup,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('sarah.ahmed@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
                  source={require('../../../assets/logo.png')}
                  style={{ width: 50, height: 50, resizeMode: 'contain' }}
                />
              </View>

              <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', textAlign: 'center' }}>
                Welcome Back!
              </Text>
              <Text style={{ fontSize: 14, color: '#48494dff', marginTop: 6, textAlign: 'center' }}>
                Login to your account
              </Text>
            </View>

            <View style={{ gap: 20 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>
                  Email / Phone
                </Text>
                <View
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 56,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Mail size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="sarah.ahmed@gmail.com"
                    placeholderTextColor="#9CA3AF"
                    value={emailOrPhone}
                    onChangeText={setEmailOrPhone}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>
                  Password
                </Text>
                <View
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 56,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Lock size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                    {showPassword ? <EyeOff size={20} color="#48494dff" /> : <Eye size={20} color="#48494dff" />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end', marginTop: 12, marginBottom: 28 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#2563EB' }}>Forgot Password?</Text>
            </View>

            <TouchableOpacity
              onPress={onLoginSuccess}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#2563EB',
                height: 56,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 4,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF' }}>Login</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 18 }}>
              <Text style={{ fontSize: 13, color: '#475569' }}>
                Don’t have an account?{' '}
                <Text onPress={onGoToSignup} style={{ color: '#2563EB', fontWeight: '700' }}>Create Account</Text>
              </Text>
            </View>

            <TouchableOpacity onPress={onBack} style={{ alignItems: 'center', marginTop: 18 }}>
              <Text style={{ fontSize: 14, color: '#2563EB', fontWeight: '700' }}>Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default DoctorLoginScreen;
