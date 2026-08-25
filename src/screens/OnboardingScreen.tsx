import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const { width } = Dimensions.get('window');

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Find the Right Doctor',
      subtitle: 'Search and connect with trusted doctors near you.',
      image: require('../../assets/image1.png'),
      buttonText: 'Next',
    },
    {
      id: 2,
      title: 'Book Appointments Easily',
      subtitle: 'Choose your preferred date and time without waiting.',
      image: require('../../assets/image2.png'),
      buttonText: 'Next',
    },
    {
      id: 3,
      title: 'Manage Your Health',
      subtitle: 'Keep appointments, prescriptions and medical records in one place.',
      image: require('../../assets/image3.png'),
      buttonText: 'Get Started',
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Top Bar with Skip */}
      <View style={{ height: 48, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 24 }}>
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={onComplete} activeOpacity={0.7} style={{ padding: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#6B7280' }}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 40 }}>
        {/* Image Container */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <Image
            source={currentSlide.image}
            style={{
              width: Math.min(width - 48, 300),
              height: 280,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Text Details */}
        <View style={{ alignItems: 'center', paddingHorizontal: 16, marginBottom: 32 }}>
          <Text style={{ fontSize: 26, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 12 }}>
            {currentSlide.title}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#6B7280', textAlign: 'center', lineHeight: 22 }}>
            {currentSlide.subtitle}
          </Text>
        </View>

        {/* Bottom Actions: Primary Button + Pagination Dots */}
        <View style={{ width: '100%' }}>
          {/* Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#2563EB',
              height: 56,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 4,
              marginBottom: 28,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF' }}>
              {currentSlide.buttonText}
            </Text>
          </TouchableOpacity>

          {/* Dots Indicator */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            {slides.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentIndex(index)}
                style={{
                  width: currentIndex === index ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: currentIndex === index ? '#2563EB' : '#E5E7EB',
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
