import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Receipt,
  Download,
  Filter,
  CheckCircle2,
  X,
  Calendar,
  ArrowDownToLine,
  User,
} from 'lucide-react-native';

interface TransactionItem {
  id: string;
  date: string;
  patientName: string;
  fee: string;
  payout: string;
  service: string;
  status: 'Completed' | 'Pending';
}

const TRANSACTIONS_DATA: TransactionItem[] = [
  {
    id: 'TXN-101',
    date: '30 Aug',
    patientName: 'Rahim Ahmed',
    fee: '৳500',
    payout: '৳720',
    service: 'Video Consultation + ECG Review',
    status: 'Completed',
  },
  {
    id: 'TXN-102',
    date: '29 Aug',
    patientName: 'Karim Hasan',
    fee: '৳500',
    payout: '৳720',
    service: 'Cardiology Follow-up',
    status: 'Completed',
  },
  {
    id: 'TXN-103',
    date: '28 Aug',
    patientName: 'Nadia Rahman',
    fee: '৳500',
    payout: '৳720',
    service: 'General Consultation',
    status: 'Completed',
  },
  {
    id: 'TXN-104',
    date: '27 Aug',
    patientName: 'Farhana Islam',
    fee: '৳500',
    payout: '৳720',
    service: 'Hypertension Check & Advice',
    status: 'Completed',
  },
  {
    id: 'TXN-105',
    date: '26 Aug',
    patientName: 'Imran Hossain',
    fee: '৳500',
    payout: '৳720',
    service: 'Chest Pain Evaluation',
    status: 'Completed',
  },
  {
    id: 'TXN-106',
    date: '25 Aug',
    patientName: 'Tahmina Akter',
    fee: '৳500',
    payout: '৳720',
    service: 'Routine Heart Health Check',
    status: 'Completed',
  },
];

interface DoctorTransactionsScreenProps {
  onBack: () => void;
}

