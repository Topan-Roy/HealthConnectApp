import React from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, Shield } from 'lucide-react-native';

interface PrivacySecurityScreenProps { onBack?: () => void; }

export const PrivacySecurityScreen: React.FC<PrivacySecurityScreenProps> = ({ onBack }) => (
  <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => onBack?.()} hitSlop={10} className="p-1.5"><ArrowLeft size={22} color="#111827" /></TouchableOpacity>
        <Text className="text-[17px] font-bold text-gray-900">Privacy & Security</Text>
        <View className="w-9" />
      </View>
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        <View className="mb-5 mt-5 items-center rounded-2xl bg-white/45 px-5 py-6 shadow-sm">
          <Shield size={42} color="#2563EB" />
          <Text className="mt-3 text-center text-base font-bold text-gray-800">Your privacy matters</Text>
          <Text className="mt-2 text-center text-sm leading-6 text-gray-600">Your personal health information is protected and only shared with your care team.</Text>
        </View>
        {['Profile information is kept private', 'Secure appointment and payment data', 'You control your account information'].map((item) => (
          <View key={item} className="mb-3 flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm">
            <CheckCircle2 size={20} color="#16A34A" />
            <Text className="ml-3 text-sm font-semibold text-gray-700">{item}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  </ImageBackground>
);

export default PrivacySecurityScreen;