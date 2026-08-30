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

interface DoctorProfessionalInfoScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const DoctorProfessionalInfoScreen: React.FC<DoctorProfessionalInfoScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [specialty, setSpecialty] = useState('Cardiology');
  const [qualification, setQualification] = useState('MBBS, MD (Cardiology)');
  const [experience, setExperience] = useState('8');
  const [fee, setFee] = useState('800');
  const [hospital, setHospital] = useState('Square Hospital, Dhaka');

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
            <Text className="text-center text-[28px] font-extrabold text-gray-900">Professional Information</Text>
          </View>

          <View className="gap-4">
            <View>
              <Text className="mb-2 text-[14px] font-semibold text-slate-700">Specialization</Text>
              <TextInput
                value={specialty}
                onChangeText={setSpecialty}
                placeholder="Cardiology"
                className="h-[56px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-gray-900"
              />
            </View>

            <View>
              <Text className="mb-2 text-[14px] font-semibold text-slate-700">Qualification</Text>
              <TextInput
                value={qualification}
                onChangeText={setQualification}
                placeholder="MBBS, MD (Cardiology)"
                className="h-[56px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-gray-900"
              />
            </View>

            <View>
              <Text className="mb-2 text-[14px] font-semibold text-slate-700">Experience (Years)</Text>
              <TextInput
                value={experience}
                onChangeText={setExperience}
                keyboardType="numeric"
                placeholder="8"
                className="h-[56px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-gray-900"
              />
            </View>

            <View>
              <Text className="mb-2 text-[14px] font-semibold text-slate-700">Consultation Fee</Text>
              <TextInput
                value={fee}
                onChangeText={setFee}
                keyboardType="numeric"
                placeholder="800"
                className="h-[56px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-gray-900"
              />
            </View>

            <View>
              <Text className="mb-2 text-[14px] font-semibold text-slate-700">Hospital / Clinic</Text>
              <TextInput
                value={hospital}
                onChangeText={setHospital}
                placeholder="Square Hospital, Dhaka"
                className="h-[56px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-gray-900"
              />
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

export default DoctorProfessionalInfoScreen;
