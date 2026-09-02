import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface DoctorConsultationNotesScreenProps {
  onBack?: () => void;
  onSaveAndContinue?: () => void;
}

export const DoctorConsultationNotesScreen: React.FC<DoctorConsultationNotesScreenProps> = ({
  onBack,
  onSaveAndContinue
}) => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [symptoms, setSymptoms] = useState('Fever, headache, body pain for 2 days.');
  const [diagnosis, setDiagnosis] = useState('Viral Fever');
  const [doctorNotes, setDoctorNotes] = useState('Take rest and drink plenty of water. Avoid cold food.');
  const [prescription, setPrescription] = useState('');

  const tabs = ['Notes', 'Diagnosis', 'Prescription'];

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
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={onBack}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
            >
              <ArrowLeft size={20} color="#111827" />
            </TouchableOpacity>
            <View>
              <Text className="text-gray-900 text-lg font-bold">Rahim Ahmed</Text>
              <Text className="text-gray-500 text-sm">28 Years, Male</Text>
            </View>
          </View>

          {/* Tabs */}
          <View className="flex-row bg-gray-100 rounded-xl p-1 mb-6">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg items-center ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
              >
                <Text className={`text-sm font-semibold ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notes Tab */}
          {activeTab === 'Notes' && (
            <View className="gap-5">
              <View>
                <Text className="text-gray-700 font-semibold mb-2">Symptoms</Text>
                <View className="bg-white rounded-xl border border-gray-200 shadow-sm">
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
                <View className="bg-white rounded-xl border border-gray-200 shadow-sm">
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
                <View className="bg-white rounded-xl border border-gray-200 shadow-sm">
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
            </View>
          )}

          {/* Diagnosis Tab */}
          {activeTab === 'Diagnosis' && (
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Primary Diagnosis</Text>
              <View className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
                <TextInput
                  value={diagnosis}
                  onChangeText={setDiagnosis}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  className="p-4 text-gray-900 text-sm"
                  placeholder="Enter primary diagnosis..."
                />
              </View>
              <Text className="text-gray-500 text-sm mt-2">
                Diagnosis: {diagnosis || 'Not set'}
              </Text>
            </View>
          )}

          {/* Prescription Tab */}
          {activeTab === 'Prescription' && (
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Prescription</Text>
              <View className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
                <TextInput
                  value={prescription}
                  onChangeText={setPrescription}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  className="p-4 text-gray-900 text-sm min-h-[150px]"
                  placeholder="e.g., Paracetamol 500mg - 3 times a day for 5 days..."
                />
              </View>
            </View>
          )}

          {/* Save & Continue Button */}
          <TouchableOpacity
            onPress={onSaveAndContinue}
            className="w-full bg-blue-600 py-4 rounded-xl items-center shadow-sm mt-8"
          >
            <Text className="text-white font-bold text-base">Save & Continue</Text>
          </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default DoctorConsultationNotesScreen;
