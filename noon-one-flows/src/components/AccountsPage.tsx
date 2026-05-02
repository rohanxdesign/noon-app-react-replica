import { useRef, useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "./SmoothCorners";
import {
  CountrySelectorSheet,
  SignOutSheet,
  NeedHelpSheet,
  NotificationsSheet,
  PreferencesSheet,
} from "./AccountSheets";
import oneLogoFrame from "../assets/one-logo-frame.svg";
import oneLogoGroup from "../assets/one-logo-group.svg";
import productPerfume from "../assets/figma-products/perfume.png";
import productHeadphones from "../assets/figma-products/headphones.png";
import productIphone from "../assets/figma-products/iphone.png";
import wishlistSuitcase from "../assets/figma-products/wishlist-suitcase.svg";
import wishlistSneaker from "../assets/figma-products/wishlist-sneaker.svg";
import wishlistRacket from "../assets/figma-products/wishlist-racket.svg";
import wishlistHeart from "../assets/figma-products/wishlist-heart.svg";
import creditCardBg from "../assets/figma-products/credit-card-bg.png";

/* ---------- Field DS tokens (mirrored from Figma 733:13629) ---------- */
const T = {
  color: {
    text: {
      primary: "#0e0e0e",
      deep: "#101628",
      heading: "#1d2539",
      strong: "#343d54",
      body: "#475067",
      muted: "#666d85",
      subtle: "#989fb3",
    },
    surface: {
      canvas: "#ffffff",
      page: "#f9f9fb",
      scrim50: "#fcfcfd",
    },
    border: {
      divider: "#eaecf0",
      hairline: "#f5f5f5",
      subtle: "#f2f3f7",
    },
    brand: { green: "#108757" },
    accent: {
      info: "#0076ff",
      infoDeep: "#0057ff",
      yellow: "#FFE600",
      yellowSoft: "#FFF6BF",
    },
    danger: "#f43333",
  },
};

/* ---------- Inline icons ---------- */

function ChevronRight({ className = "", color = T.color.text.muted }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M5.5 3.5L9 7L5.5 10.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M14.7 3.3a1.5 1.5 0 0 1 2.1 2.1L7.3 14.9 4 16l1.1-3.3 9.6-9.4Z"
        stroke={T.color.text.heading}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M10 2.5a5 5 0 0 1 5 5c0 3.5-5 9-5 9s-5-5.5-5-9a5 5 0 0 1 5-5Z"
        stroke={T.color.text.heading}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="7.5" r="1.6" stroke={T.color.text.heading} strokeWidth="1.4" />
    </svg>
  );
}

function ReturnIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M3 7.5h11a4 4 0 0 1 4 4v.5"
        stroke={T.color.text.heading}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 4.5L3 7.5l3 3" stroke={T.color.text.heading} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="15" height="11" rx="1.6" stroke={T.color.text.heading} strokeWidth="1.4" />
      <line x1="2.5" y1="8.5" x2="17.5" y2="8.5" stroke={T.color.text.heading} strokeWidth="1.4" />
      <rect x="5" y="11.5" width="3.5" height="2" rx="0.5" fill={T.color.text.heading} />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke={T.color.text.heading} strokeWidth="1.4" />
      <path d="M2.5 10h15M10 2.5c2.5 3 2.5 12 0 15M10 2.5c-2.5 3-2.5 12 0 15" stroke={T.color.text.heading} strokeWidth="1.4" />
    </svg>
  );
}

function SlidersIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <line x1="3" y1="6" x2="17" y2="6" stroke={T.color.text.heading} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="3" y1="14" x2="17" y2="14" stroke={T.color.text.heading} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="13" cy="6" r="2" fill="white" stroke={T.color.text.heading} strokeWidth="1.4" />
      <circle cx="7" cy="14" r="2" fill="white" stroke={T.color.text.heading} strokeWidth="1.4" />
    </svg>
  );
}

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M5 8.5a5 5 0 0 1 10 0v3l1.5 2.5h-13L5 11.5v-3Z"
        stroke={T.color.text.heading}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 16a2 2 0 0 0 4 0" stroke={T.color.text.heading} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SignOutIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M12 5V4a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 3 4v12a1.5 1.5 0 0 0 1.5 1.5h6A1.5 1.5 0 0 0 12 16v-1"
        stroke={T.color.danger}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 10h10M14.5 6.5L18 10l-3.5 3.5" stroke={T.color.danger} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NoonOneBadge({ className = "" }: { className?: string }) {
  // Composite of the colourful frame + the "one" wordmark, sized to the
  // Field DS variant used in the noon One banner (~38×21).
  return (
    <div className={`relative inline-block ${className}`} style={{ width: "38px", height: "21px" }}>
      <img
        src={oneLogoFrame}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      <img
        src={oneLogoGroup}
        alt="noon One"
        width={26}
        height={8}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26px] h-[8px]"
      />
    </div>
  );
}

function HelpIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M2.5 7.5C2.5 4.46 4.96 2 8 2s5.5 2.46 5.5 5.5S11.04 13 8 13c-.6 0-1.18-.1-1.71-.27L3 14l1.27-3.29A5.46 5.46 0 0 1 2.5 7.5Z"
        stroke={T.color.accent.info}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M5 3H3v6h6V7M7 3h2v2M9 3L5.5 6.5"
        stroke={T.color.text.muted}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.24-1.46 1.48-1.46H17V4.5c-.27-.04-1.2-.1-2.27-.1-2.25 0-3.79 1.37-3.79 3.9v2.2H8.5v3h2.44V21h2.56Z" fill={T.color.text.heading} />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M16.5 4h2.6l-5.7 6.5L20 20h-5.3l-4.1-5.4L5.7 20H3.1l6.1-7L3 4h5.4l3.7 4.9L16.5 4Zm-.9 14h1.4L8.5 5.5H7L15.6 18Z" fill={T.color.text.heading} />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M6 9h2.6v9H6V9Zm1.3-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10.5 9h2.5v1.3a3 3 0 0 1 2.6-1.4c2.8 0 3.4 1.86 3.4 4.3V18h-2.6v-4c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V18H10.5V9Z" fill={T.color.text.heading} />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`block ${className}`} fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke={T.color.text.heading} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.5" stroke={T.color.text.heading} strokeWidth="1.6" />
      <circle cx="17" cy="7" r="0.8" fill={T.color.text.heading} />
    </svg>
  );
}

function FlagUAE({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={`block ${className} rounded-[3px] overflow-hidden`} aria-hidden="true">
      <rect x="6" y="0" width="18" height="16/3" height="5.33" fill="#00732F" />
      <rect x="6" y="5.33" width="18" height="5.34" fill="#FFFFFF" />
      <rect x="6" y="10.67" width="18" height="5.33" fill="#000000" />
      <rect x="0" y="0" width="6" height="16" fill="#C8102E" />
    </svg>
  );
}

/* ---------- Bottom nav (placeholder) ---------- */

function BottomNav({ active = "account" }: { active?: "home" | "categories" | "deals" | "account" | "cart" }) {
  const items: { key: typeof active; label: string; icon: React.ReactNode }[] = [
    { key: "home", label: "Home", icon: <HomeNavIcon active={active === "home"} /> },
    { key: "categories", label: "Categories", icon: <CategoriesNavIcon active={active === "categories"} /> },
    { key: "deals", label: "Deals", icon: <DealsNavIcon active={active === "deals"} /> },
    { key: "account", label: "Account", icon: <AccountNavIcon active={active === "account"} /> },
    { key: "cart", label: "Cart", icon: <CartNavIcon active={active === "cart"} /> },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#eaecf0] pt-[8px] pb-[28px] flex items-start justify-between px-[8px]">
      {items.map((it) => (
        <div key={it.key} className="flex flex-col items-center gap-[4px] flex-1">
          <div className="size-[22px] flex items-center justify-center">{it.icon}</div>
          <p
            className="font-noontree text-[10px] leading-[12px] tracking-[-0.1px]"
            style={{ color: it.key === active ? T.color.text.deep : T.color.text.muted, fontWeight: it.key === active ? 700 : 500 }}
          >
            {it.label}
          </p>
          {it.key === active && (
            <div className="absolute top-0 h-[2px] w-[40px] rounded-full" style={{ backgroundColor: T.color.text.deep }} />
          )}
        </div>
      ))}
    </div>
  );
}

function navIconStroke(active: boolean) {
  return active ? T.color.text.deep : T.color.text.muted;
}

function HomeNavIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className="size-full" fill="none" aria-hidden="true">
      <path d="M3 11L11 4L19 11V18a1 1 0 0 1-1 1h-3v-5h-4v5H4a1 1 0 0 1-1-1v-7Z" stroke={navIconStroke(active)} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function CategoriesNavIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className="size-full" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={navIconStroke(active)} strokeWidth="1.5" />
      <rect x="12" y="3" width="7" height="7" rx="1.5" stroke={navIconStroke(active)} strokeWidth="1.5" />
      <rect x="3" y="12" width="7" height="7" rx="1.5" stroke={navIconStroke(active)} strokeWidth="1.5" />
      <rect x="12" y="12" width="7" height="7" rx="1.5" stroke={navIconStroke(active)} strokeWidth="1.5" />
    </svg>
  );
}
function DealsNavIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className="size-full" fill="none" aria-hidden="true">
      <path d="M3 11l6 6 10-10V3h-4L3 14v-3Z" stroke={navIconStroke(active)} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="14.5" cy="7.5" r="1.2" fill={navIconStroke(active)} />
    </svg>
  );
}
function AccountNavIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className="size-full" fill="none" aria-hidden="true">
      <circle cx="11" cy="8" r="3.5" stroke={navIconStroke(active)} strokeWidth="1.5" fill={active ? navIconStroke(active) : "none"} />
      <path d="M3.5 19c0-3.5 3.5-6 7.5-6s7.5 2.5 7.5 6" stroke={navIconStroke(active)} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function CartNavIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className="size-full" fill="none" aria-hidden="true">
      <path d="M3 4h2.5l2 11h11l2-7H7" stroke={navIconStroke(active)} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="9" cy="18.5" r="1.4" stroke={navIconStroke(active)} strokeWidth="1.5" />
      <circle cx="16" cy="18.5" r="1.4" stroke={navIconStroke(active)} strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- Fanned product tiles (Field DS pattern) ---------- *
 *
 * Five overlapping mini cards arranged in a fan: two 40×40 back tiles
 * (empty cream gradients for depth), two 50×50 mid tiles holding the
 * left/right products, and one 60×60 centre tile elevated above the
 * others holding the hero product. Total footprint 156×60 — sized to
 * fit inside a 172px-wide parent tile per the Figma layout (733:13635). */
function FannedTiles({
  centerImage,
  leftMidImage,
  rightMidImage,
  centerOverlay,
}: {
  centerImage: string;
  leftMidImage: string;
  rightMidImage: string;
  centerOverlay?: React.ReactNode;
}) {
  const tileGradient =
    "linear-gradient(180deg, rgb(255,255,255) 32.291%, rgb(239,240,243) 143.12%)";
  const centerGradient =
    "linear-gradient(180deg, rgb(255,255,255) 32.291%, rgb(208,212,221) 143.12%)";
  return (
    /* Tile spans: back-left 0→40, mid-left 15→65, center 40→100, mid-right
       76→126, back-right 101→141. Total content width = 141px. Was 156,
       leaving ~15px dead space on the right that visibly pushed the fan
       off-centre inside the parent card. */
    <div className="relative w-[141px] h-[60px] mx-auto">
      {/* Back-left empty card */}
      <div
        className="absolute left-0 top-[10.5px] size-[40px] rounded-[8px] border"
        style={{ background: tileGradient, borderColor: "#f9f9fb" }}
      />
      {/* Back-right empty card */}
      <div
        className="absolute left-[101px] top-[10.5px] size-[40px] rounded-[8px] border"
        style={{ background: tileGradient, borderColor: "#f9f9fb" }}
      />
      {/* Mid-left product */}
      <div
        className="absolute left-[15px] top-[5px] size-[50px] rounded-[8px] border overflow-hidden flex items-center justify-center"
        style={{ background: tileGradient, borderColor: "#f9f9fb" }}
      >
        <img src={leftMidImage} alt="" aria-hidden="true" className="size-[34px] object-contain opacity-90" />
      </div>
      {/* Mid-right product */}
      <div
        className="absolute left-[76px] top-[5px] size-[50px] rounded-[8px] border overflow-hidden flex items-center justify-center"
        style={{ background: tileGradient, borderColor: "#f9f9fb" }}
      >
        <img src={rightMidImage} alt="" aria-hidden="true" className="size-[34px] object-contain opacity-90" />
      </div>
      {/* Hero centre product — elevated above the others */}
      <div
        className="absolute left-[40px] top-0 size-[60px] rounded-[10px] border overflow-hidden flex items-center justify-center relative"
        style={{
          background: centerGradient,
          borderColor: "#eaecf0",
          boxShadow: "0 2px 8px rgba(15,15,25,0.06)",
        }}
      >
        <img src={centerImage} alt="" aria-hidden="true" className="size-[42px] object-contain" />
        {centerOverlay}
      </div>
    </div>
  );
}

