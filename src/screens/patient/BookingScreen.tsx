import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from 'lucide-react-native';
import { Doctor } from '../../data/doctors';

interface BookingScreenProps {
  doctor: Doctor;
  onBack?: () => void;
  onConfirmed?: () => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM',
  '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM',
];

export const BookingScreen: React.FC<BookingScreenProps> = ({ doctor, onBack, onConfirmed }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDate(1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDate(1);
  };

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const handleConfirm = () => {
    if (!selectedTime) {
      Alert.alert('Select Time', 'Please select a time slot to continue.');
      return;
    }
    Alert.alert(
      '✅ Appointment Booked!',
      `Your appointment with ${doctor.name} is confirmed.\n\nDate: ${MONTHS[viewMonth]} ${selectedDate}, ${viewYear}\nTime: ${selectedTime}`,
      [{ text: 'OK', onPress: onConfirmed }]
    );
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const calendarCells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 pt-4 mb-4">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Select Date & Time</Text>
          <TouchableOpacity className="p-2 -mr-2">
            <Heart size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

          {/* Calendar Card */}
          <View className="mx-4 bg-white rounded-3xl p-5 mb-6 shadow-sm shadow-gray-200/60 border border-gray-100">
            {/* Month Navigation */}
            <View className="flex-row justify-between items-center mb-5">
              <TouchableOpacity onPress={goToPrevMonth} className="p-2">
                <ChevronLeft size={22} color="#2563EB" />
              </TouchableOpacity>
              <Text className="text-base font-bold text-gray-900">
                {MONTHS[viewMonth]} {viewYear}
              </Text>
              <TouchableOpacity onPress={goToNextMonth} className="p-2">
                <ChevronRight size={22} color="#2563EB" />
              </TouchableOpacity>
            </View>

            {/* Day Headers */}
            <View className="flex-row justify-around mb-2">
              {DAYS.map((day) => (
                <Text key={day} className="text-xs font-semibold text-gray-400 w-9 text-center">
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View className="flex-row flex-wrap">
              {calendarCells.map((day, index) => {
                if (!day) return <View key={`empty-${index}`} style={{ width: '14.28%', height: 40 }} />;
                const past = isPast(day);
                const todayDate = isToday(day);
                const selected = selectedDate === day;
                return (
                  <TouchableOpacity
                    key={day}
                    disabled={past}
                    onPress={() => setSelectedDate(day)}
                    style={{ width: '14.28%', height: 40 }}
                    className="items-center justify-center"
                  >
                    <View
                      className={`w-8 h-8 rounded-full items-center justify-center ${
                        selected ? 'bg-blue-600' :
                        todayDate ? 'border-2 border-blue-400' : ''
                      }`}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          past ? 'text-gray-300' :
                          selected ? 'text-white' :
                          todayDate ? 'text-blue-600' :
                          'text-gray-800'
                        }`}
                      >
                        {day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Time Slots */}
          <View className="mx-4">
            <Text className="text-lg font-bold text-gray-900 mb-4">Select Time</Text>
            <View className="flex-row flex-wrap gap-3">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    onPress={() => setSelectedTime(slot)}
                    className={`px-5 py-3 rounded-2xl border ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-8 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-blue-600 rounded-2xl py-4 items-center justify-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BookingScreen;
