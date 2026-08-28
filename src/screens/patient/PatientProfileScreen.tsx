import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  onHome,
  onFindDoctor,
  onAppointments,
  onMessages,
  onProfile,
  onLogout,
}) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'আপনি কি সত্যিই logout করতে চান?',
      [
        { text: 'না', style: 'cancel' },
        { text: 'হ্যাঁ, Logout', style: 'destructive', onPress: () => onLogout && onLogout() },
      ]
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 bg-transparent">
        <View className="items-center pt-2.5 pb-2">
          <Text className="text-[19px] font-bold text-primary">Profile</Text>
        </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 120 }}
      >
        {/* ── Main card ── */}
        <View className="px-[18px] pt-[18px] pb-1">

          {/* ── Avatar ── */}
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=TopanRoy&backgroundColor=b6e3f4&radius=50' }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>

          {/* ── Name / phone / email ── */}
          <Text style={styles.name}>Topan Roy</Text>
          <Text style={styles.phone}>+880 1712-345678</Text>

          <View style={styles.emailRow}>
            <View style={styles.emailDot} />
            <Text style={styles.email}>topanroy@gmail.com</Text>
          </View>

          {/* ── Divider ── */}
          <View style={styles.divider} />

          {/* ── Menu rows ── */}
          {MENU_ITEMS.map(({ id, Icon, label }, index) => {
            const isLast = index === MENU_ITEMS.length - 1;
            const onPress = id === 'personal' ? onPersonalInfo : id === 'health' ? onHealthInfo : id === 'emergency' ? onEmergencyContact : id === 'payment' ? onPaymentMethods : undefined;
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.65}
                onPress={onPress}
                style={[styles.menuRow, isLast && styles.menuRowLast]}
              >
                <Icon size={20} color="#6B7280" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{label}</Text>
                <ChevronRight size={18} color="#D1D5DB" />
              </TouchableOpacity>
            );
          })}

          {/* ── Divider before logout ── */}
          <View style={styles.divider} />

          {/* ── Logout row ── */}
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={handleLogout}
            style={styles.logoutRow}
          >
            <LogOut size={20} color="#374151" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Logout</Text>
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

const styles = StyleSheet.create({
  /* avatar */
  avatarWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#EFF6FF',
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 9,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },

  /* user info */
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  phone: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 6,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 20,
  },
  emailDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  email: {
    fontSize: 12,
    color: '#6B7280',
  },

  /* divider */
  divider: {
    height: 0,
  },

  /* menu */
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuRowLast: {
  },
  menuIcon: {
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },

  /* logout */
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
});

export default PatientProfileScreen;
