import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  X,
  Check,
} from 'lucide-react-native';

interface DoctorSettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onAccountSettings?: () => void;
  onPaymentPayouts?: () => void;
}

export const DoctorSettingsScreen: React.FC<DoctorSettingsScreenProps> = ({
  onBack,
  onLogout,
  onAccountSettings,
  onPaymentPayouts,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'বাংলা'>('English');
  const [langModalVisible, setLangModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from your doctor account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            if (onLogout) onLogout();
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm border border-slate-200"
          >
            <ChevronLeft size={22} color="#1E293B" />
          </TouchableOpacity>

          <Text className="text-[19px] font-bold text-gray-900">Settings</Text>

          <View className="w-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        >
          {/* Main Settings Card (Screen LS) */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-2">
            {/* 1. Account Settings */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onAccountSettings || (() => Alert.alert('Account Settings', 'Manage your email, password, and hospital affiliations.'))}
              className="flex-row items-center py-3.5"
            >
              <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <User size={19} color="#334155" />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-gray-900">
                Account Settings
              </Text>
              <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 my-0.5" />

            {/* 2. Notifications */}
            <View className="flex-row items-center py-3.5">
              <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Bell size={19} color="#334155" />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-gray-900">
                Notifications
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={notificationsEnabled ? '#2563EB' : '#F1F5F9'}
              />
            </View>

            <View className="h-[1px] bg-slate-100 my-0.5" />

            {/* 3. Privacy & Security */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert('Privacy & Security', 'Your data is end-to-end encrypted and HIPAA compliant.')}
              className="flex-row items-center py-3.5"
            >
              <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Shield size={19} color="#334155" />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-gray-900">
                Privacy & Security
              </Text>
              <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 my-0.5" />

            {/* 4. Payment & Payouts */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPaymentPayouts || (() => Alert.alert('Payment & Payouts', 'Bank account: City Bank (**** 4892) is active for payouts.'))}
              className="flex-row items-center py-3.5"
            >
              <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <CreditCard size={19} color="#334155" />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-gray-900">
                Payment & Payouts
              </Text>
              <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 my-0.5" />

            {/* 5. Language */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setLangModalVisible(true)}
              className="flex-row items-center py-3.5"
            >
              <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Globe size={19} color="#334155" />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-gray-900">
                Language
              </Text>
              <View className="flex-row items-center">
                <Text className="text-xs font-medium text-gray-500 mr-1.5">
                  {selectedLanguage}
                </Text>
                <ChevronRight size={18} color="#CBD5E1" />
              </View>
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 my-0.5" />

            {/* 6. Help & Support */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert('Help & Support', 'Doctor helpline: +880 9612-345678\nEmail: doctor-support@healthconnect.com')}
              className="flex-row items-center py-3.5"
            >
              <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <HelpCircle size={19} color="#334155" />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-gray-900">
                Help & Support
              </Text>
              <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 my-0.5" />

            {/* 7. About Us */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert('About Us', 'HealthConnect Doctor v1.0.0\nProviding smart digital healthcare solutions across Bangladesh.')}
              className="flex-row items-center py-3.5"
            >
              <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Info size={19} color="#334155" />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-gray-900">
                About Us
              </Text>
              <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 my-0.5" />

            {/* 8. Logout (Red text and red icon from design) */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleLogout}
              className="flex-row items-center py-3.5"
            >
              <View className="w-9 h-9 rounded-xl bg-red-50 items-center justify-center mr-3">
                <LogOut size={19} color="#EF4444" />
              </View>
              <Text className="flex-1 text-[15px] font-bold text-red-500">
                Logout
              </Text>
            </TouchableOpacity>
          </View>

          {/* App Version Footer (from design Screen LS) */}
          <View className="items-center mt-8">
            <Text className="text-xs text-gray-400 font-medium">App Version 1.0.0</Text>
          </View>
        </ScrollView>

        {/* Language Selection Modal */}
        <Modal
          visible={langModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setLangModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center px-6">
            <View className="bg-white w-full rounded-3xl p-6 shadow-xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-gray-900">Select Language</Text>
                <TouchableOpacity onPress={() => setLangModalVisible(false)}>
                  <X size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              {(['English', 'বাংলা'] as const).map((lang) => (
                <TouchableOpacity
                  key={lang}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedLanguage(lang);
                    setLangModalVisible(false);
                  }}
                  className={`flex-row items-center justify-between p-3.5 rounded-2xl mb-2 ${
                    selectedLanguage === lang ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'
                  }`}
                >
                  <Text className="text-sm font-semibold text-gray-900">{lang}</Text>
                  {selectedLanguage === lang && <Check size={18} color="#2563EB" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorSettingsScreen;
