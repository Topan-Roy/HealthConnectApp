import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
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
  <TouchableOpacity
    className="items-center justify-center flex-1 py-1"
    activeOpacity={0.7}
    onPress={onPress}
  >
    {icon}
    <Text className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface DoctorHomeBottomNavProps {
  activeTab?: string;
  onHome?: () => void;
  onAppointments?: () => void;
  onPatients?: () => void;
  onMessages?: () => void;
  onProfile?: () => void;
}

export const DoctorHomeBottomNav = ({
  activeTab = 'Home',
  onHome,
  onAppointments,
  onPatients,
  onMessages,
  onProfile,
}: DoctorHomeBottomNavProps) => {
  const insets = useSafeAreaInsets();
  // Safe bottom offset that accounts for Android 3-button nav and iPhone home bar
  const bottomOffset = insets.bottom > 0
    ? insets.bottom + 8
    : (Platform.OS === 'android' ? 24 : 16);

  return (
    <View
      className="absolute flex-row justify-around items-center"
      style={{
        bottom: bottomOffset,
        left: 16,
        right: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderRadius: 36,
        height: 64,
        paddingHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(241, 245, 249, 0.9)',
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
        icon={<Users size={22} color={activeTab === 'Patients' ? '#2563EB' : '#9CA3AF'} />}
        label="Patients"
        isActive={activeTab === 'Patients'}
        onPress={onPatients}
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
