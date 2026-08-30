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
    <View className="flex-1">
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        className="absolute inset-0"
        resizeMode="cover"
      />
      <SafeAreaView className="flex-1 bg-transparent">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerClassName="px-6 pt-7 pb-10"
          >
            <View className="mb-4 items-center">
              <View className="mb-3 h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-blue-50">
                <Image
                  source={require('../../../assets/logo.png')}
                  className="h-[50px] w-[50px]"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-[28px] font-extrabold text-gray-900">Create Doctor Account</Text>
              <Text className="mt-1.5 text-[14px] text-gray-600">Let’s get started</Text>
            </View>

            <View className="gap-4">
              <View>
                <Text className="mb-2 text-[14px] font-semibold text-slate-700">Full Name</Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Dr. Sarah Ahmed"
                  placeholderTextColor="#9CA3AF"
                  className="h-[56px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-gray-900"
                />
              </View>

              <View>
                <Text className="mb-2 text-[14px] font-semibold text-slate-700">Email</Text>
                <View className="h-[56px] flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
                  <Mail size={20} color="#9CA3AF" className="mr-3" />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="sarah.ahmed@gmail.com"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-[15px] text-gray-900"
                  />
                </View>
              </View>

              <View>
                <Text className="mb-2 text-[14px] font-semibold text-slate-700">Phone Number</Text>
                <View className="h-[56px] flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
                  <Phone size={20} color="#9CA3AF" className="mr-3" />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+880 1712-345678"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-[15px] text-gray-900"
                  />
                </View>
              </View>

              <View>
                <Text className="mb-2 text-[14px] font-semibold text-slate-700">Password</Text>
                <View className="h-[56px] flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
                  <Lock size={20} color="#9CA3AF" className="mr-3" />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    className="flex-1 text-[15px] text-gray-900"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                    {showPassword ? <EyeOff size={20} color="#48494dff" /> : <Eye size={20} color="#48494dff" />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mt-5 flex-row items-center">
              <TouchableOpacity
                onPress={() => setAcceptTerms(!acceptTerms)}
                activeOpacity={0.8}
                className={`h-[22px] w-[22px] items-center justify-center rounded-md border ${
                  acceptTerms ? 'border-primary bg-primary' : 'border-slate-300 bg-white'
                }`}
              >
                {acceptTerms && <Check size={14} color="#FFFFFF" />}
              </TouchableOpacity>
              <Text className="ml-3 flex-1 text-[13px] text-slate-600">
                I agree to the Terms & Conditions and Privacy Policy
              </Text>
            </View>

            <TouchableOpacity
              onPress={onSignupSuccess}
              activeOpacity={0.85}
              className="mt-6 h-[56px] items-center justify-center rounded-[18px] bg-primary shadow-lg shadow-blue-600/30"
            >
              <Text className="text-[16px] font-extrabold text-white">Continue</Text>
            </TouchableOpacity>

            <View className="mt-5 items-center">
              <Text className="text-[13px] text-slate-600">
                Already have an account?{' '}
                <Text onPress={onGoToLogin} className="font-bold text-primary">Login</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default DoctorSignupScreen;
