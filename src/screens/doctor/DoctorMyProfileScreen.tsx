import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Star,
  Edit3,
  Calendar,
  DollarSign,
  Receipt,
  MessageSquare,
  Settings,
  ChevronRight,
  GraduationCap,
  Building2,
  Banknote,
  Globe,
  Award,
} from 'lucide-react-native';
import { DoctorHomeBottomNav } from '../../components/doctor-home/DoctorHomeBottomNav';

export interface DoctorProfileData {
  name: string;
  specialty: string;
  degrees: string;
  experience: string;
  hospital: string;
  consultationFee: string;
  languages: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
}

export const INITIAL_DOCTOR_PROFILE: DoctorProfileData = {
  name: 'Dr. Sarah Ahmed',
  specialty: 'Cardiologist',
  degrees: 'MBBS, MD (Cardiology)',
  experience: '6 Years Exp.',
  hospital: 'Square Hospital, Dhaka',
  consultationFee: '500',
  languages: 'English, Bengali',
  rating: 4.8,
  reviewsCount: 124,
  avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
};

interface DoctorMyProfileScreenProps {
  doctorProfile?: DoctorProfileData;
  onEditProfile: () => void;
  onAvailabilitySchedule: () => void;
  onEarnings: () => void;
  onTransactions: () => void;
  onReviews: () => void;
  onSettings: () => void;
  onHome: () => void;
  onAppointments: () => void;
  onPatients: () => void;
  onMessages: () => void;
}

export const DoctorMyProfileScreen: React.FC<DoctorMyProfileScreenProps> = ({
  doctorProfile = INITIAL_DOCTOR_PROFILE,
  onEditProfile,
  onAvailabilitySchedule,
  onEarnings,
  onTransactions,
  onReviews,
  onSettings,
  onHome,
  onAppointments,
  onPatients,
  onMessages,
}) => {
  const [imgError, setImgError] = useState(false);
  const insets = useSafeAreaInsets();
  const bottomScrollPadding = 80 + (insets.bottom > 0 ? insets.bottom + 20 : (Platform.OS === 'android' ? 36 : 24));

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <View className="items-center pt-3 pb-2 px-6">
          <Text className="text-[20px] font-bold text-gray-900">Profile & Schedule</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: bottomScrollPadding }}
        >
          {/* Main Doctor Profile Card (Screen 31) */}
          <View className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50/80 items-center mt-2 mb-4">
            {/* Avatar */}
            <View className="relative mb-3">
              <View className="w-24 h-24 rounded-full bg-blue-50 overflow-hidden border-2 border-blue-500/20 items-center justify-center shadow-sm">
                {!imgError ? (
                  <Image
                    source={{ uri: doctorProfile.avatarUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <Award size={46} color="#2563EB" />
                )}
              </View>
              <View className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
            </View>

            {/* Name & Specialty */}
            <Text className="text-xl font-bold text-gray-900 text-center mb-0.5">
              {doctorProfile.name}
            </Text>
            <Text className="text-sm font-semibold text-blue-600 mb-2">
              {doctorProfile.specialty}
            </Text>

            {/* Rating Pill - Clickable to Reviews */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onReviews}
              className="flex-row items-center bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/60 mb-5"
            >
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-sm font-bold text-amber-900 ml-1.5">
                {doctorProfile.rating}
              </Text>
              <Text className="text-xs text-amber-700 ml-1 font-medium">
                ({doctorProfile.reviewsCount} Reviews)
              </Text>
              <ChevronRight size={14} color="#D97706" style={{ marginLeft: 3 }} />
            </TouchableOpacity>

            {/* Info details box */}
            <View className="w-full bg-slate-50/90 rounded-2xl p-4 border border-slate-100 space-y-2.5 mb-5">
              <View className="flex-row items-center">
                <GraduationCap size={17} color="#4B5563" />
                <Text className="text-[13px] text-gray-700 font-medium ml-2.5 flex-1">
                  {doctorProfile.degrees} • {doctorProfile.experience}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Building2 size={17} color="#4B5563" />
                <Text className="text-[13px] text-gray-700 font-medium ml-2.5 flex-1">
                  {doctorProfile.hospital}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Banknote size={17} color="#4B5563" />
                <Text className="text-[13px] text-gray-700 font-medium ml-2.5 flex-1">
                  Consultation Fee: <Text className="font-bold text-gray-900">৳{doctorProfile.consultationFee}</Text>
                </Text>
              </View>

              <View className="flex-row items-center">
                <Globe size={17} color="#4B5563" />
                <Text className="text-[13px] text-gray-700 font-medium ml-2.5 flex-1">
                  Languages: {doctorProfile.languages}
                </Text>
              </View>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onEditProfile}
              className="w-full bg-blue-600 py-3.5 rounded-2xl flex-row items-center justify-center shadow-sm shadow-blue-500/30"
            >
              <Edit3 size={17} color="#FFFFFF" />
              <Text className="text-white font-semibold text-base ml-2">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Quick Hub Links */}
          <View className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 mb-6">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
              Practice & Earnings
            </Text>

            {/* Availability & Schedule */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onAvailabilitySchedule}
              className="flex-row items-center p-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100"
            >
              <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mr-3">
                <Calendar size={20} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-gray-900">Availability & Schedule</Text>
                <Text className="text-xs text-gray-500">Manage time slots and working hours</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 mx-3 my-1" />

            {/* Earnings Dashboard */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onEarnings}
              className="flex-row items-center p-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100"
            >
              <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center mr-3">
                <DollarSign size={20} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-gray-900">Earnings Dashboard</Text>
                <Text className="text-xs text-gray-500">View monthly income and graphs</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 mx-3 my-1" />

            {/* Transactions / Payouts */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onTransactions}
              className="flex-row items-center p-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100"
            >
              <View className="w-10 h-10 rounded-xl bg-indigo-50 items-center justify-center mr-3">
                <Receipt size={20} color="#6366F1" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-gray-900">Transaction & Payout History</Text>
                <Text className="text-xs text-gray-500">Patient receipts and fee statements</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 mx-3 my-1" />

            {/* Reviews */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onReviews}
              className="flex-row items-center p-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100"
            >
              <View className="w-10 h-10 rounded-xl bg-amber-50 items-center justify-center mr-3">
                <MessageSquare size={20} color="#D97706" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-gray-900">My Reviews</Text>
                <Text className="text-xs text-gray-500">4.8 Rating • 124 patient feedback</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <View className="h-[1px] bg-slate-100 mx-3 my-1" />

            {/* Settings */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onSettings}
              className="flex-row items-center p-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100"
            >
              <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center mr-3">
                <Settings size={20} color="#4B5563" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-gray-900">Settings</Text>
                <Text className="text-xs text-gray-500">Account, notifications, security & app info</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <DoctorHomeBottomNav
          activeTab="Profile"
          onHome={onHome}
          onAppointments={onAppointments}
          onPatients={onPatients}
          onMessages={onMessages}
          onProfile={() => {}}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorMyProfileScreen;
