import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, Brain, Activity, Baby } from 'lucide-react-native';

const SpecialtyItem = ({ icon, label, bgColor }: { icon: React.ReactNode, label: string, bgColor: string }) => (
  <View className="items-center gap-2 w-1/4">
    <View className={`w-16 h-16 ${bgColor} rounded-2xl items-center justify-center mb-1`}>
      {icon}
    </View>
    <Text className="text-xs font-medium text-gray-600 text-center">{label}</Text>
  </View>
);

export const PatientHomeSpecialties = ({ searchQuery = '' }: { searchQuery?: string }) => {
  const allSpecialties = [
    { icon: <Heart size={28} color="#EF4444" />, label: "Cardiology", bgColor: "bg-red-50" },
    { icon: <Brain size={28} color="#3B82F6" />, label: "Neurology", bgColor: "bg-blue-50" },
    { icon: <Activity size={28} color="#F43F5E" />, label: "Dermatology", bgColor: "bg-rose-50" },
    { icon: <Baby size={28} color="#6366F1" />, label: "Pediatrics", bgColor: "bg-indigo-50" }
  ];

  const filteredSpecialties = allSpecialties.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-900">Popular Specialties</Text>
        <TouchableOpacity>
          <Text className="text-blue-600 font-semibold text-sm">View All</Text>
        </TouchableOpacity>
      </View>
      
      {filteredSpecialties.length > 0 ? (
        <View className="flex-row justify-between flex-wrap gap-y-4">
          {filteredSpecialties.map((item, index) => (
            <SpecialtyItem key={index} icon={item.icon} label={item.label} bgColor={item.bgColor} />
          ))}
        </View>
      ) : (
        <Text className="text-center text-gray-500 mt-4">No specialties found.</Text>
      )}
    </View>
  );
};
