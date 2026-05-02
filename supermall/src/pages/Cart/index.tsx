import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import { ChevronLeft, ChevronDown, ChevronRight } from '../../components/ui/icons';
import './Cart.css';

/* ── Cart assets (downloaded from Figma) ──────────────────────────────────── */
import IMG_PRODUCT from '../../assets/cart/product.png';
import IMG_COUPON from '../../assets/cart/coupon.svg';
import IMG_FULFIL_BG from '../../assets/cart/fulfil-bg.svg';
import IMG_SUPERMALL_A from '../../assets/cart/supermall-a.svg';
import IMG_SUPERMALL_B from '../../assets/cart/supermall-b.svg';
import IMG_EXPRESS_BG from '../../assets/cart/express-bg.svg';
import IMG_EXPRESS_FG from '../../assets/cart/express-fg.svg';
import IMG_TABBY from '../../assets/cart/tabby.svg';
import IMG_TAMARA from '../../assets/cart/tamara.svg';
import IMG_APPLEPAY from '../../assets/cart/applepay.svg';
import IMG_VISA from '../../assets/cart/visa.png';
import IMG_NOON_CARD from '../../assets/cart/noon-card.png';
import IMG_CASH from '../../assets/cart/cash.svg';
import IMG_NOON_ONE_LOGO from '../../assets/cart/noon-one-a.svg';
import IMG_NOON_ONE_LOGO_B from '../../assets/cart/noon-one-b.svg';
import IMG_NOON_ONE_LOGO_C from '../../assets/cart/noon-one-c.svg';
import IMG_SAVINGS_WAVE from '../../assets/cart/savings-wave.svg';
import IMG_DIVIDER from '../../assets/cart/divider.svg';
import IMG_ARROW from '../../assets/cart/arrow.svg';

// SAR / Dirham PUA glyph (from Noontree font, used in Figma at )
const SAR = '';

/* ── Shipment data ────────────────────────────────────────────────────────── */
type FulfilBadge = 'supermall' | 'express';

interface ShipmentItem {
  id: string;
  image: string;
  qty: number;
  name: string;
  price: number;
  oldPrice: number;
  discountPct: number;
  discountAmt?: number;
}
interface Shipment {
  id: string;
  itemCount: number;
  items: ShipmentItem[];
  fulfilLabel: string;
  fulfilValue: string;
  fulfilBadge: FulfilBadge;
  saveOnFees?: boolean;
  needToday?: boolean;
}

const PRODUCT_NAME =
  'Apple Watch Series 9 GPS 41mm Silver Aluminium Case With Storm Blue Sport Band';

const shipments: Shipment[] = [
  {
    id: 's1',
    itemCount: 1,
    items: [
      { id: 's1-i1', image: IMG_PRODUCT, qty: 1, name: PRODUCT_NAME, price: 109, oldPrice: 209, discountPct: 47 },
    ],
    fulfilLabel: 'Get it',
    fulfilValue: 'Today before 8pm',
    fulfilBadge: 'supermall',
  },
  {
    id: 's2',
    itemCount: 2,
    items: [
      { id: 's2-i1', image: IMG_PRODUCT, qty: 2, name: PRODUCT_NAME, price: 109, oldPrice: 209, discountPct: 47, discountAmt: 20 },
    ],
    fulfilLabel: 'Get it in',
    fulfilValue: '1 hr 12 mins',
    fulfilBadge: 'supermall',
    saveOnFees: true,
  },
  {
    id: 's3',
    itemCount: 1,
    items: [
      { id: 's3-i1', image: IMG_PRODUCT, qty: 1, name: PRODUCT_NAME, price: 109, oldPrice: 209, discountPct: 47 },
    ],
    fulfilLabel: 'Get it',
    fulfilValue: 'Today before 8pm',
    fulfilBadge: 'express',
  },
  {
    id: 's4',
    itemCount: 1,
    items: [
      { id: 's4-i1', image: IMG_PRODUCT, qty: 1, name: PRODUCT_NAME, price: 109, oldPrice: 209, discountPct: 47, discountAmt: 20 },
    ],
    fulfilLabel: 'Get it',
    fulfilValue: 'Sat, 17 September',
    fulfilBadge: 'express',
    needToday: true,
  },
];

