import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Video, Send } from 'lucide-react-native';
import { Doctor } from '../../data/doctors';

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  time: string;
}

interface ChatScreenProps {
  doctor: Doctor;
  onBack?: () => void;
}

const DEMO_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hello! আমি আপনার আগের রিপোর্ট দেখলাম।',
    sender: 'doctor',
    time: '10:00 AM',
  },
  {
    id: '2',
    text: 'ধন্যবাদ ডাক্তার। কোনো সমস্যা আছে কি?',
    sender: 'patient',
    time: '10:02 AM',
  },
  {
    id: '3',
    text: 'আপাতত সব ঠিক আছে। তবে নিয়মিত ওষুধ খেতে হবে।',
    sender: 'doctor',
    time: '10:04 AM',
  },
  {
    id: '4',
    text: 'ঠিক আছে, আমি খেয়াল রাখব।',
    sender: 'patient',
    time: '10:05 AM',
  },
  {
    id: '5',
    text: 'আপনার রিপোর্টটি দেখে নিন, সব ঠিক আছে। পরের সপ্তাহে একবার আসুন।',
    sender: 'doctor',
    time: '10:08 AM',
  },
];

export const ChatScreen: React.FC<ChatScreenProps> = ({ doctor, onBack }) => {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'patient',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Auto-reply from doctor after 1s (demo)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'ধন্যবাদ! আমি দেখব এবং জানাব।',
          sender: 'doctor',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isPatient = item.sender === 'patient';
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: isPatient ? 'flex-end' : 'flex-start',
          marginBottom: 10,
          paddingHorizontal: 16,
        }}
      >
        {/* Doctor avatar */}
        {!isPatient && (
          <Image
            source={{ uri: doctor.image }}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8, alignSelf: 'flex-end', backgroundColor: '#E5E7EB' }}
          />
        )}

        <View style={{ maxWidth: '72%' }}>
          <View
            style={{
              backgroundColor: isPatient ? '#2563EB' : 'rgba(255,255,255,0.95)',
              borderRadius: 18,
              borderBottomRightRadius: isPatient ? 4 : 18,
              borderBottomLeftRadius: isPatient ? 18 : 4,
              paddingHorizontal: 14,
              paddingVertical: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 14, color: isPatient ? 'white' : '#111827', lineHeight: 20 }}>
              {item.text}
            </Text>
          </View>
          <Text style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3, textAlign: isPatient ? 'right' : 'left', paddingHorizontal: 4 }}>
            {item.time}
          </Text>
        </View>

        {/* Patient avatar placeholder */}
        {isPatient && (
          <View style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 8, alignSelf: 'flex-end', backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#2563EB' }}>P</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
          }}>
            <TouchableOpacity onPress={onBack} style={{ padding: 4, marginRight: 10 }}>
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>

            {/* Doctor info */}
            <Image
              source={{ uri: doctor.image }}
              style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>{doctor.name}</Text>
              <Text style={{ fontSize: 12, color: '#22C55E', fontWeight: '500' }}>🟢 Online</Text>
            </View>

            {/* Action buttons */}
            <TouchableOpacity style={{ padding: 8, marginRight: 4, backgroundColor: '#EFF6FF', borderRadius: 10 }}>
              <Phone size={18} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8, backgroundColor: '#EFF6FF', borderRadius: 10 }}>
              <Video size={18} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Doctor specialty badge */}
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 4 }}>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>{doctor.specialty} · {doctor.hospital}</Text>
            </View>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Input Bar */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.97)',
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            paddingHorizontal: 16,
            paddingTop: 10,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 6 : 14,
            gap: 10,
          }}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message লিখুন..."
              placeholderTextColor="#9CA3AF"
              multiline
              style={{
                flex: 1,
                backgroundColor: '#F9FAFB',
                borderRadius: 22,
                paddingHorizontal: 16,
                paddingVertical: 10,
                fontSize: 14,
                color: '#111827',
                maxHeight: 100,
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: inputText.trim() ? '#2563EB' : '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.8}
            >
              <Send size={18} color={inputText.trim() ? 'white' : '#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChatScreen;

