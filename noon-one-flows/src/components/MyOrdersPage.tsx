import { useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "./SmoothCorners";
import {
  ORDERS,
  MARKETPLACES,
  type Order,
  type Marketplace,
  type StatusKey,
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
      scrim: "#fcfcfd",
    },
    border: {
      divider: "#eaecf0",
      subtle: "#f2f3f7",
      strong: "#d0d4dd",
    },
    status: {
      transit: { fg: "#1d4ed8", bg: "#e8efff", dot: "#3b82f6" },
      preparing: { fg: "#92400e", bg: "#fef3c7", dot: "#d97706" },
      delivered: { fg: "#108757", bg: "#e7f6f0", dot: "#108757" },
      cancelled: { fg: "#991b1b", bg: "#fee2e2", dot: "#dc2626" },
      returned: { fg: "#475067", bg: "#f2f3f7", dot: "#666d85" },
    },
    brand: { green: "#108757" },
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

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke={T.color.text.primary} strokeWidth="1.6" />
      <line x1="13.2" y1="13.2" x2="16.8" y2="16.8" stroke={T.color.text.primary} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight({ className = "", color = T.color.text.muted }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M4.5 3L7.5 6L4.5 9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon({ className = "", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <rect x="1.5" y="4" width="9" height="7" rx="1" stroke={color} strokeWidth="1.4" />
      <path d="M10.5 6.5h3l1.5 2.5v2h-4.5" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="4.5" cy="12" r="1.3" stroke={color} strokeWidth="1.3" />
      <circle cx="11.5" cy="12" r="1.3" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

function CheckSmall({ className = "", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3.5 8.5L7 12L13 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className = "", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.4" />
      <path d="M8 4.5V8L10 9.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XSmall({ className = "", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ReturnIcon({ className = "", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3 6.5h8a3 3 0 0 1 3 3v.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 4L3 6.5l2.5 2.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================
 *  Marketplace badge — colour-coded chip per marketplace
 *
 *  Stays SUBTLE on the order card so it doesn't compete with the
 *  status pill. Tonal background + small caps text reads as
 *  metadata, not a CTA.
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
 *  Status pill
 * ================================================================ */

const STATUS_LABEL: Record<StatusKey, string> = {
  transit: "Out for delivery",
  preparing: "Preparing",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

function StatusPill({ status, compact = false }: { status: StatusKey; compact?: boolean }) {
  const c = T.color.status[status];
  const Icon =
    status === "transit" ? TruckIcon
    : status === "preparing" ? ClockIcon
    : status === "delivered" ? CheckSmall
    : status === "cancelled" ? XSmall
    : ReturnIcon;

  return (
    <div
      className={`inline-flex items-center gap-[5px] rounded-full ${compact ? "px-[7px] py-[3px]" : "px-[8px] py-[4px]"}`}
      style={{ backgroundColor: c.bg }}
    >
      {status === "transit" ? (
        <span className="relative flex size-[8px] items-center justify-center" aria-hidden="true">
          <span
            className="absolute inline-flex size-full rounded-full opacity-50 animate-ping"
            style={{ backgroundColor: c.dot }}
          />
          <span
            className="relative inline-flex size-[7px] rounded-full"
            style={{ backgroundColor: c.dot }}
          />
        </span>
      ) : (
        <Icon className="size-[12px]" color={c.fg} />
      )}
      <span
        className="font-noontree font-semibold text-[11px] leading-[12px] tracking-[-0.1px] whitespace-nowrap"
        style={{ color: c.fg }}
      >
        {STATUS_LABEL[status]}
      </span>
    </div>
  );
}

/* ================================================================
 *  Tab pill (All | Active | Returns)
 * ================================================================ */

type Tab = "all" | "active" | "returns";

function TabPill({ value, onChange }: { value: Tab; onChange: (next: Tab) => void }) {
  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "returns", label: "Returns" },
  ];
  const idx = tabs.findIndex((t) => t.key === value);
  return (
    <div
      className="relative flex p-[4px] rounded-full w-full h-[40px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <div
        aria-hidden="true"
        className="absolute top-[4px] bottom-[4px] left-[4px] rounded-full"
        style={{
          width: `calc(${100 / tabs.length}% - 4px)`,
          backgroundColor: T.color.surface.canvas,
          boxShadow:
            "0 1px 2px rgba(15,15,25,0.06), 0 1px 3px rgba(15,15,25,0.04)",
          transform: `translateX(calc(${idx * 100}% + ${idx * 4}px))`,
          transition: "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className="relative flex-1 rounded-full font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] cursor-pointer transition-colors duration-150 z-10"
          style={{ color: value === t.key ? T.color.text.deep : T.color.text.body }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ================================================================
 *  Date grouping — frozen at 2026-04-27 for reproducibility
 * ================================================================ */

const TODAY = new Date("2026-04-27T00:00:00");

function dayDelta(iso: string): number {
  const d = new Date(iso + "T00:00:00");
  return Math.floor((TODAY.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function bucketFor(iso: string): "today" | "yesterday" | "this_week" | "earlier" {
  const delta = dayDelta(iso);
  if (delta === 0) return "today";
  if (delta === 1) return "yesterday";
  if (delta < 7) return "this_week";
  return "earlier";
}

const BUCKET_LABEL: Record<ReturnType<typeof bucketFor>, string> = {
  today: "Today",
  yesterday: "Yesterday",
  this_week: "This week",
  earlier: "Earlier",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

/* ================================================================
 *  Item stack — up to 3 product photos with a "+N" chip
 * ================================================================ */

function ItemStack({ items }: { items: Order["items"] }) {
  const visible = items.slice(0, 3);
  const extra = items.length - visible.length;
  if (items.length === 1) {
    return (
      <div
        className="size-[64px] rounded-[10px] border overflow-hidden flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(180deg, #ffffff 32%, #eff0f3 143%)",
          borderColor: T.color.border.subtle,
        }}
      >
        <img src={items[0].image} alt="" aria-hidden="true" className="size-[44px] object-contain" />
      </div>
    );
  }
  return (
    <div className="relative size-[64px] shrink-0">
      <div
        className="absolute left-0 top-0 size-[44px] rounded-[8px] border overflow-hidden flex items-center justify-center bg-white z-10"
        style={{
          background: "linear-gradient(180deg, #ffffff 32%, #eff0f3 143%)",
          borderColor: T.color.border.subtle,
          boxShadow: "0 1px 4px rgba(15,15,25,0.04)",
        }}
      >
        <img src={visible[0].image} alt="" aria-hidden="true" className="size-[30px] object-contain" />
      </div>
      {visible[1] && (
        <div
          className="absolute right-0 bottom-0 size-[36px] rounded-[8px] border overflow-hidden flex items-center justify-center bg-white"
          style={{
            background: "linear-gradient(180deg, #ffffff 32%, #eff0f3 143%)",
            borderColor: T.color.border.subtle,
          }}
        >
          {extra > 0 ? (
            <span
              className="font-noontree font-bold text-[12px] leading-[14px] tracking-[-0.1px]"
              style={{ color: T.color.text.strong }}
            >
              +{extra + 1}
            </span>
          ) : (
            <img src={visible[1].image} alt="" aria-hidden="true" className="size-[24px] object-contain" />
          )}
        </div>
      )}
    </div>
  );
}

/* ================================================================
 *  Active order banner — premium treatment for in-flight orders
 * ================================================================ */

function ActiveOrderBanner({ order, onTrack }: { order: Order; onTrack: () => void }) {
  // Plain white surface — status colour stays in the pill, not on
  // the card. Lets the live banner sit cleanly in the orders list
  // without competing with the marketplace badge.
  return (
    <SmoothCorners
      radius={16}
      className="bg-white rounded-[16px] overflow-hidden relative flex flex-col gap-[14px] px-[16px] py-[16px] w-full"
      style={{ border: `1px solid ${T.color.border.subtle}` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <StatusPill status={order.status === "preparing" ? "preparing" : "transit"} />
          <MarketplaceBadge marketplace={order.marketplace} />
        </div>
        <span
          className="font-noontree text-[11px] leading-[14px] tracking-[-0.1px]"
          style={{ color: T.color.text.muted }}
        >
          {order.id}
        </span>
      </div>

      <div className="flex items-center gap-[14px]">
        <ItemStack items={order.items} />
        <div className="flex flex-col gap-[2px] min-w-0 flex-1">
          <p
            className="font-noontree font-medium text-[12px] leading-[14px] tracking-[-0.1px]"
            style={{ color: T.color.text.body }}
          >
            Arriving
          </p>
          <p
            className="font-bold text-[20px] leading-[24px] tracking-[-0.2px]"
            style={{ color: T.color.text.deep }}
          >
            {order.eta || MARKETPLACES[order.marketplace].etaPromise}
          </p>
          <p
            className="font-noontree text-[12px] leading-[16px] tracking-[-0.1px] truncate mt-[2px]"
            style={{ color: T.color.text.muted }}
          >
            {order.items[0].name}
            {order.items.length > 1 ? ` · +${order.items.length - 1} more` : ""}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onTrack}
        className="self-stretch h-[44px] rounded-[12px] font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] text-white cursor-pointer flex items-center justify-center gap-[6px]"
        style={{ backgroundColor: T.color.text.primary }}
      >
        Track order
        <ChevronRight className="size-[12px]" color="#ffffff" />
      </button>
    </SmoothCorners>
  );
}

/* ================================================================
 *  Past order card
 * ================================================================ */

function OrderCard({ order, onOpen }: { order: Order; onOpen: () => void }) {
  const action =
    order.status === "delivered" ? "Reorder"
    : order.status === "preparing" || order.status === "transit" ? "Track"
    : order.status === "cancelled" ? "Buy again"
    : "View";

  return (
    <SmoothCorners
      radius={12}
      onClick={onOpen}
      className="bg-white rounded-[12px] flex items-center gap-[12px] px-[12px] py-[12px] w-full cursor-pointer"
    >
      <ItemStack items={order.items} />
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <div className="flex items-center gap-[6px]">
          <MarketplaceBadge marketplace={order.marketplace} />
        </div>
        <p
          className="font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] truncate"
          style={{ color: T.color.text.deep }}
        >
          {order.items[0].name}
          {order.items.length > 1 ? ` · +${order.items.length - 1} more` : ""}
        </p>
        <div className="flex items-center gap-[6px]">
          <StatusPill status={order.status} compact />
        </div>
        <div className="flex items-center gap-[6px] mt-[2px]">
          <span
            className="font-noontree text-[11px] leading-[14px] tracking-[-0.1px]"
            style={{ color: T.color.text.muted }}
          >
            {formatDate(order.date)}
          </span>
          <span aria-hidden="true" className="size-[3px] rounded-full" style={{ backgroundColor: T.color.border.strong }} />
          <span
            className="font-noontree font-semibold text-[11px] leading-[14px] tracking-[-0.1px]"
            style={{ color: T.color.text.strong }}
          >
            AED {order.totalAed}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onOpen(); }}
        className="shrink-0 h-[32px] px-[12px] rounded-full font-noontree font-semibold text-[12px] leading-none cursor-pointer"
        style={{
          backgroundColor: T.color.surface.page,
          color: T.color.text.deep,
          border: `1px solid ${T.color.border.subtle}`,
        }}
      >
        {action}
      </button>
    </SmoothCorners>
  );
}

/* ================================================================
 *  Date band header
 * ================================================================ */

function BandHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-[8px] px-[2px]">
      <span
        className="font-noontree font-bold text-[13px] leading-[16px] tracking-[-0.1px]"
        style={{ color: T.color.text.heading }}
      >
        {label}
      </span>
      <span
        className="font-noontree font-medium text-[11px] leading-[14px]"
        style={{ color: T.color.text.muted }}
      >
        {count} {count === 1 ? "order" : "orders"}
      </span>
    </div>
  );
}

/* ================================================================
 *  Empty state
 * ================================================================ */

function EmptyState({ tab }: { tab: Tab }) {
  const copy =
    tab === "active" ? { title: "No active orders", body: "When you have something on the way, it'll show up here." }
    : tab === "returns" ? { title: "No returns yet", body: "Orders you've returned or replaced will appear here." }
    : { title: "Nothing to see yet", body: "Your orders will show here once you start shopping." };
  return (
    <div className="flex flex-col items-center justify-center py-[64px] px-[24px] text-center">
      <div
        className="size-[56px] rounded-full flex items-center justify-center mb-[16px]"
        style={{ backgroundColor: T.color.surface.page }}
      >
        <TruckIcon className="size-[24px]" color={T.color.text.muted} />
      </div>
      <p
        className="font-bold text-[16px] leading-[20px] tracking-[-0.16px]"
        style={{ color: T.color.text.deep }}
      >
        {copy.title}
      </p>
      <p
        className="mt-[6px] font-noontree text-[13px] leading-[18px] tracking-[-0.1px] max-w-[260px]"
        style={{ color: T.color.text.muted }}
      >
        {copy.body}
      </p>
    </div>
  );
}

/* ================================================================
 *  Screen
 * ================================================================ */

export default function MyOrdersPage({
  onBack,
  onOpenOrder,
}: {
  onBack: () => void;
  onOpenOrder?: (orderId: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("all");

  const filtered = ORDERS.filter((o) => {
    if (tab === "active") return o.status === "transit" || o.status === "preparing";
    if (tab === "returns") return o.status === "returned";
    return true;
  });

  // Live order = the most recent in-transit order; pulled to the
  // banner regardless of bucket. The banner only appears when the
  // current tab includes it.
  const liveOrder = filtered.find((o) => o.status === "transit");
  const restOrders = liveOrder ? filtered.filter((o) => o.id !== liveOrder.id) : filtered;

  const buckets: { key: ReturnType<typeof bucketFor>; orders: Order[] }[] = [];
  for (const o of restOrders) {
    const k = bucketFor(o.date);
    let band = buckets.find((b) => b.key === k);
    if (!band) {
      band = { key: k, orders: [] };
      buckets.push(band);
    }
    band.orders.push(o);
  }

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-[20px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <div
        className="absolute top-0 left-0 right-0 z-20 bg-white flex flex-col items-stretch pt-[47px] pb-[12px] relative"
        style={{ boxShadow: "0 2px 5px rgba(26,26,26,0.04)" }}
      >
        <StatusBar />
        <div className="flex items-center justify-between w-[343px] mx-auto">
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer"
              style={{ borderColor: T.color.border.subtle }}
            >
              <BackChevron className="size-[20px]" />
            </button>
            <p
              className="font-bold text-[18px] leading-[24px] tracking-[-0.18px]"
              style={{ color: T.color.text.deep }}
            >
              My Orders
            </p>
          </div>
          <button
            type="button"
            aria-label="Search orders"
            className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer"
            style={{ borderColor: T.color.border.subtle }}
          >
            <SearchIcon className="size-[18px]" />
          </button>
        </div>

        <div className="w-[343px] mx-auto mt-[12px]">
          <TabPill value={tab} onChange={setTab} />
        </div>
      </div>

      <div className="absolute inset-0 overflow-y-auto pt-[176px] pb-[24px]">
        {filtered.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <div className="flex flex-col gap-[18px] w-[343px] mx-auto">
            {liveOrder && (
              <ActiveOrderBanner
                order={liveOrder}
                onTrack={() => onOpenOrder?.(liveOrder.id)}
              />
            )}

            {buckets.map((band) => (
              <div key={band.key} className="flex flex-col gap-[10px]">
                <BandHeader label={BUCKET_LABEL[band.key]} count={band.orders.length} />
                <div className="flex flex-col gap-[10px]">
                  {band.orders.map((o) => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      onOpen={() => onOpenOrder?.(o.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-[14px] pointer-events-none">
        <div className="bg-[#404553] h-[5px] rounded-[8px] w-[124px]" />
      </div>
    </div>
  );
}
