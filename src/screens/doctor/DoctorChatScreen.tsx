import React, { useState, useRef, useEffect } from 'react';
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
  Alert,
  Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Video, Send, CheckCheck, Paperclip } from 'lucide-react-native';
import { Patient } from '../../data/patients';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'doctor' | 'patient';
  time: string;
}

interface DoctorChatScreenProps {
  patient: Patient;
  onBack?: () => void;
  onVideoCall?: () => void;
}

const QUICK_RESPONSES = [
  'নিয়মিত ওষুধ খেয়ে যাবেন 💊',
  'প্রচুর পানি পান করবেন 💧',
  'আগামী সপ্তাহে ফলো-আপে আসুন 📅',
  'রিপোর্টটি শেয়ার করুন 📄',
];

export const DoctorChatScreen: React.FC<DoctorChatScreenProps> = ({
  patient,
  onBack,
  onVideoCall,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `আসসালামু আলাইকুম ডাক্তার, আমি ${patient.name}।`,
      sender: 'patient',
      time: '10:00 AM',
    },
    {
      id: '2',
      text: 'ওয়ালাইকুম আসসালাম। আপনি কেমন আছেন এখন? ওষুধের পর কোনো পরিবর্তন হয়েছে কি?',
      sender: 'doctor',
      time: '10:02 AM',
    },
    {
      id: '3',
      text: 'জি ডাক্তার, ওষুধ খাওয়ার পর কিছুটা সুস্থ বোধ করছি, তবে হালকা মাথা ব্যথা আছে।',
      sender: 'patient',
      time: '10:05 AM',
    },
    {
      id: '4',
      text: 'ঠিক আছে। পর্যাপ্ত বিশ্রাম নিন এবং বেশি করে তরল খাবার গ্রহণ করুন।',
      sender: 'doctor',
      time: '10:08 AM',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const [imageError, setImageError] = useState(false);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const sendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'doctor',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Patient auto-acknowledgement after 1.2s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'ধন্যবাদ ডাক্তার, আপনার পরামর্শ অনুযায়ী চলব।',
          sender: 'patient',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handlePhoneCall = () => {
    Alert.alert('Calling Patient', `Dialing ${patient.phone}...`, [{ text: 'OK' }]);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isDoctor = item.sender === 'doctor';

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: isDoctor ? 'flex-end' : 'flex-start',
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        {!isDoctor && (
          <View className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 mr-2 self-end mb-1 border border-blue-200">
            {!imageError ? (
              <Image source={{ uri: patient.avatar }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <Text className="text-blue-600 font-bold text-xs">{patient.name.charAt(0)}</Text>
              </View>
            )}
          </View>
        )}

        <View
          style={{
            maxWidth: '75%',
            backgroundColor: isDoctor ? '#2563EB' : '#FFFFFF',
            borderRadius: 20,
            borderBottomRightRadius: isDoctor ? 4 : 20,
            borderBottomLeftRadius: isDoctor ? 20 : 4,
            paddingHorizontal: 16,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 1,
            borderWidth: isDoctor ? 0 : 1,
            borderColor: '#F3F4F6',
          }}
        >
          <Text
            style={{
              color: isDoctor ? '#FFFFFF' : '#1F2937',
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {item.text}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 4,
              gap: 3,
            }}
          >
            <Text
              style={{
                color: isDoctor ? 'rgba(255,255,255,0.7)' : '#9CA3AF',
                fontSize: 10,
              }}
            >
              {item.time}
            </Text>
            {isDoctor && <CheckCheck size={13} color="rgba(255,255,255,0.8)" />}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {/* Chat Header */}
          <View className="flex-row items-center justify-between px-4 py-3 bg-white/90 border-b border-gray-100 shadow-sm">
            <View className="flex-row items-center flex-1">
              <TouchableOpacity onPress={onBack} className="p-1 mr-2">
                <ArrowLeft size={22} color="#111827" />
              </TouchableOpacity>

              {/* Patient Avatar & Status */}
              <View className="relative mr-3">
                <View className="w-10 h-10 rounded-full overflow-hidden bg-blue-50 border border-blue-100">
                  {!imageError ? (
                    <Image
                      source={{ uri: patient.avatar }}
                      className="w-full h-full"
                      resizeMode="cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <View className="w-full h-full items-center justify-center bg-blue-100">
                      <Text className="text-blue-600 font-bold text-sm">{patient.name.charAt(0)}</Text>
                    </View>
                  )}
                </View>
                <View className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
              </View>

              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-base" numberOfLines={1}>
                  {patient.name}
                </Text>
                <Text className="text-gray-500 text-xs font-medium">
                  Online • {patient.age} Y, {patient.gender}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row items-center gap-1.5">
              <TouchableOpacity
                onPress={handlePhoneCall}
                className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center border border-blue-100"
              >
                <Phone size={17} color="#2563EB" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onVideoCall}
                className="w-9 h-9 rounded-full bg-blue-600 items-center justify-center shadow-sm"
              >
                <Video size={17} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />

          {/* Quick clinical replies */}
          <View className="px-3 pb-2">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              data={QUICK_RESPONSES}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => sendMessage(item)}
                  className="bg-white/90 border border-blue-100 rounded-full px-3 py-1.5 mr-2 shadow-xs"
                >
                  <Text className="text-blue-700 text-xs font-medium">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Input Box */}
          <View
            style={{
              paddingBottom: isKeyboardVisible ? 10 : Math.max(insets.bottom, 12),
              paddingTop: 8,
              paddingHorizontal: 14,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderTopWidth: 1,
              borderTopColor: '#F3F4F6',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => Alert.alert('Attachment', 'Attach prescription or medical report to patient.')}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            >
              <Paperclip size={18} color="#6B7280" />
            </TouchableOpacity>

            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#F9FAFB',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 24,
                paddingHorizontal: 16,
                paddingVertical: 10,
                fontSize: 14,
                color: '#111827',
                maxHeight: 100,
              }}
              placeholder="Write a message to patient..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
              returnKeyType="send"
              onSubmitEditing={() => sendMessage()}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => sendMessage()}
              disabled={!inputText.trim()}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: inputText.trim() ? '#2563EB' : '#93C5FD',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={18} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorChatScreen;
