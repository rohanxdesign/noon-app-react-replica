import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function CaretDownIcon({ size = 16, color = '#1D2539' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4.00012 6.16675L12.0001 6.16675C12.2026 6.16675 12.3843 6.28842 12.4618 6.47508C12.5393 6.66175 12.4968 6.87675 12.3535 7.02008L8.35346 11.0201C8.25929 11.1142 8.13262 11.1667 8.00012 11.1667C7.86762 11.1667 7.74012 11.1142 7.64679 11.0201L3.64679 7.02008C3.50346 6.87675 3.46096 6.66175 3.53846 6.47508C3.61596 6.28841 3.79846 6.16675 4.00012 6.16675Z"
        fill={color}
      />
    </Svg>
  );
}
