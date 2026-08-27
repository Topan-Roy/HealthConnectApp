import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle } from 'lucide-react-native';
import { Doctor } from '../../data/doctors';

interface AppointmentConfirmedScreenProps {
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  onViewAppointment?: () => void;
  onBackToHome?: () => void;
}

export const AppointmentConfirmedScreen: React.FC<AppointmentConfirmedScreenProps> = ({
  doctor,
  selectedDate,
  selectedTime,
  onViewAppointment,
  onBackToHome,
}) => {
  const insets = useSafeAreaInsets();
  const appointmentId = `HC-${Math.floor(Math.random() * 90000000 + 10000000).toString().slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '$1-$2-$3-$4')}`;
  const formattedId = `HC-${new Date().getDate().toString().padStart(2,'0')}-${(new Date().getMonth()+1).toString().padStart(2,'0')}-0005-1004`;

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 items-center justify-center px-6">

        {/* Success Icon */}
        <View className="w-20 h-20 rounded-full bg-green-500 items-center justify-center mb-6 shadow-lg shadow-green-300">
          <CheckCircle size={44} color="white" fill="white" />
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Appointment Confirmed!
        </Text>
        <Text className="text-sm text-gray-500 mb-8 text-center">
          Your appointment has been successfully booked.
        </Text>

        {/* Appointment Details Card */}
        <View className="w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-8">
          {/* Doctor Row */}
          <View className="flex-row items-center gap-4 mb-5">
            <View className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 items-center justify-center">
              <Text className="text-2xl">👨‍⚕️</Text>
            </View>
            <View>
              <Text className="text-base font-bold text-gray-900">{doctor.name}</Text>
              <Text className="text-sm text-gray-500">{doctor.specialty}</Text>
            </View>
          </View>

          {/* Details */}
          <View className="flex-row flex-wrap gap-y-1 mb-4">
            <Text className="text-sm text-gray-500 w-full">
              {selectedDate}
              <Text className="text-gray-400"> • </Text>
              {selectedTime}
            </Text>
            <Text className="text-sm text-gray-500">Video Consultation</Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-100 mb-4" />

          {/* Appointment ID */}
          <View>
            <Text className="text-xs text-gray-400 mb-1">Appointment ID</Text>
            <Text className="text-sm font-semibold text-gray-700">{formattedId}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View
          style={{
            width: '100%',
            paddingBottom: insets.bottom > 0 ? insets.bottom : 0,
          }}
        >
          <TouchableOpacity
            onPress={onViewAppointment}
            className="bg-blue-600 rounded-2xl py-4 items-center mb-4"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">View Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBackToHome} activeOpacity={0.7}>
            <Text className="text-blue-600 font-bold text-base text-center">Back to Home</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default AppointmentConfirmedScreen;
