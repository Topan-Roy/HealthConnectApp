import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Star, ThumbsUp, MessageSquare, CheckCircle } from 'lucide-react-native';

interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Rahim Ahmed',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '30 Aug 2026',
    comment: 'Dr. Sarah was extremely patient and diagnosed my cardiac issues promptly. The advice she gave for cholesterol control worked wonders.',
    verified: true,
  },
  {
    id: 'r2',
    name: 'Nadia Rahman',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '28 Aug 2026',
    comment: 'Very polite doctor and clear explanations. She answered all my questions regarding medication side effects with patience.',
    verified: true,
  },
  {
    id: 'r3',
    name: 'Karim Hasan',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
    rating: 4,
    date: '22 Aug 2026',
    comment: 'Great consultation experience. Minor wait time in the app queue, but the consultation quality was 10/10.',
    verified: true,
  },
  {
    id: 'r4',
    name: 'Farhana Islam',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '18 Aug 2026',
    comment: 'She is the best cardiologist in Square hospital. Highly recommended for ECG and heart pressure issues.',
    verified: true,
  },
];

interface DoctorReviewsScreenProps {
  onBack: () => void;
}

export const DoctorReviewsScreen: React.FC<DoctorReviewsScreenProps> = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | '5 Star' | '4 Star' | 'Recent'>('All');

  // Rating Breakdown exact numbers from design
  const ratingBreakdown = [
    { stars: 5, count: 98, percent: 98 / 124 },
    { stars: 4, count: 18, percent: 18 / 124 },
    { stars: 3, count: 5, percent: 5 / 124 },
    { stars: 2, count: 2, percent: 2 / 124 },
    { stars: 1, count: 1, percent: 1 / 124 },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm border border-slate-200"
          >
            <ChevronLeft size={22} color="#1E293B" />
          </TouchableOpacity>

          <Text className="text-[19px] font-bold text-gray-900">My Reviews</Text>

          <View className="w-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110 }}
        >
          {/* Main Card (Screen 30) */}
          <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mt-2">
            {/* Big Rating & Stars */}
            <View className="items-center mb-6">
              <Text className="text-5xl font-extrabold text-gray-900 mb-2">4.8</Text>

              <View className="flex-row items-center space-x-1.5 mb-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={22}
                    color="#F59E0B"
                    fill="#F59E0B"
                    style={{ marginHorizontal: 2 }}
                  />
                ))}
              </View>

              <Text className="text-xs font-semibold text-gray-400">
                (124 Reviews)
              </Text>
            </View>

            {/* Rating Breakdown Bars */}
            <View className="space-y-2.5">
              {ratingBreakdown.map((row) => (
                <View key={row.stars} className="flex-row items-center">
                  {/* Star Label */}
                  <Text className="text-xs font-semibold text-gray-700 w-12">
                    {row.stars} Star
                  </Text>

                  {/* Progress Bar */}
                  <View className="flex-1 h-2.5 bg-slate-100 rounded-full mx-3 overflow-hidden">
                    <View
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${Math.round(row.percent * 100)}%` }}
                    />
                  </View>

                  {/* Count Number */}
                  <Text className="text-xs font-bold text-gray-900 w-6 text-right">
                    {row.count}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Filter Pills */}
          <View className="flex-row space-x-2 my-4">
            {(['All', '5 Star', '4 Star', 'Recent'] as const).map((f) => (
              <TouchableOpacity
                key={f}
                activeOpacity={0.8}
                onPress={() => setSelectedFilter(f)}
                className={`px-4 py-2 rounded-xl border ${selectedFilter === f
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-slate-200'
                  }`}
              >
                <Text
                  className={`text-xs font-bold ${selectedFilter === f ? 'text-white' : 'text-gray-600'
                    }`}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Reviews List */}
          <View className="space-y-3">
            {REVIEWS_DATA.map((rev) => (
              <View
                key={rev.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
              >
                {/* Reviewer Header */}
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: rev.avatar }}
                      className="w-10 h-10 rounded-full bg-slate-100"
                    />
                    <View className="ml-3">
                      <View className="flex-row items-center">
                        <Text className="text-sm font-bold text-gray-900">
                          {rev.name}
                        </Text>
                        {rev.verified && (
                          <CheckCircle size={13} color="#2563EB" style={{ marginLeft: 4 }} />
                        )}
                      </View>
                      <Text className="text-[11px] text-gray-400">{rev.date}</Text>
                    </View>
                  </View>

                  {/* Rating Stars */}
                  <View className="flex-row items-center bg-amber-50 px-2 py-0.5 rounded-lg">
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text className="text-xs font-bold text-amber-900 ml-1">
                      {rev.rating}.0
                    </Text>
                  </View>
                </View>

                {/* Comment Text */}
                <Text className="text-xs text-gray-600 leading-5">
                  {rev.comment}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* View All Reviews Primary Button */}
        <View className="absolute bottom-6 left-5 right-5">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => Alert.alert('All Reviews', 'Showing all 124 patient reviews.')}
            className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <Text className="text-white font-bold text-base">View All Reviews</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorReviewsScreen;
