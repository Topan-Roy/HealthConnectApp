import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, FileText, Calendar, Stethoscope, ShieldCheck } from 'lucide-react-native';

const REPORTS = [
  {
    id: 1,
    name: 'Blood Test Report',
    type: 'Laboratory',
    date: '12 Aug 2026',
    doctor: 'Dr. Rahman',
    status: 'Normal',
  },
  {
    id: 2,
    name: 'ECG Report',
    type: 'Cardiology',
    date: '18 Aug 2026',
    doctor: 'Dr. Nabila',
    status: 'Reviewed',
  },
  {
    id: 3,
    name: 'X-Ray Report',
    type: 'Radiology',
    date: '25 Jul 2026',
    doctor: 'Dr. Tania',
    status: 'Normal',
  },
  {
    id: 4,
    name: 'Prescription Summary',
    type: 'Clinical',
    date: '05 Aug 2026',
    doctor: 'Dr. Hasan',
    status: 'Updated',
  },
  {
    id: 5,
    name: 'Vitamin D Check',
    type: 'Wellness',
    date: '02 Sep 2026',
    doctor: 'Dr. Rahman',
    status: 'Pending',
  },
];

interface ReportsScreenProps {
  onBack?: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return REPORTS;

    return REPORTS.filter(
      (report) =>
        report.name.toLowerCase().includes(query) ||
        report.doctor.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4">
          <View className="flex-row items-center justify-between mt-5 mb-4">
            <TouchableOpacity onPress={onBack} className="p-2 -ml-2" activeOpacity={0.7}>
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">Reports</Text>
            <View className="w-8" />
          </View>

          <View className="flex-row items-center bg-white/80 rounded-2xl px-4 py-3 border border-gray-200 mb-5">
            <Search size={20} color="#6B7280" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search reports..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-base text-gray-900"
            />
          </View>

          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-700">
              {filteredReports.length} reports
            </Text>
            <TouchableOpacity className="rounded-full bg-blue-600 px-3 py-1.5">
              <Text className="text-xs font-semibold text-white">Upload</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
            {filteredReports.length === 0 ? (
              <View className="bg-white/75 rounded-3xl p-6 items-center border border-dashed border-gray-300">
                <FileText size={32} color="#2563EB" />
                <Text className="mt-3 text-base font-bold text-gray-800">No report found</Text>
                <Text className="mt-1 text-sm text-gray-500 text-center">
                  Try searching by report name or doctor.
                </Text>
              </View>
            ) : (
              filteredReports.map((report) => (
                <View
                  key={report.id}
                  className="bg-white/80 rounded-3xl p-4 mb-3 border border-gray-200 shadow-sm"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-2xl bg-blue-50 items-center justify-center mr-3">
                        <FileText size={20} color="#2563EB" />
                      </View>
                      <View>
                        <Text className="text-base font-bold text-gray-900">{report.name}</Text>
                        <Text className="text-xs text-gray-500">{report.type}</Text>
                      </View>
                    </View>
                    <Text
                      className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                        report.status === 'Normal' || report.status === 'Reviewed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : report.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {report.status}
                    </Text>
                  </View>

                  <View className="flex-row items-center mb-2">
                    <Calendar size={14} color="#3B82F6" />
                    <Text className="ml-2 text-sm text-gray-700">Date: {report.date}</Text>
                  </View>

                  <View className="flex-row items-center mb-2">
                    <Stethoscope size={14} color="#3B82F6" />
                    <Text className="ml-2 text-sm text-gray-700">Doctor: {report.doctor}</Text>
                  </View>

                  <View className="flex-row items-center">
                    <ShieldCheck size={14} color="#3B82F6" />
                    <Text className="ml-2 text-sm text-gray-700">Record available</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ReportsScreen;
