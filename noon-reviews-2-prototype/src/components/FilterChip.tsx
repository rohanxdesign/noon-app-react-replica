import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { fonts } from '../fonts';

function FilterChipLabel({ text }: { text: string }) {
  return <Text style={s.label}>{text}</Text>;
}

interface Props {
  label: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onPress?: () => void;
}

export default function FilterChip({
  label,
  leadingIcon,
  trailingIcon,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.chip, pressed && { opacity: 0.65 }]}
    >
      {leadingIcon}
      <FilterChipLabel text={label} />
      {trailingIcon}
    </Pressable>
  );
}

// Shared chip dimensions/styling exposed so MarketplaceFilterChip looks identical.
export const filterChipBaseStyle = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2F3F7',
    borderRadius: 8,
    padding: 8,
  },
});

const s = StyleSheet.create({
  chip: filterChipBaseStyle.chip,
  label: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: '#1D2539',
  },
});
