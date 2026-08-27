import React from 'react';
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';

interface PatientHomeSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const PatientHomeSearch: React.FC<PatientHomeSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 mb-8 border border-gray-100">
      <Search size={20} color="#9CA3AF" />
      <TextInput
        placeholder="Search doctors, specialties..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="flex-1 ml-3 text-base text-gray-900"
      />
    </View>
  );
};
