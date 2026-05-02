import { useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "./SmoothCorners";
import { ConfirmSheet } from "./AccountSheets";

/* ---------- Field DS tokens (Figma 1550:164001) ---------- */
const T = {
  color: {
    text: {
      primary: "#0e0e0e",
      deep: "#101628",
      heading: "#1d2539",
      body: "#475067",
      muted: "#666d85",
      strong: "#343d54",
    },
    surface: {
      canvas: "#ffffff",
      page: "#f9f9fb",
      scrim50: "#fcfcfd",
    },
    border: {
      divider: "#eaecf0",
      subtle: "#f2f3f7",
      strong: "#d0d4dd",
    },
    brand: { green: "#108757" },
    accent: { orange: "#f36302", orangeLight: "#fdba74" },
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

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3 4.5L6 7.5L9 4.5" stroke={T.color.text.body} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`block ${className}`} fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="2" stroke={T.color.text.muted} strokeWidth="1.5" />
      <line x1="4" y1="10" x2="20" y2="10" stroke={T.color.text.muted} strokeWidth="1.5" />
      <line x1="9" y1="4" x2="9" y2="8" stroke={T.color.text.muted} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="4" x2="15" y2="8" stroke={T.color.text.muted} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke={T.color.text.body} strokeWidth="1.5" />
      <line x1="13.2" y1="13.2" x2="16.5" y2="16.5" stroke={T.color.text.body} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleSolid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill={T.color.brand.green} />
      <path d="M7 12.2L10.5 15.7L17 9.2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadioEmpty({ className = "" }: { className?: string }) {
  return (
    <div
      className={`size-[20px] rounded-full border bg-white ${className}`}
      style={{ borderColor: T.color.border.strong }}
    />
  );
}

/* ---------- Gender glyphs (♂ ♀) ---------- */
function MaleGlyph({ color = T.color.text.strong }: { color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className="block size-[18px]" fill="none" aria-hidden="true">
      <circle cx="8" cy="12" r="4" stroke={color} strokeWidth="1.5" />
      <path d="M11.5 8.5L16 4M16 4H12.5M16 4V7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FemaleGlyph({ color = T.color.text.strong }: { color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className="block size-[18px]" fill="none" aria-hidden="true">
      <circle cx="10" cy="7.5" r="4" stroke={color} strokeWidth="1.5" />
      <path d="M10 11.5V17M7.5 14.5H12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Tourism question icons ---------- */
function PlaneIcon({ color = T.color.text.strong }: { color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className="block size-[18px]" fill="none" aria-hidden="true">
      <path d="M3 12.5l13-7-2 6.5-2.5 1L11 16l-1.5-.5-.5-3-4-1L3 12.5z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function HomeIcon({ color = T.color.text.strong }: { color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className="block size-[18px]" fill="none" aria-hidden="true">
      <path d="M3.5 9.5L10 4l6.5 5.5V16a1 1 0 0 1-1 1h-3v-4.5h-5V17h-3a1 1 0 0 1-1-1V9.5z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Mini flag SVGs (24×18 for inline use) ---------- */
function FlagAEmini({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} flex overflow-hidden`} style={{ width: "24px", height: "18px", borderRadius: "2px", border: "0.5px solid rgba(0,0,0,0.06)", boxShadow: "0 1.5px 1px rgba(0,0,0,0.08)" }}>
      <div style={{ backgroundColor: "#EF3340", width: "6px", height: "100%" }} />
      <div className="flex flex-col flex-1">
        <div style={{ backgroundColor: "#009639", flex: 1 }} />
        <div style={{ backgroundColor: "#FFFFFF", flex: 1 }} />
        <div style={{ backgroundColor: "#000000", flex: 1 }} />
      </div>
    </div>
  );
}
function FlagEGmini({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} flex flex-col overflow-hidden`} style={{ width: "24px", height: "18px", borderRadius: "2px", border: "0.5px solid rgba(0,0,0,0.06)", boxShadow: "0 1.5px 1px rgba(0,0,0,0.08)" }}>
      <div style={{ backgroundColor: "#CE1126", flex: 1 }} />
      <div style={{ backgroundColor: "#FFFFFF", flex: 1 }} />
      <div style={{ backgroundColor: "#000000", flex: 1 }} />
    </div>
  );
}
function FlagSAmini({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} relative`} style={{ width: "24px", height: "18px", borderRadius: "2px", border: "0.5px solid rgba(0,0,0,0.06)", boxShadow: "0 1.5px 1px rgba(0,0,0,0.08)", backgroundColor: "#67BD23", overflow: "hidden" }}>
      <svg viewBox="0 0 24 18" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path d="M5 7 L19 7" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M5 11.5 Q12 10 19 11.5" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ---------- Form primitives ---------- */

function FloatingInput({
  label,
  value,
  placeholder,
  onChange,
  required = false,
}: {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  // Standard floating-label input — gray label sits inside white field, the
  // value typed by the user shows below it. When empty, the placeholder
  // pretends to be the floated label (Figma references a placeholder-only
  // empty state for first/last name).
  return (
    <label className="bg-white rounded-[12px] flex flex-col h-[56px] px-[12px] py-[10px] cursor-text w-full">
      {label && value ? (
        <span
          className="font-noontree font-medium text-[11px] leading-[14px] tracking-[-0.1px] mb-[2px]"
          style={{ color: T.color.text.muted }}
        >
          {label}{required ? "*" : ""}
        </span>
      ) : null}
      <input
        type="text"
        value={value}
        placeholder={value ? "" : placeholder ?? `${label}${required ? "*" : ""}`}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none border-0 font-noontree font-semibold text-[16px] leading-[20px] tracking-[-0.15px] placeholder:font-normal placeholder:text-[13px] placeholder:tracking-[-0.26px]"
        style={{ color: T.color.text.primary, caretColor: T.color.brand.green }}
      />
    </label>
  );
}

/* ---------- Section card ---------- *
 *
 * White rounded-16 card with header (title + optional sub) and a body slot
 * that holds the option chips/inputs. Used for every personalisation block. */
function SectionCard({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <SmoothCorners radius={16} className="bg-white rounded-[16px] overflow-hidden flex flex-col gap-[6px] pb-[12px]">
      <div className="flex flex-col items-start pt-[12px] px-[12px] pb-[8px] gap-[2px]">
        <p
          className="font-noontree font-bold text-[16px] leading-[20px] tracking-[-0.16px]"
          style={{ color: T.color.text.heading }}
        >
          {title}
        </p>
        {sub && (
          <p
            className="font-noontree font-medium text-[12px] leading-[16px]"
            style={{ color: T.color.text.body }}
          >
            {sub}
          </p>
        )}
      </div>
      <div className="px-[12px]">{children}</div>
    </SmoothCorners>
  );
}

/* ---------- Single radio-style option (gender / tourist) ---------- */
function OptionTile({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 h-[56px] rounded-[16px] border bg-[#fcfcfd] flex items-center justify-between px-[12px] py-[16px] cursor-pointer"
      style={{
        borderColor: selected ? T.color.border.divider : T.color.border.subtle,
      }}
    >
      <div className="flex items-center gap-[4px]">
        {icon}
        <span
          className="font-noontree text-[14px] leading-[18px] tracking-[-0.14px]"
          style={{
            color: T.color.text.strong,
            fontWeight: selected ? 600 : 500,
          }}
        >
          {label}
        </span>
      </div>
      {selected ? <CheckCircleSolid className="size-[24px]" /> : <RadioEmpty />}
    </button>
  );
}

/* ---------- Nationality flag chip ---------- */
function NationalityChip({
  flag,
  label,
  onClick,
}: {
  flag: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 h-[56px] rounded-[12px] border bg-[#fcfcfd] flex flex-col items-center justify-center gap-[6px] cursor-pointer"
      style={{ borderColor: T.color.border.subtle }}
    >
      {flag}
      <span
        className="font-noontree font-medium text-[12px] leading-[14px] tracking-[-0.12px]"
        style={{ color: T.color.text.strong }}
      >
        {label}
      </span>
    </button>
  );
}

/* ---------- Diet chip (toggleable pill) ---------- */
function DietChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-[16px] py-[7px] rounded-full cursor-pointer transition-colors duration-150"
      style={{
        backgroundColor: selected ? T.color.text.heading : T.color.surface.scrim50,
        border: `1px solid ${selected ? T.color.text.heading : T.color.border.divider}`,
        color: selected ? "#fff" : T.color.text.strong,
        fontFamily: "Noontree, sans-serif",
        fontWeight: selected ? 600 : 500,
        fontSize: "12px",
        lineHeight: "14px",
        letterSpacing: "-0.12px",
      }}
    >
      {label}
    </button>
  );
}

/* ---------- Screen ---------- */

export default function MyAccountPage({ onBack }: { onBack: () => void }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [tourist, setTourist] = useState<"yes" | "no">("yes");
  const [diet, setDiet] = useState<Set<string>>(new Set(["nonveg", "veg"]));
  const [deleteOpen, setDeleteOpen] = useState(false);

  const toggleDiet = (key: string) => {
    setDiet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-[20px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      {/* Sticky white header — status bar + back + title.
          StatusBar is absolutely-positioned 42.5px tall over the page,
          so we pad-top by 47px before the back/title row to avoid the
          time/notch clipping the back button. */}
      <div
        className="absolute top-0 left-0 right-0 z-20 bg-white flex flex-col items-center pt-[47px] pb-[12px] relative"
        style={{ boxShadow: "0 2px 5px rgba(26,26,26,0.06)" }}
      >
        <StatusBar />
        <div className="flex items-center w-[338px] gap-[12px]">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="size-[36px] rounded-[18px] bg-white border flex items-center justify-center cursor-pointer"
            style={{ borderColor: T.color.border.subtle }}
          >
            <BackChevron className="size-[20px]" />
          </button>
          <p
            className="font-noontree font-bold text-[18px] leading-[24px] tracking-[-0.18px]"
            style={{ color: T.color.text.deep }}
          >
            Your profile
          </p>
        </div>
      </div>

      {/* Scroll body — padded for header (top) + sticky footer (bottom) */}
      <div className="absolute inset-0 overflow-y-auto pt-[110px] pb-[180px]">
        <div className="flex flex-col gap-[12px] w-[351px] mx-auto">
          {/* Name row */}
          <div className="flex gap-[8px] w-full">
            <FloatingInput
              label="First name"
              value={first}
              onChange={setFirst}
              placeholder="First name*"
              required
            />
            <FloatingInput
              label="Last name"
              value={last}
              onChange={setLast}
              placeholder="Last name*"
              required
            />
          </div>

          {/* Phone row — country selector + phone input */}
          <div className="flex items-stretch gap-[8px] w-full">
            <button
              type="button"
              className="bg-white rounded-[12px] flex items-center gap-[4px] px-[11px] py-[8px] cursor-pointer"
            >
              <FlagAEmini />
              <span
                className="font-noontree font-semibold text-[16px] leading-[20px] tracking-[0.025px]"
                style={{ color: T.color.text.strong }}
              >
                +971
              </span>
              <ChevronDown className="size-[12px]" />
            </button>
            {/* Float-on-fill: when empty the placeholder pretends to be
                the label (matches First/Last name treatment). Once the
                user types, the small "Phone number" label slides into
                view above the value. */}
            <label className="bg-white rounded-[12px] flex flex-col flex-1 h-[56px] px-[12px] py-[10px] cursor-text">
              {phone ? (
                <span
                  className="font-noontree font-medium text-[11px] leading-[14px] tracking-[-0.1px] mb-[2px]"
                  style={{ color: T.color.text.muted }}
                >
                  Phone number
                </span>
              ) : null}
              <input
                type="tel"
                value={phone}
                placeholder={phone ? "" : "Phone number"}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent outline-none border-0 font-noontree font-semibold text-[16px] leading-[20px] tracking-[-0.15px] placeholder:font-normal placeholder:text-[13px] placeholder:tracking-[-0.26px]"
                style={{ color: T.color.text.primary, caretColor: T.color.brand.green }}
              />
            </label>
          </div>

          {/* Gender */}
          <SectionCard title="What's your gender?">
            <div className="flex items-center gap-[8px]">
              <OptionTile
                icon={<MaleGlyph />}
                label="Male"
                selected={gender === "male"}
                onClick={() => setGender("male")}
              />
              <OptionTile
                icon={<FemaleGlyph />}
                label="Female"
                selected={gender === "female"}
                onClick={() => setGender("female")}
              />
            </div>
          </SectionCard>

          {/* Tourist */}
          <SectionCard title="Are you a tourist in UAE?">
            <div className="flex items-center gap-[8px]">
              <OptionTile
                icon={<PlaneIcon />}
                label="Yes"
                selected={tourist === "yes"}
                onClick={() => setTourist("yes")}
              />
              <OptionTile
                icon={<HomeIcon />}
                label="No"
                selected={tourist === "no"}
                onClick={() => setTourist("no")}
              />
            </div>
          </SectionCard>

          {/* Birthday */}
          <SectionCard
            title="When's your birthday?"
            sub="Exclusive offers for you on your special day"
          >
            <button
              type="button"
              className="w-full h-[54px] rounded-[12px] border bg-[#fcfcfd] flex items-center justify-between px-[12px] py-[12px] cursor-pointer"
              style={{ borderColor: T.color.border.subtle }}
            >
              <span
                className="font-noontree font-medium text-[14px] leading-[18px] tracking-[-0.14px]"
                style={{ color: T.color.text.strong }}
              >
                Add your birthday
              </span>
              <CalendarIcon className="size-[24px]" />
            </button>
          </SectionCard>

          {/* Nationality */}
          <SectionCard
            title="What's your nationality?"
            sub="Help us curate your catalogue"
          >
            <div className="flex items-center gap-[6px]">
              <NationalityChip flag={<FlagAEmini />} label="UAE" onClick={() => {}} />
              <NationalityChip flag={<FlagEGmini />} label="Egypt" onClick={() => {}} />
              <NationalityChip flag={<FlagSAmini />} label="KSA" onClick={() => {}} />
              <NationalityChip
                flag={<SearchIcon className="size-[20px]" />}
                label="Search"
                onClick={() => {}}
              />
            </div>
          </SectionCard>

          {/* Diet */}
          <SectionCard
            title="Dietary preferences:"
            sub="Help us personalise your experience"
          >
            <div className="flex flex-wrap gap-[8px]">
              <DietChip label="Non veg" selected={diet.has("nonveg")} onClick={() => toggleDiet("nonveg")} />
              <DietChip label="Eggertarian" selected={diet.has("egg")} onClick={() => toggleDiet("egg")} />
              <DietChip label="Veg" selected={diet.has("veg")} onClick={() => toggleDiet("veg")} />
              <DietChip label="Vegan" selected={diet.has("vegan")} onClick={() => toggleDiet("vegan")} />
            </div>
          </SectionCard>

          {/* Destructive: Delete account.
              Sits visually separated from the rest of the form — typed
              quietly so users don't trigger it by accident. Opens the
              shared destructive ConfirmSheet (Field DS 1109:34267). */}
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="self-center mt-[6px] mb-[12px] font-noontree font-semibold text-[14px] leading-[18px] tracking-[-0.14px] underline underline-offset-2 cursor-pointer"
            style={{ color: "#de1c1c" }}
          >
            Delete account
          </button>
        </div>
      </div>

      {/* Destructive confirm — same pattern as Clear cache (1109:34267). */}
      <ConfirmSheet
        open={deleteOpen}
        title="Delete account"
        body="Deleting your account is permanent. Your orders, addresses, saved cards and noon One membership will be removed and can't be restored."
        confirmLabel="Delete"
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
      />

      {/* Sticky bottom — completion status + Save CTA + home indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 bg-white flex flex-col gap-[12px] px-[16px] pt-[14px] pb-[14px] rounded-tl-[12px] rounded-tr-[12px]"
        style={{ boxShadow: "0 -4px 17.6px rgba(0,0,0,0.1)" }}
      >
        {/* Profile completion strip */}
        <div className="flex items-center justify-between w-full px-[12px]">
          <p
            className="font-noontree font-bold text-[14px] leading-[18px] tracking-[-0.14px]"
            style={{ color: T.color.text.strong }}
          >
            Complete your profile
          </p>
          <div
            className="px-[8px] py-[2px] rounded-full"
            style={{
              border: `1px solid ${T.color.accent.orangeLight}`,
              background: `linear-gradient(205deg, ${T.color.accent.orangeLight} 42%, ${T.color.accent.orange} 134%)`,
            }}
          >
            <span
              className="font-noontree font-bold text-[12px] leading-[18px] tracking-[-0.14px]"
              style={{ color: T.color.surface.scrim50 }}
            >
              60%
            </span>
          </div>
        </div>

        {/* Save CTA */}
        <button
          type="button"
          className="w-full h-[52px] rounded-[12px] cursor-pointer font-noontree font-semibold text-[17px] leading-[20px] tracking-[-0.26px] text-white"
          style={{ backgroundColor: T.color.text.heading }}
        >
          Save
        </button>

        {/* Home indicator */}
        <div className="flex justify-center">
          <div className="bg-[#404553] h-[5px] rounded-[8px] w-[124px]" />
        </div>
      </div>
    </div>
  );
}
