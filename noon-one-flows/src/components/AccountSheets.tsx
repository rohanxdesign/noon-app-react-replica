import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothCorners from "./SmoothCorners";

/* ---------- Field DS tokens (pulled from Figma 718:29052/30991/28473) ---------- */
const T = {
  color: {
    text: { primary: "#0e0e0e", deep: "#101628", heading: "#1d2539", body: "#475067", muted: "#666d85" },
    surface: { canvas: "#ffffff", page: "#f9f9fb", scrim50: "#fcfcfd" },
    border: { divider: "#eaecf0", subtle: "#f2f3f7" },
    brand: { green: "#108757", greenSoft: "#e7f6f0" },
    danger: "#de1c1c",
    dangerSoft: "#fde6e6",
  },
};

/* ============================================================
 *  Generic sheet shell — notch + sliding card from bottom
 * ============================================================ */

function SheetShell({
  open,
  onClose,
  children,
  /** When true, the inner card uses the floating Field DS variant
   *  (rounded all four corners, gray bg, 12px side margins). When
   *  false, it sits flush at the bottom edge with white bg. */
  floating = false,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  floating?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 z-30 bg-black/40 rounded-[20px]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.85 }}
            className={`absolute z-40 ${floating ? "left-[12px] right-[12px] bottom-[16px]" : "left-0 right-0 bottom-0"}`}
          >
            <div
              className={`relative ${floating ? "rounded-[16px]" : "rounded-tl-[20px] rounded-tr-[20px]"} overflow-hidden`}
              style={{
                backgroundColor: floating ? T.color.surface.page : T.color.surface.canvas,
                boxShadow: "0 -12px 32px rgba(15,15,25,0.12)",
              }}
            >
              {/* Notch */}
              <div className="flex justify-center pt-[10px] pb-[6px]">
                <div className="bg-[#dadde6] h-[5px] w-[40px] rounded-[3px]" />
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
 *  Country selector sheet
 * ============================================================ */

type Country = {
  code: string;
  name: string;
  flag: React.ReactNode;
};

/* Inline SVG flags — simplified but recognisable. Sized to 28×20
 * matching the Field DS spec. */
function flagBase(stroke = T.color.border.divider) {
  return { borderRadius: "3px", border: `0.5px solid ${stroke}`, overflow: "hidden" } as const;
}

function FlagSA({ className = "" }: { className?: string }) {
  // Saudi Arabia: solid green field with a small white scimitar/inscription
  // hint along the top — no clunky text overlay.
  return (
    <div className={`${className} relative`} style={{ ...flagBase(), width: "28px", height: "20px", backgroundColor: "#006C35" }}>
      <svg viewBox="0 0 28 20" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Stylised inscription line */}
        <path d="M5 8 L23 8" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        {/* Scimitar sword */}
        <path d="M5 13 Q14 11 22 13" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M22 13 L24 12.2" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
function FlagAE({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} relative flex`} style={{ ...flagBase(), width: "28px", height: "20px" }}>
      <div style={{ backgroundColor: "#EF3340", width: "7px", height: "100%" }} />
      <div className="flex flex-col flex-1">
        <div style={{ backgroundColor: "#009639", flex: 1 }} />
        <div style={{ backgroundColor: "#FFFFFF", flex: 1 }} />
        <div style={{ backgroundColor: "#000000", flex: 1 }} />
      </div>
    </div>
  );
}
function FlagEG({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} relative flex flex-col`} style={{ ...flagBase(), width: "28px", height: "20px" }}>
      <div style={{ backgroundColor: "#CE1126", flex: 1 }} />
      <div style={{ backgroundColor: "#FFFFFF", flex: 1 }} />
      <div style={{ backgroundColor: "#000000", flex: 1 }} />
    </div>
  );
}
function FlagKW({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} relative flex flex-col`} style={{ ...flagBase(), width: "28px", height: "20px" }}>
      <div style={{ backgroundColor: "#007A3D", flex: 1 }} />
      <div style={{ backgroundColor: "#FFFFFF", flex: 1 }} />
      <div style={{ backgroundColor: "#CE1126", flex: 1 }} />
      <div className="absolute left-0 top-0 bottom-0 w-[7px]" style={{ backgroundColor: "#000000", clipPath: "polygon(0 0, 100% 25%, 100% 75%, 0 100%)" }} />
    </div>
  );
}
function FlagQA({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} relative flex`} style={{ ...flagBase(), width: "28px", height: "20px", backgroundColor: "#8A1538" }}>
      <div className="bg-white" style={{ width: "10px", height: "100%", clipPath: "polygon(100% 0, 0 0, 100% 11%, 0 22%, 100% 33%, 0 44%, 100% 55%, 0 66%, 100% 77%, 0 88%, 100% 100%, 0 100%)" }} />
    </div>
  );
}
function FlagOM({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} relative flex`} style={{ ...flagBase(), width: "28px", height: "20px" }}>
      <div style={{ backgroundColor: "#DB161B", width: "8px", height: "100%" }} />
      <div className="flex flex-col flex-1">
        <div style={{ backgroundColor: "#FFFFFF", flex: 1 }} />
        <div style={{ backgroundColor: "#DB161B", flex: 1 }} />
        <div style={{ backgroundColor: "#008060", flex: 1 }} />
      </div>
    </div>
  );
}
function FlagBH({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} relative flex`} style={{ ...flagBase(), width: "28px", height: "20px", backgroundColor: "#FFFFFF" }}>
      <div className="absolute right-0 top-0 bottom-0" style={{ backgroundColor: "#CE1126", width: "20px", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 16% 88%, 0 77%, 16% 66%, 0 55%, 16% 44%, 0 33%, 16% 22%, 0 11%)" }} />
    </div>
  );
}

