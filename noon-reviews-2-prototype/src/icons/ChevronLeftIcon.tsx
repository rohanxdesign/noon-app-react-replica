import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function ChevronLeftIcon({ size = 20, color = '#1D2539' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M11.226 4.55806C11.4701 4.31398 11.8657 4.31398 12.1098 4.55806C12.3539 4.80214 12.3539 5.19777 12.1098 5.44185L7.55171 9.99995L12.1098 14.5581C12.3539 14.8021 12.3539 15.1978 12.1098 15.4418C11.8657 15.6859 11.4701 15.6859 11.226 15.4418L6.22603 10.4418C5.98195 10.1978 5.98195 9.80214 6.22603 9.55806L11.226 4.55806Z"
        fill={color}
      />
    </Svg>
  );
}
