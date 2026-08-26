import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface ProfileSetupScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const TOTAL_STEPS = 5;

// Step Indicator
const StepIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <View style={{ alignItems: 'center', marginBottom: 6 }}>
    <Text style={{ fontSize: 12, color: '#48494dff', fontWeight: '500' }}>
      Step {current} of {total}
    </Text>
    <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            height: 4,
            width: i < current ? 28 : 16,
            borderRadius: 2,
            backgroundColor: i < current ? '#2563EB' : '#E5E7EB',
          }}
        />
      ))}
    </View>
  </View>
);

// Styled Input
const StyledInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  keyboardType?: any;
}> = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          borderWidth: 1.5,
          borderColor: focused ? '#2563EB' : '#E5E7EB',
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 13,
          fontSize: 15,
          color: '#111827',
          backgroundColor: focused ? '#EFF6FF' : '#F9FAFB',
        }}
      />
    </View>
  );
};

// Dropdown (simulated)
const StyledDropdown: React.FC<{
  label: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
}> = ({ label, value, options, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
        style={{
          borderWidth: 1.5,
          borderColor: open ? '#2563EB' : '#E5E7EB',
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 13,
          backgroundColor: open ? '#EFF6FF' : '#F9FAFB',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 15, color: value ? '#111827' : '#9CA3AF' }}>
          {value || `Select ${label.toLowerCase()}`}
        </Text>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <Path d="M6 9l6 6 6-6" stroke="#48494dff" strokeWidth={2} strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>
      {open && (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            marginTop: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
            zIndex: 999,
          }}
        >
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              onPress={() => { onSelect(opt); setOpen(false); }}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
              }}
            >
              <Text style={{ fontSize: 14, color: '#374151' }}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Gender Radio
