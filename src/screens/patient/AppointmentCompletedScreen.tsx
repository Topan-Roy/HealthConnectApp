import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle } from 'lucide-react-native';

interface AppointmentCompletedScreenProps {
  onViewPrescription?: () => void;
  onRateDoctor?: () => void;
  onBackToHome?: () => void;
}

export const AppointmentCompletedScreen: React.FC<AppointmentCompletedScreenProps> = ({
  onViewPrescription,
  onRateDoctor,
  onBackToHome,
}) => {
  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 items-center justify-center px-6">
        {/* Success Icon */}
        <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
          <View className="w-16 h-16 rounded-full bg-green-500 items-center justify-center shadow-lg shadow-green-300">
            <CheckCircle size={36} color="white" fill="white" />
          </View>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
          Appointment Completed
        </Text>
        <Text className="text-base text-gray-500 text-center leading-relaxed mb-10 px-4">
          Thank you for visiting.{"\n"}You can view your prescription,{"\n"}and rate your experience.
        </Text>

        {/* Buttons */}
        <View className="w-full gap-4">
          <TouchableOpacity
            onPress={onViewPrescription}
            className="bg-blue-600 rounded-2xl py-4 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">View Prescription</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onRateDoctor}
            className="bg-white border border-blue-600 rounded-2xl py-4 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-blue-600 font-bold text-base">Rate Your Doctor</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onBackToHome} className="mt-8 p-2">
          <Text className="text-blue-600 font-bold text-base text-center">Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
