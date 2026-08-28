import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  ImageBackground, TextInput, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';

interface PersonalInfoScreenProps {
  onBack?: () => void;
}

export const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({ onBack }) => {
  const [name, setName] = useState('Topan Roy');
  const [phone, setPhone] = useState('+880 1712-345678');
  const [email, setEmail] = useState('topanroy@gmail.com');
  const [dob, setDob] = useState('12 Jan 1995');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('Dhaka, Bangladesh');

  const fields = [
    { label: 'Full Name', value: name, setter: setName, placeholder: 'Enter full name' },
    { label: 'Phone Number', value: phone, setter: setPhone, placeholder: 'Enter phone number' },
    { label: 'Email Address', value: email, setter: setEmail, placeholder: 'Enter email' },
    { label: 'Date of Birth', value: dob, setter: setDob, placeholder: 'DD MMM YYYY' },
    { label: 'Gender', value: gender, setter: setGender, placeholder: 'Male / Female' },
    { label: 'Address', value: address, setter: setAddress, placeholder: 'Enter address' },
  ];

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={onBack} className=" bg-white/85 p-1.5">
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-[17px] font-bold text-gray-900">Personal Information</Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5 pb-10"
        >
          {/* Avatar edit */}
          <View className="my-5 items-center">
            <View className="relative h-[88px] w-[88px] overflow-visible rounded-full">
              <Image
                source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=TopanRoy&backgroundColor=b6e3f4&radius=50' }}
                className="h-[88px] w-[88px] rounded-full bg-blue-50"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-white bg-primary">
                <Camera size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text className="mt-2 text-xs text-gray-500">Tap to change photo</Text>
          </View>

          {/* Fields */}
          <View className="mb-5  px-[18px] py-1 ">
            {fields.map((f, i) => (
              <View key={i} className={`py-3.5 ${i < fields.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">{f.label}</Text>
                <TextInput
                  value={f.value}
                  onChangeText={f.setter}
                  placeholder={f.placeholder}
                  placeholderTextColor="#9CA3AF"
                  className="text-[15px] font-medium text-gray-900"
                />
              </View>
            ))}
          </View>

          <TouchableOpacity className="items-center rounded-2xl bg-primary py-4 shadow-lg shadow-primary/30">
            <Text className="text-base font-bold text-white">Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PersonalInfoScreen;
