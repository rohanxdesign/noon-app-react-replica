import { useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "./SmoothCorners";
import DeliveryPreferenceSheet from "./DeliveryPreferenceSheet";
import {
  findOrder,
  MARKETPLACES,
  STAGE_LABEL,
  HANDOFF_LABEL,
  CONTACT_LABEL,
  type Order,
  type LifecycleStep,
  type Marketplace,
  type DeliveryPreferences,
} from "../data/orders";

/* ================================================================
 *  Field DS tokens
 * ================================================================ */
const T = {
  color: {
    text: {
      primary: "#0e0e0e",
      deep: "#101628",
      heading: "#1d2539",
      strong: "#343d54",
      body: "#475067",
      muted: "#666d85",
    },
    surface: {
      canvas: "#ffffff",
      page: "#f9f9fb",
      mapBg: "#e8eef6",
      mapRoad: "#ffffff",
    },
    border: { divider: "#eaecf0", subtle: "#f2f3f7", strong: "#d0d4dd" },
    brand: {
      transit: "#1d4ed8",
      transitDot: "#3b82f6",
      transitSoft: "#e8efff",
      green: "#108757",
    },
  },
};

/* ================================================================
 *  Inline icons
 * ================================================================ */

function BackChevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke={T.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="5.5" cy="10" r="2.2" stroke={T.color.text.primary} strokeWidth="1.5" />
      <circle cx="14.5" cy="5" r="2.2" stroke={T.color.text.primary} strokeWidth="1.5" />
      <circle cx="14.5" cy="15" r="2.2" stroke={T.color.text.primary} strokeWidth="1.5" />
      <path d="M7.5 8.7l5-2.4M7.5 11.3l5 2.4" stroke={T.color.text.primary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className = "", color = T.color.text.deep }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M16 13.6v2a1.5 1.5 0 0 1-1.6 1.5 14.7 14.7 0 0 1-6.4-2.3 14.4 14.4 0 0 1-4.4-4.4 14.7 14.7 0 0 1-2.3-6.5A1.5 1.5 0 0 1 2.8 2.4h2A1.5 1.5 0 0 1 6.3 3.7c.1.8.3 1.6.6 2.3a1.5 1.5 0 0 1-.3 1.6L5.7 8.5a11.6 11.6 0 0 0 4.4 4.4l.9-.9a1.5 1.5 0 0 1 1.6-.3c.7.3 1.5.5 2.3.6a1.5 1.5 0 0 1 1.3 1.5z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function MessageIcon({ className = "", color = T.color.text.deep }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3l-3 3v-3H5a2 2 0 0 1-2-2V6z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function HelpIcon({ className = "", color = T.color.brand.transit }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.4" />
      <path d="M6.5 6.5a1.5 1.5 0 1 1 2.3 1.3c-.5.3-.8.6-.8 1.1V9.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.7" fill={color} />
    </svg>
  );
}

function ChevronDownIcon({ className = "", color = T.color.text.body }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3 4.5L6 7.5L9 4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className = "", color = T.color.text.muted }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M4.5 3L7.5 6L4.5 9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className = "", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M8 18s6-6 6-11a6 6 0 0 0-12 0c0 5 6 11 6 11z" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.12" strokeLinejoin="round" />
      <circle cx="8" cy="7" r="2.2" fill={color} />
    </svg>
  );
}

