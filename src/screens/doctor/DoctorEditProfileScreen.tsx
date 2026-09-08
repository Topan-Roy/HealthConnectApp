import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Camera, Check, Award } from 'lucide-react-native';
import { DoctorProfileData, INITIAL_DOCTOR_PROFILE } from './DoctorMyProfileScreen';

interface DoctorEditProfileScreenProps {
  initialData?: DoctorProfileData;
  onBack: () => void;
  onSave: (updatedData: DoctorProfileData) => void;
}

export const DoctorEditProfileScreen: React.FC<DoctorEditProfileScreenProps> = ({
  initialData = INITIAL_DOCTOR_PROFILE,
  onBack,
  onSave,
}) => {
  const [name, setName] = useState(initialData.name);
  const [specialty, setSpecialty] = useState(initialData.specialty);
  const [experience, setExperience] = useState(initialData.experience.replace(/[^0-9]/g, '') || '6');
  const [consultationFee, setConsultationFee] = useState(initialData.consultationFee);
  const [hospital, setHospital] = useState(initialData.hospital);
  const [degrees, setDegrees] = useState(initialData.degrees);
  const [languages, setLanguages] = useState(initialData.languages);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [imgError, setImgError] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !specialty.trim() || !hospital.trim()) {
      Alert.alert('Required Fields', 'Please fill in all essential fields.');
      return;
    }

    const updated: DoctorProfileData = {
      ...initialData,
      name: name.trim(),
      specialty: specialty.trim(),
      degrees: degrees.trim(),
      experience: `${experience.trim()} Years Exp.`,
      consultationFee: consultationFee.trim() || '500',
      hospital: hospital.trim(),
      languages: languages.trim(),
      avatarUrl,
    };

    onSave(updated);
    Alert.alert('Success', 'Profile updated successfully!');
    onBack();
  };

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBack}
              className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm border border-slate-200"
            >
              <ChevronLeft size={22} color="#1E293B" />
            </TouchableOpacity>

            <Text className="text-[19px] font-bold text-gray-900">Edit Profile</Text>

            <View className="w-10" />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          >
            {/* Avatar change */}
            <View className="items-center my-4">
              <View className="relative">
                <View className="w-24 h-24 rounded-full bg-blue-50 overflow-hidden border-2 border-blue-500/20 items-center justify-center shadow-sm">
                  {!imgError ? (
                    <Image
                      source={{ uri: avatarUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <Award size={46} color="#2563EB" />
                  )}
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Alert.alert('Change Avatar', 'Photo upload feature is ready.');
                  }}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full items-center justify-center border-2 border-white shadow-sm"
                >
                  <Camera size={15} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-gray-500 mt-2">Tap camera to change photo</Text>
            </View>

            {/* Form Fields Card */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
              {/* Full Name */}
              <View>
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Full Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Dr. Sarah Ahmed"
                  placeholderTextColor="#9CA3AF"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium"
                />
              </View>

              {/* Specialisation */}
              <View>
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Specialisation</Text>
                <TextInput
                  value={specialty}
                  onChangeText={setSpecialty}
                  placeholder="e.g. Cardiologist"
                  placeholderTextColor="#9CA3AF"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium"
                />
              </View>

              {/* Degrees / Qualification */}
              <View>
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Degree / Qualification</Text>
                <TextInput
                  value={degrees}
                  onChangeText={setDegrees}
                  placeholder="e.g. MBBS, MD (Cardiology)"
                  placeholderTextColor="#9CA3AF"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium"
                />
              </View>

              {/* Experience (Years) */}
              <View>
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Experience (Years)</Text>
                <TextInput
                  value={experience}
                  onChangeText={setExperience}
                  keyboardType="numeric"
                  placeholder="e.g. 6"
                  placeholderTextColor="#9CA3AF"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium"
                />
              </View>

              {/* Consultation Fee (৳) */}
              <View>
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Consultation Fee (৳)</Text>
                <TextInput
                  value={consultationFee}
                  onChangeText={setConsultationFee}
                  keyboardType="numeric"
                  placeholder="e.g. 500"
                  placeholderTextColor="#9CA3AF"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium"
                />
              </View>

              {/* Hospital / Clinic */}
              <View>
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Hospital / Clinic</Text>
                <TextInput
                  value={hospital}
                  onChangeText={setHospital}
                  placeholder="e.g. Square Hospital, Dhaka"
                  placeholderTextColor="#9CA3AF"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium"
                />
              </View>

              {/* Languages */}
              <View>
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Languages</Text>
                <TextInput
                  value={languages}
                  onChangeText={setLanguages}
                  placeholder="e.g. English, Bengali"
                  placeholderTextColor="#9CA3AF"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium"
                />
              </View>
            </View>

            {/* Save Changes Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center mt-6 shadow-md shadow-blue-500/30"
            >
              <Text className="text-white font-bold text-base">Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorEditProfileScreen;
