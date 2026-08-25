import React from 'react';
import Svg, { Path, Rect, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export const HealthRecordsIllustration: React.FC<{ width?: number; height?: number }> = ({
  width = 280,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 280 240" fill="none">
      <Defs>
        <LinearGradient id="bgGrad3" x1="0" y1="0" x2="280" y2="240" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#EFF6FF" />
          <Stop offset="100%" stopColor="#DBEAFE" />
        </LinearGradient>
        <LinearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#3B82F6" />
          <Stop offset="100%" stopColor="#1D4ED8" />
        </LinearGradient>
        <LinearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#EF4444" />
          <Stop offset="100%" stopColor="#DC2626" />
        </LinearGradient>
      </Defs>

      {/* Background card */}
      <Rect x="20" y="20" width="240" height="200" rx="30" fill="url(#bgGrad3)" opacity={0.6} />

      {/* Large Center Shield */}
      <G transform="translate(100, 35)">
        <Path
          d="M40 0 C60 0 80 10 80 30 C80 70 40 100 40 100 C40 100 0 70 0 30 C0 10 20 0 40 0 Z"
          fill="url(#shieldGrad)"
        />
        {/* Heart icon inside shield */}
        <Path
          d="M40 58 C40 58 22 44 22 30 C22 23 27 18 34 18 C37 18 40 20 40 22 C40 20 43 18 46 18 C53 18 58 23 58 30 C58 44 40 58 40 58 Z"
          fill="#FFFFFF"
        />
      </G>

      {/* Floating Red Heart Badge on Right */}
      <G transform="translate(190, 65)">
        <Circle cx="20" cy="20" r="22" fill="url(#heartGrad)" />
        <Path
          d="M20 30 C20 30 10 22 10 15 C10 11 13 8 17 8 C19 8 20 9 20 10 C20 9 21 8 23 8 C27 8 30 11 30 15 C30 22 20 30 20 30 Z"
          fill="#FFFFFF"
        />
      </G>

      {/* Medical Folder / Tablet Screen on Left */}
      <G transform="translate(45, 95)">
        <Rect x="0" y="0" width="70" height="90" rx="10" fill="#1E293B" />
        <Rect x="5" y="5" width="60" height="80" rx="6" fill="#FFFFFF" />

        {/* Prescription Document content */}
        <Rect x="12" y="14" width="46" height="8" rx="4" fill="#2563EB" opacity={0.2} />
        <Rect x="12" y="16" width="20" height="4" rx="2" fill="#2563EB" />

        {/* Lines representing medical record */}
        <Rect x="12" y="30" width="36" height="4" rx="2" fill="#94A3B8" />
        <Rect x="12" y="38" width="46" height="4" rx="2" fill="#CBD5E1" />
        <Rect x="12" y="46" width="28" height="4" rx="2" fill="#CBD5E1" />

        {/* Success check badge on tablet */}
        <Circle cx="44" cy="62" r="10" fill="#16A34A" />
        <Path d="M40 62 L43 65 L48 59" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </G>

      {/* Plant Leaves decorative on bottom right */}
      <G transform="translate(180, 130)">
        <Path d="M10 50 Q 5 20 25 0 Q 30 30 10 50 Z" fill="#2563EB" opacity={0.7} />
        <Path d="M20 50 Q 35 25 45 10 Q 35 35 20 50 Z" fill="#60A5FA" opacity={0.8} />
      </G>

      {/* Ground Shadow */}
      <Path d="M40 215 C100 215 180 215 240 215" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
};