export const DoctorTransactionsScreen: React.FC<DoctorTransactionsScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'Transaction' | 'Prescriptions' | 'Reports' | 'Services'>('Transaction');
  const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);

  const tabs: ('Transaction' | 'Prescriptions' | 'Reports' | 'Services')[] = [
    'Transaction',
    'Prescriptions',
    'Reports',
    'Services',
  ];

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm border border-slate-200"
          >
            <ChevronLeft size={22} color="#1E293B" />
          </TouchableOpacity>

          <Text className="text-[18px] font-bold text-gray-900">
            Transaction / Payout History
          </Text>

          <View className="w-10" />
        </View>

        {/* Top Category Filter Tabs (from design Screen 29) */}
        <View className="px-5 my-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row bg-white/80 p-1.5 rounded-2xl border border-slate-200">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl mr-1 ${isActive ? 'bg-blue-600' : 'bg-transparent'
                      }`}
                  >
                    <Text
                      className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-500'
                        }`}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        >
          {/* Main Card (Screen 29) */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-2">
            {/* Table Header Row */}
            <View className="flex-row items-center justify-between pb-3 mb-2 border-b border-slate-100 px-1">
              <Text className="w-[18%] text-[11px] font-bold text-gray-400 uppercase">
                Date
              </Text>
              <Text className="w-[42%] text-[11px] font-bold text-gray-400 uppercase">
                Patient
              </Text>
              <Text className="w-[20%] text-[11px] font-bold text-gray-400 uppercase text-right">
                Fee
              </Text>
              <Text className="w-[20%] text-[11px] font-bold text-gray-400 uppercase text-right">
                Payout
              </Text>
            </View>

            {/* List Rows */}
            {TRANSACTIONS_DATA.map((item, index) => {
              const isLast = index === TRANSACTIONS_DATA.length - 1;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => setSelectedTxn(item)}
                >
                  <View className="flex-row items-center justify-between py-3.5 px-1">
                    {/* Date */}
                    <Text className="w-[18%] text-xs font-semibold text-gray-500">
                      {item.date}
                    </Text>

                    {/* Patient */}
                    <View className="w-[42%] pr-2">
                      <Text
                        className="text-[13px] font-bold text-gray-900"
                        numberOfLines={1}
                      >
                        {item.patientName}
                      </Text>
                      <Text
                        className="text-[10px] text-gray-400"
                        numberOfLines={1}
                      >
                        {item.service}
                      </Text>
                    </View>

                    {/* Fee */}
                    <Text className="w-[20%] text-xs font-medium text-gray-500 text-right">
                      {item.fee}
                    </Text>

                    {/* Payout */}
                    <Text className="w-[20%] text-[13px] font-bold text-emerald-600 text-right">
                      {item.payout}
                    </Text>
                  </View>

                  {!isLast && <View className="h-[1px] bg-slate-50" />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Payout summary stats */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-4 flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-semibold text-gray-500">
                Available for Withdrawal
              </Text>
              <Text className="text-2xl font-black text-gray-900 mt-0.5">
                ৳32,400
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Alert.alert('Payout Request', 'Payout request of ৳32,400 sent to admin for verification.')}
              className="bg-emerald-600 px-4 py-2.5 rounded-xl shadow-sm"
            >
              <Text className="text-white font-bold text-xs">Request Payout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Fixed Bottom Action: View All Transactions adapted to phone model */}
        <View
          style={{
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : (Platform.OS === 'android' ? 24 : 16),
            paddingTop: 12,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            borderTopWidth: 1,
            borderTopColor: '#F1F5F9',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => Alert.alert('All Transactions', 'Showing complete ledger history.')}
            className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <Text className="text-white font-bold text-base">View All Transactions</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Detail Modal */}
        <Modal
          visible={!!selectedTxn}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedTxn(null)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center px-5">
            <View className="bg-white w-full rounded-3xl p-6 shadow-xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-gray-900">Transaction Receipt</Text>
                <TouchableOpacity onPress={() => setSelectedTxn(null)}>
                  <X size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              {selectedTxn && (
                <View className="space-y-3">
                  <View className="bg-blue-50 rounded-2xl p-4 items-center mb-3">
                    <Text className="text-xs text-blue-600 font-semibold mb-1">
                      Doctor Net Payout
                    </Text>
                    <Text className="text-3xl font-black text-blue-700">
                      {selectedTxn.payout}
                    </Text>
                    <View className="flex-row items-center mt-2 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 size={12} color="#059669" />
                      <Text className="text-[11px] font-bold text-emerald-700 ml-1">
                        Settled & Credited
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                    <Text className="text-xs text-gray-500">Transaction ID</Text>
                    <Text className="text-xs font-bold text-gray-900">{selectedTxn.id}</Text>
                  </View>

                  <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                    <Text className="text-xs text-gray-500">Patient Name</Text>
                    <Text className="text-xs font-bold text-gray-900">{selectedTxn.patientName}</Text>
                  </View>

                  <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                    <Text className="text-xs text-gray-500">Date</Text>
                    <Text className="text-xs font-bold text-gray-900">{selectedTxn.date}, 2026</Text>
                  </View>

                  <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                    <Text className="text-xs text-gray-500">Base Consultation Fee</Text>
                    <Text className="text-xs font-bold text-gray-900">{selectedTxn.fee}</Text>
                  </View>

                  <View className="flex-row justify-between py-1.5">
                    <Text className="text-xs text-gray-500">Service Detail</Text>
                    <Text className="text-xs font-medium text-gray-700">{selectedTxn.service}</Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      setSelectedTxn(null);
                      Alert.alert('Invoice Downloaded', 'PDF invoice saved to device.');
                    }}
                    className="w-full bg-slate-900 py-3 rounded-xl flex-row items-center justify-center mt-4"
                  >
                    <ArrowDownToLine size={16} color="#FFFFFF" />
                    <Text className="text-white font-bold text-xs ml-2">Download Invoice PDF</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorTransactionsScreen;
