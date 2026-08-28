import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, MessageSquare } from 'lucide-react-native';
import { Doctor } from '../../data/doctors';

export interface Conversation {
  doctor: Doctor;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface MessagesListScreenProps {
  conversations?: Conversation[];
  onBack?: () => void;
  onOpenChat?: (doctor: Doctor) => void;
}

const DEMO_CONVERSATIONS: Conversation[] = [
  {
    doctor: {
      id: '1',
      name: 'Dr. Sarah Ahmed',
      specialty: 'Cardiologist',
      experience: '8 Years',
      rating: 4.8,
      reviews: 124,
      price: '800',
      image: 'https://i.pravatar.cc/150?img=47',
      hospital: 'Square Hospital, Dhaka',
      languages: 'English, Bengali',
      about: 'Experienced cardiologist.',
      availableSlots: [],
    },
    lastMessage: 'আপনার রিপোর্টটি দেখে নিন, সব ঠিক আছে।',
    lastMessageTime: '2h ago',
    unreadCount: 2,
    isOnline: true,
  },
  {
    doctor: {
      id: '2',
      name: 'Dr. James Wilson',
      specialty: 'Neurologist',
      experience: '10 Years',
      rating: 4.7,
      reviews: 98,
      price: '700',
      image: 'https://i.pravatar.cc/150?img=11',
      hospital: 'United Hospital, Dhaka',
      languages: 'English, Bengali',
      about: 'Senior neurologist.',
      availableSlots: [],
    },
    lastMessage: 'Please take your medicine regularly.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
  {
    doctor: {
      id: '3',
      name: 'Dr. Nabila Khan',
      specialty: 'Dermatologist',
      experience: '6 Years',
      rating: 4.6,
      reviews: 87,
      price: '800',
      image: 'https://i.pravatar.cc/150?img=5',
      hospital: 'Popular Medical, Dhaka',
      languages: 'English, Bengali',
      about: 'Skin specialist.',
      availableSlots: [],
    },
    lastMessage: 'কাল সকালে একটু আসুন।',
    lastMessageTime: '3d ago',
    unreadCount: 1,
    isOnline: true,
  },
  {
    doctor: {
      id: '4',
      name: 'Dr. Fahim Ahmed',
      specialty: 'Orthopedic',
      experience: '9 Years',
      rating: 4.5,
      reviews: 110,
      price: '700',
      image: 'https://i.pravatar.cc/150?img=8',
      hospital: 'Labaid Hospital, Dhaka',
      languages: 'English, Bengali',
      about: 'Orthopedic surgeon.',
      availableSlots: [],
    },
    lastMessage: 'The follow-up appointment is confirmed.',
    lastMessageTime: '1w ago',
    unreadCount: 0,
    isOnline: false,
  },
];

export const MessagesListScreen: React.FC<MessagesListScreenProps> = ({
  conversations = DEMO_CONVERSATIONS,
  onBack,
  onOpenChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = conversations.filter((c) =>
    c.doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      onPress={() => onOpenChat && onOpenChat(item.doctor)}
      activeOpacity={0.75}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.93)',
        borderRadius: 16,
        marginHorizontal: 16,
        marginBottom: 10,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {/* Avatar + Online dot */}
      <View style={{ position: 'relative', marginRight: 14 }}>
        <Image
          source={{ uri: item.doctor.image }}
          style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#E5E7EB' }}
        />
        {item.isOnline && (
          <View
            style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: 13,
              height: 13,
              borderRadius: 7,
              backgroundColor: '#22C55E',
              borderWidth: 2,
              borderColor: 'white',
            }}
          />
        )}
      </View>

      {/* Info */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>{item.doctor.name}</Text>
          <Text style={{ fontSize: 11, color: '#9CA3AF' }}>{item.lastMessageTime}</Text>
        </View>
        <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{item.doctor.specialty}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              color: item.unreadCount > 0 ? '#374151' : '#9CA3AF',
              fontWeight: item.unreadCount > 0 ? '500' : '400',
              flex: 1,
              marginRight: 8,
            }}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={{ backgroundColor: '#2563EB', borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
              <Text style={{ color: 'white', fontSize: 11, fontWeight: '700' }}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
          <TouchableOpacity onPress={onBack} style={{ padding: 8, marginRight: 8, marginLeft: -8 }}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', flex: 1 }}>Messages</Text>
          <View style={{ backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>{conversations.length}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderRadius: 14,
            marginHorizontal: 16,
            marginBottom: 16,
            paddingHorizontal: 14,
            height: 46,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Search size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Doctor খুঁজুন..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, marginLeft: 10, fontSize: 14, color: '#111827' }}
          />
        </View>

        {/* Conversation List */}
        {filtered.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={56} color="#D1D5DB" />
            <Text style={{ color: '#9CA3AF', fontSize: 16, marginTop: 12, fontWeight: '600' }}>কোনো conversation নেই</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.doctor.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MessagesListScreen;
