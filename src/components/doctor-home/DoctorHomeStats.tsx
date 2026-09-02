import React from 'react';
import { View, Text } from 'react-native';

export const DoctorHomeStats = () => {
  return (
    <View className="flex-row justify-between mb-8">
      <View className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex-1 mr-2 items-center">
        <Text className="text-indigo-600 text-xs font-semibold mb-2">Appointments</Text>
        <Text className="text-gray-900 text-3xl font-bold">08</Text>
        <Text className="text-gray-500 text-xs mt-1">Today</Text>
      </View>
      <View className="bg-green-50 border border-green-100 rounded-2xl p-4 flex-1 mx-1 items-center">
        <Text className="text-gray-600 text-xs font-semibold mb-2">Patients</Text>
        <Text className="text-gray-900 text-3xl font-bold">124</Text>
        <Text className="text-gray-500 text-xs mt-1">Total</Text>
      </View>
      <View className="bg-green-50 border border-green-100 rounded-2xl p-4 flex-1 ml-2 items-center">
        <Text className="text-gray-600 text-xs font-semibold mb-2">Completed</Text>
        <Text className="text-gray-900 text-3xl font-bold">06</Text>
        <Text className="text-gray-500 text-xs mt-1">Today</Text>
      </View>
    </View>
  );
};
