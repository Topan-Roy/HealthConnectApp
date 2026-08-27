import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Doctor } from '../../data/doctors';

interface BookingSummaryScreenProps {
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  onBack?: () => void;
  onProceed?: () => void;
}

export const BookingSummaryScreen: React.FC<BookingSummaryScreenProps> = ({
  doctor,
  selectedDate,
  selectedTime,
  onBack,
  onProceed,
}) => {
  const insets = useSafeAreaInsets();
  const consultationFee = parseInt(doctor.price);
  const serviceFee = 50;
  const total = consultationFee + serviceFee;

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 pt-4 mb-6">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2 mr-4">
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Booking Summary</Text>
        </View>

        <View className="flex-1 px-4">
          {/* Doctor Info */}
          <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-100 shadow-sm">
            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 rounded-2xl bg-blue-50 overflow-hidden border border-blue-100">
                <View className="w-full h-full items-center justify-center">
                  <Text className="text-2xl">👩‍⚕️</Text>
                </View>
              </View>
              <View>
                <Text className="text-base font-bold text-gray-900">{doctor.name}</Text>
                <Text className="text-sm text-gray-500">{doctor.specialty}</Text>
              </View>
            </View>
          </View>

          {/* Booking Details */}
          <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-100 shadow-sm">
            <SummaryRow label="Date" value={selectedDate} />
            <Divider />
            <SummaryRow label="Time" value={selectedTime} />
            <Divider />
            <SummaryRow label="Type" value="Video Consultation" />
          </View>

          {/* Fee Breakdown */}
          <View className="bg-white rounded-3xl p-5 mb-6 border border-gray-100 shadow-sm">
            <SummaryRow label="Consultation Fee" value={`৳${consultationFee}`} />
            <Divider />
            <SummaryRow label="Service Fee" value={`৳${serviceFee}`} />
            <Divider />
            <View className="flex-row justify-between items-center mt-1">
              <Text className="text-base font-bold text-gray-900">Total Amount</Text>
              <Text className="text-xl font-bold text-gray-900">৳{total}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Button */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 24,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
          }}
        >
          <TouchableOpacity
            onPress={onProceed}
            className="bg-blue-600 rounded-2xl py-4 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center py-1">
    <Text className="text-sm text-gray-500">{label}</Text>
    <Text className="text-sm font-semibold text-gray-800">{value}</Text>
  </View>
);

const Divider = () => <View className="h-px bg-gray-100 my-3" />;

export default BookingSummaryScreen;
