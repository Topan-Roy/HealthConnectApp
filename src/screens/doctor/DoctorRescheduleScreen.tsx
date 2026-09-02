import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface DoctorRescheduleScreenProps {
  onBack?: () => void;
  onConfirm?: () => void;
}

export const DoctorRescheduleScreen: React.FC<DoctorRescheduleScreenProps> = ({
  onBack,
  onConfirm
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(30);
  const [selectedTime, setSelectedTime] = useState<string>('09:00 AM');

  // Dummy calendar data for visualization (August 2026)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ];

  const times = [
    '08:00 AM', '09:00 AM', '10:00 AM',
    '11:00 AM', '12:00 PM', '01:00 PM'
  ];

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 }}>
          
          <View className="flex-row items-center mb-8">
            <TouchableOpacity 
              onPress={onBack} 
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
            >
              <ArrowLeft size={20} color="#111827" />
            </TouchableOpacity>
            <Text className="text-gray-900 text-xl font-bold">Select New Date & Time</Text>
          </View>

          {/* Calendar Card */}
          <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
            
            {/* Calendar Header */}
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity>
                <ChevronLeft size={24} color="#6B7280" />
              </TouchableOpacity>
              <Text className="text-gray-900 text-base font-bold">August 2026</Text>
              <TouchableOpacity>
                <ChevronRight size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Days Row */}
            <View className="flex-row justify-between mb-4">
              {days.map((day, index) => (
                <Text key={index} className="text-gray-500 text-xs font-semibold w-8 text-center">{day}</Text>
              ))}
            </View>

            {/* Dates Grid */}
            <View className="gap-2">
              {dates.map((week, weekIndex) => (
                <View key={weekIndex} className="flex-row justify-between">
                  {week.map((date, dateIndex) => (
                    <TouchableOpacity
                      key={dateIndex}
                      onPress={() => date && setSelectedDate(date)}
                      className={`w-8 h-8 rounded-full items-center justify-center ${
                        date === selectedDate ? 'bg-blue-600' : ''
                      }`}
                    >
                      <Text 
                        className={`text-sm font-semibold ${
                          !date ? 'text-transparent' : date === selectedDate ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {date || '0'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* Select Time */}
          <Text className="text-gray-900 text-lg font-bold mb-4">Select Time</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4 mb-10">
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTime(time)}
                className={`w-[30%] py-3 rounded-xl border ${
                  selectedTime === time ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'
                } items-center`}
              >
                <Text 
                  className={`text-xs font-bold ${
                    selectedTime === time ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={onConfirm}
            className="w-full bg-blue-600 py-4 rounded-xl items-center shadow-sm"
          >
            <Text className="text-white font-bold text-base">Confirm Reschedule</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorRescheduleScreen;
