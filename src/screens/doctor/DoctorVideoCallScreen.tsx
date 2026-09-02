import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, StatusBar } from 'react-native';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from 'lucide-react-native';

interface DoctorVideoCallScreenProps {
  onEndCall?: () => void;
}

export const DoctorVideoCallScreen: React.FC<DoctorVideoCallScreenProps> = ({
  onEndCall
}) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {/* Full-screen patient video (dummy) */}
      <View className="flex-1 items-center justify-center">
        {/* Patient avatar simulating video */}
        <View className="w-full h-full bg-gray-700 items-center justify-center">
          <View className="w-28 h-28 rounded-full bg-blue-200 items-center justify-center mb-4">
            <Text className="text-blue-700 text-5xl font-bold">R</Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-1">Rahim Ahmed</Text>
          <Text className="text-gray-400 text-sm">On Call...</Text>
        </View>
      </View>

      {/* Doctor's small preview (bottom right) */}
      <View
        className="absolute bg-gray-600 rounded-2xl overflow-hidden border-2 border-white"
        style={{ bottom: 120, right: 20, width: 90, height: 120 }}
      >
        <View className="flex-1 items-center justify-center">
          <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
            <Text className="text-gray-700 font-bold text-base">Dr</Text>
          </View>
        </View>
      </View>

      {/* Patient name & status overlay */}
      <SafeAreaView className="absolute top-0 left-0 right-0 px-5 pt-4 flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-blue-200 items-center justify-center mr-3">
          <Text className="text-blue-700 font-bold">R</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-base">Rahim Ahmed</Text>
          <Text className="text-green-400 text-xs font-medium">On Call</Text>
        </View>
        <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
          <Text className="text-white text-xs">⚙️</Text>
        </View>
      </SafeAreaView>

      {/* Control Buttons */}
      <View className="absolute bottom-10 left-0 right-0 flex-row justify-evenly items-center px-8 pb-4">
        {/* Microphone */}
        <TouchableOpacity
          onPress={() => setMicOn(!micOn)}
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: micOn ? '#374151' : '#6B7280' }}
        >
          {micOn ? <Mic size={24} color="white" /> : <MicOff size={24} color="white" />}
        </TouchableOpacity>

        {/* Camera */}
        <TouchableOpacity
          onPress={() => setCamOn(!camOn)}
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: camOn ? '#374151' : '#6B7280' }}
        >
          {camOn ? <Video size={24} color="white" /> : <VideoOff size={24} color="white" />}
        </TouchableOpacity>

        {/* End Call */}
        <TouchableOpacity
          onPress={onEndCall}
          className="w-16 h-16 rounded-full bg-red-600 items-center justify-center shadow-lg"
        >
          <PhoneOff size={28} color="white" />
        </TouchableOpacity>

        {/* Chat */}
        <TouchableOpacity
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: '#374151' }}
        >
          <MessageSquare size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorVideoCallScreen;
