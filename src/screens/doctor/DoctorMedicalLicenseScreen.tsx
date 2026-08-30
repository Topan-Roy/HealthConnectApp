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
} from 'react-native';

interface DoctorMedicalLicenseScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const DoctorMedicalLicenseScreen: React.FC<DoctorMedicalLicenseScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [licenseNumber, setLicenseNumber] = useState('DC-12345');
  const [documentName, setDocumentName] = useState('NID / Passport');

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
            <Text className="text-center text-[28px] font-extrabold text-gray-900">Medical License</Text>
            <Text className="mt-1.5 text-center text-[15px] text-gray-600">Add your medical license details</Text>
          </View>

          <View className="gap-4">
            <View>
              <Text className="mb-2 text-[14px] font-semibold text-slate-700">License Number</Text>
              <TextInput
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                placeholder="DC-12345"
                className="h-[56px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-gray-900"
              />
            </View>

            <View>
              <Text className="mb-2 text-[14px] font-semibold text-slate-700">Uploaded License Document</Text>
              <View className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Text className="text-[14px] text-slate-600">{documentName}</Text>
              </View>
            </View>
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

export default DoctorMedicalLicenseScreen;
