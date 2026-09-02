import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface DoctorNotesScreenProps {
  onBack?: () => void;
  onNext?: () => void; // Navigates to Diagnosis screen
}

export const DoctorNotesScreen: React.FC<DoctorNotesScreenProps> = ({
  onBack,
  onNext
}) => {
  const [symptoms, setSymptoms] = useState('Fever, headache, body pain for 2 days.');
  const [diagnosis, setDiagnosis] = useState('Viral Fever');
  const [doctorNotes, setDoctorNotes] = useState('Take rest and drink plenty of water. Avoid cold food.');

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <SafeAreaView className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 140 }}
          >
            {/* Header with Patient Info */}
            <View className="flex-row items-center mb-6">
              <TouchableOpacity
                onPress={onBack}
                className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
              >
                <ArrowLeft size={20} color="#111827" />
              </TouchableOpacity>
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3 overflow-hidden border-2 border-white shadow-sm">
                  <Text className="text-blue-700 font-bold text-lg">R</Text>
                </View>
                <View>
                  <Text className="text-gray-900 text-lg font-bold">Rahim Ahmed</Text>
                  <Text className="text-gray-500 text-sm">28 Years, Male</Text>
                </View>
              </View>
            </View>

            {/* Tabs Bar UI (Only Notes is active) */}
            <View className="flex-row border-b border-gray-200 mb-6">
              <View className="mr-6 pb-3 border-b-2 border-blue-600">
                <Text className="text-base font-semibold text-blue-600">Notes</Text>
              </View>
              <View className="mr-6 pb-3">
                <Text className="text-base font-semibold text-gray-400">Diagnosis</Text>
              </View>
              <View className="mr-6 pb-3">
                <Text className="text-base font-semibold text-gray-400">Prescription</Text>
              </View>
            </View>

            {/* Content for Notes Tab */}
            <View className="gap-5">
              <View>
                <Text className="text-gray-700 font-semibold mb-2">Symptoms</Text>
                <View className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <TextInput
                    value={symptoms}
                    onChangeText={setSymptoms}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    className="p-4 text-gray-900 text-sm"
                    placeholder="Enter symptoms..."
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-700 font-semibold mb-2">Diagnosis</Text>
                <View className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <TextInput
                    value={diagnosis}
                    onChangeText={setDiagnosis}
                    multiline
                    numberOfLines={2}
                    textAlignVertical="top"
                    className="p-4 text-gray-900 text-sm"
                    placeholder="Enter diagnosis..."
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-700 font-semibold mb-2">Doctor Notes</Text>
                <View className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <TextInput
                    value={doctorNotes}
                    onChangeText={setDoctorNotes}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    className="p-4 text-gray-900 text-sm"
                    placeholder="Enter notes for patient..."
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={onNext}
                className="w-full bg-blue-600 py-4 rounded-2xl items-center shadow-sm mt-4"
              >
                <Text className="text-white font-bold text-base">Save & Continue</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default DoctorNotesScreen;
