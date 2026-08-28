import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Phone } from 'lucide-react-native';

interface ContactSupportScreenProps { onBack?: () => void; }
export const ContactSupportScreen: React.FC<ContactSupportScreenProps> = ({ onBack }) => {
  const [message, setMessage] = useState('');
  return <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-3"><TouchableOpacity onPress={() => onBack?.()} hitSlop={10} className="p-1.5"><ArrowLeft size={22} color="#111827" /></TouchableOpacity><Text className="text-[17px] font-bold text-gray-900">Contact Support</Text><View className="w-9" /></View>
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        <View className="mb-5 mt-5 rounded-2xl bg-white/45 px-4 py-5 shadow-sm"><Text className="text-center text-sm leading-6 text-gray-600">Our support team is available to help with your account and appointments.</Text></View>
        <View className="mb-3 flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><Phone size={20} color="#2563EB" /><Text className="ml-3 text-sm font-semibold text-gray-700">+880 1700-000000</Text></View>
        <View className="mb-5 flex-row items-center rounded-2xl bg-white/45 px-4 py-4 shadow-sm"><Mail size={20} color="#2563EB" /><Text className="ml-3 text-sm font-semibold text-gray-700">support@healthconnect.com</Text></View>
        <Text className="mb-2 text-[11px] font-semibold uppercase text-gray-400">Your Message</Text>
        <TextInput value={message} onChangeText={setMessage} placeholder="Describe your issue" placeholderTextColor="#9CA3AF" multiline className="mb-4 min-h-[120px] rounded-2xl bg-white/45 px-4 py-3 text-[15px] text-gray-900" />
        <TouchableOpacity className="items-center rounded-2xl bg-primary py-4 shadow-lg shadow-primary/30"><Text className="text-base font-bold text-white">Send Message</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  </ImageBackground>;
};
export default ContactSupportScreen;