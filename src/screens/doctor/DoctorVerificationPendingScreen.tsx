import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';

interface DoctorVerificationPendingScreenProps {
  onBackToHome?: () => void;
  onGoToLogin?: () => void;
}

export const DoctorVerificationPendingScreen: React.FC<DoctorVerificationPendingScreenProps> = ({
  onBackToHome,
  onGoToLogin,
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

        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 }}>
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', textAlign: 'center' }}>
              Application Submitted!
            </Text>
            <Text style={{ fontSize: 15, color: '#475569', marginTop: 10, textAlign: 'center', lineHeight: 22 }}>
              Your doctor profile has been submitted for verification.
            </Text>
          </View>

          <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 18, marginBottom: 26 }}>
            <Text style={{ fontSize: 14, color: '#475569', textAlign: 'center', lineHeight: 22 }}>
              Our admin team will review your documents and notify you once your account is approved.
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={onGoToLogin}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#2563EB',
                height: 56,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 4,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF' }}>Go to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onBackToHome} style={{ alignItems: 'center', marginTop: 18 }}>
              <Text style={{ fontSize: 14, color: '#2563EB', fontWeight: '700' }}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DoctorVerificationPendingScreen;
