import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { ArrowLeft, Edit2, Send } from 'lucide-react-native';

interface DoctorPrescriptionPreviewScreenProps {
  onBack?: () => void;
  onEdit?: () => void;
  onSendToPatient?: () => void; // Navigates to Video Call screen
}

export const DoctorPrescriptionPreviewScreen: React.FC<DoctorPrescriptionPreviewScreenProps> = ({
  onBack,
  onEdit,
  onSendToPatient
}) => {
  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 140 }}
        >
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={onBack}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
            >
              <ArrowLeft size={20} color="#111827" />
            </TouchableOpacity>
            <Text className="text-gray-900 text-xl font-bold">Prescription Preview</Text>
          </View>

          {/* Prescription Card */}
          <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            {/* Doctor Info */}
            <View className="flex-row items-center border-b border-gray-100 pb-5 mb-5 bg-blue-50/50 p-4 rounded-2xl">
              <View className="w-14 h-14 bg-white rounded-full items-center justify-center mr-4 border border-blue-100 shadow-sm">
                <Text className="text-blue-700 font-bold text-xl">Dr</Text>
              </View>
              <View>
                <Text className="text-gray-900 font-bold text-base">Dr. Sarah Ahmed</Text>
                <Text className="text-gray-500 text-sm">Cardiologist</Text>
              </View>
            </View>

            {/* Patient Info */}
            <View className="mb-5 border-b border-gray-100 pb-5">
              <Text className="text-gray-900 font-bold text-base">Rahim Ahmed</Text>
              <Text className="text-gray-500 text-sm mt-1">28 Years, Male</Text>
            </View>

            {/* Diagnosis */}
            <View className="mb-5 border-b border-gray-100 pb-5">
              <Text className="text-gray-900 font-bold text-base mb-1">Diagnosis</Text>
              <Text className="text-gray-500">Viral Fever</Text>
            </View>

            {/* Medicines List */}
            <View className="mb-5 border-b border-gray-100 pb-5">
              <Text className="text-gray-900 font-bold text-base mb-3">Medicines</Text>

              <View className="mb-3">
                <Text className="text-gray-900 font-semibold">• Paracetamol 500mg</Text>
                <Text className="text-gray-500 text-sm ml-3 mt-1">1 - 1 - 1 × 5 Days</Text>
              </View>

              <View>
                <Text className="text-gray-900 font-semibold">• Vitamin C 500mg</Text>
                <Text className="text-gray-500 text-sm ml-3 mt-1">1 - 0 - 1 × 5 Days</Text>
              </View>
            </View>

            {/* Advice */}
            <View>
              <Text className="text-gray-900 font-bold text-base mb-1">Advice</Text>
              <Text className="text-gray-500 leading-5">
                Take rest and drink plenty of water. Avoid cold food.
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row mt-6 gap-3">
            <TouchableOpacity
              onPress={onEdit}
              className="flex-row flex-1 border-2 border-blue-600 py-4 rounded-2xl items-center justify-center bg-white shadow-sm"
            >
              <Edit2 size={18} color="#2563EB" />
              <Text className="text-blue-600 font-bold text-base ml-2">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSendToPatient}
              className="flex-1 bg-green-600 py-4 rounded-2xl items-center justify-center shadow-sm"
            >
              <Text className="text-white font-bold text-base">Send to Patient</Text>
            </TouchableOpacity>
          </View>




        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorPrescriptionPreviewScreen;
