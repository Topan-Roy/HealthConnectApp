import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, ShieldCheck, Plus } from 'lucide-react-native';

interface PaymentScreenProps {
  totalAmount: number;
  onBack?: () => void;
  onPaymentSuccess?: () => void;
}

const PAYMENT_METHODS = [
  { id: 'bkash', name: 'bKash', emoji: '🔴', color: '#E2136E' },
  { id: 'nagad', name: 'Nagad', emoji: '🟠', color: '#F7941D' },
  { id: 'rocket', name: 'Rocket', emoji: '🟣', color: '#8B2FC9' },
  { id: 'card', name: 'Credit / Debit Card', emoji: '💳', color: '#2563EB' },
];

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  totalAmount,
  onBack,
  onPaymentSuccess,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 pt-4 mb-6">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2 mr-4">
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Select Payment Method</Text>
        </View>

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Payment Methods */}
          <View className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4">
            {PAYMENT_METHODS.map((method, index) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 18,
                  borderBottomWidth: index < PAYMENT_METHODS.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                  backgroundColor: selectedMethod === method.id ? '#EFF6FF' : 'white',
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: method.color + '18',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{method.emoji}</Text>
                </View>
                <Text className="flex-1 text-base font-semibold text-gray-900">{method.name}</Text>
                <ChevronRight size={20} color={selectedMethod === method.id ? '#2563EB' : '#9CA3AF'} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Add New Card */}
          <TouchableOpacity
            className="bg-white rounded-3xl border border-gray-100 shadow-sm flex-row items-center px-5 py-5 gap-4"
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
              <Plus size={20} color="#2563EB" />
            </View>
            <Text className="flex-1 text-base font-semibold text-gray-900">Add New Card</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </ScrollView>

        {/* Pay Button */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 24,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
          }}
        >
          <TouchableOpacity
            onPress={onPaymentSuccess}
            className="bg-blue-600 rounded-2xl py-4 items-center mb-3"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Pay ৳{totalAmount}</Text>
          </TouchableOpacity>
          <View className="flex-row items-center justify-center gap-2">
            <ShieldCheck size={16} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">100% Secure Payment</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PaymentScreen;
