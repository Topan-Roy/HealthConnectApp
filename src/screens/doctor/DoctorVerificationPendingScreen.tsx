import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';

interface DoctorVerificationPendingScreenProps {
  onBackToHome?: () => void;
  onGoToLogin?: () => void;
}

export const DoctorVerificationPendingScreen: React.FC<DoctorVerificationPendingScreenProps> = ({
  onBackToHome,
  onGoToLogin,
}) => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        className="absolute inset-0"
        resizeMode="cover"
      />
      <SafeAreaView className="flex-1 bg-transparent">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        <View className="flex-1 px-6 pb-10 pt-10">
          <View className="mb-7 items-center">
            <View className="mb-3 h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-blue-50">
              <Image
                source={require('../../../assets/logo.png')}
                className="h-[50px] w-[50px]"
                resizeMode="contain"
              />
            </View>
            <Text className="text-center text-[28px] font-extrabold text-gray-900">
              Application Submitted!
            </Text>
            <Text className="mt-2 text-center text-[15px] leading-6 text-slate-600">
              Your doctor profile has been submitted for verification.
            </Text>
          </View>

          <View className="mb-6 rounded-[20px] bg-white/80 p-4">
            <Text className="text-center text-[14px] leading-6 text-slate-600">
              Our admin team will review your documents and notify you once your account is approved.
            </Text>
          </View>

          <View className="mt-1">
            <TouchableOpacity
              onPress={onGoToLogin}
              activeOpacity={0.85}
              className="h-[56px] items-center justify-center rounded-[18px] bg-primary shadow-lg shadow-blue-600/30"
            >
              <Text className="text-[16px] font-extrabold text-white">Go to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onBackToHome} className="mt-5 items-center">
              <Text className="text-[14px] font-bold text-primary">Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DoctorVerificationPendingScreen;
