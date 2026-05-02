import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function DeliveredTickIcon({ size = 16, color = '#0F8857' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={4} fill="white" />
      <Path
        d="M8 1.5C4.41583 1.5 1.5 4.41583 1.5 8C1.5 11.5842 4.41583 14.5 8 14.5C11.5842 14.5 14.5 11.5842 14.5 8C14.5 4.41583 11.5842 1.5 8 1.5ZM10.6867 6.68667L7.35333 10.02C7.26 10.1142 7.1325 10.1667 7 10.1667C6.8675 10.1667 6.74 10.1142 6.64667 10.02L5.31333 8.68667C5.11833 8.49167 5.11833 8.175 5.31333 7.97917C5.50833 7.78333 5.825 7.78417 6.02083 7.97917L7.00083 8.95917L9.98083 5.97917C10.1758 5.78417 10.4925 5.78417 10.6875 5.97917C10.8825 6.17417 10.8825 6.49083 10.6875 6.68667H10.6867Z"
        fill={color}
      />
    </Svg>
  );
}
