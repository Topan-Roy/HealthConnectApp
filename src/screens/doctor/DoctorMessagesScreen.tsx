import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, X, MessageSquare, CheckCheck } from 'lucide-react-native';
import { PATIENTS_DATA, Patient } from '../../data/patients';
import { DoctorHomeBottomNav } from '../../components/doctor-home/DoctorHomeBottomNav';

export interface DoctorConversation {
  id: string;
  patient: Patient;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export const INITIAL_CONVERSATIONS: DoctorConversation[] = [
  {
    id: 'conv-1',
    patient: PATIENTS_DATA[0], // Rahim Ahmed
    lastMessage: 'ধন্যবাদ ডাক্তার। ওষুধগুলো ৩ দিন খাওয়ার পর জ্বর কমেছে।',
    lastMessageTime: '10:15 AM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 'conv-2',
    patient: PATIENTS_DATA[1], // Karim Hasan
    lastMessage: 'স্যার, গ্যাস্ট্রিকের ওষুধ কি খাবার আগে খাব না পরে?',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: 'conv-3',
    patient: PATIENTS_DATA[2], // Nadia Rahman
    lastMessage: 'ডাক্তার, আমার নতুন ইনহেলার ব্যবহার সংক্রান্ত একটা প্রশ্ন ছিল।',
    lastMessageTime: '2d ago',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 'conv-4',
    patient: PATIENTS_DATA[3], // Farhana Islam
    lastMessage: 'প্রেসক্রিপশন অনুযায়ী ওষুধ শুরু করেছি। ধন্যবাদ!',
    lastMessageTime: '3d ago',
    unreadCount: 0,
    isOnline: false,
  },
];

interface DoctorMessagesScreenProps {
  onBack?: () => void;
  onOpenChat?: (patient: Patient) => void;
  onHome?: () => void;
  onAppointments?: () => void;
  onPatients?: () => void;
  onProfile?: () => void;
}

export const DoctorMessagesScreen: React.FC<DoctorMessagesScreenProps> = ({
  onBack,
  onOpenChat,
  onHome,
  onAppointments,
  onPatients,
  onProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const insets = useSafeAreaInsets();
  const bottomScrollPadding = 80 + (insets.bottom > 0 ? insets.bottom + 20 : (Platform.OS === 'android' ? 36 : 24));

  const filteredConversations = useMemo(() => {
    return INITIAL_CONVERSATIONS.filter((conv) => {
      const matchesSearch =
        conv.patient.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase().trim());

      if (!matchesSearch) return false;
      if (filter === 'unread') return conv.unreadCount > 0;
      return true;
    });
  }, [searchQuery, filter]);

  const totalUnread = useMemo(() => {
    return INITIAL_CONVERSATIONS.reduce((acc, c) => acc + c.unreadCount, 0);
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2 flex-row justify-between items-center">
          <View>
            <Text className="text-gray-900 text-2xl font-bold">Messages</Text>
            <Text className="text-gray-500 text-xs mt-0.5">
              Consultation chats with your patients
            </Text>
          </View>
          {totalUnread > 0 && (
            <View className="bg-blue-600 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">{totalUnread} new</Text>
            </View>
          )}
        </View>

        {/* Search Bar */}
        <View className="px-6 mt-3 mb-3">
          <View className="flex-row items-center bg-white/90 rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-800"
              placeholder="Search conversations or patients..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1">
                <X size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Chips */}
        <View className="flex-row px-6 mb-3 gap-2">
          <TouchableOpacity
            onPress={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full border ${filter === 'all'
                ? 'bg-blue-600 border-blue-600'
                : 'bg-white/80 border-gray-200'
              }`}
          >
            <Text
              className={`text-xs font-semibold ${filter === 'all' ? 'text-white' : 'text-gray-600'
                }`}
            >
              All Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('unread')}
            className={`px-4 py-1.5 rounded-full border ${filter === 'unread'
                ? 'bg-blue-600 border-blue-600'
                : 'bg-white/80 border-gray-200'
              }`}
          >
            <Text
              className={`text-xs font-semibold ${filter === 'unread' ? 'text-white' : 'text-gray-600'
                }`}
            >
              Unread ({totalUnread})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conversation List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: bottomScrollPadding }}
        >
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => {
              const imageFailed = failedImages[conv.patient.id];

              return (
                <TouchableOpacity
                  key={conv.id}
                  activeOpacity={0.7}
                  onPress={() => onOpenChat && onOpenChat(conv.patient)}
                  className="flex-row items-center mb-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
                >
                  {/* Avatar with Online Indicator */}
                  <View className="relative mr-4">
                    <View className="w-14 h-14 rounded-full overflow-hidden bg-blue-50 items-center justify-center border border-blue-100">
                      {!imageFailed ? (
                        <Image
                          source={{ uri: conv.patient.avatar }}
                          className="w-full h-full"
                          resizeMode="cover"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [conv.patient.id]: true }))
                          }
                        />
                      ) : (
                        <View className="w-full h-full items-center justify-center bg-blue-100">
                          <Text className="text-blue-600 font-bold text-lg">
                            {conv.patient.name.charAt(0)}
                          </Text>
                        </View>
                      )}
                    </View>
                    {conv.isOnline && (
                      <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </View>

                  {/* Message Info */}
                  <View className="flex-1 justify-center">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-gray-900 font-bold text-base">
                        {conv.patient.name}
                      </Text>
                      <Text className="text-gray-400 text-xs">{conv.lastMessageTime}</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <Text
                        numberOfLines={1}
                        className={`text-xs flex-1 mr-2 ${conv.unreadCount > 0
                            ? 'text-gray-900 font-semibold'
                            : 'text-gray-500'
                          }`}
                      >
                        {conv.lastMessage}
                      </Text>

                      {conv.unreadCount > 0 ? (
                        <View className="bg-blue-600 w-5 h-5 rounded-full items-center justify-center">
                          <Text className="text-white text-[10px] font-bold">
                            {conv.unreadCount}
                          </Text>
                        </View>
                      ) : (
                        <CheckCheck size={16} color="#9CA3AF" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View className="items-center justify-center py-16 bg-white/70 rounded-2xl mt-4 border border-gray-100">
              <MessageSquare size={40} color="#9CA3AF" />
              <Text className="text-gray-600 font-semibold text-base mt-3">
                No messages found
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Patients will appear here when they send a message
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation */}
        <DoctorHomeBottomNav
          activeTab="Messages"
          onHome={onHome}
          onAppointments={onAppointments}
          onPatients={onPatients}
          onMessages={() => { }}
          onProfile={onProfile}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorMessagesScreen;
