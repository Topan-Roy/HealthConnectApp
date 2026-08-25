import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

interface SplashLogoProps {
  size?: number;
}

export const SplashLogo: React.FC<SplashLogoProps> = ({ size = 120 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Heart outer shape */}
      <Path
        d="M60 108C60 108 12 76 12 40C12 22.3269 26.3269 8 44 8C52.6868 8 60.4853 11.4593 60 18C59.5147 11.4593 67.3132 8 76 8C93.6731 8 108 22.3269 108 40C108 76 60 108 60 108Z"
        fill="#2563EB"
      />
      {/* Center Medical Cross */}
      <G transform="translate(42, 32)">
        {/* Horizontal bar */}
        <Rect x="5" y="13" width="26" height="10" rx="5" fill="#FFFFFF" />
        {/* Vertical bar */}
        <Rect x="13" y="5" width="10" height="26" rx="5" fill="#FFFFFF" />
        {/* Inner circle accent */}
        <Rect x="16" y="16" width="4" height="4" rx="2" fill="#2563EB" />
      </G>
    </Svg>
  );
};
