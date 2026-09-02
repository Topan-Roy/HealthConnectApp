import React from 'react';
import { View, Text } from 'react-native';

export const DoctorHomeHeader = () => {
  return (
    <View className="mt-8 mb-6">
      <Text className="text-gray-800 text-2xl font-semibold">Good Morning,</Text>
      <View className="flex-row items-center mt-1">
        <Text className="text-gray-900 text-3xl font-bold">Dr. Sarah Ahmed </Text>
        <Text className="text-3xl">👋</Text>
      </View>
      <Text className="text-gray-500 text-base mt-2">Today, 30 Aug 2023</Text>
    </View>
  );
};
