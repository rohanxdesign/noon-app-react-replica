import StatusBar from "./StatusBar";
import card1 from "../assets/figma-products/card-1.png";
import card2 from "../assets/figma-products/card-2.png";
import card3 from "../assets/figma-products/card-3.png";
import card4 from "../assets/figma-products/card-4.png";
import card5 from "../assets/figma-products/card-5.png";
import card6 from "../assets/figma-products/card-6.png";
import card7 from "../assets/figma-products/card-7.png";
import card8 from "../assets/figma-products/card-8.png";
import card9 from "../assets/figma-products/card-9.png";
import card10 from "../assets/figma-products/card-10.png";
import card11 from "../assets/figma-products/card-11.png";
import card12 from "../assets/figma-products/card-12.png";
import sparkleL from "../assets/figma-products/sparkle-divider-l.svg";
import sparkleR from "../assets/figma-products/sparkle-divider-r.svg";

/* ---------- Field DS tokens (from Figma 718:30835 var defs) ---------- */
const T = {
  color: {
    text: { primary: "#0e0e0e", deep: "#101628", heading: "#1d2539", body: "#475067", muted: "#666d85" },
    surface: { canvas: "#ffffff", scrim50: "#fcfcfd" },
    border: { divider: "#eaecf0", subtle: "#f2f3f7" },
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

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke={T.color.text.primary} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Section header (sparkle · label · sparkle) ---------- */

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-[10px] w-full">
      <img src={sparkleL} alt="" aria-hidden="true" className="h-[10px] w-[48px]" />
      <p
        className="font-noontree font-bold text-[18px] leading-[20px] tracking-[-0.15px] whitespace-nowrap"
        style={{ color: T.color.text.deep }}
      >
        {label}
      </p>
      <img src={sparkleR} alt="" aria-hidden="true" className="h-[10px] w-[48px]" />
    </div>
  );
}

/* ---------- Stacked card visual ---------- *
 *
 * Each card is 335×211 with rounded-12 + 1px hairline border. In a stack,
 * we use mb-[-146px] so the next card overlaps 146px (≈69%) and only the
 * lower 65px shows. The last card in each stack omits the negative margin
 * so it stays fully visible. */
function CardArt({
  src,
  isLast = false,
  children,
}: {
  src: string;
  isLast?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative h-[211px] w-full rounded-[12px] overflow-hidden border shrink-0 ${isLast ? "" : "mb-[-146px]"}`}
      style={{
        borderColor: "rgba(0,0,0,0.1)",
        boxShadow: "inset 0 1px 0.5px rgba(255,255,255,0.84)",
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Subtle dark gradient at the top for legibility — matches the
          Figma spec's `bg-gradient-to-t from-[rgba(0,0,0,0.3)]`. */}
      <div
        className="absolute top-0 left-0 right-0 h-[88px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.3) 100%)",
          transform: "scaleY(-1)",
        }}
      />
      {children}
    </div>
  );
}

/* ---------- "Default | xxxx 3267" badge ---------- */

function DefaultBadge() {
  return (
    <div
      className="absolute backdrop-blur-[3px] flex items-center gap-[8px] px-[8px] py-[6px] rounded-[8px] border z-10"
      style={{
        left: "12px",
        top: "169px",
        background:
          "linear-gradient(102.749deg, rgba(56,56,56,0.8) 0%, rgba(0,0,0,0.8) 50%, rgba(56,56,56,0.8) 100%)",
        borderColor: "rgba(255,255,255,0.18)",
      }}
    >
      <span
        className="font-noontree font-semibold text-[16px] leading-[18px] tracking-[-0.15px] text-white whitespace-nowrap"
        style={{ fontFeatureSettings: "'case'" }}
      >
        Default
      </span>
      <span className="block w-px h-[14px] bg-white/40" aria-hidden="true" />
      <span
        className="font-noontree font-semibold text-[16px] leading-[18px] tracking-[-0.15px] text-white whitespace-nowrap"
        style={{ fontFeatureSettings: "'case'" }}
      >
        xxxx 3267
      </span>
    </div>
  );
}

/* ---------- Screen ---------- */

const TOP_CARDS = [card8, card9, card10, card11];
// Last entry (card11) is the featured noon yellow card with the Default badge
const OTHER_CARDS = [card1, card2, card3, card4, card5, card6, card7, card12];

export default function SavedCardsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-[20px] bg-white">
      {/* Scroll body — content padded for the floating header (top) and
          home indicator (bottom). */}
      <div className="absolute inset-0 overflow-y-auto pt-[110px] pb-[60px]">
        <div className="flex flex-col gap-[32px] w-[335px] mx-auto">
          {/* Top Cards */}
          <div className="flex flex-col gap-[16px] w-full">
            <SectionHeader label="Top Cards" />
            <div className="flex flex-col items-stretch pb-[146px] w-full">
              {TOP_CARDS.map((src, i) => {
                const isFeatured = i === TOP_CARDS.length - 1;
                return (
                  <CardArt
                    key={i}
                    src={src}
                    /* Featured card is the LAST in the stack — visible
                       in full. Its negative margin stays so the spacer
                       pb-[146px] on the parent absorbs the height. */
                    isLast={false}
                  >
                    {isFeatured && <DefaultBadge />}
                  </CardArt>
                );
              })}
            </div>
          </div>

          {/* Other cards */}
          <div className="flex flex-col gap-[12px] w-full">
            <SectionHeader label="Other cards" />
            <div className="flex flex-col items-stretch pb-[146px] w-full">
              {OTHER_CARDS.map((src, i) => (
                <CardArt key={i} src={src} isLast={false} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating top header — gradient backdrop + back button + add */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center pb-[10px] backdrop-blur-[3px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0) 100%)",
        }}
      >
        <StatusBar />
        <div className="flex items-center justify-between w-[343px] h-[56px] mt-[44px] px-[2px]">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer"
            style={{ borderColor: T.color.border.subtle }}
          >
            <BackChevron className="size-[20px]" />
          </button>
          <button
            type="button"
            aria-label="Add new card"
            className="size-[36px] rounded-full bg-white border flex items-center justify-center cursor-pointer"
            style={{ borderColor: T.color.border.divider }}
          >
            <PlusIcon className="size-[18px]" />
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-[14px] pointer-events-none">
        <div className="bg-[#404553] h-[5px] rounded-[8px] w-[124px]" />
      </div>
    </div>
  );
}