function HandoffGlyph({ className = "", color = T.color.text.deep }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 22 22" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M5 14l3-3a1.5 1.5 0 0 1 2 0l5 5a1.5 1.5 0 0 1 0 2l-1 1a1.5 1.5 0 0 1-2 0l-7-7zM12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon({ className = "", color = T.color.text.body }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M11.5 2.5a1.5 1.5 0 0 1 2.1 0l1.4 1.4a1.5 1.5 0 0 1 0 2.1L6 15H2v-4l9.5-8.5z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================
 *  Marketplace badge — also rendered in the header
 * ================================================================ */

function MarketplaceBadge({ marketplace }: { marketplace: Marketplace }) {
  const meta = MARKETPLACES[marketplace];
  return (
    <span
      className="inline-flex items-center px-[6px] py-[2px] rounded-[4px] font-noontree font-semibold text-[10px] leading-[12px] tracking-[0.4px] uppercase whitespace-nowrap"
      style={{ backgroundColor: meta.color.bg, color: meta.color.fg }}
    >
      {meta.label}
    </span>
  );
}

/* ================================================================
 *  Map preview — only shown for in-flight orders
 *
 *  The vehicle marker position is derived from the lifecycle: it
 *  shows further along the dashed route as more stages complete.
 *  Cancelled/delivered orders skip the map entirely (no live
 *  location to show).
 * ================================================================ */

function MapPreview({ progress }: { progress: number }) {
  // progress 0–1 across the route polyline.
  // The route runs roughly L→R: pickup at (54, 142) → end at (310, 50).
  // We approximate vehicle position by lerp along the bezier midpoints.
  const x = 54 + (310 - 54) * progress;
  const y = 142 + (50 - 142) * progress - Math.sin(progress * Math.PI) * 30;
  return (
    <div className="relative w-full h-[200px] overflow-hidden">
      <svg
        viewBox="0 0 375 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="375" height="200" fill={T.color.surface.mapBg} />
        <g stroke="#d8dfeb" strokeWidth="1">
          <line x1="0" y1="40" x2="375" y2="40" />
          <line x1="0" y1="100" x2="375" y2="100" />
          <line x1="0" y1="160" x2="375" y2="160" />
          <line x1="60" y1="0" x2="60" y2="200" />
          <line x1="180" y1="0" x2="180" y2="200" />
          <line x1="290" y1="0" x2="290" y2="200" />
        </g>
        <g stroke={T.color.surface.mapRoad} strokeWidth="6" strokeLinecap="round">
          <path d="M-10 130 Q 100 110, 200 120 T 400 100" />
          <path d="M40 -10 L 40 210" />
        </g>
        <g fill="#ced7e6" opacity="0.55">
          <rect x="80" y="20" width="36" height="22" rx="2" />
          <rect x="130" y="20" width="22" height="22" rx="2" />
          <rect x="200" y="48" width="28" height="32" rx="2" />
          <rect x="240" y="62" width="32" height="20" rx="2" />
          <rect x="80" y="160" width="40" height="28" rx="2" />
          <rect x="220" y="148" width="50" height="36" rx="2" />
          <rect x="305" y="40" width="30" height="40" rx="2" />
        </g>
        <path
          d="M62 150 Q 130 90, 220 80 T 320 60"
          stroke={T.color.brand.transit}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 6"
          fill="none"
        />
        <g transform="translate(54, 142)">
          <circle cx="8" cy="8" r="9" fill="white" stroke="#a3acbc" strokeWidth="2" />
          <circle cx="8" cy="8" r="3.5" fill="#a3acbc" />
        </g>
        <g transform="translate(310, 50)">
          <path d="M8 18s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" fill={T.color.brand.transit} stroke="white" strokeWidth="1.5" />
          <circle cx="8" cy="7" r="2.5" fill="white" />
        </g>
        {progress > 0 && progress < 1 && (
          <g transform={`translate(${x - 8}, ${y - 8})`}>
            <circle cx="8" cy="8" r="14" fill={T.color.brand.transit} fillOpacity="0.12" />
            <circle cx="8" cy="8" r="11" fill="white" />
            <circle cx="8" cy="8" r="9" fill={T.color.brand.transit} />
            <path
              d="M5 9.5h6v-2H10V6.5l-1-1H7l-1 1v1H5v2zM6 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              fill="white"
            />
          </g>
        )}
      </svg>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[24px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(249,249,251,0) 0%, #f9f9fb 100%)",
        }}
      />
    </div>
  );
}

/* ================================================================
 *  Status timeline — data-driven from the order's lifecycle
 *
 *  Each step renders one of three dot states (done / current /
 *  future). Connecting lines between dots pick up the colour of
 *  the step *above*, so the journey "fills in" as steps complete.
 * ================================================================ */

