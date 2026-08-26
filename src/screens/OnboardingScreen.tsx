import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, BackHandler, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../components/common/BackButton';

interface OnboardingScreenProps {
  onComplete: () => void;
  onBack?: () => void;
}

const { width } = Dimensions.get('window');

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleHardwareBack = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        return true;
      } else if (onBack) {
        onBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => subscription.remove();
  }, [currentIndex, onBack]);

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

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/role_bg.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      {/* Top Bar with Skip */}
      <View
        style={{
          height: 48,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={onComplete} activeOpacity={0.7} style={{ padding: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#48494dff' }}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 40 }}>
        {/* Image Container — white glass card */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              borderRadius: 32,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 20,
              elevation: 6,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            <Image
              source={currentSlide.image}
              style={{
                width: Math.min(width - 100, 260),
                height: 240,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        {/* Text Details — glass card */}
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 24,
            paddingHorizontal: 24,
            paddingVertical: 20,
            marginBottom: 24,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: 8 }}>
            {currentSlide.title}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#374151', textAlign: 'center', lineHeight: 22 }}>
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
                  backgroundColor: currentIndex === index ? '#2563EB' : 'rgba(255,255,255,0.7)',
                }}
              />
            ))}
          </View>
        </View>
      </View>
      </SafeAreaView>
    </View>
  );
};
