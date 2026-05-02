import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function ChevronRightIcon({ size = 16, color = '#1D2539' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.66755 12.5C6.53922 12.5 6.41172 12.4509 6.31422 12.3534C6.11922 12.1584 6.11922 11.8417 6.31422 11.6459L9.96089 7.9992L6.31422 4.35253C6.11922 4.15753 6.11922 3.84086 6.31422 3.64503C6.50922 3.45003 6.82588 3.45003 7.02172 3.64503L11.0217 7.64503C11.2167 7.84003 11.2167 8.1567 11.0217 8.35253L7.02172 12.3525C6.92422 12.45 6.79589 12.4992 6.66839 12.4992L6.66755 12.5Z"
        fill={color}
      />
    </Svg>
  );
}
