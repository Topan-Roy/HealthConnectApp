import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

interface DoctorVerificationDocumentsScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const DoctorVerificationDocumentsScreen: React.FC<DoctorVerificationDocumentsScreenProps> = ({
  onBack,
  onContinue,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 }}>
          <View style={{ alignItems: 'center', marginBottom: 18 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 24,
                backgroundColor: '#EFF6FF',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Image
                source={require('../../../assets/logo.png')}
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
              />
            </View>

            <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', textAlign: 'center' }}>
              Verification Documents
            </Text>
            <Text style={{ fontSize: 15, color: '#48494dff', marginTop: 6, textAlign: 'center' }}>
              Please upload the following documents
            </Text>
          </View>

          <View style={{ gap: 16 }}>
            {[
              'NID / Passport',
              'Medical License',
              'Degree Certificate',
              'Profile Photo',
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 15, color: '#111827', fontWeight: '600' }}>{item}</Text>
                <Text style={{ fontSize: 12, color: '#10B981', fontWeight: '700' }}>Uploaded</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={onContinue}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#2563EB',
              height: 56,
              borderRadius: 18,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 28,
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF' }}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={{ alignItems: 'center', marginTop: 18 }}>
            <Text style={{ fontSize: 14, color: '#2563EB', fontWeight: '700' }}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DoctorVerificationDocumentsScreen;
