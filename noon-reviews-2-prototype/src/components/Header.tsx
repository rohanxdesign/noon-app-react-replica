import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import SearchIcon from '../icons/SearchIcon';
import CrossIcon from '../icons/CrossIcon';

export type HeaderVariant = 'default' | 'photos' | 'search';

// ── Phone status bar (9:41 / signal / wifi / battery) ────────────────────
function StatusBarTime({ color }: { color: string }) {
  return <Text style={[s.time, { color }]}>9:41</Text>;
}

function BatteryIndicator({ color }: { color: string }) {
  return (
    <View style={[s.batteryShell, { borderColor: color }]}>
      <View style={[s.batteryFill, { backgroundColor: color }]} />
    </View>
  );
}

function StatusBarIcons({ color }: { color: string }) {
  return (
    <View style={s.statusBarIcons}>
      <Ionicons name="cellular" size={14} color={color} />
      <Ionicons name="wifi" size={15} color={color} />
      <BatteryIndicator color={color} />
    </View>
  );
}

function PhoneStatusBar({ tone }: { tone: 'dark' | 'light' }) {
  const color = tone === 'light' ? '#ffffff' : '#000000';
  return (
    <View style={s.statusBar}>
      <StatusBarTime color={color} />
      <StatusBarIcons color={color} />
    </View>
  );
}

// ── Circular header buttons ──────────────────────────────────────────────
function BackButton({
  onPress,
  surface = 'light',
}: {
  onPress?: () => void;
  surface?: 'light' | 'translucent';
}) {
  const translucent = surface === 'translucent';
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        s.circleButton,
        translucent ? s.circleTranslucent : s.circleSolid,
        pressed && { opacity: 0.6 },
      ]}
    >
      <ChevronLeftIcon size={20} color={translucent ? '#ffffff' : colors.blueGray1000} />
    </Pressable>
  );
}

function CloseButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [s.circleButton, s.circleSolid, pressed && { opacity: 0.6 }]}
    >
      <CrossIcon size={20} color={colors.blueGray1000} />
    </Pressable>
  );
}

// ── Search pill ──────────────────────────────────────────────────────────
function SearchPlaceholder({ text }: { text: string }) {
  return <Text style={s.searchPlaceholder}>{text}</Text>;
}

function SearchBar({
  placeholder,
  onPress,
}: {
  placeholder: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.searchPill, pressed && { opacity: 0.7 }]}
    >
      <SearchIcon size={20} color={colors.blueGray900} />
      <SearchPlaceholder text={placeholder} />
    </Pressable>
  );
}

// ── Header ───────────────────────────────────────────────────────────────
function HeaderRow({
  variant,
  children,
}: {
  variant: HeaderVariant;
  children: React.ReactNode;
}) {
  return (
    <View style={[s.row, variant === 'search' ? s.rowSearch : s.rowDefault]}>{children}</View>
  );
}

interface Props {
  variant?: HeaderVariant;
  onLeftPress?: () => void;
  onSearchPress?: () => void;
  searchPlaceholder?: string;
  style?: ViewStyle;
}

export default function Header({
  variant = 'default',
  onLeftPress,
  onSearchPress,
  searchPlaceholder = 'Search',
  style,
}: Props) {
  const tone = variant === 'photos' ? 'light' : 'dark';

  return (
    <View style={[s.container, style]}>
      <PhoneStatusBar tone={tone} />
      <HeaderRow variant={variant}>
        {variant === 'default' ? (
          <CloseButton onPress={onLeftPress} />
        ) : (
          <BackButton onPress={onLeftPress} surface={variant === 'photos' ? 'translucent' : 'light'} />
        )}
        {variant === 'search' && (
          <SearchBar placeholder={searchPlaceholder} onPress={onSearchPress} />
        )}
      </HeaderRow>
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: '100%' },
  // Phone status bar
  statusBar: {
    height: 44,
    paddingHorizontal: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
    fontFamily: Platform.select({ ios: 'System', default: 'system-ui' }),
  },
  statusBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  batteryShell: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderRadius: 3,
    opacity: 0.55,
    padding: 1.5,
    marginLeft: 2,
  },
  batteryFill: {
    flex: 1,
    borderRadius: 1.5,
  },
  // Header row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rowDefault: { justifyContent: 'space-between' },
  rowSearch: { gap: 12 },
  // Circle buttons
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  circleSolid: {
    backgroundColor: colors.bgWhite,
    borderColor: colors.blueGray200,
  },
  circleTranslucent: {
    backgroundColor: 'rgba(255,255,255,0.24)',
    borderColor: 'rgba(255,255,255,0.24)',
  },
  // Search pill
  searchPill: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    backgroundColor: colors.bgWhite,
    borderWidth: 1,
    borderColor: colors.blueGray200,
    borderRadius: 9999,
  },
  searchPlaceholder: {
    fontFamily: 'Noontree-Medium',
    fontSize: 12,
    color: '#1D2539',
    letterSpacing: -0.1,
    lineHeight: 16,
  },
});
