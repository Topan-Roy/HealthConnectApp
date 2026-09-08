import React, { useState } from 'react';
import { View, ScrollView, ImageBackground, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { DoctorHomeHeader } from '../../components/doctor-home/DoctorHomeHeader';
import { DoctorHomeStats } from '../../components/doctor-home/DoctorHomeStats';
import { DoctorHomeSchedule } from '../../components/doctor-home/DoctorHomeSchedule';
import { DoctorHomeBottomNav } from '../../components/doctor-home/DoctorHomeBottomNav';

interface DoctorHomeScreenProps {
  onBack?: () => void;
  onLogout?: () => void;
  onAppointments?: () => void;
  onPatients?: () => void;
  onMessages?: () => void;
  onProfile?: () => void;
}

export const DoctorHomeScreen: React.FC<DoctorHomeScreenProps> = ({
  onBack,
  onLogout,
  onAppointments,
  onPatients,
  onMessages,
  onProfile,
}) => {
  const [activeTab, setActiveTab] = useState('Home');
  const insets = useSafeAreaInsets();
  // Ensure enough bottom scroll space so no content is covered by the bottom nav bar
  const bottomScrollPadding = 80 + (insets.bottom > 0 ? insets.bottom + 20 : (Platform.OS === 'android' ? 36 : 24));

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottomScrollPadding, paddingHorizontal: 20 }}
        >
          <DoctorHomeHeader />
          <DoctorHomeStats />
          <DoctorHomeSchedule />
        </ScrollView>

        <DoctorHomeBottomNav
          activeTab={activeTab}
          onHome={() => setActiveTab('Home')}
          onAppointments={() => {
            setActiveTab('Appointments');
            if (onAppointments) onAppointments();
          }}
          onPatients={() => {
            setActiveTab('Patients');
            if (onPatients) onPatients();
          }}
          onMessages={() => {
            setActiveTab('Messages');
            if (onMessages) onMessages();
          }}
          onProfile={() => {
            setActiveTab('Profile');
            if (onProfile) onProfile();
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorHomeScreen;
