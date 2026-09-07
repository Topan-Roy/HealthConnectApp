import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Patient } from '../../data/patients';

interface DoctorPatientDetailsScreenProps {
  patient: Patient;
  onBack?: () => void;
  onViewHistory?: (patient: Patient) => void;
}

export const DoctorPatientDetailsScreen: React.FC<DoctorPatientDetailsScreenProps> = ({
  patient,
  onBack,
  onViewHistory,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-4 pb-4">
          <TouchableOpacity
            onPress={onBack}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
          >
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-xl font-bold">Patient Details</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        >
          {/* Patient Profile Card */}
          <View className="bg-white rounded-3xl p-6 mb-5 items-center shadow-sm border border-gray-100">
            <View className="w-20 h-20 rounded-full overflow-hidden bg-blue-50 items-center justify-center mb-3 border-2 border-blue-100 shadow-sm">
              {!imageError ? (
                <Image
                  source={{ uri: patient.avatar }}
                  className="w-full h-full"
                  resizeMode="cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Text className="text-blue-600 font-bold text-2xl">
                  {patient.name.charAt(0)}
                </Text>
              )}
            </View>
            <Text className="text-gray-900 font-bold text-xl mb-1 text-center">
              {patient.name}
            </Text>
            <Text className="text-gray-500 text-sm font-medium">
              {patient.age} Years, {patient.gender}
            </Text>
          </View>

          {/* Basic Information Section */}
          <View className="mb-5">
            <Text className="text-gray-900 font-bold text-base mb-3 px-1">
              Basic Information
            </Text>
            <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              {/* Blood Group */}
              <View className="flex-row justify-between items-center py-2.5 border-b border-gray-100">
                <Text className="text-gray-500 text-sm font-medium">Blood Group</Text>
                <Text className="text-gray-900 font-bold text-sm">{patient.bloodGroup}</Text>
              </View>

              {/* Phone */}
              <View className="flex-row justify-between items-center py-2.5 border-b border-gray-100">
                <Text className="text-gray-500 text-sm font-medium">Phone</Text>
                <Text className="text-gray-900 font-bold text-sm">{patient.phone}</Text>
              </View>

              {/* Allergies */}
              <View className="flex-row justify-between items-center py-2.5 border-b border-gray-100">
                <Text className="text-gray-500 text-sm font-medium">Allergies</Text>
                <Text className="text-gray-900 font-bold text-sm">{patient.allergies}</Text>
              </View>

              {/* Medical Conditions */}
              <View className="flex-row justify-between items-center py-2.5">
                <Text className="text-gray-500 text-sm font-medium">Medical Conditions</Text>
                <Text className="text-gray-900 font-bold text-sm">{patient.medicalConditions}</Text>
              </View>
            </View>
          </View>

          {/* Last Appointment Section */}
          <View className="mb-6">
            <Text className="text-gray-900 font-bold text-base mb-3 px-1">
              Last Appointment
            </Text>
            <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <Text className="text-gray-900 font-bold text-base mb-1">
                {patient.lastAppointment.dateTime}
              </Text>
              <Text className="text-gray-500 text-xs">
                {patient.lastAppointment.type}
              </Text>
            </View>
          </View>

          {/* Action Button: View History */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onViewHistory && onViewHistory(patient)}
            className="bg-blue-600 py-4 rounded-2xl items-center justify-center shadow-md shadow-blue-500/20"
          >
            <Text className="text-white font-bold text-base">View History</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorPatientDetailsScreen;