/* ---------- Row primitives ---------- */

/* Field DS spec (733:13921 / 221:2937):
 *
 *   Outer card  → bg-white p-[12px] rounded-[16px]
 *   Inner list  → flex flex-col gap-[8px] (gap doubles as the
 *                 separator zone — dashed line sits inside it at 0
 *                 height per Figma)
 *   Each row    → h-[38px], no own padding (gap controls rhythm)
 *   Icon block  → 28×28 with p-[4px] rounded-[8px], contains 20×20 icon
 *   Text        → Noontree Medium 15/18/-0.14, Blue-Gray/1000 #101628 */
function MenuRow({
  icon,
  label,
  trailing,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center w-full h-[38px] cursor-pointer gap-[8px]"
    >
      <div className="size-[28px] rounded-[8px] flex items-center justify-center shrink-0 p-[4px]">
        {icon}
      </div>
      <p
        className="flex-1 font-noontree font-medium text-[15px] leading-[18px] tracking-[-0.14px] text-left whitespace-nowrap"
        style={{ color: T.color.text.deep }}
      >
        {label}
      </p>
      {trailing ?? <ChevronRight className="size-[14px] shrink-0" />}
    </button>
  );
}

/* Dashed separator line — sits in the 8px gap between menu rows. Per
 * Field DS the separator aligns with the text label, NOT the card edge,
 * so we inset by 36px (icon block 28 + 8 gap). Running it under the
 * icon column reads as a divider between rows instead of a "torn page"
 * line, which was the previous mistake. */
function DashedSep() {
  return (
    <div
      className="h-0 border-t border-dashed ml-[36px]"
      style={{ borderColor: T.color.border.divider }}
    />
  );
}

/* ---------- Screen ---------- */

