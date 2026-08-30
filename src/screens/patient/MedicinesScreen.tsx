import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Pill, Clock3, ShieldCheck } from 'lucide-react-native';

const MEDICINES = [
  {
    id: 1,
    name: 'Paracetamol',
    dose: '500 mg',
    timing: 'Morning, Evening',
    doctor: 'Dr. Rahman',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Vitamin D3',
    dose: '60,000 IU',
    timing: 'Once a week',
    doctor: 'Dr. Nabila',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Cough Syrup',
    dose: '5 ml',
    timing: 'Night only',
    doctor: 'Dr. Tania',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Amoxicillin',
    dose: '250 mg',
    timing: 'Morning, Night',
    doctor: 'Dr. Hasan',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Omega-3',
    dose: '1 capsule',
    timing: 'After lunch',
    doctor: 'Dr. Rahman',
    status: 'Active',
  },
];

interface MedicinesScreenProps {
  onBack?: () => void;
}

export const MedicinesScreen: React.FC<MedicinesScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedicines = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MEDICINES;

    return MEDICINES.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query) ||
        medicine.doctor.toLowerCase().includes(query) ||
        medicine.timing.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4">
          <View className="flex-row items-center justify-between mt-5 mb-4">
            <TouchableOpacity onPress={onBack} className="p-2 -ml-2" activeOpacity={0.7}>
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">Medicines</Text>
            <View className="w-8" />
          </View>

          <View className="flex-row items-center bg-white/80 rounded-2xl px-4 py-3 border border-gray-200 mb-5">
            <Search size={20} color="#6B7280" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search medicines..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-base text-gray-900"
            />
          </View>

          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-700">
              {filteredMedicines.length} medicines
            </Text>
            <TouchableOpacity className="rounded-full bg-blue-600 px-3 py-1.5">
              <Text className="text-xs font-semibold text-white">+ Add</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
            {filteredMedicines.length === 0 ? (
              <View className="bg-white/75 rounded-3xl p-6 items-center border border-dashed border-gray-300">
                <Pill size={32} color="#2563EB" />
                <Text className="mt-3 text-base font-bold text-gray-800">No medicine found</Text>
                <Text className="mt-1 text-sm text-gray-500 text-center">
                  Try searching by name, doctor, or timing.
                </Text>
              </View>
            ) : (
              filteredMedicines.map((medicine) => (
                <View
                  key={medicine.id}
                  className="bg-white/80 rounded-3xl p-4 mb-3 border border-gray-200 shadow-sm"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-2xl bg-blue-50 items-center justify-center mr-3">
                        <Pill size={20} color="#2563EB" />
                      </View>
                      <View>
                        <Text className="text-base font-bold text-gray-900">{medicine.name}</Text>
                        <Text className="text-xs text-gray-500">Doctor: {medicine.doctor}</Text>
                      </View>
                    </View>
                    <Text
                      className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                        medicine.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {medicine.status}
                    </Text>
                  </View>

                  <View className="flex-row items-center mb-2">
                    <ShieldCheck size={14} color="#3B82F6" />
                    <Text className="ml-2 text-sm text-gray-700">Dose: {medicine.dose}</Text>
                  </View>

                  <View className="flex-row items-center">
                    <Clock3 size={14} color="#3B82F6" />
                    <Text className="ml-2 text-sm text-gray-700">Timing: {medicine.timing}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MedicinesScreen;
