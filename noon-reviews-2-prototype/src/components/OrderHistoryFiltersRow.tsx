import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FilterChip from './FilterChip';
import MarketplaceFilterChip from './MarketplaceFilterChip';
import FilterIcon from '../icons/FilterIcon';
import CaretDownIcon from '../icons/CaretDownIcon';

export default function OrderHistoryFiltersRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
    >
      <FilterChip
        label="Filter"
        leadingIcon={<FilterIcon size={16} />}
        trailingIcon={<CaretDownIcon size={16} />}
      />
      <FilterChip label="Delivered" />
      <FilterChip label="Cancelled" />
      <FilterChip label="Returns" />
      <MarketplaceFilterChip marketplace="supermall" />
      <MarketplaceFilterChip marketplace="express" />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
