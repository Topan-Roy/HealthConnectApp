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
import { Mail, Lock, Phone, Check, Eye, EyeOff } from 'lucide-react-native';

interface DoctorSignupScreenProps {
  onBack: () => void;
  onSignupSuccess: () => void;
  onGoToLogin: () => void;
}

export const DoctorSignupScreen: React.FC<DoctorSignupScreenProps> = ({
  onBack,
  onSignupSuccess,
  onGoToLogin,
}) => {
  const [fullName, setFullName] = useState('Dr. Sarah Ahmed');
  const [email, setEmail] = useState('sarah.ahmed@gmail.com');
  const [phone, setPhone] = useState('+880 1712-345678');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

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
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
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
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827' }}>
                Create Doctor Account
              </Text>
              <Text style={{ fontSize: 14, color: '#48494dff', marginTop: 6 }}>
                Let’s get started
              </Text>
            </View>

            <View style={{ gap: 18 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Full Name</Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Dr. Sarah Ahmed"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: '#E2E8F0',
                    paddingHorizontal: 16,
                    height: 56,
                    fontSize: 15,
                    color: '#111827',
                  }}
                />
              </View>

              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Email</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56 }}>
                  <Mail size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="sarah.ahmed@gmail.com"
                    placeholderTextColor="#9CA3AF"
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Phone Number</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56 }}>
                  <Phone size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+880 1712-345678"
                    placeholderTextColor="#9CA3AF"
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Password</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56 }}>
                  <Lock size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    style={{ flex: 1, fontSize: 15, color: '#111827' }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} color="#48494dff" /> : <Eye size={20} color="#48494dff" />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18, marginBottom: 18 }}>
              <TouchableOpacity
                onPress={() => setAcceptTerms(!acceptTerms)}
                activeOpacity={0.8}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  backgroundColor: acceptTerms ? '#2563EB' : '#FFFFFF',
                  borderWidth: 1.5,
                  borderColor: acceptTerms ? '#2563EB' : '#CBD5E1',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {acceptTerms && <Check size={14} color="#FFFFFF" />}
              </TouchableOpacity>
              <Text style={{ marginLeft: 12, fontSize: 13, color: '#475569', flex: 1 }}>
                I agree to the Terms & Conditions and Privacy Policy
              </Text>
            </View>

            <TouchableOpacity
              onPress={onSignupSuccess}
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
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF' }}>Continue</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 18 }}>
              <Text style={{ fontSize: 13, color: '#475569' }}>
                Already have an account?{' '}
                <Text onPress={onGoToLogin} style={{ color: '#2563EB', fontWeight: '700' }}>Login</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default DoctorSignupScreen;
