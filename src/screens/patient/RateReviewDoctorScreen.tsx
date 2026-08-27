import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star } from 'lucide-react-native';

interface RateReviewDoctorScreenProps {
  doctorName?: string;
  onBack?: () => void;
  onSubmitReview?: () => void;
}

export const RateReviewDoctorScreen: React.FC<RateReviewDoctorScreenProps> = ({
  doctorName = 'Dr. Sarah Ahmed',
  onBack,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  return (
    <ImageBackground
      source={require('../../../assets/role_bg.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
        <View className="flex-row items-center px-4 pt-4 mb-8">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2 mr-4">
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Rate Your Experience
          </Text>
          
          <Text className="text-base text-gray-600 mb-6">
            How was your consultation with{"\n"}<Text className="font-bold text-gray-900">{doctorName}?</Text>
          </Text>

          {/* Star Rating */}
          <View className="flex-row gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Star
                  size={44}
                  color={star <= rating ? "#2563EB" : "#D1D5DB"}
                  fill={star <= rating ? "#2563EB" : "none"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Text Input */}
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Write a review (optional)
          </Text>
          <View className="bg-white rounded-2xl border border-gray-200 p-4 h-40 shadow-sm mb-2">
            <TextInput
              placeholder="Very professional and helpful doctor..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              className="flex-1 text-base text-gray-900"
              value={review}
              onChangeText={setReview}
              maxLength={500}
            />
          </View>
          <Text className="text-xs text-gray-400 text-right">
            {review.length}/500
          </Text>
        </ScrollView>

        {/* Submit Button */}
        <View className="px-6 pb-8 pt-4">
          <TouchableOpacity
            onPress={onSubmitReview}
            className="bg-blue-600 rounded-2xl py-4 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Submit Review</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};
