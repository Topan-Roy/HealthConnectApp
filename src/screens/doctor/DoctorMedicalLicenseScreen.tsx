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

interface DoctorMedicalLicenseScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const DoctorMedicalLicenseScreen: React.FC<DoctorMedicalLicenseScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [licenseNumber, setLicenseNumber] = useState('DC-12345');
  const [documentName, setDocumentName] = useState('NID / Passport');

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
              Medical License
            </Text>
            <Text style={{ fontSize: 15, color: '#48494dff', marginTop: 6, textAlign: 'center' }}>
              Add your medical license details
            </Text>
          </View>

          <View style={{ gap: 18 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>License Number</Text>
              <TextInput
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                placeholder="DC-12345"
                style={{ backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', paddingHorizontal: 16, height: 56, fontSize: 15, color: '#111827' }}
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>Uploaded License Document</Text>
              <View style={{ backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', padding: 16 }}>
                <Text style={{ fontSize: 14, color: '#475569' }}>{documentName}</Text>
              </View>
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

export default DoctorMedicalLicenseScreen;
