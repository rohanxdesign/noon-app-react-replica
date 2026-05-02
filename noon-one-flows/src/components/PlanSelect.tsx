import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StatusBar from "./StatusBar";
import SmoothCorners from "./SmoothCorners";

/* ---------- Field DS tokens ---------- */
const T = {
  color: {
    brand: { green: "#108757", greenSoft: "#e7f6f0", greenSurface: "#f7fffc" },
    text: { primary: "#0e0e0e", heading: "#1d2539", body: "#475067", muted: "#666d85" },
    surface: { canvas: "#ffffff", subtle: "#f9f9fb", scrim: "#f3f3f5" },
    border: { divider: "#eaecf0", hairline: "#f5f5f5", muted: "#d0d5dd", subtle: "#f2f3f7" },
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

function CheckMark({ className = "", color = T.color.text.body }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadioCircle({ selected }: { selected: boolean }) {
  return selected ? (
    <div className="size-[20px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: T.color.brand.green }}>
      <div className="size-[8px] rounded-full bg-white" />
    </div>
  ) : (
    <div className="size-[20px] rounded-full border-[1.5px] shrink-0" style={{ borderColor: T.color.border.muted }} />
  );
}

const AED_GLYPH = "";
function Aed({ className = "" }: { className?: string }) {
  return (
    <span aria-label="AED" className={`font-noontree tracking-[0] inline-block align-baseline mr-[2px] ${className}`}>
      {AED_GLYPH}
    </span>
  );
}

/* ---------- Monthly / Yearly toggle ---------- *
 * Field DS segmented pill. Active tab uses surface.canvas with a quiet
 * lift-shadow; inactive is text-muted on the subtle track. The yearly tab
 * carries an inline savings nudge. */
type Cadence = "monthly" | "yearly";

function CadenceToggle({
  value,
  savingsLabel,
  onChange,
}: {
  value: Cadence;
  savingsLabel?: string;
  onChange: (next: Cadence) => void;
}) {
  // Indicator uses transform (not left/right CSS) so the shift is GPU
  // accelerated and snappy. Plain CSS transition with a tight cubic
  // easing — no spring bounce, just a clean tab shift.
  return (
    <div
      className="relative flex p-[3px] rounded-full mx-auto"
      style={{ backgroundColor: T.color.surface.subtle, width: "240px" }}
    >
      {/* Sliding indicator — half-width pill that translates between the
          two tab positions. translateX is hardware-accelerated; transition
          is a quick 180ms ease so it feels like a tab shift, not a soft
          bounce. */}
      <div
        className="absolute top-[3px] bottom-[3px] rounded-full transition-transform duration-[180ms] ease-[cubic-bezier(0.4,0.0,0.2,1)]"
        style={{
          backgroundColor: T.color.surface.canvas,
          boxShadow: "0 1px 2px rgba(15,15,25,0.06), 0 1px 3px rgba(15,15,25,0.04)",
          width: "calc(50% - 3px)",
          left: "3px",
          transform: value === "monthly" ? "translateX(0)" : "translateX(100%)",
        }}
      />
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className="relative z-10 flex-1 py-[7px] font-noontree font-semibold text-[12px] tracking-[-0.12px] cursor-pointer transition-colors duration-[180ms]"
        style={{ color: value === "monthly" ? T.color.text.heading : T.color.text.muted }}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("yearly")}
        className="relative z-10 flex-1 py-[7px] font-noontree font-semibold text-[12px] tracking-[-0.12px] cursor-pointer flex items-center justify-center gap-[5px] transition-colors duration-[180ms]"
        style={{ color: value === "yearly" ? T.color.text.heading : T.color.text.muted }}
      >
        Yearly
        {savingsLabel && (
          <span
            className="font-noontree font-semibold text-[9px] leading-none px-[5px] py-[2px] rounded-[4px]"
            style={{ backgroundColor: T.color.brand.greenSoft, color: T.color.brand.green }}
          >
            {savingsLabel}
          </span>
        )}
      </button>
    </div>
  );
}

/* ---------- Plan model ---------- */

type PriceForm = {
  /** Headline price string (just the number, no currency mark). */
  price: string;
  /** Optional supporting line shown below the price (e.g. annual breakdown). */
  pricingDetail?: React.ReactNode;
  /** Optional small tag next to the supporting line. */
  badge?: React.ReactNode;
};

type PlanProduct = {
  id: "one" | "bundle";
  name: string;
  /** Cadence-specific pricing presentations. */
  monthly: PriceForm;
  yearly: PriceForm;
  /** Same benefits across cadences for V1 — copy nuances handled at the card. */
  benefits: React.ReactNode[];
};

const PLANS: PlanProduct[] = [
  {
    id: "one",
    name: "noon One",
    monthly: { price: "24.99" },
    yearly: {
      price: "11.99",
      pricingDetail: (
        <>
          <Aed />143.88 billed yearly
        </>
      ),
      badge: (
        <>
          Save <Aed />156
        </>
      ),
    },
    benefits: ["Unlimited free delivery", "Get 10% off, 1st of every month"],
  },
  {
    id: "bundle",
    name: "noon One & OSN+ Bundle",
    monthly: {
      price: "29.99",
      pricingDetail: (
        <>
          <Aed />
          <span className="line-through">24.99</span>
          {" + "}
          <Aed />
          <span className="line-through">39.99</span>
        </>
      ),
      badge: "2-for-1",
    },
    yearly: {
      price: "19.99",
      pricingDetail: (
        <>
          <Aed />239.88 billed yearly
        </>
      ),
      badge: (
        <>
          Save <Aed />120
        </>
      ),
    },
    benefits: [
      "Unlimited free delivery",
      "Watch HBO, OSN+ originals on demand",
      "Get 10% off, 1st of every month",
    ],
  },
];

/* ---------- Plan card ---------- */

function PlanCard({
  plan,
  cadence,
  selected,
  isCurrent,
  onSelect,
}: {
  plan: PlanProduct;
  cadence: Cadence;
  selected: boolean;
  isCurrent: boolean;
  onSelect: () => void;
}) {
  const form = plan[cadence];
  const wrapperClass = `rounded-[16px] w-full self-stretch transition-shadow duration-150 ${
    selected ? "shadow-[0_0_0_4px_rgba(16,135,87,0.08)]" : ""
  }`;
  return (
    <div className={wrapperClass}>
      <SmoothCorners
        as="button"
        radius={16}
        onClick={onSelect}
        className="bg-white border-[1.5px] rounded-[16px] w-full flex flex-col gap-[8px] px-[16px] pt-[16px] pb-[16px] text-left cursor-pointer relative transition-colors duration-150"
        style={{ borderColor: selected ? T.color.brand.green : T.color.border.hairline }}
      >
        {/* Top row: name + radio (or empty space for current plan) */}
        <div className={`flex items-center justify-between w-full ${isCurrent ? "mt-[20px]" : ""}`}>
          <p className="font-bold leading-[20px] text-[16px] tracking-[-0.16px]" style={{ color: T.color.text.heading }}>
            {plan.name}
          </p>
          {!isCurrent && <RadioCircle selected={selected} />}
        </div>

        {isCurrent && (
          <div
            className="absolute left-[16px] top-0 flex h-[24px] items-center justify-center px-[12px] py-[4px] rounded-bl-[12px] rounded-br-[12px] shrink-0"
            style={{ backgroundColor: T.color.brand.green }}
          >
            <p className="font-noontree font-semibold text-white text-[12px] leading-none whitespace-nowrap">Current plan</p>
          </div>
        )}

        {/* Headline price */}
        <div className="flex items-baseline gap-[4px]">
          <Aed className="text-[16px]" />
          <p className="font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px]" style={{ color: T.color.text.heading }}>
            {form.price}/month
          </p>
        </div>

        {/* Pricing detail + badge */}
        {(form.pricingDetail || form.badge) && (
          <div className="flex items-center gap-[8px] flex-wrap">
            {form.pricingDetail && (
              <p className="font-noontree text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.muted }}>
                {form.pricingDetail}
              </p>
            )}
            {form.badge && (
              <span
                className="font-noontree font-semibold text-[12px] leading-none px-[8px] py-[4px] rounded-[6px] whitespace-nowrap"
                style={{ backgroundColor: T.color.brand.greenSoft, color: T.color.brand.green }}
              >
                {form.badge}
              </span>
            )}
          </div>
        )}

        <div className="h-px w-full border-t border-dashed" style={{ borderColor: T.color.border.divider }} />

        <div className="flex flex-col gap-[10px]">
          {plan.benefits.map((b, i) => (
            <div key={i} className="flex gap-[10px] items-center">
              <CheckMark className="size-[16px] shrink-0" />
              <p className="font-noontree font-medium text-[12px] leading-[14px] tracking-[-0.12px]" style={{ color: T.color.text.body }}>
                {b}
              </p>
            </div>
          ))}
        </div>
      </SmoothCorners>
    </div>
  );
}

/* ---------- Screen ---------- */

export default function PlanSelect({
  onBack,
  onContinue,
  /** Composite key like "one-monthly" describing the user's current plan. */
  currentPlanKey = "one-monthly",
}: {
  onBack: () => void;
  /** Receives a composite key like "one-yearly" or "bundle-monthly". */
  onContinue?: (planKey: string) => void;
  currentPlanKey?: string;
}) {
  const [cadence, setCadence] = useState<Cadence>("monthly");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const canConfirm = selectedKey !== null && selectedKey !== currentPlanKey;

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-[20px]"
      style={{ backgroundImage: `linear-gradient(180deg, ${T.color.surface.canvas} 31%, ${T.color.surface.scrim} 100%)` }}
    >
      <StatusBar />

      <div
        className="relative h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
      >
        <div className={`w-full ${canConfirm ? "pb-[110px]" : "pb-[20px]"}`}>
          {/* Sticky header */}
          <div
            className={`sticky top-0 z-10 flex items-center gap-[8px] px-[18px] pt-[52px] pb-[12px] w-full transition-[background-color,border-color] duration-150 border-b ${
              scrolled ? "bg-white" : "bg-transparent"
            }`}
            style={{ borderColor: scrolled ? T.color.border.divider : "transparent" }}
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="bg-white flex items-center justify-center p-[8px] rounded-[18px] cursor-pointer shrink-0 border"
              style={{ borderColor: T.color.border.subtle }}
            >
              <BackChevron className="size-[20px]" />
            </button>
            <p className="flex-1 font-bold text-[16px] leading-[20px] tracking-[-0.16px]" style={{ color: T.color.text.primary }}>
              Choose your plan
            </p>
          </div>

          {/* Cadence toggle — sits directly under the sticky header so the
              user's first decision (billing cadence) is immediate. The sticky
              "Choose your plan" header already does the framing; a hero +
              subhead would just delay the toggle and add visual noise. */}
          <div className="px-[16px] mt-[8px] mb-[16px]">
            <CadenceToggle
              value={cadence}
              savingsLabel="Save 60%"
              onChange={(next) => {
                setCadence(next);
                // Clear selection when cadence flips so the user re-confirms.
                setSelectedKey(null);
              }}
            />
          </div>

          {/* Plan cards */}
          <div className="flex flex-col px-[16px] gap-[12px]">
            {PLANS.map((plan) => {
              const key = `${plan.id}-${cadence}`;
              return (
                <PlanCard
                  key={key}
                  plan={plan}
                  cadence={cadence}
                  selected={selectedKey === key}
                  isCurrent={key === currentPlanKey}
                  onSelect={() => setSelectedKey(key)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {canConfirm && (
          <motion.div
            key="plan-select-cta"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320, mass: 0.9 }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t rounded-tl-[12px] rounded-tr-[12px] px-[16px] pt-[12px] pb-[36px]"
            style={{ borderColor: T.color.border.divider }}
          >
            <button
              type="button"
              onClick={() => selectedKey && onContinue?.(selectedKey)}
              className="w-full bg-black text-white font-bold text-[14px] rounded-[12px] py-[18px] cursor-pointer"
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-[14px] pointer-events-none">
        <div className="bg-[#404553] h-[5px] rounded-[8px] w-[124px]" />
      </div>
    </div>
  );
}
