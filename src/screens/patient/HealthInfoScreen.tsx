import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  ImageBackground, TextInput, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Droplets, Activity, Scale, Ruler, Cigarette, Wine } from 'lucide-react-native';

interface HealthInfoScreenProps {
  onBack?: () => void;
}

export const HealthInfoScreen: React.FC<HealthInfoScreenProps> = ({ onBack }) => {
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [weight, setWeight] = useState('72 kg');
  const [height, setHeight] = useState('175 cm');
  const [allergies, setAllergies] = useState('None');
  const [conditions, setConditions] = useState('None');
  const [smoking, setSmoking] = useState('No');
  const [alcohol, setAlcohol] = useState('No');

  const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];

  const basicFields = [
    { label: 'Weight', value: weight, setter: setWeight, icon: Scale, placeholder: 'e.g. 72 kg' },
    { label: 'Height', value: height, setter: setHeight, icon: Ruler, placeholder: 'e.g. 175 cm' },
    { label: 'Allergies', value: allergies, setter: setAllergies, icon: Activity, placeholder: 'List any allergies' },
    { label: 'Medical Conditions', value: conditions, setter: setConditions, icon: Activity, placeholder: 'e.g. Diabetes, Hypertension' },
  ];

  return (
    <ImageBackground source={require('../../../assets/role_bg.jpg')} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Health Information</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Blood Group */}
          <View style={styles.card}>
            <View style={styles.sectionRow}>
              <Droplets size={18} color="#EF4444" />
              <Text style={styles.sectionTitle}>Blood Group</Text>
            </View>
            <View style={styles.bloodGrid}>
              {BLOOD_GROUPS.map((bg) => (
                <TouchableOpacity
                  key={bg}
                  onPress={() => setBloodGroup(bg)}
                  style={[styles.bloodChip, bloodGroup === bg && styles.bloodChipActive]}
                >
                  <Text style={[styles.bloodChipText, bloodGroup === bg && styles.bloodChipTextActive]}>{bg}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Basic fields */}
          <View style={styles.card}>
            {basicFields.map((f, i) => {
              const IconComp = f.icon;
              return (
                <View key={i} style={[styles.fieldWrap, i < basicFields.length - 1 && styles.fieldBorder]}>
                  <Text style={styles.fieldLabel}>{f.label}</Text>
                  <TextInput
                    value={f.value}
                    onChangeText={f.setter}
                    placeholder={f.placeholder}
                    placeholderTextColor="#9CA3AF"
                    style={styles.fieldInput}
                  />
                </View>
              );
            })}
          </View>

          {/* Lifestyle */}
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { marginBottom: 12, color: '#374151' }]}>Lifestyle</Text>

            {/* Smoking */}
            <View style={[styles.fieldWrap, styles.fieldBorder]}>
              <View style={styles.lifestyleRow}>
                <Cigarette size={16} color="#6B7280" />
                <Text style={styles.lifestyleLabel}>Smoking</Text>
              </View>
              <View style={styles.toggleRow}>
                {['No', 'Occasionally', 'Yes'].map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => setSmoking(opt)}
                    style={[styles.toggleChip, smoking === opt && styles.toggleChipActive]}
                  >
                    <Text style={[styles.toggleText, smoking === opt && styles.toggleTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Alcohol */}
            <View style={styles.fieldWrap}>
              <View style={styles.lifestyleRow}>
                <Wine size={16} color="#6B7280" />
                <Text style={styles.lifestyleLabel}>Alcohol</Text>
              </View>
              <View style={styles.toggleRow}>
                {['No', 'Occasionally', 'Yes'].map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => setAlcohol(opt)}
                    style={[styles.toggleChip, alcohol === opt && styles.toggleChipActive]}
                  >
                    <Text style={[styles.toggleText, alcohol === opt && styles.toggleTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: { padding: 6, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.85)' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 4,
    marginBottom: 16,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#374151' },
  bloodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  bloodChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1.5, borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  bloodChipActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  bloodChipText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  bloodChipTextActive: { color: '#fff' },
  fieldWrap: { paddingVertical: 12 },
  fieldBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  fieldLabel: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginBottom: 4, textTransform: 'uppercase' },
  fieldInput: { fontSize: 15, color: '#111827', fontWeight: '500' },
  lifestyleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  lifestyleLabel: { fontSize: 14, fontWeight: '600', color: '#374151' },
  toggleRow: { flexDirection: 'row', gap: 8 },
  toggleChip: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 16, borderWidth: 1.5, borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  toggleChipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  toggleText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  toggleTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: '#2563EB', borderRadius: 16,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default HealthInfoScreen;
