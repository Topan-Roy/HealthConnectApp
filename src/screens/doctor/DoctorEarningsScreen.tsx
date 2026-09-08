import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Users,
  ChevronDown,
} from 'lucide-react-native';
import Svg, {
  Path,
  Circle,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface DoctorEarningsScreenProps {
  onBack: () => void;
  onViewTransactions: () => void;
}

export const DoctorEarningsScreen: React.FC<DoctorEarningsScreenProps> = ({
  onBack,
  onViewTransactions,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<'This Month' | 'This Week' | 'Last Month' | 'This Year'>('This Month');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // SVG Chart dimensions
  const chartWidth = SCREEN_WIDTH - 76;
  const chartHeight = 160;
  const paddingLeft = 38;
  const paddingBottom = 30;
  const paddingTop = 20;
  const usableWidth = chartWidth - paddingLeft - 15;
  const usableHeight = chartHeight - paddingTop - paddingBottom;

  // Chart data points: [xLabel, value] (values up to 10k)
  const dataPoints = [
    { label: '1 Aug', value: 2200 },
    { label: '10 Aug', value: 4500 },
    { label: '20 Aug', value: 3800 },
    { label: '29 Aug', value: 8900 },
  ];

  const maxValue = 10000;

  // Calculate coordinates
  const points = dataPoints.map((pt, idx) => {
    const x = paddingLeft + (idx / (dataPoints.length - 1)) * usableWidth;
    const y = paddingTop + usableHeight - (pt.value / maxValue) * usableHeight;
    return { ...pt, x, y };
  });

  // Construct SVG Path
  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    // Bezier control points for smooth line
    const prev = points[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  // Fill gradient path under curve
  const fillD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + usableHeight} L ${points[0].x} ${paddingTop + usableHeight} Z`;

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

          <Text className="text-[19px] font-bold text-gray-900">Earnings Dashboard</Text>

          <View className="w-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        >
          {/* Main Card (Screen 28) */}
          <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mt-2">
            {/* Period Selector Filter */}
            <View className="items-center mb-3">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowPeriodDropdown(!showPeriodDropdown)}
                className="flex-row items-center bg-slate-100 px-3.5 py-1.5 rounded-full"
              >
                <Text className="text-xs font-semibold text-gray-700 mr-1">
                  {selectedPeriod}
                </Text>
                <ChevronDown size={14} color="#4B5563" />
              </TouchableOpacity>

              {showPeriodDropdown && (
                <View className="mt-2 bg-white rounded-2xl p-2 shadow-lg border border-slate-200 w-44 z-50">
                  {(['This Week', 'This Month', 'Last Month', 'This Year'] as const).map((p) => (
                    <TouchableOpacity
                      key={p}
                      onPress={() => {
                        setSelectedPeriod(p);
                        setShowPeriodDropdown(false);
                      }}
                      className={`px-3 py-2 rounded-xl ${selectedPeriod === p ? 'bg-blue-50' : ''
                        }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${selectedPeriod === p ? 'text-blue-600' : 'text-gray-700'
                          }`}
                      >
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Big Total Earnings */}
            <View className="items-center mb-6">
              <Text className="text-4xl font-extrabold text-blue-600 tracking-tight">
                ৳48,500
              </Text>
              <Text className="text-sm font-medium text-gray-400 mt-1">
                Total Earnings
              </Text>
            </View>

            {/* 2 Metric Cards */}
            <View className="flex-row space-x-3 mb-6">
              {/* Card 1: Completed Appointments */}
              <View className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100 items-start">
                <Text className="text-2xl font-bold text-gray-900 mb-1">62</Text>
                <Text className="text-xs text-gray-500 leading-4">
                  Completed Appointments
                </Text>
              </View>

              {/* Card 2: This Week Earnings (Green accent) */}
              <View className="flex-1 bg-emerald-50/80 rounded-2xl p-4 border border-emerald-100 items-start">
                <Text className="text-2xl font-bold text-emerald-600 mb-1">
                  ৳4,800
                </Text>
                <Text className="text-xs text-emerald-800/80 leading-4">
                  This Week Earnings
                </Text>
              </View>
            </View>

            {/* Trend Chart Title */}
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Earnings Trend
              </Text>
              <View className="flex-row items-center">
                <ArrowUpRight size={14} color="#059669" />
                <Text className="text-xs font-bold text-emerald-600 ml-0.5">+18.5%</Text>
              </View>
            </View>

            {/* SVG Chart (exact match to image with 10k, 5k, 0 & points) */}
            <View className="bg-slate-50/60 rounded-2xl pt-2 pb-1 border border-slate-100 items-center justify-center">
              <Svg width={chartWidth} height={chartHeight}>
                <Defs>
                  <LinearGradient id="gradientEarnings" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <Stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </LinearGradient>
                </Defs>

                {/* Y-axis guide lines & labels */}
                {/* 10K */}
                <Line
                  x1={paddingLeft}
                  y1={paddingTop}
                  x2={chartWidth - 10}
                  y2={paddingTop}
                  stroke="#E2E8F0"
                  strokeDasharray="4, 4"
                  strokeWidth="1"
                />
                <SvgText
                  x={paddingLeft - 8}
                  y={paddingTop + 4}
                  fill="#94A3B8"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  10K
                </SvgText>

                {/* 5K */}
                <Line
                  x1={paddingLeft}
                  y1={paddingTop + usableHeight / 2}
                  x2={chartWidth - 10}
                  y2={paddingTop + usableHeight / 2}
                  stroke="#E2E8F0"
                  strokeDasharray="4, 4"
                  strokeWidth="1"
                />
                <SvgText
                  x={paddingLeft - 8}
                  y={paddingTop + usableHeight / 2 + 4}
                  fill="#94A3B8"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  5K
                </SvgText>

                {/* 0 */}
                <Line
                  x1={paddingLeft}
                  y1={paddingTop + usableHeight}
                  x2={chartWidth - 10}
                  y2={paddingTop + usableHeight}
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
                <SvgText
                  x={paddingLeft - 8}
                  y={paddingTop + usableHeight + 4}
                  fill="#94A3B8"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  0
                </SvgText>

                {/* Fill Area Gradient */}
                <Path d={fillD} fill="url(#gradientEarnings)" />

                {/* Blue Line Path */}
                <Path
                  d={pathD}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Circle Dots on Points */}
                {points.map((pt, idx) => (
                  <Circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={idx === points.length - 1 ? "5" : "4"}
                    fill="#FFFFFF"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                ))}

                {/* X-axis Labels */}
                {points.map((pt, idx) => (
                  <SvgText
                    key={`lbl-${idx}`}
                    x={pt.x}
                    y={chartHeight - 6}
                    fill="#64748B"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {pt.label}
                  </SvgText>
                ))}
              </Svg>
            </View>
          </View>

          {/* Breakdown summary */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-4 space-y-3">
            <Text className="text-sm font-bold text-gray-900">Earnings Summary</Text>

            <View className="flex-row justify-between py-2 border-b border-slate-100">
              <Text className="text-xs text-gray-500">Video Consultations (48)</Text>
              <Text className="text-xs font-bold text-gray-900">৳38,400</Text>
            </View>

            <View className="flex-row justify-between py-2 border-b border-slate-100">
              <Text className="text-xs text-gray-500">Follow-up Visits (14)</Text>
              <Text className="text-xs font-bold text-gray-900">৳7,000</Text>
            </View>

            <View className="flex-row justify-between py-2">
              <Text className="text-xs text-gray-500">Platform Referral Bonus</Text>
              <Text className="text-xs font-bold text-emerald-600">+৳3,100</Text>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Action Container according to phone model safe area */}
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
            onPress={onViewTransactions}
            className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <Text className="text-white font-bold text-base">View All Transactions</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DoctorEarningsScreen;
