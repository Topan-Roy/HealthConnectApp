import React, { useState } from 'react';
import { ImageBackground, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Lock, Moon, Shield } from 'lucide-react-native';

interface SettingsScreenProps { onBack?: () => void; onChangePassword?: () => void; onPrivacySecurity?: () => void; }

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onChangePassword, onPrivacySecurity }) => {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={() => onBack?.()} hitSlop={10} className="p-1.5"><ArrowLeft size={22} color="#111827" /></TouchableOpacity>
          <Text className="text-[17px] font-bold text-gray-900">Settings</Text>
          <View className="w-9" />
        </View>
        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <Text className="mb-3 mt-5 text-sm font-semibold text-gray-700">Preferences</Text>
          <View className="rounded-2xl bg-white/45 px-4 shadow-sm">
            <View className="flex-row items-center py-4">
              <Bell size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Notifications</Text>
              <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: '#CBD5E1', true: '#93C5FD' }} thumbColor={notifications ? '#2563EB' : '#F8FAFC'} />
            </View>
            <View className="flex-row items-center py-4">
              <Bell size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Appointment Reminders</Text>
              <Switch value={reminders} onValueChange={setReminders} trackColor={{ false: '#CBD5E1', true: '#93C5FD' }} thumbColor={reminders ? '#2563EB' : '#F8FAFC'} />
            </View>
            <View className="flex-row items-center py-4">
              <Moon size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Dark Mode</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: '#CBD5E1', true: '#93C5FD' }} thumbColor={darkMode ? '#2563EB' : '#F8FAFC'} />
            </View>
          </View>
          <Text className="mb-3 mt-6 text-sm font-semibold text-gray-700">Security</Text>
          <TouchableOpacity onPress={onChangePassword} className="mb-3 flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><Lock size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Change Password</Text><Text className="text-gray-400">›</Text></TouchableOpacity>
          <TouchableOpacity onPress={onPrivacySecurity} className="flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><Shield size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Privacy & Security</Text><Text className="text-gray-400">›</Text></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SettingsScreen;