export default function AccountsPage({
  onNoonOne,
  onAddresses,
  onSavedCards,
  onMyAccount,
  onMyOrders,
  onSignedOut,
  embedded = false,
}: {
  /** noon One banner click — routes to the main noon One page. */
  onNoonOne?: () => void;
  /** Addresses menu row → AddressBookPage */
  onAddresses?: () => void;
  /** Saved Cards menu row → SavedCardsPage */
  onSavedCards?: () => void;
  /** Account Security menu row → MyAccountPage */
  onMyAccount?: () => void;
  /** My Orders tile → MyOrdersPage */
  onMyOrders?: () => void;
  /** Fired when sign-out is confirmed (dismisses sheet then routes home). */
  onSignedOut?: () => void;
  /** When true, hides the in-frame BottomNav. Used when this page is
   *  rendered inside the supermall shell (an iframe), where the host
   *  app provides its own bottom nav and we'd otherwise stack two. */
  embedded?: boolean;
}) {
  const [country, setCountry] = useState("AE");
  const [countryOpen, setCountryOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  // Credit-card / Payday-sale carousel state. The dot indicator below
  // the carousel reads `activeSlide` to render the filled dot, and tap
  // handlers on each dot scroll the ref to the right offset.
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-[20px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <StatusBar />

      {/* Scroll body */}
      <div className="relative h-full overflow-y-auto pt-[44px] pb-[100px]">
        <div className="flex flex-col gap-[12px] w-[351px] mx-auto">
          {/* Top profile */}
          <SmoothCorners radius={12} className="bg-white rounded-[12px] flex items-center px-[14px] py-[14px] gap-[12px]">
            <div
              className="size-[44px] rounded-full flex items-center justify-center font-noontree font-bold text-white text-[16px] shrink-0"
              style={{ backgroundColor: "#666d85" }}
            >
              A
            </div>
            <div className="flex-1 flex flex-col gap-[2px] min-w-0">
              <p className="font-bold text-[16px] leading-[20px] tracking-[-0.16px] truncate" style={{ color: T.color.text.heading }}>
                Hala Ayush
              </p>
              <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px] truncate" style={{ color: T.color.text.muted }}>
                aykapoor@noon.com
              </p>
            </div>
            <button
              type="button"
              onClick={onMyAccount}
              className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer shrink-0"
              style={{ borderColor: T.color.border.subtle }}
              aria-label="Edit profile"
            >
              <PencilIcon className="size-[16px]" />
            </button>
          </SmoothCorners>

          {/* noon One banner — Field DS Variant2 spec (1109:34267 ·
              221:2581). h-[66px], yellow-cream base + soft peach radial
              wash, "Get Free Delivery" ExtraBold inline with the noon One
              logo, black "Join One" pill on the right with two decorative
              cream blobs behind the label. Routes to the noon One main
              page. */}
          <SmoothCorners
            as="button"
            radius={16}
            onClick={onNoonOne}
            className="rounded-[16px] relative flex items-center justify-between pl-[14px] pr-[12px] cursor-pointer text-left overflow-hidden h-[66px]"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 50%, rgba(255,168,45,0.55) 0%, rgba(255,168,45,0) 100%), linear-gradient(90deg, #FFF3C0 0%, #FFE99B 100%)",
            }}
          >
            <div className="flex flex-col gap-[3px]">
              <div className="flex items-center gap-[6px]">
                <p
                  className="font-noontree font-extrabold text-[15px] leading-[20px] tracking-[-0.24px]"
                  style={{ color: T.color.text.deep }}
                >
                  Get Free Delivery
                </p>
                <NoonOneBadge />
              </div>
              <p
                className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]"
                style={{ color: "rgba(2,6,12,0.75)" }}
              >
                On food, groceries, &amp; shopping
              </p>
            </div>
            {/* Join One pill with one quiet cream blob tucked into the
                top-right corner — the Field DS uses two larger rotated
                ornaments here, but at this scale a single subtle accent
                reads cleaner than competing circles behind the label. */}
            <div
              className="relative h-[39px] px-[18px] rounded-[12px] overflow-hidden flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#0e0e0e" }}
            >
              <div
                className="absolute size-[28px] rounded-full opacity-90 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #FCEBA8 0%, #DAC398 100%)",
                  right: "-10px",
                  top: "-10px",
                }}
              />
              <span className="relative font-noontree font-semibold text-[13px] leading-none text-white tracking-[-0.13px] whitespace-nowrap">
                Join One
              </span>
            </div>
          </SmoothCorners>

          {/* My Orders + My Wishlist tiles — Field DS fanned-card layout
              with 5 stacked tiles per Figma 733:13635/13636. Two empty
              back-tiles add depth; the three front tiles carry the
              product imagery, with the centre tile elevated and largest. */}
          <div className="grid grid-cols-2 gap-[8px]">
            <SmoothCorners
              radius={12}
              onClick={onMyOrders}
              className="bg-white rounded-[12px] flex flex-col px-[12px] py-[12px] gap-[12px] h-[136px] cursor-pointer items-center justify-center"
            >
              <div className="flex flex-col gap-[2px] items-start w-full">
                <p className="font-bold text-[16px] leading-[20px] tracking-[-0.16px]" style={{ color: T.color.text.heading }}>
                  My Orders
                </p>
                <p className="font-noontree font-medium text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                  manage &amp; returns
                </p>
              </div>
              <FannedTiles
                centerImage={productHeadphones}
                leftMidImage={productPerfume}
                rightMidImage={productIphone}
              />
            </SmoothCorners>
            <SmoothCorners radius={12} className="bg-white rounded-[12px] flex flex-col px-[12px] py-[12px] gap-[12px] h-[136px] cursor-pointer items-center justify-center">
              <div className="flex flex-col gap-[2px] items-start w-full">
                <p className="font-bold text-[16px] leading-[20px] tracking-[-0.16px]" style={{ color: T.color.text.heading }}>
                  My Wishlist
                </p>
                <p className="font-noontree font-medium text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                  add favourites
                </p>
              </div>
              <FannedTiles
                centerImage={wishlistRacket}
                leftMidImage={wishlistSuitcase}
                rightMidImage={wishlistSneaker}
                centerOverlay={
                  <img
                    src={wishlistHeart}
                    alt=""
                    aria-hidden="true"
                    className="absolute right-[3px] top-[3px] size-[10px]"
                  />
                }
              />
            </SmoothCorners>
          </div>

          {/* noon Credits row card. Avatar holds a small "n" wordmark
              (Noontree font). The credit balance uses the noon dirham
              glyph (Noontree PUA U+E001) followed by the amount —
              matches the Figma 733:13629 spec exactly. */}
          <SmoothCorners radius={12} className="bg-white rounded-[12px] flex items-center px-[14px] py-[14px] gap-[12px] cursor-pointer">
            <div className="size-[28px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: T.color.border.subtle }}>
              <span
                className="font-noontree font-extrabold text-[14px] leading-none italic"
                style={{ color: T.color.text.heading }}
              >
                n
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-[1px]">
              <p className="font-bold text-[14px] leading-[18px] tracking-[-0.14px]" style={{ color: T.color.text.heading }}>
                noon Credits
              </p>
              <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                <span className="font-noontree mr-[2px]" aria-label="AED">{""}</span>0
              </p>
            </div>
            <ChevronRight className="size-[14px]" />
          </SmoothCorners>

          {/* noon One Credit Card carousel — horizontal swipe with
              snap-to-card. Card 2 peeks ~16px past the right edge of
              Card 1 so the user knows there's more, then a swipe pulls
              the Payday Sale card into view. The container negates the
              parent's right padding so the peek aligns flush with the
              iPhone frame edge. */}
          <div
            ref={carouselRef}
            onScroll={(e) => {
              // Determine active slide by which card the scroll position
              // is closest to (slide width 351 + gap 8 = 359px stride).
              const idx = Math.round(e.currentTarget.scrollLeft / 359);
              if (idx !== activeSlide) setActiveSlide(idx);
            }}
            className="-mr-[24px] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-[8px] pr-[24px]">
              {/* Card 1 — primary credit card */}
              <SmoothCorners radius={12} className="bg-white rounded-[12px] flex flex-col gap-[12px] px-[14px] py-[14px] shrink-0 snap-start" style={{ width: "351px" }}>
                <div className="flex items-start gap-[12px]">
                  <div className="flex flex-col gap-[10px] flex-1">
                    <p className="font-bold text-[15px] leading-[20px] tracking-[-0.16px]" style={{ color: T.color.text.heading }}>
                      noon One Credit Card
                    </p>
                    <button
                      type="button"
                      className="font-noontree font-semibold text-[12px] leading-none px-[14px] py-[10px] rounded-full text-white w-fit cursor-pointer"
                      style={{ backgroundColor: T.color.text.primary }}
                    >
                      Apply now
                    </button>
                  </div>
                  {/* Credit card visual — uses the actual Field DS card
                      art (PNG with the noon-One Credit Card design:
                      black bg + sneaker/gaming/headphone illustrations
                      + yellow noon phone + VISA Platinum). RAHUL name
                      overlay sits top-left per the Figma. */}
                  <div className="w-[140px] h-[88px] rounded-[10px] shrink-0 relative overflow-hidden border" style={{ borderColor: "#909090" }}>
                    <img
                      src={creditCardBg}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <p
                      className="absolute top-[6px] left-[8px] font-noontree font-bold text-white text-[10px] tracking-[-0.1px] z-10"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
                    >
                      RAHUL
                    </p>
                  </div>
                </div>
                <div
                  className="rounded-[8px] px-[10px] py-[8px] flex items-center gap-[6px] flex-wrap"
                  style={{ backgroundColor: T.color.surface.page }}
                >
                  <p className="font-noontree text-[11px] leading-[14px] tracking-[-0.1px]" style={{ color: T.color.text.body }}>
                    Get Unlimited free Delivery with
                  </p>
                  <NoonOneBadge />
                  <p className="font-noontree text-[11px] leading-[14px] tracking-[-0.1px]" style={{ color: T.color.text.body }}>
                    Upto 20% savings · ₿500 welcome bonus
                  </p>
                </div>
              </SmoothCorners>

              {/* Card 2 — Get Credit placeholder peek. The Payday Sale
                  promo now lives on the noon One main page (SubscribedUser)
                  where members can spot the active perk in their primary
                  noon One context, not buried in account settings. */}
              <SmoothCorners
                radius={12}
                className="bg-white rounded-[12px] flex flex-col gap-[12px] px-[14px] py-[14px] shrink-0 snap-start"
                style={{ width: "351px" }}
              >
                <div className="flex items-start gap-[12px]">
                  <div className="flex flex-col gap-[10px] flex-1">
                    <p
                      className="font-bold text-[15px] leading-[20px] tracking-[-0.16px]"
                      style={{ color: T.color.text.heading }}
                    >
                      Get
                      <br />
                      Credit
                    </p>
                  </div>
                </div>
              </SmoothCorners>
            </div>
          </div>

          {/* Carousel dot indicator — clickable, follows the active
              slide. Tapping a dot scrolls the carousel to that slide
              (smooth) — a fallback for users who don't realise the
              section swipes. */}
          <div className="flex justify-center gap-[4px] -mt-[4px]">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  carouselRef.current?.scrollTo({ left: i * 359, behavior: "smooth" });
                }}
                className="size-[6px] rounded-full cursor-pointer transition-colors duration-150"
                style={{
                  backgroundColor:
                    activeSlide === i ? T.color.text.deep : T.color.border.divider,
                }}
              />
            ))}
          </div>

          {/* Account management menu — outer card has p-12 + rounded-16
              per Field DS spec; inner list uses gap-8 with a dashed
              separator hairline sitting in each gap. */}
          <SmoothCorners radius={16} className="bg-white rounded-[16px] p-[12px] flex flex-col gap-[8px]">
            <MenuRow icon={<PinIcon className="size-[18px]" />} label="Addresses" onClick={onAddresses} />
            <DashedSep />
            <MenuRow icon={<ReturnIcon className="size-[18px]" />} label="Returns" />
            <DashedSep />
            <MenuRow icon={<CardIcon className="size-[18px]" />} label="Saved Cards" onClick={onSavedCards} />
            <DashedSep />
            <MenuRow
              icon={<GlobeIcon className="size-[18px]" />}
              label="Language"
              trailing={
                /* Field DS Language toggle — pill track with the active
                   tab as a white card (Noontree SemiBold 12, Blue-Gray
                   /900) and the inactive as muted text alongside. */
                <div
                  className="flex items-center p-[4px] rounded-full"
                  style={{ backgroundColor: T.color.surface.page }}
                >
                  <span
                    className="font-noontree font-semibold text-[12px] leading-[14px] px-[10px] py-[8px] rounded-[16px] bg-white border whitespace-nowrap"
                    style={{
                      borderColor: T.color.surface.scrim50,
                      color: T.color.text.heading,
                      boxShadow: "-1px 1px 6px rgba(34,34,34,0.04), -1px -1px 6px rgba(34,34,34,0.02)",
                    }}
                  >
                    English
                  </span>
                  <span
                    className="font-noontree font-medium text-[14px] leading-[14px] px-[10px] py-[8px] whitespace-nowrap"
                    style={{ color: T.color.text.muted }}
                    dir="rtl"
                  >
                    العربية
                  </span>
                </div>
              }
            />
            <DashedSep />
            <MenuRow
              icon={<GlobeIcon className="size-[18px]" />}
              label="Country"
              onClick={() => setCountryOpen(true)}
              trailing={
                <div className="flex items-center gap-[8px]">
                  <FlagUAE className="w-[24px] h-[18px]" />
                  <ChevronRight className="size-[14px]" />
                </div>
              }
            />
          </SmoothCorners>

          {/* Preferences card — same architecture, two rows */}
          <SmoothCorners radius={16} className="bg-white rounded-[16px] p-[12px] flex flex-col gap-[8px]">
            <MenuRow icon={<SlidersIcon className="size-[18px]" />} label="Preferences" onClick={() => setPrefOpen(true)} />
            <DashedSep />
            <MenuRow icon={<BellIcon className="size-[18px]" />} label="Notifications" onClick={() => setNotifOpen(true)} />
          </SmoothCorners>

          {/* Sign out card — Account Security moved to the pencil
              edit icon on the profile card at the top of the page,
              since editing your profile *is* the account security
              flow. Keeps this card focused on the destructive
              sign-out action. */}
          <SmoothCorners radius={16} className="bg-white rounded-[16px] p-[12px] flex flex-col gap-[8px]">
            <button
              type="button"
              onClick={() => setSignOutOpen(true)}
              className="flex items-center w-full h-[38px] cursor-pointer gap-[8px]"
            >
              <div className="size-[28px] rounded-[8px] flex items-center justify-center shrink-0 p-[4px]">
                <SignOutIcon className="size-[18px]" />
              </div>
              <p
                className="flex-1 font-noontree font-medium text-[15px] leading-[18px] tracking-[-0.14px] text-left whitespace-nowrap"
                style={{ color: T.color.danger }}
              >
                Sign out
              </p>
              <ChevronRight className="size-[14px] shrink-0" color={T.color.danger} />
            </button>
          </SmoothCorners>

          {/* Footer */}
          <div className="flex flex-col items-center gap-[14px] pt-[18px] pb-[8px]">
            <div className="flex items-center gap-[14px]">
              <button type="button" className="font-noontree text-[12px] cursor-pointer" style={{ color: T.color.text.body }}>
                Policies
              </button>
              <button type="button" className="font-noontree text-[12px] cursor-pointer flex items-center gap-[2px]" style={{ color: T.color.text.body }}>
                Sell on noon
                <ExternalIcon className="size-[10px]" />
              </button>
            </div>
            <div className="flex items-center gap-[10px]">
              {[
                { Icon: FacebookIcon, key: "fb" },
                { Icon: XIcon, key: "x" },
                { Icon: LinkedInIcon, key: "li" },
                { Icon: InstagramIcon, key: "ig" },
              ].map(({ Icon, key }) => (
                <div
                  key={key}
                  className="size-[34px] rounded-full flex items-center justify-center border"
                  style={{ borderColor: T.color.border.divider }}
                >
                  <Icon className="size-[18px]" />
                </div>
              ))}
            </div>
            <p className="font-noontree text-[11px]" style={{ color: T.color.text.muted }}>
              © 2025 noon. All Rights Reserved
            </p>
            <div className="flex flex-col items-center gap-[2px] pt-[6px]">
              <p className="font-noontree text-[11px]" style={{ color: T.color.text.muted }}>
                You joined the noon app in June 2022.
              </p>
              <p className="font-noontree text-[11px]" style={{ color: T.color.text.muted }}>
                Version 4.63.0 designed with care in every detail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "Need help?" pill — anchors to the right edge at the
          level of the menu rows, per the Field DS placement on the
          Accounts Page. Sits well above the bottom nav so it doesn't
          collide with the credit-card section. */}
      <div className="absolute right-[14px] bottom-[160px] z-20">
        <button
          type="button"
          onClick={() => setHelpOpen(true)}
          className="flex items-center gap-[6px] px-[12px] py-[8px] rounded-full bg-white border cursor-pointer"
          style={{ borderColor: T.color.accent.info, color: T.color.accent.info, boxShadow: "0 4px 12px rgba(15,15,25,0.06)" }}
        >
          <HelpIcon className="size-[12px]" />
          <span className="font-noontree font-semibold text-[12px] leading-none">
            Need help?
          </span>
        </button>
      </div>

      {/* Sheets — mounted at the iPhone-frame level so they overlay
          the entire accounts page (incl. the bottom nav). */}
      <CountrySelectorSheet
        open={countryOpen}
        selected={country}
        onClose={() => setCountryOpen(false)}
        onSelect={(code) => {
          setCountry(code);
          setCountryOpen(false);
        }}
      />
      <NeedHelpSheet open={helpOpen} onClose={() => setHelpOpen(false)} />
      <NotificationsSheet open={notifOpen} onClose={() => setNotifOpen(false)} />
      <PreferencesSheet open={prefOpen} onClose={() => setPrefOpen(false)} />
      <SignOutSheet
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onConfirm={() => {
          setSignOutOpen(false);
          onSignedOut?.();
        }}
      />

      {/* Bottom nav — hidden when embedded inside the supermall shell;
          the host app provides the real navigation in that mode. */}
      {!embedded && <BottomNav active="account" />}
    </div>
  );
}
