import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  ImageBackground, TextInput, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date(1995, 0, 12));

  const formatBirthDate = (date: Date) =>
    date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={onBack} className="p-1.5">
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
          <View className="mb-5">
            <View className="mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm">
              <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Full Name</Text>
              <TextInput value={name} onChangeText={setName} placeholder="Enter full name" placeholderTextColor="#9CA3AF" className="text-[15px] font-medium text-gray-900" />
            </View>
            <View className="mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm">
              <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Phone Number</Text>
              <TextInput value={phone} onChangeText={setPhone} placeholder="Enter phone number" placeholderTextColor="#9CA3AF" className="text-[15px] font-medium text-gray-900" />
            </View>
            <View className="mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm">
              <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Email Address</Text>
              <TextInput value={email} onChangeText={setEmail} placeholder="Enter email" placeholderTextColor="#9CA3AF" className="text-[15px] font-medium text-gray-900" />
            </View>
            <View className="mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm">
              <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  value={dob}
                  placeholder="DD MMM YYYY"
                  placeholderTextColor="#9CA3AF"
                  editable={false}
                  pointerEvents="none"
                  className="text-[15px] font-medium text-gray-900"
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="calendar"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setBirthDate(selectedDate);
                      setDob(formatBirthDate(selectedDate));
                    }
                  }}
                />
              )}
            </View>
            <View className="mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm">
              <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Gender</Text>
              <TextInput value={gender} onChangeText={setGender} placeholder="Male / Female" placeholderTextColor="#9CA3AF" className="text-[15px] font-medium text-gray-900" />
            </View>
            <View className="mb-3 rounded-2xl bg-white/45 px-4 py-3 shadow-sm">
              <Text className="mb-1 text-[11px] font-semibold uppercase text-gray-400">Address</Text>
              <TextInput value={address} onChangeText={setAddress} placeholder="Enter address" placeholderTextColor="#9CA3AF" className="text-[15px] font-medium text-gray-900" />
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

export default PersonalInfoScreen;
