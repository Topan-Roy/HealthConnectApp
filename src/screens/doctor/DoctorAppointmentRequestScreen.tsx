import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

interface DoctorAppointmentRequestScreenProps {
  onBack?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export const DoctorAppointmentRequestScreen: React.FC<DoctorAppointmentRequestScreenProps> = ({ 
  onBack, 
  onAccept, 
  onReject 
}) => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-6 pb-6 flex-row items-center">
          <TouchableOpacity onPress={onBack} className="mr-4">
             {/* Simple back icon representation */}
             <Text className="text-gray-800 text-xl font-bold">←</Text>
          </TouchableOpacity>
          <Text className="text-gray-900 text-xl font-bold">Appointment Request</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
          
          <Text className="text-gray-900 text-lg font-bold mb-6">New Appointment Request</Text>

          {/* Patient Info Card */}
          <View className="flex-row items-center p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
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
            <View className="flex-1 mr-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Text className="text-gray-500 text-xs mb-1">Date</Text>
              <Text className="text-gray-900 font-bold text-base">30 Aug 2023</Text>
            </View>
            <View className="flex-1 ml-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Text className="text-gray-500 text-xs mb-1">Time</Text>
              <Text className="text-gray-900 font-bold text-base">05:30 PM</Text>
            </View>
          </View>

          {/* Type */}
          <View className="p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
            <Text className="text-gray-500 text-xs mb-1">Type</Text>
            <Text className="text-gray-900 font-bold text-base">Video Consultation</Text>
          </View>

          {/* Fees */}
          <View className="p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
            <Text className="text-gray-500 text-xs mb-1">Fees</Text>
            <Text className="text-gray-900 font-bold text-base">৳600</Text>
          </View>

          {/* Note */}
          <View className="p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
            <Text className="text-gray-600 text-sm leading-6">
              Regular checkup and heart health consultation.
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between">
            <TouchableOpacity 
              onPress={onAccept}
              className="flex-1 bg-green-600 py-4 rounded-xl mr-2 items-center"
            >
              <Text className="text-white font-bold text-base">Accept</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={onReject}
              className="flex-1 bg-red-600 py-4 rounded-xl ml-2 items-center"
            >
              <Text className="text-white font-bold text-base">Reject</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DoctorAppointmentRequestScreen;
