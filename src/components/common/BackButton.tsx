import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface BackButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  color = '#1F2937',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          ...Platform.select({
            ios: {
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
            },
            android: {
              elevation: 3,
            },
          }),
        },
        style,
      ]}
    >
      <ArrowLeft size={22} color={color} strokeWidth={2.2} />
    </TouchableOpacity>
  );
};
