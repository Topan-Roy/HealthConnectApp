import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ImageBackground } from 'react-native';

interface DoctorHomeScreenProps {
  onBack?: () => void;
  onLogout?: () => void;
}

export const DoctorHomeScreen: React.FC<DoctorHomeScreenProps> = ({ onBack, onLogout }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/role_bg.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 36, paddingBottom: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827' }}>Doctor Home</Text>
            <TouchableOpacity onPress={onBack}>
              <Text style={{ color: '#2563EB', fontWeight: '700' }}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 24, padding: 20, marginBottom: 18 }}>
            <Text style={{ fontSize: 14, color: '#475569' }}>Welcome</Text>
            <Text style={{ fontSize: 26, fontWeight: '800', color: '#111827', marginTop: 6 }}>Dr. Sarah Ahmed</Text>
            <Text style={{ fontSize: 14, color: '#2563EB', marginTop: 8 }}>Cardiology Specialist</Text>
          </View>

          <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 24, padding: 20, marginBottom: 18 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>Today Summary</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={{ fontSize: 12, color: '#475569' }}>Appointments</Text>
                <Text style={{ fontSize: 26, fontWeight: '800', color: '#111827' }}>24</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 12, color: '#475569' }}>Patients</Text>
                <Text style={{ fontSize: 26, fontWeight: '800', color: '#111827' }}>128</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={onLogout}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#2563EB',
              height: 56,
              borderRadius: 18,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DoctorHomeScreen;
