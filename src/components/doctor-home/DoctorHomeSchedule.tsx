import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const DoctorHomeSchedule = () => {
  return (
    <View className="mb-4">
      <Text className="text-gray-900 text-xl font-bold mb-6">Today's Schedule</Text>
      
      <View className="flex-row mb-6">
          <View className="w-1 h-12 bg-blue-600 rounded-full mr-4 mt-1" />
          <View className="flex-row justify-between items-center flex-1">
            <View className="flex-row items-center flex-1">
              <Text className="text-gray-800 font-bold text-sm w-20">08:00 AM</Text>
              <View className="flex-1 ml-2">
                <Text className="text-gray-800 font-bold text-base">Rahim Ahmed</Text>
                <Text className="text-gray-500 text-sm">Video Consultation</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-green-600 px-5 py-2 rounded-lg">
              <Text className="text-white font-bold text-xs">Start</Text>
            </TouchableOpacity>
          </View>
      </View>
      
      <View className="flex-row mb-6">
          <View className="w-1 h-12 bg-blue-600 rounded-full mr-4 mt-1" />
          <View className="flex-row justify-between items-center flex-1">
            <View className="flex-row items-center flex-1">
              <Text className="text-gray-800 font-bold text-sm w-20">10:30 AM</Text>
              <View className="flex-1 ml-2">
                <Text className="text-gray-800 font-bold text-base">Karim Hasan</Text>
                <Text className="text-gray-500 text-sm">Follow-up</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-green-600 px-5 py-2 rounded-lg">
              <Text className="text-white font-bold text-xs">Start</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View className="flex-row mb-6">
          <View className="w-1 h-12 bg-blue-600 rounded-full mr-4 mt-1" />
          <View className="flex-row justify-between items-center flex-1">
            <View className="flex-row items-center flex-1">
              <Text className="text-gray-800 font-bold text-sm w-20">12:00 PM</Text>
              <View className="flex-1 ml-2">
                <Text className="text-gray-800 font-bold text-base">Nadia Rahman</Text>
                <Text className="text-gray-500 text-sm">Video Consultation</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-green-600 px-5 py-2 rounded-lg">
              <Text className="text-white font-bold text-xs">Start</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};
