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
import Svg, { Path } from 'react-native-svg';

interface DoctorLoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onGoToSignup: () => void;
}

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

            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
                <Text style={{ fontSize: 13, fontWeight: '500', color: '#9CA3AF', marginHorizontal: 14 }}>
                  or continue with
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
              </View>

              <TouchableOpacity
                activeOpacity={0.75}
                style={{
                  width: '100%',
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
            </View>

            <View style={{ alignItems: 'center', marginTop: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 13, color: '#475569' }}>Don’t have an account? </Text>
                <TouchableOpacity onPress={onGoToSignup} activeOpacity={0.8}>
                  <Text style={{ color: '#2563EB', fontWeight: '700' }}>Create Account</Text>
                </TouchableOpacity>
              </View>
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
