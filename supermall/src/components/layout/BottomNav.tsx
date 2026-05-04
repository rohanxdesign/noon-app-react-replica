import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import './BottomNav.css';

// Auto-hide thresholds
const HIDE_AFTER_PX  = 24; // ignore tiny taps; only hide once we've scrolled past this
const DELTA_PX       = 6;  // direction-change deadband to avoid flicker

const IMG_SUPERMALL_LOGO = 'https://www.figma.com/api/mcp/asset/4928877e-20eb-4845-acfe-715ebec66497';

// Active / inactive nav stroke colours. The active blue is the brand
// link colour; inactive uses Field DS muted text.
const ACTIVE_COLOR = '#0F61FF';
const INACTIVE_COLOR = '#475067';

const stroke = (active: boolean) => (active ? ACTIVE_COLOR : INACTIVE_COLOR);

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" fill="none" aria-hidden="true">
      <path
        d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-4v-6h-4v6H4a1 1 0 0 1-1-1v-8.5Z"
        stroke={stroke(active)}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoriesIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" stroke={stroke(active)} strokeWidth="1.6" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6" stroke={stroke(active)} strokeWidth="1.6" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6" stroke={stroke(active)} strokeWidth="1.6" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1.6" stroke={stroke(active)} strokeWidth="1.6" />
    </svg>
  );
}

function AccountIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.6" stroke={stroke(active)} strokeWidth="1.6" />
      <path
        d="M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6"
        stroke={stroke(active)}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" fill="none" aria-hidden="true">
      <path
        d="M3 4.5h2.7l2.1 11.5h11.4l2-7.5H7.5"
        stroke={stroke(active)}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="9.5" cy="20" r="1.5" stroke={stroke(active)} strokeWidth="1.6" />
      <circle cx="17" cy="20" r="1.5" stroke={stroke(active)} strokeWidth="1.6" />
    </svg>
  );
}

export function BottomNav() {
  const itemCount = useCartStore((s) => s.itemCount());
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  // Per-element last scroll position, keyed by element identity.
  const lastTopsRef = useRef(new WeakMap<Element, number>());

  // Reset visibility whenever the route changes (each page mounts a fresh
  // scroll container at the top).
  useEffect(() => {
    setHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    let ticking = false;

    function onScroll(e: Event) {
      const target = e.target as Element | null;
      if (!target || target.nodeType !== 1) return;
      const top =
        (target as Element & { scrollTop?: number }).scrollTop ??
        (target as unknown as Document).documentElement?.scrollTop ??
        0;
      const lastTops = lastTopsRef.current;
      const last = lastTops.get(target) ?? 0;
      const dy = top - last;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (Math.abs(dy) > DELTA_PX) {
            if (dy > 0 && top > HIDE_AFTER_PX) setHidden(true);
            else if (dy < 0) setHidden(false);
            lastTops.set(target, top);
          } else if (top <= HIDE_AFTER_PX) {
            // Always reveal when near the top.
            setHidden(false);
            lastTops.set(target, top);
          }
          ticking = false;
        });
      }
    }

    // Scroll events don't bubble — capture-phase listener catches scrolls
    // from any nested element (per-page scroll containers).
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, []);

  return (
    <nav className={`bottom-nav${hidden ? ' bottom-nav--hidden' : ''}`}>
      <div className="bottom-nav__items">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className="bottom-nav__indicator" />
              <HomeIcon active={isActive} />
              <span className="bottom-nav__label">Home</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className="bottom-nav__indicator" />
              <CategoriesIcon active={isActive} />
              <span className="bottom-nav__label">Categories</span>
            </>
          )}
        </NavLink>

        {/* Centre logo */}
        <button className="bottom-nav__logo" aria-label="Supermall">
          <div className="bottom-nav__logo-circle">
            <img src={IMG_SUPERMALL_LOGO} alt="" className="bottom-nav__logo-img" />
          </div>
        </button>

        <NavLink
          to="/account"
          className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className="bottom-nav__indicator" />
              <AccountIcon active={isActive} />
              <span className="bottom-nav__label">Account</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className="bottom-nav__indicator" />
              <div className="bottom-nav__cart-wrap">
                <CartIcon active={isActive} />
                {itemCount > 0 && (
                  <span className="bottom-nav__badge">{itemCount > 99 ? '99+' : itemCount}</span>
                )}
              </div>
              <span className="bottom-nav__label">Cart</span>
            </>
          )}
        </NavLink>
      </div>

      {/* iOS home indicator */}
      <div className="bottom-nav__home-bar">
        <div className="bottom-nav__home-indicator" />
      </div>
    </nav>
  );
}
