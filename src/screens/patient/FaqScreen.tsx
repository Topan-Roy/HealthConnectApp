import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';

interface FaqScreenProps { onBack?: () => void; }
const FAQS = [
  ['How do I book an appointment?', 'Find a doctor, choose an available time, and complete the booking payment.'],
  ['How can I change my profile information?', 'Open Profile, select Personal Information, update your details, and save.'],
  ['Can I cancel an appointment?', 'Open My Appointments and contact support for cancellation assistance.'],
  ['Is my health information secure?', 'Your health information is kept private and shared only with your care team.'],
];

export const FaqScreen: React.FC<FaqScreenProps> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={() => onBack?.()} hitSlop={10} className="p-1.5"><ArrowLeft size={22} color="#111827" /></TouchableOpacity>
          <Text className="text-[17px] font-bold text-gray-900">FAQs</Text><View className="w-9" />
        </View>
        <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
          <Text className="mb-4 mt-5 text-sm font-semibold text-gray-700">Common Questions</Text>
          {FAQS.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            return <View key={question} className="mb-3 rounded-2xl bg-white/45 px-4 py-4 shadow-sm">
              <TouchableOpacity onPress={() => setOpenIndex(isOpen ? null : index)} className="flex-row items-center">
                <Text className="flex-1 text-sm font-semibold text-gray-800">{question}</Text><ChevronDown size={18} color="#2563EB" />
              </TouchableOpacity>
              {isOpen && <Text className="mt-3 text-sm leading-6 text-gray-600">{answer}</Text>}
            </View>;
          })}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default FaqScreen;