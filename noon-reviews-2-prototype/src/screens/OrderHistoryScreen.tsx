import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  Layout,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../theme';
import { confirmedOrders, Product } from '../data';
import { useApp } from '../store';
import StarRating from '../components/StarRating';
import MarketplaceBadge from '../components/MarketplaceBadge';
import FilterChip from '../components/FilterChip';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OrderHistoryScreenProps {
  onStartReview: (product: Product, rating: number) => void;
}

const ConfirmedOrderCard = ({ order }: { order: typeof confirmedOrders[0] }) => (
  <View style={styles.shipmentCard}>
    <View style={styles.shipmentHeader}>
      <View style={styles.shipmentBadgeRow}>
        <MarketplaceBadge type="express" />
        <Text style={styles.shipmentNumber}>SHIPMENT {order.shipmentNumber}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color={colors.blueGray600} />
    </View>
    <View style={styles.shipmentBody}>
      <View style={styles.shipmentLeft}>
        <View style={styles.checkIcon}>
          <Ionicons name="checkmark-circle" size={22} color={colors.grassGreen} />
        </View>
        <View>
          <Text style={styles.arrivingLabel}>Arriving by</Text>
          <Text style={styles.arrivingDate}>{order.arrivingBy}</Text>
        </View>
      </View>
      <View style={styles.stackedImages}>
        {order.productImages.map((img, i) => (
          <View key={i} style={[styles.stackedImageWrapper, { zIndex: order.productImages.length - i, marginLeft: i > 0 ? -16 : 0 }]}>
            <Image source={{ uri: img }} style={styles.stackedImage} />
          </View>
        ))}
        <View style={[styles.stackedImageWrapper, { marginLeft: -16, zIndex: 0 }]}>
          <Text style={styles.moreCount}>+{order.itemCount - order.productImages.length}</Text>
        </View>
      </View>
    </View>
  </View>
);

const ProductCard = ({
  product,
  onRate,
}: {
  product: Product;
  onRate: (rating: number) => void;
}) => {
  const isDelivered = product.status === 'delivered';
  const isCancelled = product.status === 'cancelled';

  return (
    <Animated.View
      entering={FadeInDown.delay(100).springify()}
      layout={Layout.springify()}
      style={styles.productCard}
    >
      <View style={styles.productCardInner}>
        <View style={styles.productRow}>
          <View style={styles.productImageWrapper}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
          </View>
          <View style={styles.productInfo}>
            <View style={styles.productStatusRow}>
              <Text
                style={[
                  styles.statusText,
                  { color: isCancelled ? colors.red700 : colors.grassGreen },
                ]}
              >
                {isCancelled ? 'Cancelled' : 'Delivered'} on {product.statusDate}
              </Text>
              <MarketplaceBadge type={product.marketplace} />
            </View>
            <Text style={styles.priceText}>{product.price}</Text>
            <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
          </View>
        </View>
      </View>
      {isDelivered && !product.hasReview && (
        <View style={styles.ratingRow}>
          <Text style={styles.ratePrompt}>
            {product.rating ? 'Rate this item' : 'How would you rate this?'}
          </Text>
          <StarRating
            rating={product.rating || 0}
            size={product.rating ? 28 : 24}
            gap={product.rating ? 4 : 3}
            onRate={onRate}
          />
        </View>
      )}
      {product.hasReview && (
        <View style={styles.ratingRow}>
          <Text style={styles.ratePrompt}>Your rating</Text>
          <StarRating
            rating={product.rating || 0}
            size={24}
            gap={3}
            interactive={false}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default function OrderHistoryScreen({ onStartReview }: OrderHistoryScreenProps) {
  const { products, setRating } = useApp();

  const handleRate = useCallback((product: Product, rating: number) => {
    setRating(product.id, rating);
    // Delay slightly to let the star animation play
    setTimeout(() => {
      onStartReview(product, rating);
    }, 400);
  }, [onStartReview, setRating]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color={colors.blueGray800} />
        </Pressable>
        <Text style={styles.headerTitle}>Order history</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.blueGray600} />
            <Text style={styles.searchPlaceholder}>Search from your orders</Text>
            <Ionicons name="mic-outline" size={16} color={colors.blueGray600} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            <FilterChip label="Status" hasDropdown />
            <FilterChip label="Purchase date" hasDropdown />
            <FilterChip label="Returns" />
            <FilterChip label="Refund" />
            <FilterChip label="Cancelled" />
            <FilterChip label="Locker orders" />
          </ScrollView>
        </View>

        {/* Confirmed Orders */}
        <View style={styles.confirmedSection}>
          <View style={styles.confirmedHeader}>
            <Text style={styles.confirmedTitle}>Confirmed orders</Text>
          </View>
          <View style={styles.confirmedCards}>
            {confirmedOrders.map((order) => (
              <ConfirmedOrderCard key={order.id} order={order} />
            ))}
          </View>
        </View>

        {/* All Orders */}
        <View style={styles.allOrdersSection}>
          <Text style={styles.sectionTitle}>All orders</Text>
          <View style={styles.productList}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRate={(rating) => handleRate(product, rating)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 54,
    paddingBottom: 4,
    backgroundColor: colors.bgPrimary,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bgWhite,
    borderWidth: 1,
    borderColor: colors.blueGray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.16,
  },
  headerRight: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchSection: {
    padding: 12,
    gap: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    borderWidth: 1,
    borderColor: colors.blueGray300,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingLeft: 8,
    paddingRight: 12,
    gap: 6,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: colors.blueGray600,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  confirmedSection: {
    marginHorizontal: 12,
    backgroundColor: colors.blue100,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  confirmedHeader: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  confirmedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.blue1000,
    letterSpacing: -0.14,
  },
  confirmedCards: {
    padding: 8,
    gap: 6,
  },
  shipmentCard: {
    backgroundColor: colors.bgWhite,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 8,
  },
  shipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shipmentBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shipmentNumber: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.blueGray600,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  shipmentBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shipmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    width: 36,
    alignItems: 'center',
  },
  arrivingLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.blueGray600,
    letterSpacing: -0.12,
  },
  arrivingDate: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.blueGray800,
    letterSpacing: -0.16,
  },
  stackedImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackedImageWrapper: {
    width: 36,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.bgWhite,
    borderWidth: 0.87,
    borderColor: colors.blueGray300,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackedImage: {
    width: 34,
    height: 46,
    borderRadius: 7,
  },
  moreCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.16,
  },
  allOrdersSection: {
    paddingHorizontal: 12,
    marginTop: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.blueGray1000,
    letterSpacing: -0.16,
    paddingLeft: 2,
  },
  productList: {
    gap: 12,
  },
  productCard: {
    backgroundColor: colors.bgWhite,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.bgWhite,
    overflow: 'hidden',
  },
  productCardInner: {
    backgroundColor: colors.bgPrimary,
    borderRadius: radius.xl,
    paddingLeft: 8,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 12,
  },
  productRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  productImageWrapper: {
    width: 54,
    height: 72,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.blueGray200,
    backgroundColor: colors.bgWhite,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
    height: 68,
    paddingVertical: 2,
  },
  productStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.14,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.blueGray600,
    letterSpacing: -0.12,
  },
  productName: {
    fontSize: 11,
    color: colors.blueGray600,
    letterSpacing: -0.12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  ratePrompt: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.blueGray900,
    letterSpacing: -0.12,
    flex: 1,
  },
});
