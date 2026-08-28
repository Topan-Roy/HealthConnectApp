import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react-native';

interface PaymentMethodsScreenProps {
  onBack?: () => void;
}

export const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ onBack }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [savedCard, setSavedCard] = useState('•••• 4242');

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={() => onBack?.()} hitSlop={10} className="p-1.5">
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-[17px] font-bold text-gray-900">Payment Methods</Text>
          <View className="w-9" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10">
          <Text className="mb-3 mt-5 text-sm font-semibold text-gray-700">Saved Card</Text>
          <View className="mb-5 rounded-2xl bg-blue-600 px-5 py-5 shadow-lg shadow-blue-900/20">
            <View className="mb-8 flex-row items-center justify-between">
              <CreditCard size={27} color="#FFFFFF" />
              <Text className="text-sm font-bold text-white">VISA</Text>
            </View>
            <Text className="mb-3 text-xl tracking-widest text-white">{savedCard}</Text>
            <View className="flex-row items-end justify-between">
              <Text className="text-xs text-blue-100">TOPAN ROY</Text>
              <Text className="text-xs text-blue-100">12/28</Text>
            </View>
          </View>

          <TouchableOpacity className="mb-4 flex-row items-center justify-center gap-2 rounded-2xl bg-white/45 py-3 shadow-sm">
            <Plus size={18} color="#2563EB" />
            <Text className="text-sm font-bold text-primary">Add New Card</Text>
          </TouchableOpacity>

          <View className="rounded-2xl bg-white/45 px-4 py-4 shadow-sm">
            <Text className="mb-3 text-sm font-bold text-gray-700">Card Details</Text>
            <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Card Number</Text>
            <TextInput value={cardNumber} onChangeText={setCardNumber} placeholder="1234 5678 9012 3456" placeholderTextColor="#9CA3AF" keyboardType="numeric" className="mb-3 rounded-xl bg-white/45 px-3 py-3 text-[15px] text-gray-900" />
            <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Card Holder</Text>
            <TextInput value={cardHolder} onChangeText={setCardHolder} placeholder="Name on card" placeholderTextColor="#9CA3AF" className="mb-3 rounded-xl bg-white/45 px-3 py-3 text-[15px] text-gray-900" />
            <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Expiry Date</Text>
            <TextInput value={expiry} onChangeText={setExpiry} placeholder="MM/YY" placeholderTextColor="#9CA3AF" className="rounded-xl bg-white/45 px-3 py-3 text-[15px] text-gray-900" />
          </View>

          <TouchableOpacity onPress={() => setSavedCard(cardNumber ? `•••• ${cardNumber.slice(-4)}` : savedCard)} className="mt-5 items-center rounded-2xl bg-primary py-4 shadow-lg shadow-primary/30">
            <Text className="text-base font-bold text-white">Save Card</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-5 flex-row items-center justify-center gap-2">
            <Trash2 size={16} color="#DC2626" />
            <Text className="text-sm font-semibold text-red-600">Remove Saved Card</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PaymentMethodsScreen;