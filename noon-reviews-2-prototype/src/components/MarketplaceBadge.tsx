import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MarketplaceBadgeProps {
  type: 'express' | 'supermall';
}

export default function MarketplaceBadge({ type }: MarketplaceBadgeProps) {
  if (type === 'express') {
    return (
      <View style={[styles.badge, styles.express]}>
        <Text style={[styles.text, styles.expressText]}>express</Text>
      </View>
    );
  }
  return (
    <View style={[styles.badge, styles.supermall]}>
      <Text style={[styles.text, styles.supermallText]}>supermall</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  express: {
    backgroundColor: '#FEEE00',
    borderWidth: 0.6,
    borderColor: '#FEEE00',
  },
  supermall: {
    backgroundColor: '#2122b8',
    borderWidth: 0.6,
    borderColor: '#2122b8',
  },
  text: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'lowercase',
  },
  expressText: {
    color: '#404553',
  },
  supermallText: {
    color: '#ffffff',
  },
});
