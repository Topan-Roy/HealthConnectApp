import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Droplets, Cigarette, Wine } from 'lucide-react-native';

interface HealthInfoScreenProps {
  onBack?: () => void;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const INPUT_CLASS = 'mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm';
const LABEL_CLASS = 'mb-1 text-[11px] font-semibold uppercase text-gray-400';
const VALUE_CLASS = 'text-[15px] font-medium text-gray-900';

export const HealthInfoScreen: React.FC<HealthInfoScreenProps> = ({ onBack }) => {
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [weight, setWeight] = useState('72 kg');
  const [height, setHeight] = useState('175 cm');
  const [allergies, setAllergies] = useState('None');
  const [conditions, setConditions] = useState('None');
  const [smoking, setSmoking] = useState('No');
  const [alcohol, setAlcohol] = useState('No');

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={onBack} className="p-1.5">
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-[17px] font-bold text-gray-900">Health Information</Text>
          <View className="w-9" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10">
          <View className="mb-4 rounded-2xl bg-white/45 px-4 py-4 shadow-sm">
            <View className="mb-3 flex-row items-center gap-2">
              <Droplets size={18} color="#EF4444" />
              <Text className="text-sm font-bold text-gray-700">Blood Group</Text>
            </View>
            <View className="flex-row flex-wrap gap-2.5">
              {BLOOD_GROUPS.map((group) => (
                <TouchableOpacity key={group} onPress={() => setBloodGroup(group)} className={`rounded-full px-4 py-2 ${bloodGroup === group ? 'bg-red-500' : 'bg-white/55'}`}>
                  <Text className={`text-[13px] font-semibold ${bloodGroup === group ? 'text-white' : 'text-gray-700'}`}>{group}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-2">
            <View className={INPUT_CLASS}>
              <Text className={LABEL_CLASS}>Weight</Text>
              <TextInput value={weight} onChangeText={setWeight} placeholder="e.g. 72 kg" placeholderTextColor="#9CA3AF" className={VALUE_CLASS} />
            </View>
            <View className={INPUT_CLASS}>
              <Text className={LABEL_CLASS}>Height</Text>
              <TextInput value={height} onChangeText={setHeight} placeholder="e.g. 175 cm" placeholderTextColor="#9CA3AF" className={VALUE_CLASS} />
            </View>
            <View className={INPUT_CLASS}>
              <Text className={LABEL_CLASS}>Allergies</Text>
              <TextInput value={allergies} onChangeText={setAllergies} placeholder="List any allergies" placeholderTextColor="#9CA3AF" className={VALUE_CLASS} />
            </View>
            <View className={INPUT_CLASS}>
              <Text className={LABEL_CLASS}>Medical Conditions</Text>
              <TextInput value={conditions} onChangeText={setConditions} placeholder="e.g. Diabetes, Hypertension" placeholderTextColor="#9CA3AF" className={VALUE_CLASS} />
            </View>
          </View>

          <View className="mb-4 rounded-2xl bg-white/45 px-4 py-4 shadow-sm">
            <Text className="mb-3 text-sm font-bold text-gray-700">Lifestyle</Text>
            <View className="mb-4">
              <View className="mb-2 flex-row items-center gap-1.5">
                <Cigarette size={16} color="#6B7280" />
                <Text className="text-sm font-semibold text-gray-700">Smoking</Text>
              </View>
              <View className="flex-row gap-2">
                {['No', 'Occasionally', 'Yes'].map((option) => (
                  <TouchableOpacity key={option} onPress={() => setSmoking(option)} className={`rounded-full px-3.5 py-1.5 ${smoking === option ? 'bg-primary' : 'bg-white/55'}`}>
                    <Text className={`text-xs font-semibold ${smoking === option ? 'text-white' : 'text-gray-700'}`}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View>
              <View className="mb-2 flex-row items-center gap-1.5">
                <Wine size={16} color="#6B7280" />
                <Text className="text-sm font-semibold text-gray-700">Alcohol</Text>
              </View>
              <View className="flex-row gap-2">
                {['No', 'Occasionally', 'Yes'].map((option) => (
                  <TouchableOpacity key={option} onPress={() => setAlcohol(option)} className={`rounded-full px-3.5 py-1.5 ${alcohol === option ? 'bg-primary' : 'bg-white/55'}`}>
                    <Text className={`text-xs font-semibold ${alcohol === option ? 'text-white' : 'text-gray-700'}`}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity className="items-center rounded-2xl bg-primary py-4 shadow-lg shadow-primary/30">
            <Text className="text-base font-bold text-white">Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HealthInfoScreen;