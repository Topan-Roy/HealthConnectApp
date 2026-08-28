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
  ImageBackground,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface ProfileSetupScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const TOTAL_STEPS = 5;

// Step Indicator
const StepIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <View className="mb-1.5 items-center">
    <Text className="text-xs font-medium text-gray-600">
      Step {current} of {total}
    </Text>
    <View className="mt-2 flex-row gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} className={`h-1 rounded-sm ${i < current ? 'w-7 bg-primary' : 'w-4 bg-gray-200'}`} />
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
    <View className="mb-4">
      <Text className="mb-1.5 text-[13px] font-semibold text-gray-700">
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
        className={`rounded-xl border-[1.5px] px-3.5 py-3 text-[15px] text-gray-900 ${focused ? 'border-primary bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
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
    <View className="mb-4">
      <Text className="mb-1.5 text-[13px] font-semibold text-gray-700">
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
        className={`flex-row items-center justify-between rounded-xl border-[1.5px] px-3.5 py-3 ${open ? 'border-primary bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
      >
        <Text className={`text-[15px] ${value ? 'text-gray-900' : 'text-gray-400'}`}>
          {value || `Select ${label.toLowerCase()}`}
        </Text>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <Path d="M6 9l6 6 6-6" stroke="#48494dff" strokeWidth={2} strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>
      {open && (
        <View
          className="z-50 mt-1 rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              onPress={() => { onSelect(opt); setOpen(false); }}
              className="border-b border-gray-100 px-3.5 py-3"
            >
              <Text className="text-sm text-gray-700">{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Gender Radio
const GenderRadio: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <View className="mb-4">
    <Text className="mb-2 text-[13px] font-semibold text-gray-700">Gender</Text>
    <View className="flex-row gap-3">
      {['Male', 'Female', 'Other'].map(g => (
        <TouchableOpacity
          key={g}
          onPress={() => onChange(g)}
          className="flex-row items-center gap-1.5"
        >
          <View
            className={`h-5 w-5 items-center justify-center rounded-full border-2 ${value === g ? 'border-primary' : 'border-gray-300'}`}
          >
            {value === g && (
              <View className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </View>
          <Text className="text-sm text-gray-700">{g}</Text>
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
  <View className="items-center py-4">
    <View className="mb-7 h-[140px] w-[140px] items-center justify-center rounded-full border-[3px] border-dashed border-blue-200 bg-blue-50">
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
      className="mb-3 w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 shadow-lg shadow-primary/30"
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
      <Text className="text-[15px] font-semibold text-white">Take Photo</Text>
    </TouchableOpacity>

    <TouchableOpacity
      activeOpacity={0.85}
      className="w-full flex-row items-center justify-center gap-2 rounded-xl border-[1.5px] border-primary bg-blue-50 px-7 py-3.5"
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
      <Text className="text-[15px] font-semibold text-primary">Choose from Gallery</Text>
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
    <TouchableOpacity className="mt-1 flex-row items-center gap-1.5">
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          stroke="#2563EB"
          strokeWidth={1.8}
        />
        <Circle cx={12} cy={9} r={2.5} stroke="#2563EB" strokeWidth={1.8} />
      </Svg>
      <Text className="text-[13px] font-semibold text-primary">Use Current Location</Text>
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
    <ImageBackground source={require('../../../assets/role_bg.jpg')} className="flex-1" resizeMode="cover">
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Header */}
        <View className="border-b border-gray-100 px-6 pb-4 pt-5">
          <StepIndicator current={step} total={TOTAL_STEPS} />
          <Text className="mt-3 text-center text-[22px] font-bold text-gray-900">
            {stepTitles[step - 1]}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-6 pb-10 pt-6"
        >
          {step === 1 && <Step1 data={personalData} setData={setPersonalData} />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 data={healthData} setData={setHealthData} />}
          {step === 4 && <Step4 data={emergencyData} setData={setEmergencyData} />}
          {step === 5 && <Step5 data={addressData} setData={setAddressData} />}

          {/* Next / Skip (Step 2) */}
          <View className="mt-6">
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.85}
              className="items-center rounded-2xl bg-primary py-4 shadow-lg shadow-primary/30"
            >
              <Text className="text-base font-bold text-white">
                {step === TOTAL_STEPS ? 'Next' : 'Next'}
              </Text>
            </TouchableOpacity>

            {step === 2 && (
              <TouchableOpacity
                onPress={() => setStep(3)}
                className="mt-4 items-center"
              >
                <Text className="text-sm font-medium text-gray-600">
                  Skip for now
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};