/* ── Pills ────────────────────────────────────────────────────────────────── */
function SupermallPill() {
  return (
    <span className="cart-pill cart-pill--supermall">
      <img src={IMG_SUPERMALL_A} alt="" className="cart-pill__a" />
      <img src={IMG_SUPERMALL_B} alt="" className="cart-pill__b" />
    </span>
  );
}
function ExpressPill() {
  return (
    <span className="cart-pill cart-pill--express">
      <img src={IMG_EXPRESS_BG} alt="" className="cart-pill__bg" />
      <img src={IMG_EXPRESS_FG} alt="" className="cart-pill__fg" />
    </span>
  );
}

/* ── Shipment card ────────────────────────────────────────────────────────── */
function ShipmentCard({ shipment, index }: { shipment: Shipment; index: number }) {
  const item = shipment.items[0];
  return (
    <section className="cart-shipment">
      <header className="cart-shipment__header">
        <span className="cart-shipment__title">SHIPMENT {index + 1}</span>
        <span className="cart-shipment__count">
          {shipment.itemCount} item{shipment.itemCount > 1 ? 's' : ''}
        </span>
      </header>

      <div className="cart-shipment__items">
        <div className="cart-item">
          <div className="cart-item__thumb">
            <img src={item.image} alt="" className="cart-item__img" />
            <span className="cart-item__qty">
              <span className="cart-item__qty-x">X</span>
              <span className="cart-item__qty-n">{item.qty}</span>
            </span>
          </div>
          <div className="cart-item__info">
            <p className="cart-item__name">{item.name}</p>
            <div className="cart-item__price-row">
              <span className="cart-item__price">{SAR}{item.price}</span>
              <span className="cart-item__strike">{SAR}{item.oldPrice}</span>
              <span className="cart-item__off">{item.discountPct}% OFF</span>
            </div>
            {item.discountAmt && (
              <div className="cart-item__warranty">
                <img src={IMG_COUPON} alt="" className="cart-item__warranty-icon" />
                <span>Discount {SAR}{item.discountAmt}.00</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cart-shipment__fulfil">
        <img src={IMG_FULFIL_BG} alt="" className="cart-shipment__fulfil-wave" aria-hidden />
        <div className="cart-shipment__fulfil-row">
          <div className="cart-shipment__fulfil-text">
            <span className="cart-shipment__fulfil-label">{shipment.fulfilLabel}</span>
            <span className="cart-shipment__fulfil-value">{shipment.fulfilValue}</span>
          </div>
          {shipment.fulfilBadge === 'supermall' ? <SupermallPill /> : <ExpressPill />}
        </div>
      </div>

      {(shipment.saveOnFees || shipment.needToday) && (
        <button type="button" className="cart-shipment__need">
          <span>{shipment.saveOnFees ? 'Save on fees with later delivery' : 'Need it today?'}</span>
          <ChevronDown size={14} color="var(--grey-700)" />
        </button>
      )}
    </section>
  );
}

/* ── Delivery instructions ────────────────────────────────────────────────── */
function DeliveryInstructions() {
  const [together, setTogether] = useState(false);
  const [door, setDoor] = useState(true);
  return (
    <section className="cart-card">
      <header className="cart-card__header">
        <h3 className="cart-card__title">Delivery instructions</h3>
        <span className="cart-info-icon" aria-hidden>i</span>
      </header>
      <div className="cart-instr-grid">
        <button
          type="button"
          className={`cart-instr${together ? ' cart-instr--active' : ''}`}
          onClick={() => setTogether((v) => !v)}
        >
          <div className="cart-instr__top">
            <span className="cart-instr__icon" aria-hidden>📦</span>
            <span className={`cart-checkbox${together ? ' cart-checkbox--on' : ''}`}>
              {together && <span className="cart-checkbox__tick">✓</span>}
            </span>
          </div>
          <span className="cart-instr__label">Get items together</span>
        </button>
        <button
          type="button"
          className={`cart-instr${door ? ' cart-instr--active' : ''}`}
          onClick={() => setDoor((v) => !v)}
        >
          <div className="cart-instr__top">
            <span className="cart-instr__icon" aria-hidden>🚪</span>
            <span className={`cart-checkbox${door ? ' cart-checkbox--on' : ''}`}>
              {door && <span className="cart-checkbox__tick">✓</span>}
            </span>
          </div>
          <span className="cart-instr__label">Leave at the door</span>
        </button>
      </div>
    </section>
  );
}

/* ── Receiver ─────────────────────────────────────────────────────────────── */
function ReceiverDetails() {
  return (
    <section className="cart-card cart-receiver">
      <h3 className="cart-card__title">Receiver details</h3>
      <div className="cart-receiver__row">
        <div className="cart-receiver__avatar" aria-hidden>📞</div>
        <div className="cart-receiver__info">
          <p className="cart-receiver__name">Rahul Jaiswal</p>
          <p className="cart-receiver__phone">+96872347847</p>
        </div>
        <button type="button" className="cart-link">Change receiver</button>
      </div>
    </section>
  );
}

/* ── Points & Vouchers ────────────────────────────────────────────────────── */
function PointsVouchers() {
  return (
    <section className="cart-card">
      <h3 className="cart-card__title">Points &amp; Vouchers</h3>
      <p className="cart-muted">Top up now!</p>
      <div className="cart-loyalty">
        <div className="cart-loyalty__card">
          <div className="cart-loyalty__visa">VISA</div>
          <div>
            <p className="cart-loyalty__name">Mokafaa Points</p>
            <p className="cart-loyalty__sub">Linked</p>
          </div>
        </div>
        <div className="cart-loyalty__chips">
          <span className="cart-chip cart-chip--green">b</span>
          <span className="cart-chip cart-chip--blue">a</span>
          <span className="cart-chip cart-chip--purple">s</span>
        </div>
      </div>
    </section>
  );
}

/* ── Pay With ─────────────────────────────────────────────────────────────── */
function NoonOneInline() {
  return (
    <span className="cart-noon-one-inline">
      <span className="cart-noon-one-inline__crop">
        <img src={IMG_NOON_ONE_LOGO} alt="" />
        <img src={IMG_NOON_ONE_LOGO_B} alt="" />
        <img src={IMG_NOON_ONE_LOGO_C} alt="" />
      </span>
    </span>
  );
}

function PayWith() {
  const [credits, setCredits] = useState(true);
  const [selected, setSelected] = useState('card');

  return (
    <section className="cart-card cart-paywith">
      <h3 className="cart-card__title">Pay With</h3>

      <button
        type="button"
        className="cart-credits"
        onClick={() => setCredits((v) => !v)}
      >
        <span className={`cart-toggle${credits ? ' cart-toggle--on' : ''}`}>
          <span className="cart-toggle__knob" />
        </span>
        <span className="cart-credits__text">
          Use my <span className="cart-credits__amount">{SAR}50.50</span> noon credits
        </span>
      </button>
      <p className="cart-paywith__sub">
        Select another method to cover the remaining{' '}
        <span className="cart-paywith__sub-amount">{SAR}139.50</span>
      </p>

      <div className="cart-pay-list">
        {/* Tabby */}
        <button
          type="button"
          className={`cart-pay${selected === 'tabby' ? ' cart-pay--checked' : ''}`}
          onClick={() => setSelected('tabby')}
        >
          <span className="cart-pay__brand cart-pay__brand--tabby">
            <img src={IMG_TABBY} alt="Tabby" />
          </span>
          <span className="cart-pay__info">
            <span className="cart-pay__title-row">
              <span className="cart-pay__name">Tabby</span>
              <span className="cart-pay__new">NEW</span>
            </span>
            <span className="cart-pay__sub">Pay 4 interest free payments of {SAR}55</span>
          </span>
        </button>

        {/* Tamara */}
        <button
          type="button"
          className={`cart-pay${selected === 'tamara' ? ' cart-pay--checked' : ''}`}
          onClick={() => setSelected('tamara')}
        >
          <span className="cart-pay__brand cart-pay__brand--tamara">
            <img src={IMG_TAMARA} alt="Tamara" />
          </span>
          <span className="cart-pay__info">
            <span className="cart-pay__name">Tamara</span>
            <span className="cart-pay__sub">Pay {SAR}55 or in 4 payments. no late fees</span>
          </span>
        </button>

        {/* Apple Pay */}
        <button
          type="button"
          className={`cart-pay${selected === 'apple' ? ' cart-pay--checked' : ''}`}
          onClick={() => setSelected('apple')}
        >
          <span className="cart-pay__brand cart-pay__brand--apple">
            <img src={IMG_APPLEPAY} alt="Apple Pay" />
          </span>
          <span className="cart-pay__info">
            <span className="cart-pay__name">Apple Pay</span>
          </span>
        </button>

        {/* Debit/Credit Card (selected/expanded) */}
        <div
          className={`cart-pay-stack${selected === 'card' ? ' cart-pay-stack--selected' : ''}`}
        >
          <button
            type="button"
            className="cart-pay cart-pay--expanded"
            onClick={() => setSelected('card')}
          >
            <span className="cart-pay__brand cart-pay__brand--cardplaceholder">CARD</span>
            <span className="cart-pay__info">
              <span className="cart-pay__name">Debit/Credit Card</span>
            </span>
            <span className="cart-pay__add">Add/Change</span>
          </button>

          {selected === 'card' && (
            <>
              <div className="cart-pay-active">
                <span className="cart-pay__brand cart-pay__brand--card">
                  <img src={IMG_VISA} alt="Visa" />
                </span>
                <span className="cart-pay-active__info">
                  <span className="cart-pay-active__title">
                    Yomna Yassin&apos;s de…
                    <span className="cart-pay-active__sep">|</span>
                    <span className="cart-pay-active__dots">
                      <span /><span /><span /><span />
                    </span>
                    <span className="cart-pay-active__last">6280</span>
                  </span>
                  <span className="cart-pay__sub">Installments Available {SAR}200/mo</span>
                </span>
                <span className="cart-pay-cvv">CVV</span>
              </div>

              <div className="cart-pay-emi">
                <span>Select an installment starting {SAR}590/mo</span>
                <span className="cart-pay-emi__chev">
                  <ChevronRight size={10} color="#fff" />
                </span>
              </div>
            </>
          )}
        </div>

        {/* noon One Credit Card */}
        <button
          type="button"
          className={`cart-pay cart-pay--noon${selected === 'noon-card' ? ' cart-pay--checked' : ''}`}
          onClick={() => setSelected('noon-card')}
        >
          <span className="cart-pay__brand cart-pay__brand--noon">
            <img src={IMG_NOON_CARD} alt="" />
          </span>
          <span className="cart-pay__info">
            <span className="cart-pay__name">noon One Credit Card</span>
            <span className="cart-pay__sub cart-pay__sub--green">
              Extra {SAR}110.20 Cashback {SAR}55
            </span>
          </span>
          <span className="cart-pay-apply">Apply Now</span>
        </button>

        {/* Cash on Delivery */}
        <button
          type="button"
          className={`cart-pay${selected === 'cod' ? ' cart-pay--checked' : ''}`}
          onClick={() => setSelected('cod')}
        >
          <span className="cart-pay__brand cart-pay__brand--cash">
            <img src={IMG_CASH} alt="" />
          </span>
          <span className="cart-pay__info">
            <span className="cart-pay__name">Cash on Delivery</span>
          </span>
        </button>
      </div>
    </section>
  );
}

/* ── Payment Summary ──────────────────────────────────────────────────────── */
function PaymentSummary() {
  return (
    <section className="cart-summary">
      <div className="cart-summary__card">
        <h3 className="cart-summary__title">Payment summary</h3>

        <div className="cart-summary__breakdown">
          <div className="cart-summary__row">
            <span className="cart-summary__label cart-summary__label--dotted">Subtotal</span>
            <span className="cart-summary__right">
              <span className="cart-summary__strike">AED 80.60</span>
              <span className="cart-summary__amt">{SAR}45.60</span>
            </span>
          </div>

          <div className="cart-summary__row">
            <span className="cart-summary__label cart-summary__label--underline">Delivery fee</span>
            <span className="cart-summary__right">
              <span className="cart-summary__free">Free with</span>
              <NoonOneInline />
              <span className="cart-summary__amt">{SAR}7.00</span>
            </span>
          </div>

          <img src={IMG_DIVIDER} alt="" className="cart-summary__divider" aria-hidden />

          <div className="cart-summary__row">
            <span className="cart-summary__label">Coupon discount</span>
            <span className="cart-summary__amt">– {SAR}2.00</span>
          </div>

          <img src={IMG_DIVIDER} alt="" className="cart-summary__divider" aria-hidden />

          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>{SAR}45.60</span>
          </div>
        </div>

        <div className="cart-savings">
          <img src={IMG_SAVINGS_WAVE} alt="" className="cart-savings__wave" aria-hidden />
          <div className="cart-savings__inner">
            <div className="cart-savings__row">
              <span>Coupon Cashback</span>
              <span className="cart-savings__amt">{SAR}30</span>
            </div>
            <div className="cart-savings__row">
              <span>noon one credit card</span>
              <span className="cart-savings__amt">{SAR}45</span>
            </div>
            <p className="cart-savings__note">
              cashback will be credited to the primary cardholder&rsquo;s account
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Bottom dock with framer-motion swipe-to-confirm ──────────────────────── */
function BottomDock() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const x = useMotionValue(0);
  // As the handle slides right, fade the centered "ENTER CVV" text.
  const labelOpacity = useTransform(x, (v) => {
    if (maxX <= 0) return 1;
    const r = Math.max(0, Math.min(1, v / maxX));
    return 1 - r;
  });

  useEffect(() => {
    function compute() {
      const el = trackRef.current;
      if (!el) return;
      const handleWidth = 54;
      const padding = 8 * 2;
      setMaxX(Math.max(0, el.clientWidth - handleWidth - padding));
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  function handleDragEnd() {
    if (x.get() >= maxX * 0.85) {
      animate(x, maxX, { type: 'spring', stiffness: 400, damping: 40 });
      setConfirmed(true);
      setTimeout(() => {
        // reset for prototype
        animate(x, 0, { type: 'spring', stiffness: 400, damping: 40 });
        setConfirmed(false);
      }, 1600);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 40 });
    }
  }

  return (
    <footer className="cart-dock">
      <div ref={trackRef} className="cart-swipe">
        <motion.div
          className="cart-swipe__handle"
          drag="x"
          dragConstraints={{ left: 0, right: maxX }}
          dragElastic={0}
          dragMomentum={false}
          style={{ x }}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.97 }}
        >
          <img src={IMG_ARROW} alt="" className="cart-swipe__arrow" />
        </motion.div>
        <motion.span
          className="cart-swipe__label"
          style={{ opacity: labelOpacity }}
        >
          {confirmed ? 'CONFIRMED' : 'ENTER CVV'}
        </motion.span>
      </div>

      <div className="cart-dock__total">
        <span className="cart-dock__items">4 Items</span>
        <span className="cart-dock__amount">
          <span className="cart-dock__currency">AED</span>
          <span>1,643.00</span>
        </span>
      </div>
    </footer>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function CartPage() {
  return (
    <PageTransition>
      <div className="cart-page">
        <header className="cart-header">
          <button type="button" aria-label="Back" className="cart-header__back">
            <ChevronLeft size={20} color="var(--grey-900)" />
          </button>
          <button type="button" className="cart-header__addr">
            <span className="cart-header__addr-row">
              <span className="cart-header__addr-label">Delivering to Home</span>
              <ChevronDown size={14} color="var(--grey-900)" />
            </span>
            <span className="cart-header__addr-text">
              Villa 52, Springville, K. VGP Layout, Mh…
            </span>
          </button>
        </header>

        <div className="cart-scroll">
          <div className="cart-stack">
            {shipments.map((s, i) => (
              <ShipmentCard key={s.id} shipment={s} index={i} />
            ))}
            <DeliveryInstructions />
            <ReceiverDetails />
            <PointsVouchers />
            <PayWith />
            <PaymentSummary />
          </div>
        </div>

        <BottomDock />
      </div>
    </PageTransition>
  );
}
