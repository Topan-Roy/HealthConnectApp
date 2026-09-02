import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Plus, X } from 'lucide-react-native';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
}

interface DoctorDiagnosisScreenProps {
  onBack?: () => void;
  onNext?: () => void; // Navigates to Prescription preview screen
}

export const DoctorDiagnosisScreen: React.FC<DoctorDiagnosisScreenProps> = ({
  onBack,
  onNext
}) => {
  const [diagnosis, setDiagnosis] = useState('Viral Fever');
  const [showDropdown, setShowDropdown] = useState(false);
  const [advice, setAdvice] = useState('Take rest and drink plenty of water. Avoid cold food.');
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: 'Paracetamol 500mg', dosage: '1 - 1 - 1 × 5 Days' },
    { id: 2, name: 'Vitamin C 500mg', dosage: '1 - 0 - 1 × 5 Days' },
  ]);

  const diagnosisOptions = ['Viral Fever', 'Hypertension', 'Diabetes', 'Acidity', 'Migraine', 'Other'];

  const removeMedicine = (id: number) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const addMedicine = () => {
    setMedicines([...medicines, { id: Date.now(), name: 'New Medicine', dosage: '1 - 0 - 1 × 3 Days' }]);
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
            {/* Header (No avatar, just title) */}
            <View className="flex-row items-center mb-6">
              <TouchableOpacity
                onPress={onBack}
                className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
              >
                <ArrowLeft size={20} color="#111827" />
              </TouchableOpacity>
              <Text className="text-gray-900 text-xl font-bold">Diagnosis</Text>
            </View>

            {/* Diagnosis Dropdown */}
            <View className="mb-6 relative" style={{ zIndex: 20 }}>
              <TouchableOpacity
                onPress={() => setShowDropdown(!showDropdown)}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex-row justify-between items-center shadow-sm"
              >
                <Text className="text-gray-900 text-base">{diagnosis}</Text>
                <Text className="text-gray-400 text-base">▾</Text>
              </TouchableOpacity>

              {showDropdown && (
                <View className="absolute top-[60px] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-md py-2 z-30">
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

            {/* Medicines List */}
            <View className="mb-6" style={{ zIndex: 10 }}>
              <Text className="text-gray-700 font-semibold mb-3">Medicines</Text>
              <View className="gap-3">
                {medicines.map((med) => (
                  <View
                    key={med.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center flex-1">
                      <View className="w-10 h-10 bg-green-50 rounded-xl items-center justify-center mr-3 border border-green-100">
                        <Text className="text-green-600 text-lg">💊</Text>
                      </View>
                      <View>
                        <Text className="text-gray-900 font-bold text-sm">{med.name}</Text>
                        <Text className="text-gray-500 text-xs mt-1">{med.dosage}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeMedicine(med.id)}
                      className="p-2"
                    >
                      <X size={18} color="#EF4444" />
                    </TouchableOpacity>
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

            {/* Advice Text Area */}
            <View className="mb-6">
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

            {/* Save Prescription Button */}
            <TouchableOpacity
              onPress={onNext}
              className="w-full bg-blue-600 py-4 rounded-2xl items-center shadow-sm mt-4"
            >
              <Text className="text-white font-bold text-base">Save Prescription</Text>
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default DoctorDiagnosisScreen;
