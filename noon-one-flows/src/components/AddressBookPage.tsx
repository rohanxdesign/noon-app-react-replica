import { useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "./SmoothCorners";

/* ---------- Field DS tokens (from Figma 718:29694 var defs) ---------- */
const T = {
  color: {
    text: {
      primary: "#0e0e0e",
      deep: "#101628",
      heading: "#1d2539",
      strong: "#343d54",
      body: "#475067",
      muted: "#666d85",
      subtle: "#7E859B",
      highEmphasis: "rgba(2,6,12,0.92)",
      secondary: "rgba(2,6,12,0.6)",
    },
    surface: { canvas: "#ffffff", page: "#f9f9fb", scrim50: "#fcfcfd" },
    border: { divider: "#eaecf0", subtle: "#f2f3f7" },
    brand: { blue: "#3866DF", blueDeep: "#0057ff", blueMid: "#0076ff", blueSoft: "#e1efff", blueScrim: "#eff7ff" },
    verified: "#108757",
  },
};

/* ---------- Inline icons ---------- */

function BackChevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke={T.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke={T.color.text.muted} strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke={T.color.text.muted} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className = "", color = T.color.brand.blueMid }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight({ className = "", color = T.color.text.muted }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M5.5 3.5L9 7L5.5 10.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M9 12V2.5M9 2.5L6 5.5M9 2.5L12 5.5"
        stroke={T.color.text.heading}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9.5V14a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V9.5"
        stroke={T.color.text.heading}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoreVertical({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="9" cy="3.5" r="1.4" fill={T.color.text.heading} />
      <circle cx="9" cy="9" r="1.4" fill={T.color.text.heading} />
      <circle cx="9" cy="14.5" r="1.4" fill={T.color.text.heading} />
    </svg>
  );
}

function BriefcaseIcon({ className = "", color = T.color.brand.blue }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill={color} aria-hidden="true">
      <path
        d="M7 4.5h6a1 1 0 0 1 1 1v1h2.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15V8a1.5 1.5 0 0 1 1.5-1.5H6v-1a1 1 0 0 1 1-1Zm5.5 2v-.5h-5v.5h5Z"
      />
    </svg>
  );
}

function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill={T.color.verified} />
      <path d="M5 8.2L7 10.2L11.2 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Address card ---------- */

type Address = {
  id: string;
  label: string;
  /** Distance / time chip — rendered next to the label in blue text. */
  meta?: string;
  /** Tinted: when true, the icon strip uses the blue-soft variant. The
   *  default (false) uses the muted gray-soft variant. */
  primary?: boolean;
  street: string;
  contactName: string;
  phone: string;
  verified?: boolean;
};

function AddressCard({ address }: { address: Address }) {
  const stripBg = address.primary ? T.color.brand.blueScrim : T.color.surface.page;
  const iconColor = address.primary ? T.color.brand.blue : T.color.text.heading;

  return (
    <SmoothCorners
      radius={12}
      className="bg-white rounded-[12px] overflow-hidden border"
      style={{ borderColor: T.color.border.subtle }}
    >
      {/* Tinted top strip — icon + label + meta + share + more */}
      <div
        className="flex items-center px-[12px] py-[10px] gap-[8px]"
        style={{ backgroundColor: stripBg }}
      >
        <div className="size-[24px] flex items-center justify-center shrink-0">
          <BriefcaseIcon className="size-[20px]" color={iconColor} />
        </div>
        <p
          className="font-noontree font-bold text-[14px] leading-[18px] tracking-[-0.14px]"
          style={{ color: T.color.text.deep }}
        >
          {address.label}
        </p>
        {address.meta && (
          <p
            className="font-noontree font-semibold text-[12px] leading-[14px] tracking-[-0.1px]"
            style={{ color: address.primary ? T.color.brand.blueDeep : T.color.text.muted }}
          >
            {address.meta}
          </p>
        )}
        <div className="flex-1" />
        <button
          type="button"
          aria-label="Share address"
          className="size-[24px] flex items-center justify-center cursor-pointer"
        >
          <ShareIcon className="size-[16px]" />
        </button>
        <button
          type="button"
          aria-label="More options"
          className="size-[24px] flex items-center justify-center cursor-pointer"
        >
          <MoreVertical className="size-[16px]" />
        </button>
      </div>

      {/* Body — street + contact */}
      <div className="px-[12px] py-[12px] flex flex-col gap-[8px]">
        <p
          className="font-noontree text-[14px] leading-[18px] tracking-[-0.14px]"
          style={{ color: T.color.text.deep }}
        >
          {address.street}
        </p>
        <div className="flex items-center gap-[6px]">
          <p
            className="font-noontree text-[13px] leading-[16px] tracking-[-0.12px]"
            style={{ color: T.color.text.body }}
          >
            {address.contactName}, {address.phone}
          </p>
          {address.verified && <VerifiedBadge className="size-[14px] shrink-0" />}
        </div>
      </div>
    </SmoothCorners>
  );
}

/* ---------- Data ---------- */

const ADDRESSES: Address[] = [
  {
    id: "work",
    label: "Work",
    meta: "24 m",
    primary: true,
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
  {
    id: "ayush1",
    label: "Ayush's Dubai Place",
    meta: "24 km",
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
  {
    id: "ayush2",
    label: "Ayush's Dubai Place",
    meta: "24 m",
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
  {
    id: "ayush3",
    label: "Ayush's Dubai Place",
    meta: "24 m",
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
];

/* ---------- Screen ---------- */

type Tab = "address" | "locker";

export default function AddressBookPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("address");
  const [scrolled, setScrolled] = useState(false);

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-[20px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <StatusBar />

      <div
        className="relative h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
      >
        <div className="w-full pb-[40px]">
          {/* Sticky header */}
          <div
            className={`sticky top-0 z-10 flex items-center gap-[12px] px-[16px] pt-[52px] pb-[12px] w-full transition-[background-color,border-color] duration-150 border-b ${
              scrolled ? "bg-white" : "bg-transparent"
            }`}
            style={{ borderColor: scrolled ? T.color.border.divider : "transparent" }}
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="bg-white flex items-center justify-center size-[36px] rounded-full cursor-pointer shrink-0 border"
              style={{ borderColor: T.color.border.subtle }}
            >
              <BackChevron className="size-[20px]" />
            </button>
            <p
              className="flex-1 font-noontree font-bold text-[18px] leading-[24px] tracking-[-0.18px]"
              style={{ color: T.color.text.deep }}
            >
              Address book
            </p>
          </div>

          {/* Tab pill — Address / Locker/Pickup.
              Single sliding white thumb that translates between halves —
              avoids the jumpy "two-bg" pattern. Same primitive as the
              CadenceToggle in PlanSelect: absolute thumb with transform
              translateX and a sharp cubic-bezier transition. */}
          <div className="px-[16px] mt-[12px]">
            <div
              className="relative flex p-[4px] rounded-full w-full h-[44px]"
              style={{ backgroundColor: T.color.surface.page }}
            >
              {/* Sliding thumb — 50% width minus the 4px track padding. */}
              <div
                aria-hidden="true"
                className="absolute top-[4px] bottom-[4px] left-[4px] rounded-full"
                style={{
                  width: "calc(50% - 4px)",
                  backgroundColor: T.color.surface.canvas,
                  boxShadow:
                    "0 1px 2px rgba(15,15,25,0.06), 0 1px 3px rgba(15,15,25,0.04)",
                  transform:
                    tab === "address" ? "translateX(0%)" : "translateX(100%)",
                  transition: "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              />
              <button
                type="button"
                onClick={() => setTab("address")}
                className="relative flex-1 rounded-full font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] cursor-pointer transition-colors duration-[180ms] z-10"
                style={{
                  color: tab === "address" ? T.color.text.deep : T.color.text.body,
                  backgroundColor: "transparent",
                }}
              >
                Address
              </button>
              <button
                type="button"
                onClick={() => setTab("locker")}
                className="relative flex-1 rounded-full font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] cursor-pointer transition-colors duration-[180ms] z-10"
                style={{
                  color: tab === "locker" ? T.color.text.deep : T.color.text.body,
                  backgroundColor: "transparent",
                }}
              >
                Locker/ Pickup
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="px-[16px] mt-[12px]">
            <SmoothCorners
              radius={12}
              className="bg-white rounded-[12px] flex items-center gap-[10px] px-[14px] py-[12px] border"
              style={{ borderColor: T.color.border.subtle }}
            >
              <SearchIcon className="size-[18px] shrink-0" />
              <input
                type="text"
                placeholder="Search for your building, area..."
                className="flex-1 bg-transparent outline-none font-noontree text-[14px] leading-[18px] tracking-[-0.14px] placeholder:text-[var(--ph)]"
                style={{ color: T.color.text.deep, ["--ph" as string]: T.color.text.muted }}
              />
            </SmoothCorners>
          </div>

          {/* Add new Address row */}
          <div className="px-[16px] mt-[10px]">
            <SmoothCorners
              as="button"
              radius={12}
              className="bg-white rounded-[12px] flex items-center gap-[10px] px-[14px] py-[12px] w-full text-left border cursor-pointer"
              style={{ borderColor: T.color.border.subtle }}
            >
              <PlusIcon className="size-[20px] shrink-0" />
              <p
                className="flex-1 font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px]"
                style={{ color: T.color.brand.blueMid }}
              >
                Add new Address
              </p>
              <ChevronRight className="size-[14px] shrink-0" color={T.color.brand.blueMid} />
            </SmoothCorners>
          </div>

          {/* Address list */}
          <div className="px-[16px] mt-[12px] flex flex-col gap-[10px]">
            {ADDRESSES.map((addr) => (
              <AddressCard key={addr.id} address={addr} />
            ))}
          </div>
        </div>
      </div>

      {/* iPhone home indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-[14px] pointer-events-none">
        <div className="bg-[#404553] h-[5px] rounded-[8px] w-[124px]" />
      </div>
    </div>
  );
}
