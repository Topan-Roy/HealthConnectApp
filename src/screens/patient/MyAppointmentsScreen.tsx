import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { DOCTORS_DATA } from '../../data/doctors';

interface MyAppointmentsScreenProps {
  onBack?: () => void;
  onJoinAppointment?: () => void;
  onViewCompleted?: () => void;
}

type TabType = 'Upcoming' | 'Completed' | 'Cancelled';

const APPOINTMENTS = [
  {
    id: '1',
    doctor: DOCTORS_DATA[0],
    date: '26 Aug 2026',
    time: '05:00 PM',
    type: 'Video Consultation',
    status: 'Upcoming',
  },
  {
    id: '2',
    doctor: DOCTORS_DATA[1],
    date: '18 Aug 2026',
    time: '04:00 PM',
    type: 'Video Consultation',
    status: 'Completed',
  },
  {
    id: '3',
    doctor: DOCTORS_DATA[2],
    date: '10 Aug 2026',
    time: '03:30 PM',
    type: 'Video Consultation',
    status: 'Completed',
  },
];

export const MyAppointmentsScreen: React.FC<MyAppointmentsScreenProps> = ({
  onBack,
  onJoinAppointment,
  onViewCompleted
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('Upcoming');

  const filteredAppointments = APPOINTMENTS.filter((app) => app.status === activeTab);

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 pt-4 mb-4">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2 mr-4">
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">My Appointments</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row mx-4 mb-6 border-b border-gray-200">
          {(['Upcoming', 'Completed', 'Cancelled'] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center pb-3 border-b-2 ${
                activeTab === tab ? 'border-blue-600' : 'border-transparent'
              }`}
            >
              <Text
                className={`font-semibold ${
                  activeTab === tab ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Appointment List */}
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <View
                key={appointment.id}
                className="bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm"
              >
                <View className="flex-row justify-between mb-4">
                  <View className="flex-row flex-1">
                    <View className="w-16 h-16 rounded-2xl bg-blue-50 overflow-hidden mr-3">
                      <Image
                        source={{ uri: appointment.doctor.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                    <View className="justify-center flex-1 pr-2">
                      <Text className="text-base font-bold text-gray-900 mb-0.5" numberOfLines={1}>
                        {appointment.doctor.name}
                      </Text>
                      <Text className="text-xs text-gray-500">{appointment.doctor.specialty}</Text>
                    </View>
                  </View>
                  <Text
                    className={`text-xs font-semibold mt-1 ${
                      appointment.status === 'Upcoming'
                        ? 'text-blue-600'
                        : appointment.status === 'Completed'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}
                  >
                    {appointment.status}
                  </Text>
                </View>

                <View className="flex-row justify-between items-end">
                  <View>
                    <Text className="text-sm text-gray-700 font-medium mb-1">
                      {appointment.date} • {appointment.time}
                    </Text>
                    <Text className="text-xs text-gray-500">{appointment.type}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (appointment.status === 'Upcoming') {
                         onJoinAppointment?.();
                      } else if (appointment.status === 'Completed') {
                         onViewCompleted?.();
                      }
                    }}
                    className={`px-6 py-2 rounded-xl ${
                      appointment.status === 'Upcoming'
                        ? 'bg-blue-600'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-sm font-bold ${
                        appointment.status === 'Upcoming' ? 'text-white' : 'text-blue-600'
                      }`}
                    >
                      {appointment.status === 'Upcoming' ? 'Join' : 'View'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center mt-10">
              <Text className="text-gray-500">No {activeTab.toLowerCase()} appointments found.</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
