import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, ChevronRight, User } from 'lucide-react-native';
import { PATIENTS_DATA, Patient } from '../../data/patients';
import { DoctorHomeBottomNav } from '../../components/doctor-home/DoctorHomeBottomNav';

interface DoctorPatientsScreenProps {
  onBack?: () => void;
  onSelectPatient?: (patient: Patient) => void;
  onHome?: () => void;
  onAppointments?: () => void;
  onMessages?: () => void;
  onProfile?: () => void;
}

export const DoctorPatientsScreen: React.FC<DoctorPatientsScreenProps> = ({
  onBack,
  onSelectPatient,
  onHome,
  onAppointments,
  onMessages,
  onProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return PATIENTS_DATA;
    const q = searchQuery.toLowerCase().trim();
    return PATIENTS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.bloodGroup.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-gray-900 text-2xl font-bold">My Patients</Text>
        </View>

        {/* Search Input */}
        <View className="px-6 mt-3 mb-4">
          <View className="flex-row items-center bg-white/90 rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-800"
              placeholder="Search patients..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1">
                <X size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Patients List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 110 }}
        >
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => {
              const imageFailed = failedImages[patient.id];

              return (
                <TouchableOpacity
                  key={patient.id}
                  activeOpacity={0.7}
                  onPress={() => onSelectPatient && onSelectPatient(patient)}
                  className="flex-row items-center mb-3.5 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
                >
                  {/* Avatar */}
                  <View className="w-14 h-14 rounded-full overflow-hidden bg-blue-50 items-center justify-center mr-4 border border-blue-100">
                    {!imageFailed ? (
                      <Image
                        source={{ uri: patient.avatar }}
                        className="w-full h-full"
                        resizeMode="cover"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [patient.id]: true }))
                        }
                      />
                    ) : (
                      <View className="w-full h-full items-center justify-center bg-blue-100">
                        <Text className="text-blue-600 font-bold text-lg">
                          {patient.name.charAt(0)}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Patient Info */}
                  <View className="flex-1 justify-center">
                    <Text className="text-gray-900 font-bold text-base mb-1">
                      {patient.name}
                    </Text>
                    <Text className="text-gray-500 text-xs mb-0.5">
                      Last visit: {patient.lastVisit}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      Appointments: {patient.totalAppointments}
                    </Text>
                  </View>

                  {/* Arrow Indicator */}
                  <View className="pl-2">
                    <ChevronRight size={20} color="#D1D5DB" />
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View className="items-center justify-center py-16 bg-white/70 rounded-2xl mt-4 border border-gray-100">
              <User size={40} color="#9CA3AF" />
              <Text className="text-gray-600 font-semibold text-base mt-3">
                No patients found
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Try searching with a different name or number
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation */}
        <DoctorHomeBottomNav
          activeTab="Patients"
          onHome={onHome}
          onAppointments={onAppointments}
          onPatients={() => {}}
          onMessages={onMessages}
          onProfile={onProfile}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorPatientsScreen;