function TimelineDot({ state }: { state: LifecycleStep["state"] }) {
  if (state === "done") {
    return (
      <div className="relative size-[20px] flex items-center justify-center shrink-0">
        <div
          className="size-[20px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: T.color.brand.green }}
        >
          <svg viewBox="0 0 14 14" className="block size-[10px]" fill="none" aria-hidden="true">
            <path d="M3 7.5L6 10.5L11 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  }
  if (state === "current") {
    return (
      <div className="relative size-[20px] flex items-center justify-center shrink-0">
        <span
          className="absolute inline-flex size-[20px] rounded-full opacity-40 animate-ping"
          style={{ backgroundColor: T.color.brand.transitDot }}
        />
        <div
          className="relative size-[16px] rounded-full border-[3px]"
          style={{
            backgroundColor: T.color.brand.transitDot,
            borderColor: "white",
            boxShadow: `0 0 0 2px ${T.color.brand.transit}`,
          }}
        />
      </div>
    );
  }
  return (
    <div className="size-[20px] flex items-center justify-center shrink-0">
      <div
        className="size-[12px] rounded-full border-[2px] bg-white"
        style={{ borderColor: T.color.border.strong }}
      />
    </div>
  );
}

function StatusTimeline({ steps }: { steps: LifecycleStep[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const lineColor =
          step.state === "done" ? T.color.brand.green
          : step.state === "current" ? T.color.brand.transitDot
          : T.color.border.subtle;
        return (
          <div key={step.stage + i} className="flex gap-[14px]">
            <div className="flex flex-col items-center">
              <TimelineDot state={step.state} />
              {!isLast && (
                <div
                  className="w-[2px] flex-1 my-[4px]"
                  style={{ backgroundColor: lineColor, minHeight: "28px" }}
                />
              )}
            </div>
            <div className={`flex flex-col gap-[2px] ${isLast ? "pb-0" : "pb-[16px]"}`}>
              <p
                className={`font-noontree text-[14px] leading-[18px] tracking-[-0.14px] ${step.state === "current" || step.state === "done" ? "font-bold" : "font-medium"}`}
                style={{
                  color: step.state === "future" ? T.color.text.muted : T.color.text.deep,
                }}
              >
                {STAGE_LABEL[step.stage]}
              </p>
              {step.time && (
                <p
                  className="font-noontree text-[12px] leading-[16px] tracking-[-0.1px]"
                  style={{
                    color: step.state === "current" ? T.color.brand.transit : T.color.text.muted,
                    fontWeight: step.state === "current" ? 600 : 400,
                  }}
                >
                  {step.time}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
 *  Order summary card — collapsible
 * ================================================================ */

function OrderSummary({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  return (
    <SmoothCorners radius={12} className="bg-white rounded-[12px] flex flex-col w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-[14px] py-[14px] cursor-pointer w-full"
      >
        <div className="flex items-center gap-[12px]">
          <div
            className="size-[40px] rounded-[8px] border overflow-hidden flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(180deg, #ffffff 32%, #eff0f3 143%)",
              borderColor: T.color.border.subtle,
            }}
          >
            <img src={order.items[0].image} alt="" aria-hidden="true" className="size-[28px] object-contain" />
          </div>
          <div className="flex flex-col gap-[2px] text-left">
            <p className="font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px]" style={{ color: T.color.text.deep }}>
              {order.items.length} item{order.items.length === 1 ? "" : "s"} · AED {order.totalAed}
            </p>
            <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.1px]" style={{ color: T.color.text.muted }}>
              Order summary
            </p>
          </div>
        </div>
        <ChevronDownIcon
          className="size-[14px] transition-transform duration-200"
          color={T.color.text.body}
        />
      </button>
      {open && (
        <div className="px-[14px] pb-[14px] flex flex-col gap-[10px]">
          <div className="h-0 border-t border-dashed ml-[52px]" style={{ borderColor: T.color.border.divider }} />
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between items-center pl-[52px] gap-[8px]">
              <span
                className="font-noontree text-[13px] leading-[18px] truncate"
                style={{ color: T.color.text.body }}
              >
                {it.name}
              </span>
              <span
                className="font-noontree font-semibold text-[13px] shrink-0"
                style={{ color: T.color.text.deep }}
              >
                {i === 0 ? `AED ${order.totalAed}` : "—"}
              </span>
            </div>
          ))}
          <div className="h-0 border-t border-dashed" style={{ borderColor: T.color.border.divider }} />
          <div className="flex justify-between">
            <span className="font-noontree text-[13px]" style={{ color: T.color.text.body }}>Subtotal</span>
            <span className="font-noontree font-medium text-[13px]" style={{ color: T.color.text.deep }}>AED {order.totalAed}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-noontree text-[13px]" style={{ color: T.color.text.body }}>Delivery</span>
            <span className="font-noontree font-medium text-[13px]" style={{ color: T.color.brand.green }}>Free</span>
          </div>
          <div className="h-0 border-t border-dashed" style={{ borderColor: T.color.border.divider }} />
          <div className="flex justify-between">
            <span className="font-bold text-[14px]" style={{ color: T.color.text.deep }}>Total</span>
            <span className="font-bold text-[14px]" style={{ color: T.color.text.deep }}>AED {order.totalAed}</span>
          </div>
        </div>
      )}
    </SmoothCorners>
  );
}

/* ================================================================
 *  Delivery preferences card
 *
 *  Reads current prefs from the order, opens the sheet on tap,
 *  shows a compact summary line so users can see at a glance how
 *  the order will be handed off without opening the editor.
 * ================================================================ */

function DeliveryPrefsCard({
  prefs,
  onEdit,
}: {
  prefs: DeliveryPreferences;
  onEdit: () => void;
}) {
  return (
    <SmoothCorners
      radius={12}
      onClick={onEdit}
      className="bg-white rounded-[12px] flex items-center gap-[12px] px-[14px] py-[12px] w-full cursor-pointer"
    >
      <div
        className="size-[40px] rounded-[10px] flex items-center justify-center shrink-0"
        style={{ backgroundColor: T.color.surface.page }}
      >
        <HandoffGlyph color={T.color.text.deep} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
        <div className="flex items-center gap-[6px]">
          <p
            className="font-noontree font-bold text-[13px] leading-[16px] tracking-[-0.1px]"
            style={{ color: T.color.text.deep }}
          >
            {HANDOFF_LABEL[prefs.handoff]}
          </p>
          <span aria-hidden="true" className="size-[3px] rounded-full" style={{ backgroundColor: T.color.border.strong }} />
          <p
            className="font-noontree text-[12px] leading-[14px] tracking-[-0.1px]"
            style={{ color: T.color.text.muted }}
          >
            {CONTACT_LABEL[prefs.contact]}
          </p>
        </div>
        <p
          className="font-noontree text-[12px] leading-[16px] tracking-[-0.1px] truncate"
          style={{ color: T.color.text.body }}
        >
          {prefs.instructions || "No special instructions"}
        </p>
      </div>
      <PencilIcon className="size-[16px] shrink-0" />
    </SmoothCorners>
  );
}

/* ================================================================
 *  Compute progress 0..1 for the live map vehicle position
 * ================================================================ */

function computeProgress(steps: LifecycleStep[]): number {
  const total = steps.length - 1;
  if (total <= 0) return 0;
  // Find the index of the current step (or, if none, last done).
  const currentIdx = steps.findIndex((s) => s.state === "current");
  const lastDoneIdx = steps.reduce(
    (acc, s, i) => (s.state === "done" ? i : acc),
    -1
  );
  const idx = currentIdx >= 0 ? currentIdx : lastDoneIdx;
  if (idx < 0) return 0;
  return Math.min(0.95, idx / total);
}

/* ================================================================
 *  Screen
 * ================================================================ */

export default function TrackOrderPage({
  orderId,
  onBack,
}: {
  orderId?: string | null;
  onBack: () => void;
}) {
  const initialOrder = findOrder(orderId ?? null);
  const [prefs, setPrefs] = useState<DeliveryPreferences>(initialOrder.prefs);
  const [prefsOpen, setPrefsOpen] = useState(false);

  const order: Order = { ...initialOrder, prefs };
  const meta = MARKETPLACES[order.marketplace];

  const isLive = order.status === "transit" || order.status === "preparing";
  const progress = computeProgress(order.lifecycle);

  // Header status framing differs by state — live orders get the
  // marketplace's ETA promise; delivered/cancelled get a static label.
  const headerSub =
    order.status === "delivered" ? "Delivered"
    : order.status === "cancelled" ? "Order cancelled"
    : order.status === "returned" ? "Returned"
    : order.eta || meta.etaPromise;

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-[20px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      {/* Sticky header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 bg-white flex flex-col items-stretch pt-[47px] pb-[12px] relative"
        style={{ boxShadow: "0 2px 5px rgba(26,26,26,0.04)" }}
      >
        <StatusBar />
        <div className="flex items-center justify-between w-[343px] mx-auto">
          <div className="flex items-center gap-[12px] min-w-0 flex-1">
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer shrink-0"
              style={{ borderColor: T.color.border.subtle }}
            >
              <BackChevron className="size-[20px]" />
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-[8px]">
                <p
                  className="font-bold text-[16px] leading-[20px] tracking-[-0.16px]"
                  style={{ color: T.color.text.deep }}
                >
                  Track order
                </p>
                <MarketplaceBadge marketplace={order.marketplace} />
              </div>
              <p
                className="font-noontree text-[11px] leading-[14px] tracking-[-0.1px]"
                style={{ color: T.color.text.muted }}
              >
                {order.id}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Share"
            className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer shrink-0"
            style={{ borderColor: T.color.border.subtle }}
          >
            <ShareIcon className="size-[18px]" />
          </button>
        </div>
      </div>

      {/* Scroll body */}
      <div className="absolute inset-0 overflow-y-auto pt-[103px] pb-[100px]">
        {/* Map preview — only for live orders */}
        {isLive && <MapPreview progress={progress} />}

        <div className={`flex flex-col gap-[14px] w-[343px] mx-auto ${isLive ? "-mt-[12px]" : "mt-[12px]"}`}>
          {/* ETA hero — plain white surface in every state. Status
              colour lives in the pill (and the timeline dot), not on
              the card surface itself. */}
          <SmoothCorners
            radius={16}
            className="rounded-[16px] flex flex-col gap-[12px] px-[16px] py-[16px] w-full relative overflow-hidden"
            style={{
              backgroundColor: T.color.surface.canvas,
              border: `1px solid ${T.color.border.subtle}`,
            }}
          >
            <div className="flex items-center justify-between">
              {isLive ? (
                <div
                  className="inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-full"
                  style={{ backgroundColor: T.color.brand.transitSoft }}
                >
                  <span className="relative flex size-[8px] items-center justify-center" aria-hidden="true">
                    <span
                      className="absolute inline-flex size-full rounded-full opacity-50 animate-ping"
                      style={{ backgroundColor: T.color.brand.transitDot }}
                    />
                    <span
                      className="relative inline-flex size-[7px] rounded-full"
                      style={{ backgroundColor: T.color.brand.transitDot }}
                    />
                  </span>
                  <span
                    className="font-noontree font-semibold text-[12px] leading-[14px] tracking-[-0.1px]"
                    style={{ color: T.color.brand.transit }}
                  >
                    {STAGE_LABEL[order.lifecycle.find((s) => s.state === "current")?.stage ?? "out_for_delivery"]}
                  </span>
                </div>
              ) : (
                <span
                  className="font-noontree font-semibold text-[12px] leading-[14px] tracking-[-0.1px]"
                  style={{ color: T.color.text.muted }}
                >
                  Order details
                </span>
              )}
              <MarketplaceBadge marketplace={order.marketplace} />
            </div>

            <div className="flex flex-col gap-[2px]">
              <p
                className="font-noontree font-medium text-[12px] leading-[14px] tracking-[-0.1px]"
                style={{ color: T.color.text.body }}
              >
                {order.status === "delivered" ? "Delivered" : order.status === "cancelled" ? "Status" : "Arriving"}
              </p>
              <p
                className="font-bold text-[24px] leading-[28px] tracking-[-0.4px]"
                style={{ color: T.color.text.deep }}
              >
                {headerSub}
              </p>
            </div>

            {order.courier && (
              <div
                className="flex items-center gap-[12px] mt-[2px] pt-[12px]"
                style={{ borderTop: `1px dashed ${T.color.border.divider}` }}
              >
                <div
                  className="size-[42px] rounded-full flex items-center justify-center shrink-0 text-white font-noontree font-bold text-[15px]"
                  style={{ background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)" }}
                >
                  {order.courier.initials}
                </div>
                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                  <p
                    className="font-noontree font-bold text-[14px] leading-[18px] tracking-[-0.14px]"
                    style={{ color: T.color.text.deep }}
                  >
                    {order.courier.name}
                  </p>
                  <p
                    className="font-noontree text-[12px] leading-[14px] tracking-[-0.1px]"
                    style={{ color: T.color.text.muted }}
                  >
                    Your delivery partner · {order.courier.vehicle}
                  </p>
                </div>
                <div className="flex items-center gap-[6px] shrink-0">
                  <button
                    type="button"
                    aria-label="Call"
                    className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer"
                    style={{ borderColor: T.color.border.divider }}
                  >
                    <PhoneIcon className="size-[16px]" />
                  </button>
                  <button
                    type="button"
                    aria-label="Message"
                    className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer"
                    style={{ borderColor: T.color.border.divider }}
                  >
                    <MessageIcon className="size-[16px]" />
                  </button>
                </div>
              </div>
            )}
          </SmoothCorners>

          {/* Delivery address */}
          <SmoothCorners
            radius={12}
            className="bg-white rounded-[12px] flex items-center gap-[12px] px-[14px] py-[12px] w-full"
          >
            <PinIcon className="size-[20px] shrink-0" color={T.color.brand.transit} />
            <div className="flex flex-col gap-[2px] flex-1 min-w-0">
              <p
                className="font-noontree font-bold text-[13px] leading-[16px] tracking-[-0.1px]"
                style={{ color: T.color.text.deep }}
              >
                {order.address.label}
              </p>
              <p
                className="font-noontree text-[12px] leading-[16px] tracking-[-0.1px] truncate"
                style={{ color: T.color.text.muted }}
              >
                {order.address.line}
              </p>
            </div>
          </SmoothCorners>

          {/* Delivery preferences — always present, opens edit sheet */}
          <DeliveryPrefsCard prefs={prefs} onEdit={() => setPrefsOpen(true)} />

          {/* Status timeline */}
          <SmoothCorners
            radius={12}
            className="bg-white rounded-[12px] flex flex-col gap-[14px] px-[16px] py-[16px] w-full"
          >
            <div className="flex items-center justify-between">
              <p
                className="font-bold text-[14px] leading-[18px] tracking-[-0.14px]"
                style={{ color: T.color.text.heading }}
              >
                Order journey
              </p>
              <span
                className="font-noontree text-[11px] leading-[14px]"
                style={{ color: T.color.text.muted }}
              >
                {order.lifecycle.filter((s) => s.state === "done").length}/{order.lifecycle.length} steps
              </span>
            </div>
            <StatusTimeline steps={order.lifecycle} />
          </SmoothCorners>

          {/* Order summary */}
          <OrderSummary order={order} />

          {/* Help link */}
          <button
            type="button"
            className="self-center inline-flex items-center gap-[6px] mt-[2px] cursor-pointer"
          >
            <HelpIcon className="size-[14px]" />
            <span
              className="font-noontree font-semibold text-[13px] leading-[16px] tracking-[-0.1px]"
              style={{ color: T.color.brand.transit }}
            >
              Need help with this order?
            </span>
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-[14px] pointer-events-none">
        <div className="bg-[#404553] h-[5px] rounded-[8px] w-[124px]" />
      </div>

      {/* Delivery preferences sheet */}
      <DeliveryPreferenceSheet
        open={prefsOpen}
        initial={prefs}
        onClose={() => setPrefsOpen(false)}
        onSave={(next) => setPrefs(next)}
      />

      {/* Suppress unused-icon warning while keeping icons available
          for future use — chevron right used in nested rows. */}
      <div hidden>
        <ChevronRightIcon />
      </div>
    </div>
  );
}
