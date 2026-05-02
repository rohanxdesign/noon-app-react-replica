import SmoothCorners from "./SmoothCorners";
import chevronStroke from "../assets/chevron-stroke.svg";

/* ---------- Field DS tokens ---------- */
const T = {
  color: {
    text: { row: "#262626", heading: "#1d2539", body: "#475067", muted: "#666d85" },
    surface: { canvas: "#ffffff", subtle: "#f9f9fb" },
    border: { hairline: "#f5f5f5" },
    brand: { green: "#108757", greenSoft: "#e7f6f0" },
    /** Avatar identity hues — visual zone only, the single colour moment
     *  on this card. Everything else is neutral so the card reads as a
     *  quiet settings nudge consistent with CurrentPlanCard above it. */
    avatar: { a: "#3D5BFF", b: "#FF6FA3", c: "#7B47E0" },
  },
};

/**
 * Share noon One — discovery card on the home screen (PRD §5.1.4
 * "App-open nudge"). Architecture mirrors CurrentPlanCard exactly:
 *
 *   ┌─ outer (subtle gray, rounded, soft shadow)
 *   │  ┌─ inner (white, rounded) — info only, not clickable
 *   │  │   • avatar cluster + savings pill
 *   │  │   • title + one-line value prop
 *   │  └─
 *   │  • "Compare and switch" row — sits on the gray bg, the only
 *   │    clickable surface, identical styling to "Manage membership"
 *   └─
 *
 * Pulled-back palette: the only colour is in the three avatar dots and
 * the green-soft savings pill (the one number that anchors the value
 * prop). Everything else is neutral.
 */
export default function ShareWithOthersCard({
  ownerPrice = "24.99",
  onShare,
  width = 346,
}: {
  /** The user's current personal-plan price, used to compute savings. */
  ownerPrice?: string;
  onShare?: () => void;
  /** Card width — defaults to the home screen container width (346px). */
  width?: number;
}) {
  const ownerPriceNum = Number.parseFloat(ownerPrice);
  const famPer = 54.99 / 5;
  const duoPer = 39.99 / 2;
  // Show the BIGGEST possible savings (Family tier) as the headline number
  // — it anchors the strongest value prop. Per-tier breakdown lives on the
  // ShareYourPlan screen the user lands on after tapping through.
  const maxSavings = Math.max(
    ownerPriceNum - duoPer,
    ownerPriceNum - famPer,
  ).toFixed(2);
  const fromPerMember = Math.min(duoPer, famPer).toFixed(2);

  return (
    <SmoothCorners
      radius={12}
      className="border flex flex-col gap-[12px] items-start pb-[14px] relative shrink-0"
      style={{
        backgroundColor: T.color.surface.subtle,
        borderColor: T.color.surface.subtle,
        filter: "drop-shadow(0px 2px 20px rgba(0,0,0,0.02))",
        width: `${width}px`,
      }}
    >
      {/* Inner white card — info only, not clickable. Same shadow + radius
          as CurrentPlanCard's white inner block so the two cards stack
          with identical visual rhythm on the home screen. */}
      <SmoothCorners
        radius={12}
        className="flex flex-col gap-[14px] p-[16px] relative shrink-0 w-full"
        style={{
          backgroundColor: T.color.surface.canvas,
          boxShadow: "0px 2px 40px 0px rgba(0,0,0,0.01)",
        }}
      >
        {/* Top row — avatars (left) and savings pill (right). The avatars
            are the single multi-colour element; the savings pill is the
            single accent moment, calling out the headline value prop. */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-[6px]">
            {[
              { i: "R", c: T.color.avatar.a },
              { i: "A", c: T.color.avatar.b },
              { i: "M", c: T.color.avatar.c },
            ].map(({ i, c }) => (
              <div
                key={i}
                className="size-[22px] rounded-full border-[2px] border-white flex items-center justify-center text-[10px] font-noontree font-bold text-white"
                style={{ backgroundColor: c }}
              >
                {i}
              </div>
            ))}
          </div>
          <span
            className="font-noontree font-semibold text-[11px] leading-none px-[8px] py-[4px] rounded-[6px] whitespace-nowrap"
            style={{
              backgroundColor: T.color.brand.greenSoft,
              color: T.color.brand.green,
            }}
          >
            Save up to AED {maxSavings}/mo
          </span>
        </div>

        {/* Title + subtitle — generous line height, single elegant value
            line under the title. Side-by-side per-tier comparison happens
            on the next screen; the home card just teases the headline. */}
        <div className="flex flex-col gap-[4px]">
          <p
            className="font-bold text-[16px] leading-[20px] tracking-[-0.16px]"
            style={{ color: T.color.text.heading }}
          >
            Share noon One
          </p>
          <p
            className="font-noontree text-[12px] leading-[16px] tracking-[-0.12px]"
            style={{ color: T.color.text.body }}
          >
            Up to 5 members from AED {fromPerMember} each. Every account stays
            separate.
          </p>
        </div>
      </SmoothCorners>

      {/* "Compare and switch" row — exact match for the "Manage membership"
          row in CurrentPlanCard: same px-[16px], same #262626 13px medium
          text, same chevron-stroke.svg asset rotated 180°, same outer-gray
          backdrop (inherited from the SmoothCorners container above). */}
      <button
        type="button"
        onClick={onShare}
        className="flex items-center justify-between px-[16px] w-full cursor-pointer text-left"
      >
        <p
          className="font-medium leading-[15px] text-[13px] tracking-[-0.12px] whitespace-nowrap"
          style={{ color: T.color.text.row }}
        >
          Compare and switch
        </p>
        <div className="overflow-clip relative shrink-0 size-[14px] flex items-center justify-center">
          <img
            alt=""
            aria-hidden="true"
            className="block w-[6px] h-[10px] rotate-180"
            src={chevronStroke}
          />
        </div>
      </button>
    </SmoothCorners>
  );
}
