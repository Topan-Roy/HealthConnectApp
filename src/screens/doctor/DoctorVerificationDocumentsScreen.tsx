import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

interface DoctorVerificationDocumentsScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const DoctorVerificationDocumentsScreen: React.FC<DoctorVerificationDocumentsScreenProps> = ({
  onBack,
  onContinue,
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-10 pt-7">
          <View className="mb-5 items-center">
            <View className="mb-3 h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-blue-50">
              <Image
                source={require('../../../assets/logo.png')}
                className="h-[50px] w-[50px]"
                resizeMode="contain"
              />
            </View>

            <Text className="text-center text-[28px] font-extrabold text-gray-900">
              Verification Documents
            </Text>
            <Text className="mt-1.5 text-center text-[15px] text-gray-600">
              Please upload the following documents
            </Text>
          </View>

          <View className="gap-4">
            {[
              'NID / Passport',
              'Medical License',
              'Degree Certificate',
              'Profile Photo',
            ].map((item, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
              >
                <Text className="text-[15px] font-semibold text-gray-900">{item}</Text>
                <Text className="text-[12px] font-bold text-emerald-500">Uploaded</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={onContinue}
            activeOpacity={0.85}
            className="mt-7 h-[56px] items-center justify-center rounded-[18px] bg-primary shadow-lg shadow-blue-600/30"
          >
            <Text className="text-[16px] font-extrabold text-white">Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} className="mt-5 items-center">
            <Text className="text-[14px] font-bold text-primary">Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DoctorVerificationDocumentsScreen;
