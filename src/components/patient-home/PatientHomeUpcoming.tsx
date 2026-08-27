import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export const PatientHomeUpcoming = () => {
  return (
    <View className="mb-8">
      <Text className="text-lg font-bold text-gray-900 mb-4">Upcoming Appointment</Text>
      <View className="bg-blue-50/50 rounded-3xl p-4 border border-blue-100/50">
        <View className="flex-row gap-4">
          <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-end overflow-hidden">
             <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=47' }} 
                className="w-16 h-16 rounded-2xl" 
                resizeMode="cover"
             />
          </View>
          
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-base font-bold text-gray-900">Dr. Sarah Ahmed</Text>
              <TouchableOpacity>
                <Text className="text-gray-400 font-bold text-lg leading-none">×</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500 mb-2">Cardiologist</Text>
            
            <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-sm font-semibold text-gray-900 mb-1">Today, 06:30 PM</Text>
                <Text className="text-xs text-gray-500">Video Consultation</Text>
              </View>
              <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-xl">
                <Text className="text-white font-semibold text-sm">Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
