import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, Bell, Camera, Award } from 'lucide-react-native';

interface PatientHomeHeaderProps {
  onBack?: () => void;
}

export const PatientHomeHeader: React.FC<PatientHomeHeaderProps> = ({ onBack }) => {
  return (
    <>
      <View className="flex-row justify-between items-center mt-4 mb-6">
        <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-start mb-6">
        <View>
          <Text className="text-3xl font-bold text-gray-900 leading-tight">
            Good Morning,
          </Text>
          <Text className="text-3xl font-bold text-gray-900 leading-tight">
            Topan <Text className="text-2xl">👋</Text>
          </Text>
        </View>
        <View className="flex-row gap-3 mt-1">
          <TouchableOpacity className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center border border-blue-100">
            <Camera size={20} color="#2563EB" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center border border-blue-100">
            <Award size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
