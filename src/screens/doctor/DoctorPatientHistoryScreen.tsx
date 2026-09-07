import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  FileText,
  Pill,
  Calendar,
} from 'lucide-react-native';
import { Patient } from '../../data/patients';

interface DoctorPatientHistoryScreenProps {
  patient: Patient;
  onBack?: () => void;
}

type TabType = 'Appointments' | 'Prescriptions' | 'Reports';

export const DoctorPatientHistoryScreen: React.FC<DoctorPatientHistoryScreenProps> = ({
  patient,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('Appointments');

  const tabs: TabType[] = ['Appointments', 'Prescriptions', 'Reports'];

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-4 pb-3">
          <TouchableOpacity
            onPress={onBack}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mr-4"
          >
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-xl font-bold">Patient Medical History</Text>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row px-6 border-b border-gray-200/70 mb-4 bg-white/40">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className="mr-7 pb-3 pt-2"
                style={{
                  borderBottomWidth: isActive ? 2.5 : 0,
                  borderBottomColor: '#2563EB',
                }}
              >
                <Text
                  className={`font-semibold text-sm ${isActive ? 'text-blue-600 font-bold' : 'text-gray-500'
                    }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content Area */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        >
          {/* APPOINTMENTS TAB */}
          {activeTab === 'Appointments' && (
            <View>
              {patient.appointmentHistory && patient.appointmentHistory.length > 0 ? (
                patient.appointmentHistory.map((item) => (
                  <View
                    key={item.id}
                    className="flex-row items-center justify-between p-4 mb-3.5 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    <View className="flex-1 pr-2">
                      <Text className="text-gray-900 font-bold text-base mb-1">
                        {item.date}
                      </Text>
                      <Text className="text-gray-500 text-sm">{item.condition}</Text>
                    </View>

                    <View className="flex-row items-center">
                      <Text
                        className={`font-semibold text-sm ${item.status === 'Completed'
                            ? 'text-emerald-600'
                            : item.status === 'Cancelled'
                              ? 'text-red-500'
                              : 'text-orange-500'
                          }`}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View className="items-center justify-center py-12 bg-white/70 rounded-2xl border border-gray-100">
                  <Calendar size={36} color="#9CA3AF" />
                  <Text className="text-gray-500 text-sm mt-2">
                    No appointment records found
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* PRESCRIPTIONS TAB */}
          {activeTab === 'Prescriptions' && (
            <View>
              {patient.prescriptions && patient.prescriptions.length > 0 ? (
                patient.prescriptions.map((p) => (
                  <View
                    key={p.id}
                    className="p-5 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    <View className="flex-row justify-between items-start mb-3 border-b border-gray-100 pb-3">
                      <View>
                        <Text className="text-gray-900 font-bold text-base">
                          {p.diagnosis}
                        </Text>
                        <Text className="text-gray-500 text-xs mt-0.5">{p.date}</Text>
                      </View>
                      <View className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        <Text className="text-blue-600 text-xs font-semibold">
                          {p.doctorName}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-gray-700 font-semibold text-xs uppercase tracking-wider mb-2">
                      Medications:
                    </Text>
                    {p.medicines.map((med, idx) => (
                      <View
                        key={idx}
                        className="flex-row items-start mb-2 bg-gray-50/80 p-2.5 rounded-xl"
                      >
                        <Pill size={16} color="#2563EB" style={{ marginTop: 2, marginRight: 8 }} />
                        <View className="flex-1">
                          <Text className="text-gray-900 font-bold text-sm">
                            {med.name}
                          </Text>
                          <Text className="text-gray-500 text-xs mt-0.5">
                            {med.dosage} • {med.duration}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ))
              ) : (
                <View className="items-center justify-center py-12 bg-white/70 rounded-2xl border border-gray-100">
                  <FileText size={36} color="#9CA3AF" />
                  <Text className="text-gray-500 text-sm mt-2">
                    No prescriptions found
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'Reports' && (
            <View>
              {patient.reports && patient.reports.length > 0 ? (
                patient.reports.map((r) => (
                  <View
                    key={r.id}
                    className="flex-row items-center justify-between p-4 mb-3.5 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    <View className="flex-row items-center flex-1 pr-3">
                      <View className="w-11 h-11 bg-blue-50 rounded-xl items-center justify-center mr-3.5 border border-blue-100">
                        <FileText size={20} color="#2563EB" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-900 font-bold text-sm mb-0.5">
                          {r.title}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                          {r.date} • {r.fileSize}
                        </Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <View className="bg-emerald-50 px-2.5 py-1 rounded-full mb-1 border border-emerald-100">
                        <Text className="text-emerald-600 text-xs font-semibold">
                          {r.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View className="items-center justify-center py-12 bg-white/70 rounded-2xl border border-gray-100">
                  <FileText size={36} color="#9CA3AF" />
                  <Text className="text-gray-500 text-sm mt-2">
                    No medical reports available
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorPatientHistoryScreen;
