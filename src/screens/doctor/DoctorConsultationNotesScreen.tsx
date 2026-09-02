import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Plus, X } from 'lucide-react-native';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
}

interface DoctorConsultationNotesScreenProps {
  onBack?: () => void;
  onSaveAndContinue?: () => void;
}

export const DoctorConsultationNotesScreen: React.FC<DoctorConsultationNotesScreenProps> = ({
  onBack,
  onSaveAndContinue
}) => {
  const [activeTab, setActiveTab] = useState('Notes');
  
  // Notes Tab State
  const [symptoms, setSymptoms] = useState('Fever, headache, body pain for 2 days.');
  const [diagnosis, setDiagnosis] = useState('Viral Fever');
  const [doctorNotes, setDoctorNotes] = useState('Take rest and drink plenty of water. Avoid cold food.');

  // Diagnosis Tab State
  const [showDropdown, setShowDropdown] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: 'Paracetamol 500mg', dosage: '1 - 1 - 1 × 5 Days' },
  ]);
  const [advice, setAdvice] = useState('Take rest and drink plenty of water. Avoid cold food.');

  const diagnosisOptions = ['Viral Fever', 'Hypertension', 'Diabetes', 'Acidity', 'Migraine', 'Other'];
  const tabs = ['Notes', 'Diagnosis', 'Prescription'];

  const addMedicine = () => {
    setMedicines([...medicines, { id: Date.now(), name: '', dosage: '' }]);
  };

  const removeMedicine = (id: number) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const updateMedicine = (id: number, field: 'name' | 'dosage', value: string) => {
    setMedicines(medicines.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

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

            {/* Tabs Bar UI */}
            <View className="flex-row border-b border-gray-200 mb-6">
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`mr-6 pb-3 ${activeTab === tab ? 'border-b-2 border-blue-600' : ''}`}
                >
                  <Text className={`text-base font-semibold ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ======== NOTES TAB ======== */}
            {activeTab === 'Notes' && (
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
                  onPress={onSaveAndContinue}
                  className="w-full bg-blue-600 py-4 rounded-2xl items-center shadow-sm mt-4"
                >
                  <Text className="text-white font-bold text-base">Save & Continue</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ======== DIAGNOSIS TAB ======== */}
            {activeTab === 'Diagnosis' && (
              <View className="gap-5">
                {/* Diagnosis Dropdown */}
                <View className="relative z-20">
                  <Text className="text-gray-700 font-semibold mb-2">Primary Diagnosis</Text>
                  <TouchableOpacity
                    onPress={() => setShowDropdown(!showDropdown)}
                    className="bg-white border border-gray-200 rounded-2xl p-4 flex-row justify-between items-center shadow-sm"
                  >
                    <Text className="text-gray-900 text-base">{diagnosis}</Text>
                    <Text className="text-gray-400 text-base">▾</Text>
                  </TouchableOpacity>

                  {showDropdown && (
                    <View className="absolute top-[80px] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-md py-2 z-30">
                      {diagnosisOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          onPress={() => { setDiagnosis(option); setShowDropdown(false); }}
                          className="p-3 px-4 border-b border-gray-100"
                        >
                          <Text className="text-gray-800">{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Editable Medicines List */}
                <View className="z-10">
                  <Text className="text-gray-700 font-semibold mb-3">Medicines</Text>
                  <View className="gap-4">
                    {medicines.map((med) => (
                      <View
                        key={med.id}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4"
                      >
                        <View className="flex-row justify-between items-start mb-2">
                          <View className="flex-row items-center flex-1">
                            <View className="w-8 h-8 bg-green-50 rounded-lg items-center justify-center mr-3 border border-green-100">
                              <Text className="text-green-600 text-sm">💊</Text>
                            </View>
                            <TextInput
                              value={med.name}
                              onChangeText={(val) => updateMedicine(med.id, 'name', val)}
                              className="flex-1 text-gray-900 font-bold text-sm border-b border-gray-100 pb-1 mr-2"
                              placeholder="Medicine Name (e.g., Paracetamol)"
                              placeholderTextColor="#9CA3AF"
                            />
                          </View>
                          <TouchableOpacity onPress={() => removeMedicine(med.id)} className="p-1">
                            <X size={18} color="#EF4444" />
                          </TouchableOpacity>
                        </View>
                        
                        <View className="ml-11">
                          <TextInput
                            value={med.dosage}
                            onChangeText={(val) => updateMedicine(med.id, 'dosage', val)}
                            className="text-gray-600 text-xs border-b border-gray-100 pb-1"
                            placeholder="Dosage (e.g., 1 - 1 - 1 × 5 Days)"
                            placeholderTextColor="#9CA3AF"
                          />
                        </View>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    onPress={addMedicine}
                    className="flex-row items-center justify-center mt-4 py-3 border border-dashed border-blue-400 rounded-2xl bg-blue-50/50"
                  >
                    <Plus size={18} color="#2563EB" />
                    <Text className="text-blue-600 font-semibold text-sm ml-2">Add Medicine</Text>
                  </TouchableOpacity>
                </View>

                {/* Advice */}
                <View>
                  <Text className="text-gray-700 font-semibold mb-2">Advices</Text>
                  <View className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <TextInput
                      value={advice}
                      onChangeText={setAdvice}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                      className="p-4 text-gray-900 text-sm"
                      placeholder="Enter advice..."
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setActiveTab('Prescription')}
                  className="w-full bg-blue-600 py-4 rounded-2xl items-center shadow-sm mt-4"
                >
                  <Text className="text-white font-bold text-base">Save Prescription</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ======== PRESCRIPTION TAB ======== */}
            {activeTab === 'Prescription' && (
              <View className="gap-5">
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <View className="flex-row items-center border-b border-gray-100 pb-4 mb-4">
                    <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                      <Text className="text-blue-700 font-bold text-lg">Dr</Text>
                    </View>
                    <View>
                      <Text className="text-gray-900 font-bold text-base">Dr. Sarah Ahmed</Text>
                      <Text className="text-gray-500 text-sm">Cardiologist</Text>
                    </View>
                  </View>

                  <View className="mb-4 border-b border-gray-100 pb-4">
                    <Text className="text-gray-500 text-xs font-semibold mb-1 uppercase">Diagnosis</Text>
                    <Text className="text-gray-900 font-semibold">{diagnosis}</Text>
                  </View>

                  <View className="mb-4 border-b border-gray-100 pb-4">
                    <Text className="text-gray-500 text-xs font-semibold mb-2 uppercase">Medicines</Text>
                    {medicines.map((med, idx) => (
                      <View key={idx} className="mb-2">
                        <Text className="text-gray-900 text-sm font-semibold">• {med.name || 'Unnamed Medicine'}</Text>
                        <Text className="text-gray-500 text-xs ml-3">{med.dosage || 'No dosage specified'}</Text>
                      </View>
                    ))}
                  </View>

                  <View>
                    <Text className="text-gray-500 text-xs font-semibold mb-1 uppercase">Advice</Text>
                    <Text className="text-gray-900 text-sm">{advice}</Text>
                  </View>
                </View>

                <View className="flex-row mt-2 gap-3">
                  <TouchableOpacity
                    onPress={() => setActiveTab('Diagnosis')}
                    className="flex-1 border-2 border-blue-600 py-4 rounded-2xl items-center bg-white shadow-sm"
                  >
                    <Text className="text-blue-600 font-bold text-base">✏  Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onSaveAndContinue}
                    className="flex-1 bg-green-600 py-4 rounded-2xl items-center shadow-sm"
                  >
                    <Text className="text-white font-bold text-base">Send to Patient</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default DoctorConsultationNotesScreen;
