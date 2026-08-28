import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  ImageBackground, TextInput, StyleSheet, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';

interface PersonalInfoScreenProps {
  onBack?: () => void;
}

export const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({ onBack }) => {
  const [name, setName] = useState('Topan Roy');
  const [phone, setPhone] = useState('+880 1712-345678');
  const [email, setEmail] = useState('topanroy@gmail.com');
  const [dob, setDob] = useState('12 Jan 1995');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('Dhaka, Bangladesh');

  const fields = [
    { label: 'Full Name', value: name, setter: setName, placeholder: 'Enter full name' },
    { label: 'Phone Number', value: phone, setter: setPhone, placeholder: 'Enter phone number' },
    { label: 'Email Address', value: email, setter: setEmail, placeholder: 'Enter email' },
    { label: 'Date of Birth', value: dob, setter: setDob, placeholder: 'DD MMM YYYY' },
    { label: 'Gender', value: gender, setter: setGender, placeholder: 'Male / Female' },
    { label: 'Address', value: address, setter: setAddress, placeholder: 'Enter address' },
  ];

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.flex}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Information</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Avatar edit */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=TopanRoy&backgroundColor=b6e3f4&radius=50' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraBtn}>
                <Camera size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.avatarHint}>Tap to change photo</Text>
          </View>

          {/* Fields */}
          <View style={styles.card}>
            {fields.map((f, i) => (
              <View key={i} style={[styles.fieldWrap, i < fields.length - 1 && styles.fieldBorder]}>
                <Text style={styles.fieldLabel}>{f.label}</Text>
                <TextInput
                  value={f.value}
                  onChangeText={f.setter}
                  placeholder={f.placeholder}
                  placeholderTextColor="#9CA3AF"
                  style={styles.fieldInput}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: { padding: 6, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.85)' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginVertical: 20 },
  avatarWrap: { width: 88, height: 88, borderRadius: 44, overflow: 'visible', position: 'relative' },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#EFF6FF' },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#2563EB', width: 26, height: 26,
    borderRadius: 13, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  avatarHint: { fontSize: 12, color: '#6B7280', marginTop: 8 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 4,
    marginBottom: 20,
  },
  fieldWrap: { paddingVertical: 14 },
  fieldBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  fieldLabel: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginBottom: 4, textTransform: 'uppercase' },
  fieldInput: { fontSize: 15, color: '#111827', fontWeight: '500' },
  saveBtn: {
    backgroundColor: '#2563EB', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default PersonalInfoScreen;
