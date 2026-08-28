import React from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, Mail, MessageCircle, Phone } from 'lucide-react-native';

interface HelpSupportScreenProps { onBack?: () => void; }

export const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ onBack }) => (
  <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => onBack?.()} hitSlop={10} className="p-1.5"><ArrowLeft size={22} color="#111827" /></TouchableOpacity>
        <Text className="text-[17px] font-bold text-gray-900">Help & Support</Text>
        <View className="w-9" />
      </View>
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        <Text className="mb-3 mt-5 text-sm font-semibold text-gray-700">How can we help?</Text>
        <View className="mb-5 rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><Text className="text-sm leading-6 text-gray-600">Find answers or contact our support team for assistance with your account and appointments.</Text></View>
        <TouchableOpacity className="mb-3 flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><MessageCircle size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Frequently Asked Questions</Text><ChevronRight size={18} color="#6B7280" /></TouchableOpacity>
        <TouchableOpacity className="mb-3 flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><Phone size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Call Support</Text><ChevronRight size={18} color="#6B7280" /></TouchableOpacity>
        <TouchableOpacity className="flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><Mail size={20} color="#2563EB" /><Text className="ml-3 flex-1 text-sm font-semibold text-gray-700">Email Support</Text><ChevronRight size={18} color="#6B7280" /></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  </ImageBackground>
);

export default HelpSupportScreen;