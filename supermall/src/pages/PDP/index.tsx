import { useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import { ProductCard } from '../../components/ui/ProductCard/ProductCard';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HeartOutline,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  StarFilled,
} from '../../components/ui/icons';
import { getPdpProduct } from '../../data/pdpCatalog';
import { useCartStore } from '../../store/cartStore';
import './PDP.css';

const IMG_GALLERY_PREV = 'https://www.figma.com/api/mcp/asset/90537d94-04e9-475b-9a8c-223352e0c3ab';
const IMG_GALLERY_PAGER = 'https://www.figma.com/api/mcp/asset/2e6300ec-9e6e-44df-adad-af07ec797b1e';
const IMG_GALLERY_NEXT = 'https://www.figma.com/api/mcp/asset/b53f8ed6-3983-400b-8c4b-ed6482492f9c';
const IMG_BRAND_TICK = 'https://www.figma.com/api/mcp/asset/b19de74f-4560-4de1-b892-07e6441f8b94';
const IMG_PREPAID_ICON = 'https://www.figma.com/api/mcp/asset/54841fbe-3a25-4b89-8a6f-72336229b910';
const IMG_LOWEST_PRICE = 'https://www.figma.com/api/mcp/asset/02989c8f-fd39-43a9-b056-e827a6e290e3';
const IMG_DELIVERY_FLASH = 'https://www.figma.com/api/mcp/asset/71462d5b-83d4-4fcc-b12b-46c6179a0ff4';
const IMG_COUPON_ICON = 'https://www.figma.com/api/mcp/asset/59b9161c-8884-497f-85f4-706719d2d9e6';
const IMG_SELLER_RATED = 'https://www.figma.com/api/mcp/asset/028569ae-15aa-48c4-b061-3e37563f4a13';
const IMG_SELLER_RATED_BADGE = 'https://www.figma.com/api/mcp/asset/2e8148c6-1341-4b0f-9d66-33edb183392d';
const IMG_ASSURED = 'https://www.figma.com/api/mcp/asset/d944967e-f975-43c6-ae0f-66a03c07c42e';
const IMG_COD = 'https://www.figma.com/api/mcp/asset/13a47bc2-f6cf-43e2-acd8-0471b5bd6fe5';
const IMG_NOT_RETURNABLE = 'https://www.figma.com/api/mcp/asset/542f90bf-5cc2-4cc3-8d08-c8c06b6d6901';
const IMG_WARRANTY = 'https://www.figma.com/api/mcp/asset/3286cd42-1227-46a5-bf4d-bc673bdd1f8b';
const IMG_WARRANTY_BADGE = 'https://www.figma.com/api/mcp/asset/84e731f5-4b4b-4b59-ac98-a13ba924a33f';
const IMG_HOME_ICON = 'https://www.figma.com/api/mcp/asset/8db7bea9-7539-4fad-b79d-f6554dc594bd';
const IMG_CATEGORIES_ICON = 'https://www.figma.com/api/mcp/asset/ae5b90a2-e196-490a-bdec-2bd7ba0ab2f5';
const IMG_ACCOUNT_ICON = 'https://www.figma.com/api/mcp/asset/39491f29-563e-4004-b233-385077ba70a8';
const IMG_CART_ICON = 'https://www.figma.com/api/mcp/asset/cf8d9202-3ec8-4370-a647-2eefdfeab3fd';

const SELLER_FEATURES = [
  {
    icon: (
      <span className="pdp-assurance__icon-stack">
        <img src={IMG_SELLER_RATED} alt="" className="pdp-assurance__icon-base" />
        <img src={IMG_SELLER_RATED_BADGE} alt="" className="pdp-assurance__icon-overlay" />
      </span>
    ),
    label: 'High rated seller',
  },
  {
    icon: <img src={IMG_ASSURED} alt="" className="pdp-assurance__icon" />,
    label: 'supermall assured',
  },
  {
    icon: <img src={IMG_COD} alt="" className="pdp-assurance__icon" />,
    label: 'Cash on delivery available',
  },
];

