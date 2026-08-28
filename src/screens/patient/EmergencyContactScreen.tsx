import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

interface EmergencyContactScreenProps {
  onBack?: () => void;
}

const INPUT_CLASS = 'mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm';
const LABEL_CLASS = 'mb-1 text-[11px] font-semibold uppercase text-gray-400';
const VALUE_CLASS = 'text-[15px] font-medium text-gray-900';

export const EmergencyContactScreen: React.FC<EmergencyContactScreenProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={() => onBack?.()} hitSlop={10} className="p-1.5">
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-[17px] font-bold text-gray-900">Emergency Contact</Text>
          <View className="w-9" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10">
          <Text className="my-5 text-center text-sm text-gray-600">Add someone we can contact in an emergency.</Text>

          <View className={INPUT_CLASS}>
            <Text className={LABEL_CLASS}>Contact Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Enter contact name" placeholderTextColor="#9CA3AF" className={VALUE_CLASS} />
          </View>
          <View className={INPUT_CLASS}>
            <Text className={LABEL_CLASS}>Relationship</Text>
            <TextInput value={relationship} onChangeText={setRelationship} placeholder="Enter relationship" placeholderTextColor="#9CA3AF" className={VALUE_CLASS} />
          </View>
          <View className={INPUT_CLASS}>
            <Text className={LABEL_CLASS}>Phone Number</Text>
            <TextInput value={phone} onChangeText={setPhone} placeholder="Enter phone number" placeholderTextColor="#9CA3AF" keyboardType="phone-pad" className={VALUE_CLASS} />
          </View>

          <TouchableOpacity className="mt-2 items-center rounded-2xl bg-primary py-4 shadow-lg shadow-primary/30">
            <Text className="text-base font-bold text-white">Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default EmergencyContactScreen;