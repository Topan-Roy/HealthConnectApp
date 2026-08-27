import React from 'react';
import { View, Text } from 'react-native';
import { UserSearch, CalendarDays, Pill, FileText } from 'lucide-react-native';

const ActionItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <View className="items-center gap-2">
    <View className="w-16 h-16 bg-blue-50 rounded-2xl items-center justify-center mb-1">
      {icon}
    </View>
    <Text className="text-xs font-medium text-gray-600">{label}</Text>
  </View>
);

export const PatientHomeQuickActions = () => {
  return (
    <View className="flex-row justify-between mb-8">
      <ActionItem icon={<UserSearch size={24} color="#2563EB" />} label="Find Doctor" />
      <ActionItem icon={<CalendarDays size={24} color="#2563EB" />} label="Appointments" />
      <ActionItem icon={<Pill size={24} color="#2563EB" />} label="Medicines" />
      <ActionItem icon={<FileText size={24} color="#2563EB" />} label="Reports" />
    </View>
  );
};
