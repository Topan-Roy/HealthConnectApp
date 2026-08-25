import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import { Languages, ChevronRight } from 'lucide-react-native';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { BackButton } from '../components/common/BackButton';

interface RoleSelectionScreenProps {
  onBack: () => void;
  onSelectRole: (role: 'patient' | 'doctor') => void;
}

// Patient Avatar SVG
const PatientAvatarSVG: React.FC = () => (
  <Svg width={70} height={70} viewBox="0 0 70 70" fill="none">
    <Circle cx="35" cy="35" r="35" fill="#DBEAFE" />
    <G transform="translate(10, 8)">
      {/* Female head & hair */}
      <Circle cx="25" cy="18" r="11" fill="#FCA5A5" />
      <Path d="M14 18C14 8 19 4 25 4C31 4 36 8 36 18C36 22 32 16 25 16C18 16 14 22 14 18Z" fill="#047857" />
      {/* Clothes */}
      <Path d="M8 46 C8 32 14 30 25 30 C36 30 42 32 42 46 Z" fill="#0D9488" />
    </G>
  </Svg>
);

// Doctor Avatar SVG
const DoctorAvatarSVG: React.FC = () => (
  <Svg width={70} height={70} viewBox="0 0 70 70" fill="none">
    <Circle cx="35" cy="35" r="35" fill="#DBEAFE" />
    <G transform="translate(10, 8)">
      {/* Male Doctor head & hair */}
      <Circle cx="25" cy="18" r="11" fill="#FED7AA" />
      <Path d="M14 18C14 8 19 4 25 4C31 4 36 8 36 18C36 22 32 15 25 15C18 15 14 22 14 18Z" fill="#1E293B" />
      {/* Doctor Coat & Stethoscope */}
      <Path d="M8 46 L25 30 L42 46 Z" fill="#FFFFFF" />
      <Path d="M20 30 Q25 40 30 30" stroke="#2563EB" strokeWidth="3" fill="none" />
      <Path d="M12 46 L25 32 L38 46 Z" fill="#2563EB" opacity={0.8} />
    </G>
  </Svg>
);

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onBack,
  onSelectRole,
}) => {
  useEffect(() => {
    const handleHardwareBack = () => {
      onBack();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);
    return () => subscription.remove();
  }, [onBack]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 12,
        }}
      >


      </View>

      {/* Center Heading */}
      <View style={{ alignItems: 'center', marginTop: 32, marginBottom: 40, paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 30, fontWeight: '800', color: '#111827', textAlign: 'center' }}>
          I am a
        </Text>
        <Text style={{ fontSize: 15, color: '#6B7280', marginTop: 8, textAlign: 'center' }}>
          Select your role to continue
        </Text>
      </View>

      {/* Role Cards Container */}
      <View style={{ paddingHorizontal: 20, gap: 20 }}>
        {/* Patient Card */}
        <TouchableOpacity
          onPress={() => onSelectRole('patient')}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#EFF6FF',
            borderRadius: 24,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: '#BFDBFE',
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <PatientAvatarSVG />

          <View style={{ flex: 1, marginLeft: 16, marginRight: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1E3A8A' }}>Patient</Text>
            <Text style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 18 }}>
              Book appointments and manage your health
            </Text>
          </View>

          <ChevronRight size={22} color="#2563EB" />
        </TouchableOpacity>

        {/* Doctor Card */}
        <TouchableOpacity
          onPress={() => onSelectRole('doctor')}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#EFF6FF',
            borderRadius: 24,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: '#BFDBFE',
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <DoctorAvatarSVG />

          <View style={{ flex: 1, marginLeft: 16, marginRight: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1E3A8A' }}>Doctor</Text>
            <Text style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 18 }}>
              Manage patients and appointments
            </Text>
          </View>

          <ChevronRight size={22} color="#2563EB" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
