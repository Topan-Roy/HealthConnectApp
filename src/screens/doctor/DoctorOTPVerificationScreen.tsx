import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';

interface DoctorOTPVerificationScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
}

export const DoctorOTPVerificationScreen: React.FC<DoctorOTPVerificationScreenProps> = ({
  onBack,
  onVerifySuccess,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
          <Text style={{ fontSize: 30, fontWeight: '800', color: '#111827', marginBottom: 10 }}>
            Verify Your Phone
          </Text>
          <Text style={{ fontSize: 15, color: '#48494dff', marginBottom: 30 }}>
            We sent a 6-digit code to +880 1712-345678
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={{
                  width: 44,
                  height: 56,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: '#CBD5E1',
                  backgroundColor: '#FFFFFF',
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: '700',
                  color: '#111827',
                }}
              />
            ))}
          </View>

          <Text style={{ fontSize: 13, color: '#475569', textAlign: 'center', marginBottom: 24 }}>
            Resend code in <Text style={{ fontWeight: '700', color: '#2563EB' }}>00:25</Text>
          </Text>

          <TouchableOpacity
            onPress={onVerifySuccess}
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
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF' }}>Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: '#2563EB', fontWeight: '700' }}>Change Phone Number</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DoctorOTPVerificationScreen;