const INFO_ROWS = [
  {
    icon: <img src={IMG_NOT_RETURNABLE} alt="" className="pdp-info__icon" />,
    label: 'Not eligible for return',
  },
  {
    icon: (
      <span className="pdp-info__icon-stack">
        <img src={IMG_WARRANTY} alt="" className="pdp-info__icon" />
        <img src={IMG_WARRANTY_BADGE} alt="" className="pdp-info__icon pdp-info__icon--overlay" />
      </span>
    ),
    label: '1 year warranty',
  },
];

export default function PDPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId = 'p1' } = useParams<{ productId: string }>();
  const pdp = getPdpProduct(productId);
  const backTarget =
    typeof location.state?.from === 'string' && !location.state.from.startsWith('/product/')
      ? location.state.from
      : '/shop';
  const [selectedMemory, setSelectedMemory] = useState(pdp.defaultMemory);
  const [selectedColor, setSelectedColor] = useState(pdp.defaultColor);
  const relatedSections = [
    pdp.relatedProducts.slice(0, 2),
    pdp.relatedProducts.slice(2, 4),
  ].filter((products) => products.length > 0);
  const discount = Math.max(
    0,
    Math.round(((pdp.product.originalPrice - pdp.product.sellingPrice) / pdp.product.originalPrice) * 100)
  );

  const cartId = `${pdp.product.id}:${selectedMemory}:${selectedColor}`;
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const itemCount = useCartStore((s) => s.itemCount());
  const cartItem = useCartStore((s) => s.items.find((item) => item.id === cartId));
  const quantity = cartItem?.quantity ?? 0;
  const sourceSection = backTarget.startsWith('/shop') ? 'categories' : 'home';

  function buildCartItem(nextQuantity: number) {
    return {
      id: cartId,
      name: pdp.title,
      price: pdp.product.sellingPrice,
      quantity: nextQuantity,
      imagePublicId: pdp.product.images[0] ?? '',
      variant: { size: selectedMemory, color: selectedColor },
    };
  }

  function increaseQuantity() {
    if (quantity === 0) {
      addItem(buildCartItem(1));
      return;
    }
    updateQuantity(cartId, quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity <= 1) {
      removeItem(cartId);
      return;
    }
    updateQuantity(cartId, quantity - 1);
  }

  function handleBuyNow() {
    if (quantity === 0) {
      addItem(buildCartItem(1));
    }
    navigate('/checkout');
  }

  return (
    <PageTransition>
      <div className="page page--pdp pdp">
        <div className="pdp__scroll">
          <section className="pdp-hero">
            <header className="pdp-hero__header">
              <button
                type="button"
                className="pdp-icon-button"
                aria-label="Go back"
                onClick={() => navigate(backTarget)}
              >
                <ChevronLeft size={20} color="var(--grey-900)" />
              </button>

              <div className="pdp-hero__actions">
                <button type="button" className="pdp-icon-button" aria-label="Search">
                  <SearchIcon size={18} color="var(--grey-900)" />
                </button>
                <button type="button" className="pdp-icon-button" aria-label="Wishlist">
                  <HeartOutline size={18} color="var(--grey-900)" />
                </button>
                <button type="button" className="pdp-icon-button" aria-label="Share product">
                  <ShareIcon size={18} color="var(--grey-900)" />
                </button>
              </div>
            </header>

            <div className="pdp-hero__gallery">
              <img className="pdp-hero__image" src={pdp.product.images[0]} alt={pdp.title} />
              <div className="pdp-hero__controls" aria-hidden="true">
                <img src={IMG_GALLERY_PREV} alt="" className="pdp-hero__control pdp-hero__control--prev" />
                <img src={IMG_GALLERY_PAGER} alt="" className="pdp-hero__pager" />
                <img src={IMG_GALLERY_NEXT} alt="" className="pdp-hero__control pdp-hero__control--next" />
              </div>
            </div>
          </section>

          <section className="pdp-card pdp-card--summary">
            <div className="pdp-summary__main">
              <div className="pdp-summary__overview">
                <div className="pdp-brand-badge">
                  <img src={IMG_BRAND_TICK} alt="" />
                  <span>{pdp.brand}</span>
                </div>

                <div className="pdp-summary__title-row">
                  <h1 className="pdp-summary__title">{pdp.title}</h1>
                  <ChevronDown size={20} color="var(--grey-900)" />
                </div>

                <div className="pdp-summary__meta">
                  <div className="pdp-summary__rating">
                    <div className="pdp-summary__stars" aria-hidden="true">
                      <StarFilled size={14} />
                      <StarFilled size={14} />
                      <StarFilled size={14} />
                      <StarFilled size={14} />
                      <StarFilled size={14} color="rgba(50,149,55,0.35)" />
                    </div>
                    <span className="pdp-summary__reviews">{pdp.reviewSummary}</span>
                  </div>

                  <div className="pdp-summary__badge">
                    <img src={IMG_PREPAID_ICON} alt="" />
                    <span>Prepaid Only</span>
                  </div>
                </div>

                <div className="pdp-summary__price-row">
                  <div className="pdp-summary__price-group">
                    <span className="pdp-summary__price">{pdp.product.currency}{pdp.product.sellingPrice}</span>
                    <span className="pdp-summary__original">{pdp.product.originalPrice}</span>
                    {discount > 0 && <span className="pdp-summary__discount">{discount}% off</span>}
                  </div>

                  <div className="pdp-summary__lowest">
                    <span className="pdp-summary__lowest-icon">
                      <img src={IMG_LOWEST_PRICE} alt="" />
                    </span>
                    <span>Lowest Price in 30 days</span>
                  </div>
                </div>
              </div>

              <div className="pdp-summary__delivery">
                <div className="pdp-summary__delivery-badge">supermall</div>
                <div className="pdp-summary__delivery-copy">
                  <img src={IMG_DELIVERY_FLASH} alt="" />
                  <span>Get in 1 HR 12 MINS</span>
                </div>
              </div>
            </div>

            <div className="pdp-summary__promos">
              {pdp.promos.map((chip) => (
                <button key={chip} type="button" className="pdp-promo-chip">
                  <img src={IMG_COUPON_ICON} alt="" />
                  <span>{chip}</span>
                  <ChevronRight size={14} color="var(--green-700)" />
                </button>
              ))}
            </div>
          </section>

          <section className="pdp-card">
            <div className="pdp-option-group">
              <h2 className="pdp-section-title">Internal Memory</h2>
              <div className="pdp-memory-options">
                {pdp.memoryOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={[
                      'pdp-chip',
                      selectedMemory === option.label ? 'pdp-chip--active' : '',
                      option.disabled ? 'pdp-chip--disabled' : '',
                    ].join(' ').trim()}
                    onClick={() => !option.disabled && setSelectedMemory(option.label)}
                    disabled={option.disabled}
                    aria-pressed={selectedMemory === option.label}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pdp-option-group">
              <h2 className="pdp-section-title">Color name</h2>
              <div className="pdp-color-options">
                {pdp.colorOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={`pdp-color-card${selectedColor === option.label ? ' pdp-color-card--active' : ''}`}
                    onClick={() => setSelectedColor(option.label)}
                    aria-pressed={selectedColor === option.label}
                  >
                    <img src={option.image} alt="" className="pdp-color-card__image" />
                    <span className="pdp-color-card__label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="pdp-card">
            <div className="pdp-assurance">
              {SELLER_FEATURES.map((feature) => (
                <div key={feature.label} className="pdp-assurance__item">
                  {feature.icon}
                  <div className="pdp-assurance__copy">
                    <span>{feature.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pdp-card">
            <h2 className="pdp-section-title">Product highlights</h2>
            <ul className="pdp-highlights">
              {pdp.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="pdp-card">
            <h2 className="pdp-section-title">Additional Information</h2>
            <div className="pdp-info-list">
              {INFO_ROWS.map((row) => (
                <button key={row.label} type="button" className="pdp-info-row">
                  <span className="pdp-info-row__left">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <ChevronRight size={18} color="var(--grey-900)" />
                </button>
              ))}
            </div>
          </section>

          {relatedSections.map((products, index) => (
            <section
              className="pdp-related pdp-related--similar"
              key={index === 0 ? 'similar' : 'viewed'}
            >
              <div className="pdp-related__header">
                <h2 className="pdp-section-title">
                  {index === 0 ? 'Similar products' : 'Customers also viewed'}
                </h2>
              </div>
              <div className="pdp-related__grid pdp-related__grid--rail">
                {products.map((product) => (
                  <div key={product.id} className="pdp-related__item pdp-related__item--rail">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="pdp-sticky">
          <div className="pdp-sticky__cta-row">
            <div className="pdp-sticky__qty">
              <span className="pdp-sticky__qty-label">QTY</span>
              <span className="pdp-sticky__qty-value">{Math.max(quantity, 1)}</span>
            </div>

            <button type="button" className="pdp-sticky__buy-now" onClick={handleBuyNow}>
              Buy now
            </button>

            <div className="pdp-sticky__cart">
              {quantity === 0 ? (
                <button type="button" className="pdp-sticky__cart-button" onClick={increaseQuantity}>
                  Add to cart
                </button>
              ) : (
                <div className="pdp-sticky__stepper">
                  <button
                    type="button"
                    className="pdp-sticky__stepper-button"
                    aria-label="Remove one"
                    onClick={decreaseQuantity}
                  >
                    <MinusIcon size={18} color="var(--colour-neutral-white)" />
                  </button>
                  <span className="pdp-sticky__stepper-value">{quantity}</span>
                  <button
                    type="button"
                    className="pdp-sticky__stepper-button"
                    aria-label="Add one more"
                    onClick={increaseQuantity}
                  >
                    <PlusIcon size={18} color="var(--colour-neutral-white)" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pdp-bottom-nav">
            <div className="pdp-bottom-nav__items">
              <NavLink
                to="/"
                end
                className={`pdp-bottom-nav__item${sourceSection === 'home' ? ' pdp-bottom-nav__item--active' : ''}`}
              >
                <span className="pdp-bottom-nav__indicator" />
                <img src={IMG_HOME_ICON} alt="" className="pdp-bottom-nav__icon" />
                <span className="pdp-bottom-nav__label">Home</span>
              </NavLink>

              <NavLink
                to="/shop"
                className={`pdp-bottom-nav__item${sourceSection === 'categories' ? ' pdp-bottom-nav__item--active' : ''}`}
              >
                <span className="pdp-bottom-nav__indicator" />
                <img src={IMG_CATEGORIES_ICON} alt="" className="pdp-bottom-nav__icon" />
                <span className="pdp-bottom-nav__label">Categories</span>
              </NavLink>

              <button className="pdp-bottom-nav__logo" aria-label="Supermall">
                <div className="pdp-bottom-nav__logo-circle" />
              </button>

              <NavLink to="/account" className="pdp-bottom-nav__item">
                <span className="pdp-bottom-nav__indicator" />
                <img src={IMG_ACCOUNT_ICON} alt="" className="pdp-bottom-nav__icon" />
                <span className="pdp-bottom-nav__label">Account</span>
              </NavLink>

              <NavLink to="/cart" className="pdp-bottom-nav__item">
                <span className="pdp-bottom-nav__indicator" />
                <div className="pdp-bottom-nav__cart-wrap">
                  <img src={IMG_CART_ICON} alt="" className="pdp-bottom-nav__icon" />
                  {itemCount > 0 && (
                    <span className="pdp-bottom-nav__badge">{itemCount > 99 ? '99+' : itemCount}</span>
                  )}
                </div>
                <span className="pdp-bottom-nav__label">Cart</span>
              </NavLink>
            </div>

            <div className="pdp-bottom-nav__home-bar">
              <div className="pdp-bottom-nav__home-indicator" />
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
