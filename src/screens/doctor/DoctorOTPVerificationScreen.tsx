import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';

interface DoctorOTPVerificationScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
}

export const DoctorOTPVerificationScreen: React.FC<DoctorOTPVerificationScreenProps> = ({
  onBack,
  onVerifySuccess,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        className="absolute inset-0"
        resizeMode="cover"
      />
      <SafeAreaView className="flex-1 bg-transparent">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        <View className="flex-1 px-6 pb-10 pt-8">
          <View className="mb-5 items-center">
            <View className="mb-3 h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-blue-50">
              <Image
                source={require('../../../assets/logo.png')}
                className="h-[50px] w-[50px]"
                resizeMode="contain"
              />
            </View>

            <Text className="text-center text-[30px] font-extrabold text-gray-900">Verify Your Phone</Text>
            <Text className="mt-1.5 text-center text-[15px] text-gray-600">
              We sent a 6-digit code to +880 1712-345678
            </Text>
          </View>

          <View className="mb-6 flex-row justify-between">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="number-pad"
                maxLength={1}
                className="h-[56px] w-[44px] rounded-[14px] border border-slate-300 bg-white text-center text-[22px] font-bold text-gray-900"
              />
            ))}
          </View>

          <Text className="mb-6 text-center text-[13px] text-slate-600">
            Resend code in <Text className="font-bold text-primary">00:25</Text>
          </Text>

          <TouchableOpacity
            onPress={onVerifySuccess}
            activeOpacity={0.85}
            className="h-[56px] items-center justify-center rounded-[18px] bg-primary shadow-lg shadow-blue-600/30"
          >
            <Text className="text-[16px] font-extrabold text-white">Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} className="mt-5 items-center">
            <Text className="text-[14px] font-bold text-primary">Change Phone Number</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DoctorOTPVerificationScreen;
