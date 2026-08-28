import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Calendar, Users, MessageSquare, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomTabItem = ({
  icon,
  label,
  isActive = false,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity className="items-center gap-1" onPress={onPress}>
    {icon}
    <Text className={`text-[10px] font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface PatientHomeBottomNavProps {
  activeTab?: 'Home' | 'Appointments' | 'Doctors' | 'Messages' | 'Profile';
  onHome?: () => void;
  onDoctors?: () => void;
  onAppointments?: () => void;
  onMessages?: () => void;
  onProfile?: () => void;
}

export const PatientHomeBottomNav = ({
  activeTab = 'Home',
  onHome,
  onDoctors,
  onAppointments,
  onMessages,
  onProfile,
}: PatientHomeBottomNavProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute flex-row justify-around items-center"
      style={{
        bottom: insets.bottom > 0 ? insets.bottom + 10 : 20,
        left: '5%',
        right: '5%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 100,
        height: 65,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      <BottomTabItem
        icon={<Home size={22} color={activeTab === 'Home' ? '#2563EB' : '#9CA3AF'} />}
        label="Home"
        isActive={activeTab === 'Home'}
        onPress={onHome}
      />
      <BottomTabItem
        icon={<Calendar size={22} color={activeTab === 'Appointments' ? '#2563EB' : '#9CA3AF'} />}
        label="Appointments"
        isActive={activeTab === 'Appointments'}
        onPress={onAppointments}
      />
      <BottomTabItem
        icon={<Users size={22} color={activeTab === 'Doctors' ? '#2563EB' : '#9CA3AF'} />}
        label="Doctors"
        isActive={activeTab === 'Doctors'}
        onPress={onDoctors}
      />
      <BottomTabItem
        icon={<MessageSquare size={22} color={activeTab === 'Messages' ? '#2563EB' : '#9CA3AF'} />}
        label="Messages"
        isActive={activeTab === 'Messages'}
        onPress={onMessages}
      />
      <BottomTabItem
        icon={<User size={22} color={activeTab === 'Profile' ? '#2563EB' : '#9CA3AF'} />}
        label="Profile"
        isActive={activeTab === 'Profile'}
        onPress={onProfile}
      />
    </View>
  );
};
