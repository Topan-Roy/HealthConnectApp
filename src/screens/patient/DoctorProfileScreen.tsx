import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Heart,
  Star,
  Building2,
  Languages,
  MessageCircle,
  CalendarDays,
} from 'lucide-react-native';
import { Doctor } from '../../data/doctors';

interface DoctorProfileScreenProps {
  doctor: Doctor;
  onBack?: () => void;
  onBookAppointment?: (doctor: Doctor) => void;
  onChat?: (doctor: Doctor) => void;
}

export const DoctorProfileScreen: React.FC<DoctorProfileScreenProps> = ({
  doctor,
  onBack,
  onBookAppointment,
  onChat,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-4 mb-2">
        <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className="p-2 -mr-2">
          <Heart size={24} color={isFavorite ? '#EF4444' : '#9CA3AF'} fill={isFavorite ? '#EF4444' : 'none'} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
        {/* Doctor Avatar & Name */}
        <View className="items-center px-4 mb-6">
          <View className="w-28 h-28 rounded-full bg-blue-50 border-4 border-blue-100 overflow-hidden mb-4">
            <Image
              source={{ uri: doctor.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</Text>
          <Text className="text-base text-gray-500 mb-2">
            {doctor.specialty} • {doctor.experience} Exp.
          </Text>
          <View className="flex-row items-center gap-2">
            <Star size={18} color="#F59E0B" fill="#F59E0B" />
            <Text className="text-base font-bold text-gray-800">{doctor.rating}</Text>
            <Text className="text-sm text-gray-400">({doctor.reviews} Reviews)</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View className="mx-4 bg-gray-50 rounded-3xl px-5 py-4 mb-6 border border-gray-100">
          <InfoRow label="Consultation Fee" value={`৳${doctor.price}`} />
          <View className="h-px bg-gray-100 my-3" />
          <InfoRow label="Hospital" value={doctor.hospital} icon={<Building2 size={16} color="#6B7280" />} />
          <View className="h-px bg-gray-100 my-3" />
          <InfoRow label="Languages" value={doctor.languages} icon={<Languages size={16} color="#6B7280" />} />
        </View>

        {/* About */}
        <View className="mx-4 mb-6">
          <Text className="text-base font-bold text-gray-900 mb-2">About Doctor</Text>
          <Text className="text-sm text-gray-500 leading-relaxed">{doctor.about}</Text>
        </View>

        {/* Available Slots */}
        <View className="mx-4 mb-6">
          <Text className="text-base font-bold text-green-500 mb-3">✓ Available Today</Text>
          <View className="flex-row flex-wrap gap-3">
            {doctor.availableSlots.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <TouchableOpacity
                  key={slot}
                  onPress={() => setSelectedSlot(slot)}
                  className={`px-4 py-2.5 rounded-2xl border ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 24,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        }}
      >
        <TouchableOpacity
          onPress={() => onChat && onChat(doctor)}
          className="flex-row items-center justify-center gap-2 border border-blue-600 rounded-2xl py-4 px-6"
          activeOpacity={0.8}
        >
          <MessageCircle size={20} color="#2563EB" />
          <Text className="text-blue-600 font-bold text-base">Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onBookAppointment && onBookAppointment(doctor)}
          className="flex-1 flex-row items-center justify-center gap-2 bg-blue-600 rounded-2xl py-4"
          activeOpacity={0.85}
        >
          <CalendarDays size={20} color="#FFFFFF" />
          <Text className="text-white font-bold text-base">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <View className="flex-row justify-between items-center">
    <Text className="text-sm text-gray-500 font-medium">{label}</Text>
    <View className="flex-row items-center gap-1">
      {icon}
      <Text className="text-sm font-semibold text-gray-800">{value}</Text>
    </View>
  </View>
);

export default DoctorProfileScreen;
