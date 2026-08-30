import React, { useState } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PatientHomeHeader } from '../../components/patient-home/PatientHomeHeader';
import { PatientHomeSearch } from '../../components/patient-home/PatientHomeSearch';
import { PatientHomeQuickActions } from '../../components/patient-home/PatientHomeQuickActions';
import { PatientHomeUpcoming } from '../../components/patient-home/PatientHomeUpcoming';
import { PatientHomeSpecialties } from '../../components/patient-home/PatientHomeSpecialties';
import { PatientHomeBottomNav } from '../../components/patient-home/PatientHomeBottomNav';

interface PatientHomeScreenProps {
  onBack?: () => void;
  onFindDoctor?: () => void;
  onAppointments?: () => void;
  onMedicines?: () => void;
  onReports?: () => void;
  onMessages?: () => void;
  onProfile?: () => void;
}

export const PatientHomeScreen: React.FC<PatientHomeScreenProps> = ({ onBack, onFindDoctor, onAppointments, onMedicines, onReports, onMessages, onProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ImageBackground 
      source={require('../../../assets/role_bg.jpg')} 
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4">
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <PatientHomeHeader onBack={onBack} />
          <PatientHomeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <PatientHomeQuickActions onFindDoctor={onFindDoctor} onAppointments={onAppointments} onMedicines={onMedicines} onReports={onReports} />
          <PatientHomeUpcoming />
          <PatientHomeSpecialties searchQuery={searchQuery} />
        </ScrollView>
        </View>
        <PatientHomeBottomNav
          activeTab="Home"
          onHome={() => {}}
          onDoctors={onFindDoctor}
          onAppointments={onAppointments}
          onMessages={onMessages}
          onProfile={onProfile}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PatientHomeScreen;

