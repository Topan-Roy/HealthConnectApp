import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface OTPVerificationScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
  phoneNumber?: string;
}

const LockIcon: React.FC = () => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={11} width={18} height={11} rx={2} stroke="#2563EB" strokeWidth={2} />
    <Path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      stroke="#2563EB"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={16} r={1.5} fill="#2563EB" />
  </Svg>
);

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  onBack,
  onVerifySuccess,
  phoneNumber = '+880 1XXXXXXXXX',
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(45);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const formatTimer = (s: number) => `00:${s.toString().padStart(2, '0')}`;

  const isComplete = otp.every(d => d !== '');

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 48 }}>

            {/* Icon Badge */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: '#EFF6FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#2563EB',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <LockIcon />
              </View>
            </View>

            {/* Title */}
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '700',
                  color: '#111827',
                  letterSpacing: -0.5,
                }}
              >
                Verify your phone
              </Text>
            </View>

            {/* Subtitle */}
            <View style={{ alignItems: 'center', marginBottom: 36 }}>
              <Text style={{ fontSize: 14, color: '#48494dff', textAlign: 'center', lineHeight: 22 }}>
                Enter the 6-digit code sent to
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#2563EB', marginTop: 4 }}>
                {phoneNumber}
              </Text>
            </View>

            {/* OTP Input Boxes */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 }}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => { inputRefs.current[index] = ref; }}
                  value={digit}
                  onChangeText={text => handleOtpChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={{
                    width: 48,
                    height: 56,
                    borderWidth: 2,
                    borderColor: digit ? '#2563EB' : '#E5E7EB',
                    borderRadius: 12,
                    fontSize: 22,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: '#111827',
                    backgroundColor: digit ? '#EFF6FF' : '#F9FAFB',
                  }}
                />
              ))}
            </View>

            {/* Resend Timer */}
            <View style={{ alignItems: 'center', marginBottom: 36 }}>
              {canResend ? (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={{ fontSize: 14, color: '#2563EB', fontWeight: '600' }}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={{ fontSize: 14, color: '#48494dff' }}>
                  Resend code in{' '}
                  <Text style={{ color: '#2563EB', fontWeight: '600' }}>
                    {formatTimer(timer)}
                  </Text>
                </Text>
              )}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              onPress={onVerifySuccess}
              disabled={!isComplete}
              activeOpacity={0.85}
              style={{
                backgroundColor: isComplete ? '#2563EB' : '#93C5FD',
                borderRadius: 14,
                paddingVertical: 16,
                alignItems: 'center',
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isComplete ? 0.35 : 0,
                shadowRadius: 14,
                elevation: isComplete ? 8 : 0,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 }}>
                Verify
              </Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
