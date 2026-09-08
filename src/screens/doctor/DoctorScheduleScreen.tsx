import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, Clock, X, Check, Calendar, Trash2 } from 'lucide-react-native';

interface DaySchedule {
  day: string;
  isAvailable: boolean;
  slots: string[];
}

const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    day: 'Monday',
    isAvailable: true,
    slots: ['08:00 AM - 01:00 PM', '04:00 PM - 08:00 PM'],
  },
  {
    day: 'Tuesday',
    isAvailable: true,
    slots: ['08:00 AM - 01:00 PM'],
  },
  {
    day: 'Wednesday',
    isAvailable: false,
    slots: [],
  },
  {
    day: 'Thursday',
    isAvailable: true,
    slots: ['08:00 AM - 01:00 PM', '04:00 PM - 08:00 PM'],
  },
  {
    day: 'Friday',
    isAvailable: true,
    slots: ['08:00 AM - 01:00 PM'],
  },
  {
    day: 'Saturday',
    isAvailable: true,
    slots: ['10:00 AM - 02:00 PM'],
  },
  {
    day: 'Sunday',
    isAvailable: false,
    slots: [],
  },
];

interface DoctorScheduleScreenProps {
  onBack: () => void;
}

export const DoctorScheduleScreen: React.FC<DoctorScheduleScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('01:00 PM');

  const toggleDayStatus = (index: number) => {
    const updated = [...schedule];
    const current = updated[index];
    current.isAvailable = !current.isAvailable;
    if (current.isAvailable && current.slots.length === 0) {
      current.slots = ['09:00 AM - 01:00 PM'];
    }
    setSchedule(updated);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const updated = [...schedule];
    updated[dayIndex].slots.splice(slotIndex, 1);
    if (updated[dayIndex].slots.length === 0) {
      updated[dayIndex].isAvailable = false;
    }
    setSchedule(updated);
  };

  const handleAddNewSlot = () => {
    if (!startTime.trim() || !endTime.trim()) {
      Alert.alert('Invalid Time', 'Please enter both start and end time.');
      return;
    }
    const newSlot = `${startTime.trim()} - ${endTime.trim()}`;
    const updated = schedule.map((item) => {
      if (item.day === selectedDay) {
        return {
          ...item,
          isAvailable: true,
          slots: [...item.slots, newSlot],
        };
      }
      return item;
    });
    setSchedule(updated);
    setModalVisible(false);
    Alert.alert('Slot Added', `New time slot added for ${selectedDay}.`);
  };

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm border border-slate-200"
          >
            <ChevronLeft size={22} color="#1E293B" />
          </TouchableOpacity>

          <Text className="text-[19px] font-bold text-gray-900">Availability & Schedule</Text>

          <View className="w-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        >
          {/* Section title */}
          <View className="flex-row items-center justify-between mt-2 mb-4">
            <Text className="text-lg font-bold text-gray-900">My Availability</Text>
            <Text className="text-xs text-blue-600 font-medium">Tap day to toggle</Text>
          </View>

          {/* Schedule list card */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            {schedule.map((item, index) => {
              const isLast = index === schedule.length - 1;
              return (
                <View key={item.day}>
                  <View className="py-3.5 flex-row items-start justify-between">
                    {/* Day name & toggle badge */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => toggleDayStatus(index)}
                      className="flex-row items-center pt-0.5"
                    >
                      <View
                        className={`w-3 h-3 rounded-full mr-2.5 ${item.isAvailable ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                      />
                      <Text
                        className={`text-[15px] font-semibold ${item.isAvailable ? 'text-gray-900' : 'text-gray-400'
                          }`}
                      >
                        {item.day}
                      </Text>
                    </TouchableOpacity>

                    {/* Slots or Unavailable */}
                    <View className="items-end max-w-[62%]">
                      {item.isAvailable && item.slots.length > 0 ? (
                        <View className="space-y-1.5 items-end">
                          {item.slots.map((slot, sIdx) => (
                            <View
                              key={sIdx}
                              className="flex-row items-center bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100/70"
                            >
                              <Clock size={12} color="#2563EB" style={{ marginRight: 5 }} />
                              <Text className="text-[12px] font-semibold text-blue-700">
                                {slot}
                              </Text>
                              <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => removeSlot(index, sIdx)}
                                className="ml-2 pl-1"
                              >
                                <X size={12} color="#94A3B8" />
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      ) : (
                        <View className="bg-slate-100 px-3 py-1 rounded-lg">
                          <Text className="text-[13px] font-medium text-gray-400">
                            Unavailable
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {!isLast && <View className="h-[1px] bg-slate-100 my-0.5" />}
                </View>
              );
            })}
          </View>

          {/* Quick stats note */}
          <View className="bg-blue-50/70 rounded-2xl p-4 mt-4 border border-blue-100 flex-row items-center">
            <Calendar size={20} color="#2563EB" />
            <Text className="text-xs text-blue-900 ml-2.5 flex-1 leading-5">
              Patients can only book appointments during your active time slots.
            </Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom Action: + Add New Time Slot adapted to phone model */}
        <View
          style={{
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : (Platform.OS === 'android' ? 24 : 16),
            paddingTop: 12,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            borderTopWidth: 1,
            borderTopColor: '#F1F5F9',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setModalVisible(true)}
            className="w-full bg-blue-600 py-3.5 rounded-2xl flex-row items-center justify-center shadow-md shadow-blue-500/20"
          >
            <Plus size={18} color="#FFFFFF" />
            <Text className="text-white font-bold text-base ml-2">+ Add New Time Slot</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for adding new slot */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center px-5">
            <View className="bg-white w-full rounded-3xl p-6 shadow-xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-gray-900">Add Time Slot</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <X size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              {/* Select Day */}
              <Text className="text-xs font-semibold text-gray-700 mb-2">Select Day</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <TouchableOpacity
                    key={d}
                    onPress={() => setSelectedDay(d)}
                    className={`px-3.5 py-2 rounded-xl mr-2 ${selectedDay === d ? 'bg-blue-600' : 'bg-slate-100'
                      }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${selectedDay === d ? 'text-white' : 'text-gray-700'
                        }`}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Start Time */}
              <View className="mb-3">
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">Start Time</Text>
                <TextInput
                  value={startTime}
                  onChangeText={setStartTime}
                  placeholder="09:00 AM"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-medium"
                />
              </View>

              {/* End Time */}
              <View className="mb-5">
                <Text className="text-xs font-semibold text-gray-700 mb-1.5">End Time</Text>
                <TextInput
                  value={endTime}
                  onChangeText={setEndTime}
                  placeholder="01:00 PM"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-medium"
                />
              </View>

              {/* Actions */}
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setModalVisible(false)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl items-center"
                >
                  <Text className="text-gray-700 font-semibold text-sm">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleAddNewSlot}
                  className="flex-1 bg-blue-600 py-3 rounded-xl items-center"
                >
                  <Text className="text-white font-semibold text-sm">Add Slot</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorScheduleScreen;
