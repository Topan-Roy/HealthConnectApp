import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserSearch, CalendarDays, Pill, FileText } from 'lucide-react-native';

const ActionItem = ({ icon, label, onPress }: { icon: React.ReactNode, label: string, onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} className="items-center gap-2">
    <View className="w-16 h-16 bg-blue-50 rounded-2xl items-center justify-center mb-1">
      {icon}
    </View>
    <Text className="text-xs font-medium text-gray-600">{label}</Text>
  </TouchableOpacity>
);

export const PatientHomeQuickActions = ({ onFindDoctor }: { onFindDoctor?: () => void }) => {
  return (
    <View className="flex-row justify-between mb-8">
      <ActionItem icon={<UserSearch size={24} color="#2563EB" />} label="Find Doctor" onPress={onFindDoctor} />
      <ActionItem icon={<CalendarDays size={24} color="#2563EB" />} label="Appointments" />
      <ActionItem icon={<Pill size={24} color="#2563EB" />} label="Medicines" />
      <ActionItem icon={<FileText size={24} color="#2563EB" />} label="Reports" />
    </View>
  );
};