const GenderRadio: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Gender</Text>
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {['Male', 'Female', 'Other'].map(g => (
        <TouchableOpacity
          key={g}
          onPress={() => onChange(g)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: value === g ? '#2563EB' : '#D1D5DB',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {value === g && (
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' }} />
            )}
          </View>
          <Text style={{ fontSize: 14, color: '#374151' }}>{g}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// Step 1: Personal Info
const Step1: React.FC<{ data: any; setData: (d: any) => void }> = ({ data, setData }) => (
  <View>
    <StyledInput
      label="Full Name"
      value={data.fullName}
      onChangeText={v => setData({ ...data, fullName: v })}
      placeholder="Enter your full name"
    />
    <StyledInput
      label="Date of Birth"
      value={data.dob}
      onChangeText={v => setData({ ...data, dob: v })}
      placeholder="Select your date of birth"
    />
    <GenderRadio value={data.gender} onChange={v => setData({ ...data, gender: v })} />
    <StyledInput
      label="Phone Number"
      value={data.phone}
      onChangeText={v => setData({ ...data, phone: v })}
      placeholder="Enter your phone number"
      keyboardType="phone-pad"
    />
  </View>
);

// Step 2: Profile Photo
const Step2: React.FC = () => (
  <View style={{ alignItems: 'center', paddingVertical: 16 }}>
    <View
      style={{
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        borderWidth: 3,
        borderColor: '#BFDBFE',
        borderStyle: 'dashed',
      }}
    >
      <Svg width={56} height={56} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={8} r={4} stroke="#2563EB" strokeWidth={1.5} />
        <Path
          d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
          stroke="#2563EB"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </Svg>
    </View>

    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#2563EB',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 28,
        marginBottom: 12,
        width: '100%',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path
          d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
          stroke="#FFFFFF"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <Circle cx={12} cy={13} r={4} stroke="#FFFFFF" strokeWidth={1.8} />
      </Svg>
      <Text style={{ fontSize: 15, fontWeight: '600', color: '#FFFFFF' }}>Take Photo</Text>
    </TouchableOpacity>

    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1.5,
        borderColor: '#2563EB',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 28,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#EFF6FF',
      }}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16"
          stroke="#2563EB"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <Path
          d="M14 14l1.586-1.586a2 2 0 0 1 2.828 0L20 14"
          stroke="#2563EB"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <Svg width={2} height={2} viewBox="0 0 2 2">
          <Circle cx={8} cy={10} r={2} fill="#2563EB" />
        </Svg>
        <Path d="M2 4h20v16H2z" stroke="#2563EB" strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
      <Text style={{ fontSize: 15, fontWeight: '600', color: '#2563EB' }}>Choose from Gallery</Text>
    </TouchableOpacity>
  </View>
);

// Step 3: Health Info
const Step3: React.FC<{ data: any; setData: (d: any) => void }> = ({ data, setData }) => (
  <View>
    <StyledDropdown
      label="Blood Group"
      value={data.bloodGroup}
      options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
      onSelect={v => setData({ ...data, bloodGroup: v })}
    />
    <StyledInput
      label="Height (cm)"
      value={data.height}
      onChangeText={v => setData({ ...data, height: v })}
      placeholder="Enter your height"
      keyboardType="numeric"
    />
    <StyledInput
      label="Weight (kg)"
      value={data.weight}
      onChangeText={v => setData({ ...data, weight: v })}
      placeholder="Enter your weight"
      keyboardType="numeric"
    />
    <StyledInput
      label="Allergies (if any)"
      value={data.allergies}
      onChangeText={v => setData({ ...data, allergies: v })}
      placeholder="Enter allergies"
    />
    <StyledInput
      label="Existing Conditions"
      value={data.conditions}
      onChangeText={v => setData({ ...data, conditions: v })}
      placeholder="Enter any conditions"
    />
  </View>
);

// Step 4: Emergency Contact
const Step4: React.FC<{ data: any; setData: (d: any) => void }> = ({ data, setData }) => (
  <View>
    <StyledInput
      label="Contact Name"
      value={data.contactName}
      onChangeText={v => setData({ ...data, contactName: v })}
      placeholder="Enter contact name"
    />
    <StyledInput
      label="Relationship"
      value={data.relationship}
      onChangeText={v => setData({ ...data, relationship: v })}
      placeholder="Enter relationship"
    />
    <StyledInput
      label="Phone Number"
      value={data.contactPhone}
      onChangeText={v => setData({ ...data, contactPhone: v })}
      placeholder="Enter phone number"
      keyboardType="phone-pad"
    />
  </View>
);

// Step 5: Address
const Step5: React.FC<{ data: any; setData: (d: any) => void }> = ({ data, setData }) => (
  <View>
    <StyledDropdown
      label="Division"
      value={data.division}
      options={['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet', 'Barisal', 'Rangpur', 'Mymensingh']}
      onSelect={v => setData({ ...data, division: v })}
    />
    <StyledDropdown
      label="District"
      value={data.district}
      options={['Dhaka', 'Gazipur', 'Narayanganj', 'Manikganj', 'Munshiganj']}
      onSelect={v => setData({ ...data, district: v })}
    />
    <StyledInput
      label="Area"
      value={data.area}
      onChangeText={v => setData({ ...data, area: v })}
      placeholder="Enter your area"
    />
    <StyledInput
      label="Full Address"
      value={data.address}
      onChangeText={v => setData({ ...data, address: v })}
      placeholder="Enter your full address"
    />
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          stroke="#2563EB"
          strokeWidth={1.8}
        />
        <Circle cx={12} cy={9} r={2.5} stroke="#2563EB" strokeWidth={1.8} />
      </Svg>
      <Text style={{ fontSize: 13, color: '#2563EB', fontWeight: '600' }}>Use Current Location</Text>
    </TouchableOpacity>
  </View>
);

const stepTitles = [
  'Personal Information',
  'Profile Photo',
  'Health Information',
  'Emergency Contact',
  'Address',
];

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);

  const [personalData, setPersonalData] = useState({
    fullName: '', dob: '', gender: '', phone: '',
  });
  const [healthData, setHealthData] = useState({
    bloodGroup: '', height: '', weight: '', allergies: '', conditions: '',
  });
  const [emergencyData, setEmergencyData] = useState({
    contactName: '', relationship: '', contactPhone: '',
  });
  const [addressData, setAddressData] = useState({
    division: '', district: '', area: '', address: '',
  });

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (step > 1) { setStep(s => s - 1); }
      else { onBack(); }
      return true;
    });
    return () => subscription.remove();
  }, [step, onBack]);

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
          }}
        >
          <StepIndicator current={step} total={TOTAL_STEPS} />
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#111827',
              textAlign: 'center',
              marginTop: 12,
              letterSpacing: -0.3,
            }}
          >
            {stepTitles[step - 1]}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}
        >
          {step === 1 && <Step1 data={personalData} setData={setPersonalData} />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 data={healthData} setData={setHealthData} />}
          {step === 4 && <Step4 data={emergencyData} setData={setEmergencyData} />}
          {step === 5 && <Step5 data={addressData} setData={setAddressData} />}

          {/* Next / Skip (Step 2) */}
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#2563EB',
                borderRadius: 14,
                paddingVertical: 16,
                alignItems: 'center',
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
                {step === TOTAL_STEPS ? 'Next' : 'Next'}
              </Text>
            </TouchableOpacity>

            {step === 2 && (
              <TouchableOpacity
                onPress={() => setStep(3)}
                style={{ alignItems: 'center', marginTop: 16 }}
              >
                <Text style={{ fontSize: 14, color: '#48494dff', fontWeight: '500' }}>
                  Skip for now
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
