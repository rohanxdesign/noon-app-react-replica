import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

const FRAME_WIDTH = 375;
const FRAME_HEIGHT = 812;

export default function DeviceFrame({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.stage}>
      <View style={styles.shell}>
        <View style={styles.notch} />
        <View style={styles.viewport}>{children}</View>
        <View style={styles.homeIndicatorWrap}>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    minHeight: '100%' as any,
    backgroundColor: '#0b0d12',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  shell: {
    width: FRAME_WIDTH + 16,
    height: FRAME_HEIGHT + 16,
    backgroundColor: '#1c1f29',
    borderRadius: 56,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 20 },
  },
  viewport: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    overflow: 'hidden',
    borderRadius: 48,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  notch: {
    position: 'absolute',
    top: 8,
    left: '50%' as any,
    marginLeft: -60,
    width: 120,
    height: 28,
    backgroundColor: '#0b0d12',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    zIndex: 10,
  },
  homeIndicatorWrap: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#0b0d12',
    opacity: 0.85,
  },
});
