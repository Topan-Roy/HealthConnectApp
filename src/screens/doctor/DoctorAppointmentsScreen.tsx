import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import { DoctorHomeBottomNav } from '../../components/doctor-home/DoctorHomeBottomNav';

interface DoctorAppointmentsScreenProps {
  onBack?: () => void;
  onAppointmentPress?: () => void;
}

export const DoctorAppointmentsScreen: React.FC<DoctorAppointmentsScreenProps> = ({
  onBack,
  onAppointmentPress
}) => {
  const [activeTab, setActiveTab] = useState('Today');
  const [navTab, setNavTab] = useState('Appointments');

  const tabs = ['Today', 'Upcoming', 'Completed', 'Cancelled'];

  const appointmentsData = {
    'Today': [
      { id: 1, time: '09:00 AM', name: 'Rahim Ahmed', type: 'Video Consultation', status: 'Confirmed' },
      { id: 2, time: '10:30 AM', name: 'Karim Hasan', type: 'Follow-up', status: 'Confirmed' },
      { id: 3, time: '12:00 PM', name: 'Nadia Rahman', type: 'Video Consultation', status: 'Confirmed' },
      { id: 4, time: '03:00 PM', name: 'Farhana Islam', type: 'General Consultation', status: 'Confirmed' },
    ],
    'Upcoming': [
      { id: 5, time: 'Tomorrow 10:00 AM', name: 'Sajid Ali', type: 'General Consultation', status: 'Pending' },
      { id: 6, time: 'Tomorrow 11:30 AM', name: 'Tania Akter', type: 'Video Consultation', status: 'Pending' },
    ],
    'Completed': [
      { id: 7, time: '08:00 AM', name: 'Abdur Rahman', type: 'Follow-up', status: 'Completed' },
    ],
    'Cancelled': [
      { id: 8, time: '02:00 PM', name: 'Jamal Hossain', type: 'Video Consultation', status: 'Cancelled' },
    ]
  };

  const currentAppointments = appointmentsData[activeTab as keyof typeof appointmentsData] || [];

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">


        {/* Tabs */}
        <View className="flex-row px-6 mt-12 mb-6">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="mr-6 pb-2"
              style={{
                borderBottomWidth: activeTab === tab ? 2 : 0,
                borderBottomColor: '#2563EB',
              }}
            >
              <Text className={`font-semibold ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
          {currentAppointments.length > 0 ? (
            currentAppointments.map((apt) => (
              <TouchableOpacity
                key={apt.id}
                className="flex-row items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
                onPress={onAppointmentPress}
              >
                {/* Avatar placeholder */}
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                  <Text className="text-blue-600 font-bold">{apt.name.charAt(0)}</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-gray-800 font-bold text-sm mb-1">{apt.time}</Text>
                  <Text className="text-gray-900 font-bold text-base mb-1">{apt.name}</Text>
                  <Text className="text-gray-500 text-xs">{apt.type}</Text>
                </View>

                <Text className={`font-semibold text-xs ${apt.status === 'Cancelled' ? 'text-red-500' : apt.status === 'Pending' ? 'text-orange-500' : 'text-green-600'}`}>
                  {apt.status}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-gray-500 text-center mt-10">No appointments found.</Text>
          )}
        </ScrollView>

        <DoctorHomeBottomNav
          activeTab={navTab}
          onHome={() => {
            setNavTab('Home');
            if (onBack) onBack(); // Navigate back to home
          }}
          onAppointments={() => setNavTab('Appointments')}
          onPatients={() => setNavTab('Patients')}
          onMessages={() => setNavTab('Messages')}
          onProfile={() => setNavTab('Profile')}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorAppointmentsScreen;
