import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import {
  User,
  Heart,
  Phone,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { PatientHomeBottomNav } from '../../components/patient-home/PatientHomeBottomNav';

interface PatientProfileScreenProps {
  onBack?: () => void;
  onPersonalInfo?: () => void;
  onHealthInfo?: () => void;
  onEmergencyContact?: () => void;
  onPaymentMethods?: () => void;
  onSettings?: () => void;
  onHelpSupport?: () => void;
  onHome?: () => void;
  onFindDoctor?: () => void;
  onAppointments?: () => void;
  onMessages?: () => void;
  onProfile?: () => void;
  onLogout?: () => void;
}

const MENU_ITEMS = [
  { id: 'personal',  Icon: User,       label: 'Personal Information' },
  { id: 'health',    Icon: Heart,      label: 'Health Information'   },
  { id: 'emergency', Icon: Phone,      label: 'Emergency Contact'    },
  { id: 'payment',   Icon: CreditCard, label: 'Payment Methods'      },
  { id: 'settings',  Icon: Settings,   label: 'Settings'             },
  { id: 'help',      Icon: HelpCircle, label: 'Help & Support'       },
];

export const PatientProfileScreen: React.FC<PatientProfileScreenProps> = ({
  onPersonalInfo,
  onHealthInfo,
  onEmergencyContact,
  onPaymentMethods,
  onSettings,
  onHelpSupport,
  onHome,
  onFindDoctor,
  onAppointments,
  onMessages,
  onProfile,
  onLogout,
}) => {
  const { logout, user } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Logout',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logout(); // calls POST /api/users/logout with Bearer token
            } finally {
              setIsLoggingOut(false);
              onLogout && onLogout(); // navigate away regardless of API result
            }
          },
        },
      ]
    );
  };

  const getMenuHandler = (id: string) => {
    switch (id) {
      case 'personal':  return onPersonalInfo;
      case 'health':    return onHealthInfo;
      case 'emergency': return onEmergencyContact;
      case 'payment':   return onPaymentMethods;
      case 'settings':  return onSettings;
      case 'help':      return onHelpSupport;
      default:          return undefined;
    }
  };

  const displayName  = user?.name  ?? 'Guest User';
  const displayEmail = user?.email ?? '';
  const displayPhone = user?.phone ? `+${user.phone}` : '';
  const avatarSeed   = displayName.replace(/\s+/g, '');

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 bg-transparent">

        {/* ── Header ── */}
        <View className="items-center pt-2.5 pb-2">
          <Text className="text-[19px] font-bold text-primary">Profile</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 120 }}
        >
          {/* ── Main card ── */}
          <View className="rounded-3xl bg-white/80 px-5 pt-6 pb-2 mt-2">

            {/* ── Avatar ── */}
            <View className="self-center mb-3 h-[84px] w-[84px] rounded-full overflow-hidden bg-blue-50">
              <Image
                source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${avatarSeed}&backgroundColor=b6e3f4&radius=50` }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            {/* ── Name / phone / email ── */}
            <Text className="text-[17px] font-bold text-gray-900 text-center mb-1">
              {displayName}
            </Text>

            {displayPhone ? (
              <Text className="text-xs text-gray-500 text-center mb-1.5">
                {displayPhone}
              </Text>
            ) : null}

            {displayEmail ? (
              <View className="flex-row items-center justify-center gap-1.5 mb-5">
                <View className="h-[7px] w-[7px] rounded-full bg-blue-600" />
                <Text className="text-xs text-gray-500">{displayEmail}</Text>
              </View>
            ) : null}

            {/* ── Divider ── */}
            <View className="h-px bg-slate-100 mb-1" />

            {/* ── Menu rows ── */}
            {MENU_ITEMS.map(({ id, Icon, label }, index) => {
              const isLast = index === MENU_ITEMS.length - 1;
              return (
                <TouchableOpacity
                  key={id}
                  activeOpacity={0.65}
                  onPress={getMenuHandler(id)}
                  className={`flex-row items-center py-3 ${!isLast ? 'border-b border-slate-100' : ''}`}
                >
                  <Icon size={20} color="#6B7280" style={{ marginRight: 14 }} />
                  <Text className="flex-1 text-[13px] font-medium text-gray-700">
                    {label}
                  </Text>
                  <ChevronRight size={18} color="#D1D5DB" />
                </TouchableOpacity>
              );
            })}

            {/* ── Divider before logout ── */}
            <View className="h-px bg-slate-100 mt-1" />

            {/* ── Logout row ── */}
            <TouchableOpacity
              activeOpacity={0.65}
              onPress={handleLogout}
              disabled={isLoggingOut}
              className="flex-row items-center py-3.5"
            >
              {isLoggingOut ? (
                <ActivityIndicator size="small" color="#EF4444" style={{ marginRight: 14 }} />
              ) : (
                <LogOut size={20} color="#EF4444" style={{ marginRight: 14 }} />
              )}
              <Text className="flex-1 text-[13px] font-medium text-red-500">
                {isLoggingOut ? 'Logging out…' : 'Logout'}
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

        <PatientHomeBottomNav
          activeTab="Profile"
          onHome={onHome}
          onDoctors={onFindDoctor}
          onAppointments={onAppointments}
          onMessages={onMessages}
          onProfile={onProfile}
        />

      </SafeAreaView>
    </ImageBackground>
  );
};

export default PatientProfileScreen;
