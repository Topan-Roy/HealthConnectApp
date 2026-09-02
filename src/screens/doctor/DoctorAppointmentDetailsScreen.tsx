import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface DoctorAppointmentDetailsScreenProps {
  onBack?: () => void;
  onStartConsultation?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
}

export const DoctorAppointmentDetailsScreen: React.FC<DoctorAppointmentDetailsScreenProps> = ({
  onBack,
  onStartConsultation,
  onReschedule,
  onCancel
}) => {
  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 }}>
          
          <View className="flex-row items-center mb-6">
            <TouchableOpacity 
              onPress={onBack} 
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
            >
              <ArrowLeft size={20} color="#111827" />
            </TouchableOpacity>
            <Text className="text-gray-900 text-xl font-bold">Appointment Details</Text>
          </View>

          {/* Patient Info Card */}
          <View className="flex-row items-center p-4 bg-white rounded-2xl mb-4 shadow-sm border border-gray-100">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Text className="text-blue-600 font-bold">R</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-bold text-base">Rahim Ahmed</Text>
              <Text className="text-gray-500 text-sm">28 Years, Male</Text>
            </View>
            <Text className="text-gray-400">›</Text>
          </View>

          {/* Date and Time */}
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 mr-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-xs mb-1">Date</Text>
              <Text className="text-gray-900 font-bold text-base">30 Aug 2026</Text>
            </View>
            <View className="flex-1 ml-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-xs mb-1">Time</Text>
              <Text className="text-gray-900 font-bold text-base">05:30 PM</Text>
            </View>
          </View>

          {/* Type */}
          <View className="p-4 bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500 text-xs mb-1">Type</Text>
              <Text className="text-gray-900 font-bold text-base">Video Consultation</Text>
            </View>
          </View>

          {/* Fees */}
          <View className="p-4 bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500 text-xs mb-1">Fees</Text>
              <Text className="text-gray-900 font-bold text-base">৳600</Text>
            </View>
          </View>
          
          {/* Status */}
          <View className="p-4 bg-white rounded-2xl mb-8 shadow-sm border border-gray-100 flex-row justify-between items-center">
            <Text className="text-gray-500 text-xs mb-1">Status</Text>
            <Text className="text-green-600 font-bold text-base">Confirmed</Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <TouchableOpacity
              onPress={onStartConsultation}
              className="w-full bg-blue-600 py-4 rounded-xl items-center shadow-sm"
            >
              <Text className="text-white font-bold text-base">Start Consultation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onReschedule}
              className="w-full bg-white border-2 border-blue-600 py-4 rounded-xl items-center shadow-sm"
            >
              <Text className="text-blue-600 font-bold text-base">Reschedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onCancel}
              className="w-full bg-white border-2 border-red-500 py-4 rounded-xl items-center shadow-sm"
            >
              <Text className="text-red-500 font-bold text-base">Cancel Appointment</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorAppointmentDetailsScreen;
