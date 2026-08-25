import React from 'react';
import Svg, { Path, Rect, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export const DoctorPatientIllustration: React.FC<{ width?: number; height?: number }> = ({
  width = 280,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 280 240" fill="none">
      <Defs>
        <LinearGradient id="bgGrad1" x1="0" y1="0" x2="280" y2="240" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#EFF6FF" />
          <Stop offset="100%" stopColor="#DBEAFE" />
        </LinearGradient>
      </Defs>

      {/* Light soft background card outline */}
      <Rect x="20" y="20" width="240" height="200" rx="30" fill="url(#bgGrad1)" opacity={0.6} />

      {/* Floating medical icons in background */}
      <Circle cx="210" cy="50" r="14" fill="#FFFFFF" />
      <Path d="M205 50H215M210 45V55" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />

      <Circle cx="60" cy="70" r="12" fill="#FFFFFF" />
      <Path d="M55 70H65" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Doctor (Left) */}
      <G transform="translate(60, 45)">
        {/* Head & Hair */}
        <Circle cx="35" cy="25" r="14" fill="#FCA5A5" />
        <Path d="M21 24C21 16 27 10 35 10C43 10 49 16 49 24C49 26 47 20 35 20C23 20 21 26 21 24Z" fill="#1E293B" />

        {/* White Doctor Coat */}
        <Path d="M15 55 L35 40 L55 55 L52 120 L18 120 Z" fill="#FFFFFF" />
        <Path d="M35 40V120" stroke="#CBD5E1" strokeWidth="1.5" />
        {/* Blue shirt under coat */}
        <Path d="M30 40 L35 48 L40 40 Z" fill="#2563EB" />
        {/* Stethoscope */}
        <Path d="M26 42 Q35 60 44 42" stroke="#2563EB" strokeWidth="3" fill="none" />

        {/* Trousers */}
        <Rect x="20" y="120" width="12" height="40" rx="4" fill="#1E3A8A" />
        <Rect x="38" y="120" width="12" height="40" rx="4" fill="#1E3A8A" />
        {/* Shoes */}
        <Rect x="16" y="156" width="18" height="8" rx="4" fill="#0F172A" />
        <Rect x="36" y="156" width="18" height="8" rx="4" fill="#0F172A" />

        {/* Arm gesturing to patient */}
        <Path d="M50 55 L75 65" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <Circle cx="76" cy="66" r="5" fill="#FCA5A5" />
      </G>

      {/* Patient (Right - Seated) */}
      <G transform="translate(150, 70)">
        {/* Chair */}
        <Rect x="25" y="65" width="30" height="6" rx="2" fill="#94A3B8" />
        <Rect x="23" y="71" width="5" height="40" rx="2" fill="#64748B" />
        <Rect x="52" y="71" width="5" height="40" rx="2" fill="#64748B" />

        {/* Patient Head & Hair */}
        <Circle cx="40" cy="18" r="12" fill="#FED7AA" />
        <Path d="M26 20C26 8 32 4 40 4C48 4 54 8 54 20C54 28 50 32 40 32C30 32 26 28 26 20Z" fill="#0F172A" />

        {/* Shirt */}
        <Path d="M25 45 C25 35 30 32 40 32 C50 32 55 35 55 45 L52 70 L28 70 Z" fill="#1E3A8A" />

        {/* Pants */}
        <Rect x="28" y="70" width="10" height="35" rx="3" fill="#334155" />
        <Rect x="42" y="70" width="10" height="35" rx="3" fill="#334155" />

        {/* Shoes */}
        <Rect x="24" y="101" width="16" height="7" rx="3" fill="#475569" />
        <Rect x="40" y="101" width="16" height="7" rx="3" fill="#475569" />
      </G>

      {/* Ground line shadow */}
      <Path d="M40 215 C100 215 180 215 240 215" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
};
