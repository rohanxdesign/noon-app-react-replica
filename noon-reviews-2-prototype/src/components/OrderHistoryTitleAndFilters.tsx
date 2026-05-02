import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderHistoryFiltersRow from './OrderHistoryFiltersRow';
import { fonts } from '../fonts';

function OrderHistoryTitle() {
  return <Text style={s.title}>Order history</Text>;
}

// Title + filters live in the same flex column (per Figma "Title + Filters" frame).
export default function OrderHistoryTitleAndFilters() {
  return (
    <View style={s.column}>
      <OrderHistoryTitle />
      <OrderHistoryFiltersRow />
    </View>
  );
}

const s = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.15,
    color: '#1D2539',
    paddingLeft: 4,
  },
});
