import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../../../store/cartStore';
import { useWishlistStore } from '../../../store/wishlistStore';
import type { Product } from '../../../types/product';
import { AddToCart } from '../AddToCart/AddToCart';
import { HeartOutline, HeartFilled, StarFilled, MoonIcon } from '../icons';
import './ProductCard.css';

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  bestseller: { bg: 'var(--emerald-800)', color: 'var(--colour-neutral-white)' },
  new:        { bg: 'var(--supermall-800)', color: 'var(--colour-neutral-white)' },
  hot:        { bg: 'var(--orange-700)', color: 'var(--colour-neutral-white)' },
  sale:       { bg: 'var(--red-700)', color: 'var(--colour-neutral-white)' },
};

const PDP_ROUTE = '/product/galaxy-s25-ultra';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const openWishlist = useWishlistStore((s) => s.openDrawer);
  const wishlisted = useWishlistStore((s) => s.wishlistedIds.has(product.id));
  const imgIndex = 0;

  const addItem    = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty  = useCartStore((s) => s.updateQuantity);
  const cartItem   = useCartStore((s) => s.items.find((i) => i.id === product.id));
  const count      = cartItem?.quantity ?? 0;

  const discount = Math.round(
    ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100
  );

  const tagStyle = product.tag ? TAG_STYLES[product.tag.variant] ?? TAG_STYLES.bestseller : null;

  function handleAdd() {
    if (count === 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.sellingPrice,
        quantity: 1,
        imagePublicId: product.images[0] ?? '',
      });
    } else {
      updateQty(product.id, count + 1);
    }
  }

  function handleRemove() {
    if (count <= 1) {
      removeItem(product.id);
    } else {
      updateQty(product.id, count - 1);
    }
  }

  return (
    <article
      className="product-card"
      onClick={() => navigate(PDP_ROUTE, { state: { from: `${location.pathname}${location.search}` } })}
      role="button"
      tabIndex={0}
    >
      {/* ── Image Area ─────────────────────────────────── */}
      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.images[imgIndex]}
          alt={product.name}
          loading="lazy"
        />


        {/* Best seller / tag */}
        {product.tag && tagStyle && (
          <div
            className="product-card__tag"
            style={{ background: tagStyle.bg, color: tagStyle.color }}
          >
            {product.tag.label}
          </div>
        )}

        {/* Wishlist */}
        <motion.button
          className="product-card__wishlist"
          onClick={(e) => {
            e.stopPropagation();
            openWishlist(product.id, product.images[imgIndex]);
          }}
          whileTap={{ scale: 0.85 }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted
            ? <HeartFilled size={16} color="var(--red-600)" />
            : <HeartOutline size={16} color="var(--grey-700)" />
          }
        </motion.button>

        {/* CTA overlay: Ad label + ATC; when active, dots move here */}
        <div className="product-card__cta">
          <div className="product-card__cta-left">
            {product.isSponsored && (
              <span className="product-card__ad-tag">Ad</span>
            )}
          </div>
          <AddToCart count={count} onAdd={handleAdd} onRemove={handleRemove} />
        </div>
      </div>

      {/* ── Info Area ──────────────────────────────────── */}
      <div className="product-card__info">
        <div className="product-card__text-group">
          <p className="product-card__name">{product.name}</p>
          <p className="product-card__variant">{product.variant}</p>
        </div>

        <div className="product-card__bottom">
          {/* Rating */}
          <div className="product-card__rating">
            <StarFilled size={12} />
            <span className="product-card__rating-value">{product.rating}</span>
            <span className="product-card__rating-count">({product.reviewCount})</span>
          </div>

          <div className="product-card__divider" />

          {/* Price row */}
          <div className="product-card__prices">
            <div className="product-card__price-group">
              <span className="product-card__price">
                {product.currency}{product.sellingPrice}
              </span>
              <span className="product-card__original">
                {product.currency}{product.originalPrice}
              </span>
            </div>
            {discount > 0 && (
              <span className="product-card__discount">{discount}% off</span>
            )}
          </div>

          {/* Deal badge */}
          {product.deal && (
            <div className="product-card__deal">
              <MoonIcon size={12} color="var(--noon-800)" />
              <span>{product.deal}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
