import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Filter,
  Search,
  Heart,
  Star,
  Settings2
} from 'lucide-react-native';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  price: string;
  image: string;
}

const DOCTORS_DATA: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    specialty: 'Cardiologist',
    experience: '8 Years',
    rating: 4.8,
    price: '800',
    image: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    experience: '10 Years',
    rating: 4.7,
    price: '700',
    image: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '3',
    name: 'Dr. Nabila Khan',
    specialty: 'Dermatologist',
    experience: '6 Years',
    rating: 4.6,
    price: '800',
    image: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '4',
    name: 'Dr. Fahim Ahmed',
    specialty: 'Orthopedic',
    experience: '9 Years',
    rating: 4.5,
    price: '700',
    image: 'https://i.pravatar.cc/150?img=8'
  }
];

const CATEGORIES = ['All', 'Cardiology', 'Neurology', 'Dermatology', 'Orthopedic'];

interface FindDoctorScreenProps {
  onBack?: () => void;
}

export const FindDoctorScreen: React.FC<FindDoctorScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-7 ">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 -mr-2">
            <Settings2 size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Find Your Doctor
        </Text>

        {/* Search Bar & Filter */}
        <View className="flex-row items-center gap-3 mb-6">
          <View className="flex-1 flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search doctors or specialties..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-base text-gray-900"
            />
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white rounded-2xl items-center justify-center border border-gray-200">
            <Filter size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4">
            {CATEGORIES.map((category, index) => {
              const isActive = activeCategory === category;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full mr-3 border ${isActive
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-gray-200'
                    }`}
                >
                  <Text className={`font-semibold ${isActive ? 'text-white' : 'text-gray-600'}`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <View className="w-4" /> {/* Padding at the end */}
          </ScrollView>
        </View>

        {/* Doctor List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {DOCTORS_DATA.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              className="flex-row items-center p-4 bg-white rounded-3xl mb-4 border border-gray-100 shadow-sm shadow-gray-200/50"
              activeOpacity={0.7}
            >
              {/* Doctor Avatar */}
              <View className="w-20 h-20 bg-blue-50 rounded-2xl overflow-hidden mr-4 border border-blue-100 items-center justify-end">
                <Image
                  source={{ uri: doctor.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Doctor Details */}
              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
                    {doctor.name}
                  </Text>
                  <TouchableOpacity className="p-1 -mt-1 -mr-1">
                    <Heart size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <Text className="text-sm text-gray-500 mb-2">{doctor.specialty}</Text>

                <View className="flex-row items-center mb-2">
                  <Text className="text-xs text-gray-600 font-medium">
                    {doctor.experience} Exp.
                  </Text>
                  <Text className="text-xs text-gray-400 mx-2">•</Text>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text className="text-xs text-gray-600 font-medium ml-1">
                    {doctor.rating}
                  </Text>
                </View>

                <Text className="text-base font-bold text-gray-900">
                  ৳{doctor.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FindDoctorScreen;
