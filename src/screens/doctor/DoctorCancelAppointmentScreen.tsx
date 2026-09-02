import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';

interface DoctorCancelAppointmentScreenProps {
  onBack?: () => void;
  onConfirmCancel?: () => void;
}

export const DoctorCancelAppointmentScreen: React.FC<DoctorCancelAppointmentScreenProps> = ({
  onBack,
  onConfirmCancel
}) => {
  const [reason, setReason] = useState('Patient request');
  const [note, setNote] = useState('The patient requested to cancel the appointment.');
  const [showDropdown, setShowDropdown] = useState(false);

  const reasons = ['Patient request', 'Doctor unavailable', 'Emergency', 'Other'];

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 }}>
          
          <View className="flex-row items-center justify-center mb-8 relative">
            <TouchableOpacity 
              onPress={onBack} 
              className="absolute left-0 w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
            >
              <ArrowLeft size={20} color="#111827" />
            </TouchableOpacity>
            <Text className="text-gray-900 text-xl font-bold">Cancel Appointment</Text>
          </View>

          <Text className="text-gray-600 text-base text-center leading-6 mb-8 px-4">
            Are you sure you want to cancel this appointment?
          </Text>

          {/* Reason Dropdown */}
          <View className="mb-6 relative z-10">
            <Text className="text-gray-500 text-sm font-semibold mb-2 ml-1">Reason (Optional)</Text>
            <TouchableOpacity
              onPress={() => setShowDropdown(!showDropdown)}
              className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center shadow-sm"
            >
              <Text className="text-gray-900 text-base">{reason}</Text>
              <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>

            {showDropdown && (
              <View className="absolute top-[80px] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-md py-2 z-20">
                {reasons.map((r) => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => {
                      setReason(r);
                      setShowDropdown(false);
                    }}
                    className="p-3 px-4 border-b border-gray-100 last:border-0"
                  >
                    <Text className="text-gray-800">{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Additional Note */}
          <View className="mb-10 -z-10">
            <Text className="text-gray-500 text-sm font-semibold mb-2 ml-1">Additional Note (Optional)</Text>
            <View className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <TextInput
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="p-4 text-gray-900 text-base min-h-[120px]"
                placeholder="Write an additional note..."
              />
            </View>
          </View>

          {/* Confirm Cancel Button */}
          <TouchableOpacity
            onPress={onConfirmCancel}
            className="w-full bg-red-600 py-4 rounded-xl items-center shadow-sm -z-10"
          >
            <Text className="text-white font-bold text-base">Cancel Appointment</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorCancelAppointmentScreen;
