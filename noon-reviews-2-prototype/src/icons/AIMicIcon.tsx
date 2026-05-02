import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

// Mic with a small AI sparkle in the corner.
export default function AIMicIcon({ size = 14, color = '#FFFFFF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M7 1.4c-1.05 0-1.9.85-1.9 1.9v3.5c0 1.05.85 1.9 1.9 1.9s1.9-.85 1.9-1.9V3.3c0-1.05-.85-1.9-1.9-1.9z"
        fill={color}
      />
      <Path
        d="M3.5 6.3v.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5v-.5"
        stroke={color}
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <Path d="M7 10.3v2.1" stroke={color} strokeWidth={1.1} strokeLinecap="round" />
      <Path d="M5.4 12.4h3.2" stroke={color} strokeWidth={1.1} strokeLinecap="round" />
      <Path
        d="M11.6 2.0l.35.95.95.35-.95.35-.35.95-.35-.95-.95-.35.95-.35.35-.95z"
        fill={color}
      />
    </Svg>
  );
}