const COUNTRIES: Country[] = [
  { code: "SA", name: "Saudi Arabia", flag: <FlagSA /> },
  { code: "AE", name: "United Arab Emirates", flag: <FlagAE /> },
  { code: "EG", name: "Egypt", flag: <FlagEG /> },
  { code: "KW", name: "Kuwait", flag: <FlagKW /> },
  { code: "QA", name: "Qatar", flag: <FlagQA /> },
  { code: "OM", name: "Oman", flag: <FlagOM /> },
  { code: "BH", name: "Bahrain", flag: <FlagBH /> },
];

function RadioEmpty() {
  return (
    <div
      className="size-[20px] rounded-full border shrink-0 bg-white"
      style={{ borderColor: "#989fb3" }}
    />
  );
}
function CheckCircle() {
  // Figma 1109:33808 — solid green circle, no border, white tick.
  return (
    <svg viewBox="0 0 24 24" className="block size-[24px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill={T.color.brand.green} />
      <path
        d="M7 12.2L10.5 15.7L17 9.2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CountrySelectorSheet({
  open,
  selected = "AE",
  onClose,
  onSelect,
}: {
  open: boolean;
  selected?: string;
  onClose: () => void;
  onSelect?: (code: string) => void;
}) {
  return (
    <SheetShell open={open} onClose={onClose} floating>
      {/* Field DS Country sheet — Figma 1109:33767. Two layers:
          (1) outer floating gray sheet (provided by SheetShell floating variant),
          (2) inner WHITE rounded-16 card holding the country list. */}
      <div className="px-[12px] pt-[2px] pb-[12px] flex flex-col gap-[12px]">
        {/* Header — single centred bold title, no subtitle. */}
        <div className="w-full flex items-center justify-center pt-[2px]">
          <p
            className="font-noontree font-bold text-[18px] leading-[24px] tracking-[-0.15px] text-center"
            style={{ color: T.color.text.deep }}
          >
            Select your country
          </p>
        </div>

        {/* Country list — white "Search result unit" card. */}
        <div className="bg-white rounded-[16px] px-[8px] py-[14px] flex flex-col gap-[8px] w-full">
          {COUNTRIES.map((c, i) => {
            const isSelected = c.code === selected;
            return (
              <div key={c.code} className="flex flex-col gap-[8px]">
                <button
                  type="button"
                  onClick={() => onSelect?.(c.code)}
                  className="flex items-center gap-[12px] px-[8px] py-[4px] rounded-[12px] cursor-pointer w-full"
                >
                  <div className="size-[20px] w-[28px] flex items-center justify-center shrink-0">
                    {c.flag}
                  </div>
                  <p
                    className="flex-1 text-left font-noontree font-medium text-[14px] leading-[18px] tracking-[-0.14px]"
                    style={{ color: "#343d54" }}
                  >
                    {c.name}
                  </p>
                  {isSelected ? <CheckCircle /> : <RadioEmpty />}
                </button>
                {i < COUNTRIES.length - 1 && (
                  // Dashed hairline aligned with country name (after the
                  // 28px flag column + 12px gap = 40px). Matches the
                  // AccountsPage menu cards.
                  <div
                    className="h-0 border-t border-dashed ml-[40px]"
                    style={{ borderColor: T.color.border.divider }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SheetShell>
  );
}

/* ============================================================
 *  Sign out confirmation sheet
 * ============================================================ */

function LogoutGlyph() {
  return (
    <svg viewBox="0 0 26 26" className="block size-[26px]" fill="none" aria-hidden="true">
      <path
        d="M14.5 5V4a1.8 1.8 0 0 0-1.8-1.8H5A1.8 1.8 0 0 0 3.2 4v18A1.8 1.8 0 0 0 5 23.8h7.7A1.8 1.8 0 0 0 14.5 22v-1"
        stroke={T.color.danger}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13h13M19 8.5L23.5 13L19 17.5"
        stroke={T.color.danger}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SignOutSheet({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <SheetShell open={open} onClose={onClose}>
      <div className="px-[20px] pt-[10px] pb-[28px] flex flex-col items-center">
        {/* Centred logout glyph in a soft red ring */}
        <div
          className="size-[62px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: T.color.dangerSoft, border: `1px solid #f7c8c8` }}
        >
          <LogoutGlyph />
        </div>

        {/* Title + body */}
        <p
          className="mt-[16px] font-noontree font-bold text-[18px] leading-[24px] tracking-[-0.18px] text-center"
          style={{ color: T.color.text.deep }}
        >
          Leaving already?
        </p>
        <p
          className="mt-[6px] font-noontree text-[13px] leading-[18px] tracking-[-0.12px] text-center max-w-[280px]"
          style={{ color: T.color.text.body }}
        >
          You will be logged out of your noon account.
        </p>

        {/* Action bar — Cancel | Yes Sign out (Field DS pattern) */}
        <div className="mt-[20px] flex gap-[12px] w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[52px] rounded-[12px] cursor-pointer font-noontree font-semibold text-[15px] leading-[18px] tracking-[-0.26px] bg-white border"
            style={{ borderColor: T.color.border.divider, color: "rgba(2,6,12,0.92)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-[52px] rounded-[12px] cursor-pointer font-noontree font-semibold text-[15px] leading-[18px] tracking-[-0.26px] text-white"
            style={{ backgroundColor: T.color.danger }}
          >
            Yes, sign out
          </button>
        </div>
      </div>
    </SheetShell>
  );
}

/* ============================================================
 *  Need help? sheet — 3 grouped cards × 2 action rows each
 * ============================================================ */

type HelpRow = {
  icon: React.ReactNode;
  label: string;
  sub: string;
};

function ChevronRightSm({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M5.5 3.5L9 7L5.5 10.5" stroke={T.color.text.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HelpCard({ rows }: { rows: HelpRow[] }) {
  return (
    <SmoothCorners radius={12} className="bg-white rounded-[12px] p-[12px] flex flex-col">
      {rows.map((r, i) => (
        <div key={i} className="flex flex-col">
          <div className="flex items-center gap-[10px] py-[8px]">
            <div className="size-[28px] flex items-center justify-center shrink-0">{r.icon}</div>
            <div className="flex-1 flex flex-col gap-[2px] min-w-0">
              <p
                className="font-noontree font-semibold text-[15px] leading-[18px] tracking-[-0.14px]"
                style={{ color: T.color.text.deep }}
              >
                {r.label}
              </p>
              <p
                className="font-noontree text-[12px] leading-[16px] tracking-[-0.12px]"
                style={{ color: T.color.text.muted }}
              >
                {r.sub}
              </p>
            </div>
            <ChevronRightSm className="size-[14px] shrink-0" />
          </div>
          {i < rows.length - 1 && (
            // Dashed hairline that aligns with the text label — same
            // treatment as the AccountsPage menu cards. Inset by 38px
            // (icon 28 + gap 10) so it doesn't run under the icon.
            <div
              className="h-0 border-t border-dashed ml-[38px]"
              style={{ borderColor: T.color.border.divider }}
            />
          )}
        </div>
      ))}
    </SmoothCorners>
  );
}

/* Help row icons — pulled from the Figma "Action unit" cluster
 * 1109:34059. Stroke-based glyphs at 24×24 viewbox, sized to 22×22
 * for crisp 2x rendering on the canvas. */

function HelpOrdersIcon({ color = T.color.text.heading }: { color?: string }) {
  // Shopping bag (Orders)
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <path d="M5 8h14l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H7.5A1.5 1.5 0 0 1 6 19.5L5 8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function HelpReturnsIcon({ color = T.color.text.heading }: { color?: string }) {
  // Headset (Returns/warranty support)
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" stroke={color} strokeWidth="1.5" />
      <path d="M19 20a3 3 0 0 1-3 3h-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function HelpPaymentsIcon({ color = T.color.text.heading }: { color?: string }) {
  // Wallet
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M3 10h13a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="14" cy="12.5" r="1" fill={color} />
    </svg>
  );
}
function HelpCreditCardIcon({ color = T.color.text.heading }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <rect x="3" y="6.5" width="18" height="11" rx="1.5" stroke={color} strokeWidth="1.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.5" />
      <rect x="6" y="13" width="4" height="2.5" rx="0.5" fill={color} />
    </svg>
  );
}
function HelpProfileIcon({ color = T.color.text.heading }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="9" r="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 19c0-3 3-5.5 7-5.5s7 2.5 7 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function HelpListIcon({ color = T.color.text.heading }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <line x1="5" y1="7" x2="19" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="17" x2="13" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NeedHelpSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Copy + structure from Figma 1109:31720 "Need help?" sheet.
  // Three stacked cards, each with two action rows separated by a hairline.
  return (
    <SheetShell open={open} onClose={onClose} floating>
      <div className="px-[12px] pt-[2px] pb-[16px] flex flex-col gap-[12px]">
        <HelpCard
          rows={[
            {
              icon: <HelpOrdersIcon />,
              label: "Orders",
              sub: "Manage, track, and modify your orders",
            },
            {
              icon: <HelpReturnsIcon />,
              label: "Returns, warranty and refunds",
              sub: "Show returns, warranty, and refund steps",
            },
          ]}
        />
        <HelpCard
          rows={[
            {
              icon: <HelpPaymentsIcon />,
              label: "Payments",
              sub: "noonCredits, cash back, payments.",
            },
            {
              icon: <HelpCreditCardIcon />,
              label: "noon One & mashreq cards",
              sub: "Get assistance with our loyalty programs and Mashreq cards",
            },
          ]}
        />
        <HelpCard
          rows={[
            {
              icon: <HelpProfileIcon />,
              label: "My Profile",
              sub: "Manage your profile and personalization",
            },
            {
              icon: <HelpListIcon />,
              label: "Pre-order & Other Topics",
              sub: "Inquiries, promotions, and campaign help",
            },
          ]}
        />
      </div>
    </SheetShell>
  );
}

/* ============================================================
 *  Notifications sheet — Figma 1109:32401
 *  Top card: Push notifications + Receive communication-in (with EN/AR toggle)
 *  Bottom card: Marketing preferences header + Email/SMS/WhatsApp toggles
 *  Footer: Cancel | Save (side-by-side)
 * ============================================================ */

function BellIcon({ color = T.color.text.heading }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <path d="M5.5 17h13l-1.6-2.5V11a4.9 4.9 0 0 0-9.8 0v3.5L5.5 17z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 19.5a2 2 0 0 0 4 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function LangIcon({ color = T.color.text.heading }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <path d="M4 6h8M8 4v2M11 6c-.5 4-3 7-7 8M5 10c1 2 4 4 7 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 20l3.5-9 3.5 9M14.5 17h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MarketingIcon({ color = T.color.text.heading }: { color?: string }) {
  // Speaker / megaphone
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <path d="M4 10v4h3l5 4V6L7 10H4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 9c1 .8 1.5 1.9 1.5 3s-.5 2.2-1.5 3M18.5 6.5c2 1.5 3 3.7 3 5.5s-1 4-3 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** iOS-style toggle switch — 34×20 track, 16×16 thumb, slides on/off. */
function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="relative h-[20px] w-[34px] rounded-full cursor-pointer transition-colors duration-200"
      style={{ backgroundColor: on ? T.color.brand.green : "#d0d4dd" }}
    >
      <div
        className="absolute top-[2px] left-[2px] size-[16px] rounded-full bg-white"
        style={{
          transform: on ? "translateX(14px)" : "translateX(0)",
          transition: "transform 200ms cubic-bezier(0.32, 0.72, 0, 1)",
          boxShadow: "0 1px 2px rgba(15,15,25,0.18)",
        }}
      />
    </button>
  );
}

/** Inline two-segment language toggle — sliding pill primitive
 *  (same family as the Address book tab pill). */
function LangToggle({
  value,
  onChange,
}: {
  value: "en" | "ar";
  onChange: (v: "en" | "ar") => void;
}) {
  return (
    <div
      className="relative flex p-[4px] rounded-full w-full h-[40px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <div
        aria-hidden="true"
        className="absolute top-[4px] bottom-[4px] left-[4px] rounded-full"
        style={{
          width: "calc(50% - 4px)",
          backgroundColor: T.color.surface.canvas,
          boxShadow:
            "0 1px 2px rgba(15,15,25,0.06), 0 1px 3px rgba(15,15,25,0.04)",
          transform: value === "en" ? "translateX(0%)" : "translateX(100%)",
          transition: "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <button
        type="button"
        onClick={() => onChange("en")}
        className="relative flex-1 rounded-full font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] cursor-pointer transition-colors duration-150 z-10"
        style={{ color: value === "en" ? T.color.text.deep : T.color.text.body }}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onChange("ar")}
        className="relative flex-1 rounded-full font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] cursor-pointer transition-colors duration-150 z-10"
        style={{ color: value === "ar" ? T.color.text.deep : T.color.text.body }}
      >
        العربية
      </button>
    </div>
  );
}

export function NotificationsSheet({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}) {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [whatsapp, setWhatsapp] = useState(true);
  return (
    <SheetShell open={open} onClose={onClose} floating>
      <div className="px-[12px] pt-[2px] pb-[12px] flex flex-col gap-[12px]">
        {/* Card 1: Push notifications + Receive communication-in */}
        <SmoothCorners radius={12} className="bg-white rounded-[12px] p-[12px] flex flex-col gap-[12px]">
          {/* Push notifications row */}
          <div className="flex items-center gap-[10px]">
            <div className="size-[28px] flex items-center justify-center shrink-0">
              <BellIcon />
            </div>
            <div className="flex-1 flex flex-col gap-[2px] min-w-0">
              <p className="font-noontree font-bold text-[15px] leading-[20px] tracking-[-0.14px]" style={{ color: T.color.text.deep }}>
                Push notifications
              </p>
              <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                Manage from settings
              </p>
            </div>
          </div>
          {/* Dashed hairline aligned with text — matches AccountsPage. */}
          <div
            className="h-0 border-t border-dashed ml-[38px]"
            style={{ borderColor: T.color.border.divider }}
          />
          {/* Receive communication-in row */}
          <div className="flex items-center gap-[10px]">
            <div className="size-[28px] flex items-center justify-center shrink-0">
              <LangIcon />
            </div>
            <div className="flex-1 flex flex-col gap-[2px] min-w-0">
              <p className="font-noontree font-bold text-[15px] leading-[20px] tracking-[-0.14px]" style={{ color: T.color.text.deep }}>
                Receive communication in
              </p>
              <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                Choose your preferred language for notifications
              </p>
            </div>
          </div>
          <LangToggle value={lang} onChange={setLang} />
        </SmoothCorners>

        {/* Card 2: Marketing preferences with channel toggles */}
        <SmoothCorners radius={12} className="bg-white rounded-[12px] p-[12px] flex flex-col gap-[12px]">
          <div className="flex items-center gap-[10px]">
            <div className="size-[28px] flex items-center justify-center shrink-0">
              <MarketingIcon />
            </div>
            <div className="flex-1 flex flex-col gap-[2px] min-w-0">
              <p className="font-noontree font-bold text-[15px] leading-[20px] tracking-[-0.14px]" style={{ color: T.color.text.deep }}>
                Marketing preferences
              </p>
              <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                Opting out stops promotions, updates continue
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            {([
              { label: "Email", value: email, set: setEmail },
              { label: "SMS", value: sms, set: setSms },
              { label: "WhatsApp", value: whatsapp, set: setWhatsapp },
            ] as const).map((row, i, arr) => (
              <div key={row.label} className="flex flex-col">
                <div className="flex items-center justify-between py-[10px]">
                  <p className="font-noontree font-medium text-[14px] leading-[18px] tracking-[-0.14px]" style={{ color: T.color.text.deep }}>
                    {row.label}
                  </p>
                  <Toggle on={row.value} onChange={() => row.set(!row.value)} />
                </div>
                {i < arr.length - 1 && (
                  // Marketing channel rows have no icon column, so the
                  // dashed line runs full width of the inner card.
                  <div
                    className="h-0 border-t border-dashed w-full"
                    style={{ borderColor: T.color.border.divider }}
                  />
                )}
              </div>
            ))}
          </div>
        </SmoothCorners>

        {/* Footer — Cancel + Save side-by-side */}
        <div className="flex gap-[12px] w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[52px] rounded-[12px] cursor-pointer font-noontree font-semibold text-[15px] leading-[18px] tracking-[-0.26px] bg-white border"
            style={{ borderColor: T.color.border.divider, color: "rgba(2,6,12,0.92)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onSave?.(); onClose(); }}
            className="flex-1 h-[52px] rounded-[12px] cursor-pointer font-noontree font-semibold text-[15px] leading-[18px] tracking-[-0.26px] text-white"
            style={{ backgroundColor: T.color.text.deep }}
          >
            Save
          </button>
        </div>
      </div>
    </SheetShell>
  );
}

/* ============================================================
 *  Preferences sheet — Figma 1109:33082
 *  Single card: Haptics feedback (toggle) + Clear cache (chevron)
 *  Tapping Clear cache opens a destructive ConfirmSheet.
 * ============================================================ */

function HapticsIcon({ color = T.color.text.heading }: { color?: string }) {
  // Phone with vibration waves
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <rect x="8" y="3" width="8" height="18" rx="1.5" stroke={color} strokeWidth="1.5" />
      <line x1="11" y1="18" x2="13" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 9c-.7 1-.7 2 0 3M3 7c-1.4 1.6-1.4 3.4 0 5M19 9c.7 1 .7 2 0 3M21 7c1.4 1.6 1.4 3.4 0 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function TrashIcon({ color = T.color.danger }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="block size-[22px]" fill="none" aria-hidden="true">
      <path d="M5 7h14M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7M7 7l1 12.5A1.5 1.5 0 0 0 9.5 21h5a1.5 1.5 0 0 0 1.5-1.5L17 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10.5" y1="11" x2="10.5" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.5" y1="11" x2="13.5" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PreferencesSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [haptics, setHaptics] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <>
      <SheetShell open={open} onClose={onClose} floating>
        <div className="px-[12px] pt-[2px] pb-[12px] flex flex-col gap-[12px]">
          <SmoothCorners radius={12} className="bg-white rounded-[12px] p-[12px] flex flex-col">
            {/* Haptics row */}
            <div className="flex items-center justify-between gap-[10px] py-[6px]">
              <div className="flex items-center gap-[10px] flex-1 min-w-0">
                <div className="size-[28px] flex items-center justify-center shrink-0">
                  <HapticsIcon />
                </div>
                <div className="flex flex-col gap-[2px] min-w-0">
                  <p className="font-noontree font-bold text-[15px] leading-[20px] tracking-[-0.14px]" style={{ color: T.color.text.deep }}>
                    Haptics feedback
                  </p>
                  <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                    Gentle vibration for updates
                  </p>
                </div>
              </div>
              <Toggle on={haptics} onChange={() => setHaptics(!haptics)} />
            </div>
            {/* Dashed hairline aligned with text — matches AccountsPage. */}
            <div
              className="h-0 border-t border-dashed ml-[38px] my-[6px]"
              style={{ borderColor: T.color.border.divider }}
            />
            {/* Clear cache row → opens confirm sheet */}
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="flex items-center justify-between gap-[10px] py-[6px] cursor-pointer w-full"
            >
              <div className="flex items-center gap-[10px] flex-1 min-w-0">
                <div className="size-[28px] flex items-center justify-center shrink-0">
                  <TrashIcon />
                </div>
                <div className="flex flex-col gap-[2px] min-w-0 text-left">
                  <p className="font-noontree font-bold text-[15px] leading-[20px] tracking-[-0.14px]" style={{ color: T.color.text.deep }}>
                    Clear cache
                  </p>
                  <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                    Delete temporary files to free up space
                  </p>
                </div>
              </div>
              <ChevronRightSm className="size-[14px] shrink-0" />
            </button>
          </SmoothCorners>
        </div>
      </SheetShell>

      {/* Layered destructive confirm */}
      <ConfirmSheet
        open={confirmOpen}
        title="Clear cache"
        body="Clearing your app cache helps you free up storage & improve performance without affecting your personal data and settings."
        confirmLabel="Yes"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
      />
    </>
  );
}

/* ============================================================
 *  ConfirmSheet — Figma 1109:34267
 *  Reusable destructive confirm: back arrow + title + close X header,
 *  body paragraph, side-by-side Cancel + destructive Yes buttons.
 *  Used for Clear cache (from Preferences) and Delete account.
 * ============================================================ */

export function ConfirmSheet({
  open,
  title,
  body,
  confirmLabel = "Yes",
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <SheetShell open={open} onClose={onClose} floating>
      <div className="px-[12px] pt-[2px] pb-[12px] flex flex-col gap-[12px]">
        {/* Header — back chevron + centred title + close X */}
        <div className="flex items-center justify-between h-[24px] px-[4px]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back"
            className="size-[24px] rounded-[12px] bg-white flex items-center justify-center cursor-pointer"
          >
            <svg viewBox="0 0 14 14" className="block size-[14px]" fill="none" aria-hidden="true">
              <path d="M9 3.5L5.5 7L9 10.5" stroke={T.color.text.heading} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p
            className="font-noontree font-bold text-[16px] leading-[24px] tracking-[-0.15px] text-center"
            style={{ color: T.color.text.deep }}
          >
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className="size-[24px] flex items-center justify-center cursor-pointer"
          >
            <svg viewBox="0 0 14 14" className="block size-[14px]" fill="none" aria-hidden="true">
              <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke={T.color.text.body} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body card — scrim background per Field DS */}
        <SmoothCorners radius={12} className="bg-white rounded-[12px] p-[12px]">
          <p
            className="font-noontree text-[14px] leading-[20px] tracking-[-0.14px]"
            style={{ color: T.color.text.body }}
          >
            {body}
          </p>
        </SmoothCorners>

        {/* Footer — Cancel + Yes (destructive) */}
        <div className="flex gap-[12px] w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[52px] rounded-[12px] cursor-pointer font-noontree font-semibold text-[15px] leading-[18px] tracking-[-0.26px] bg-white border"
            style={{ borderColor: T.color.border.divider, color: "rgba(2,6,12,0.92)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-[52px] rounded-[12px] cursor-pointer font-noontree font-semibold text-[15px] leading-[18px] tracking-[-0.26px] text-white"
            style={{ backgroundColor: T.color.danger }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </SheetShell>
  );
}
