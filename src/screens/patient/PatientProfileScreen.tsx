import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
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
  onHome?: () => void;
  onFindDoctor?: () => void;
  onAppointments?: () => void;
  onMessages?: () => void;
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
  onHome,
  onFindDoctor,
  onAppointments,
  onMessages,
  onLogout,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

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
    <SafeAreaView style={styles.safeArea}>
      {/* ── Page title ── */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Main card ── */}
        <View style={styles.card}>

          {/* Favourite heart – top-right of card */}
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            style={styles.heartBtn}
          >
            <Heart
              size={20}
              color={isFavorite ? '#EF4444' : '#9CA3AF'}
              fill={isFavorite ? '#EF4444' : 'none'}
            />
          </TouchableOpacity>

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
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.65}
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

      {/* ── Bottom nav ── */}
      <PatientHomeBottomNav
        activeTab="Profile"
        onHome={onHome}
        onDoctors={onFindDoctor}
        onAppointments={onAppointments}
        onMessages={onMessages}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  pageHeader: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  /* ── Card ── */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingTop: 28,
    paddingBottom: 8,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 5,
  },

  /* favourite */
  heartBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },

  /* avatar */
  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#EFF6FF',
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },

  /* user info */
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  phone: {
    fontSize: 13,
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
    fontSize: 13,
    color: '#6B7280',
  },

  /* divider */
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: -20,
    marginBottom: 4,
  },

  /* menu */
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
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
