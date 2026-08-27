import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PatientHomeHeader } from '../../components/patient-home/PatientHomeHeader';
import { PatientHomeSearch } from '../../components/patient-home/PatientHomeSearch';
import { PatientHomeQuickActions } from '../../components/patient-home/PatientHomeQuickActions';
import { PatientHomeUpcoming } from '../../components/patient-home/PatientHomeUpcoming';
import { PatientHomeSpecialties } from '../../components/patient-home/PatientHomeSpecialties';
import { PatientHomeBottomNav } from '../../components/patient-home/PatientHomeBottomNav';

interface PatientHomeScreenProps {
  onBack?: () => void;
}

export const PatientHomeScreen: React.FC<PatientHomeScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <PatientHomeHeader onBack={onBack} />
          <PatientHomeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <PatientHomeQuickActions />
          <PatientHomeUpcoming />
          <PatientHomeSpecialties />
        </ScrollView>
      </View>
      <PatientHomeBottomNav />
    </SafeAreaView>
  );
};

export default PatientHomeScreen;
