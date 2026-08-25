import React from 'react';
import Svg, { Path, Rect, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export const BookingIllustration: React.FC<{ width?: number; height?: number }> = ({
  width = 280,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 280 240" fill="none">
      <Defs>
        <LinearGradient id="bgGrad2" x1="0" y1="0" x2="280" y2="240" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#EFF6FF" />
          <Stop offset="100%" stopColor="#E0F2FE" />
        </LinearGradient>
        <LinearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#1E293B" />
          <Stop offset="100%" stopColor="#0F172A" />
        </LinearGradient>
      </Defs>

      {/* Background card */}
      <Rect x="20" y="20" width="240" height="200" rx="30" fill="url(#bgGrad2)" opacity={0.6} />

      {/* Smartphone Display (Left) */}
      <G transform="translate(50, 35)">
        {/* Outer Phone Frame */}
        <Rect x="0" y="0" width="90" height="165" rx="16" fill="url(#phoneGrad)" stroke="#334155" strokeWidth="3" />
        {/* Screen Area */}
        <Rect x="5" y="10" width="80" height="145" rx="10" fill="#FFFFFF" />

        {/* Screen Notch */}
        <Rect x="30" y="13" width="30" height="4" rx="2" fill="#0F172A" />

        {/* App UI Header inside Phone */}
        <Rect x="12" y="26" width="66" height="16" rx="4" fill="#2563EB" opacity={0.15} />
        <Rect x="16" y="31" width="30" height="6" rx="3" fill="#2563EB" />

        {/* Calendar / Grid Items inside Phone */}
        <G transform="translate(12, 48)">
          {/* Row 1 */}
          <Rect x="0" y="0" width="18" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
          <Rect x="24" y="0" width="18" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
          <Rect x="48" y="0" width="18" height="18" rx="4" fill="#2563EB" />
          {/* Checkmark on active appointment card */}
          <Path d="M53 9L56 12L62 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Row 2 */}
          <Rect x="0" y="24" width="18" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
          <Rect x="24" y="24" width="18" height="18" rx="4" fill="#16A34A" />
          <Rect x="48" y="24" width="18" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />

          {/* Row 3 */}
          <Rect x="0" y="48" width="18" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
          <Rect x="24" y="48" width="18" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
          <Rect x="48" y="48" width="18" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" />
        </G>

        {/* Bottom Button inside Phone */}
        <Rect x="12" y="125" width="66" height="18" rx="6" fill="#2563EB" />
        <Rect x="26" y="131" width="38" height="6" rx="3" fill="#FFFFFF" />
      </G>

      {/* Female Doctor pointing at phone (Right) */}
      <G transform="translate(160, 50)">
        {/* Head & Hair */}
        <Circle cx="40" cy="22" r="13" fill="#FCA5A5" />
        <Path d="M26 22C26 12 32 6 40 6C48 6 54 12 54 22C54 26 50 18 40 18C30 18 26 26 26 22Z" fill="#047857" />

        {/* Green Doctor Scrub/Jacket */}
        <Path d="M20 50 L40 38 L60 50 L56 115 L24 115 Z" fill="#059669" />
        {/* White Inner Shirt */}
        <Path d="M35 38 L40 46 L45 38 Z" fill="#FFFFFF" />

        {/* Arm Pointing left towards phone */}
        <Path d="M25 55 L-20 40" stroke="#059669" strokeWidth="9" strokeLinecap="round" />
        <Circle cx="-22" cy="40" r="5" fill="#FCA5A5" />

        {/* Pants */}
        <Rect x="26" y="115" width="12" height="40" rx="4" fill="#1E3A8A" />
        <Rect x="42" y="115" width="12" height="40" rx="4" fill="#1E3A8A" />

        {/* Shoes */}
        <Rect x="22" y="150" width="16" height="8" rx="4" fill="#0F172A" />
        <Rect x="40" y="150" width="16" height="8" rx="4" fill="#0F172A" />
      </G>

      {/* Shadow */}
      <Path d="M40 215 C100 215 180 215 240 215" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
};
