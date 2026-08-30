import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';

interface DoctorProfessionalInfoScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const DoctorProfessionalInfoScreen: React.FC<DoctorProfessionalInfoScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [specialty, setSpecialty] = useState('Cardiology');
  const [qualification, setQualification] = useState('MBBS, MD (Cardiology)');
  const [experience, setExperience] = useState('8');
  const [fee, setFee] = useState('800');
  const [hospital, setHospital] = useState('Square Hospital, Dhaka');

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
          <View style={{ alignItems: 'center', marginBottom: 22 }}>
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
              Professional Information
            </Text>
          </View>

          <View style={{ gap: 18 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Specialization</Text>
              <TextInput
                value={specialty}
                onChangeText={setSpecialty}
                placeholder="Cardiology"
                style={{ backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56, fontSize: 15, color: '#111827' }}
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Qualification</Text>
              <TextInput
                value={qualification}
                onChangeText={setQualification}
                placeholder="MBBS, MD (Cardiology)"
                style={{ backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56, fontSize: 15, color: '#111827' }}
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Experience (Years)</Text>
              <TextInput
                value={experience}
                onChangeText={setExperience}
                keyboardType="numeric"
                placeholder="8"
                style={{ backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56, fontSize: 15, color: '#111827' }}
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Consultation Fee</Text>
              <TextInput
                value={fee}
                onChangeText={setFee}
                keyboardType="numeric"
                placeholder="800"
                style={{ backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56, fontSize: 15, color: '#111827' }}
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Hospital / Clinic</Text>
              <TextInput
                value={hospital}
                onChangeText={setHospital}
                placeholder="Square Hospital, Dhaka"
                style={{ backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56, fontSize: 15, color: '#111827' }}
              />
            </View>
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

export default DoctorProfessionalInfoScreen;
