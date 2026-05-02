import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothCorners from "./SmoothCorners";
import {
  HANDOFF_LABEL,
  HANDOFF_DESC,
  CONTACT_LABEL,
  type HandoffPreference,
  type ContactPreference,
  type DeliveryPreferences,
} from "../data/orders";

/* ================================================================
 *  Field DS tokens
 * ================================================================ */
const T = {
  color: {
    text: { primary: "#0e0e0e", deep: "#101628", body: "#475067", muted: "#666d85", strong: "#343d54" },
    surface: { canvas: "#ffffff", page: "#f9f9fb" },
    border: { divider: "#eaecf0", subtle: "#f2f3f7", strong: "#d0d4dd" },
    brand: { green: "#108757" },
  },
};

/* ================================================================
 *  Sheet shell — gray floating card sliding from the bottom
 *
 *  Same primitive as AccountSheets.tsx but inlined here so this
 *  sheet doesn't add a circular dependency. Uses a portal-style
 *  scrim that closes on tap.
 * ================================================================ */

function SheetShell({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
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
            className="absolute z-40 left-[12px] right-[12px] bottom-[16px]"
          >
            <div
              className="relative rounded-[16px] overflow-hidden"
              style={{
                backgroundColor: T.color.surface.page,
                boxShadow: "0 -12px 32px rgba(15,15,25,0.12)",
              }}
            >
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

/* ================================================================
 *  Inline glyphs for the three handoff modes
 *
 *  Each mode gets its own little visual so the choice reads at a
 *  glance, not just as a list of radios.
 * ================================================================ */

function HandIcon({ color = T.color.text.deep }: { color?: string }) {
  return (
    <svg viewBox="0 0 22 22" className="block size-[20px]" fill="none" aria-hidden="true">
      <path d="M7 12V5.5a1.5 1.5 0 0 1 3 0V11M10 11V4.5a1.5 1.5 0 0 1 3 0V11M13 11V5.5a1.5 1.5 0 0 1 3 0V13M16 13V8.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-2a4 4 0 0 1-4-4v-1l-3-3a1.5 1.5 0 0 1 2-2.2L7 9" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DoorIcon({ color = T.color.text.deep }: { color?: string }) {
  return (
    <svg viewBox="0 0 22 22" className="block size-[20px]" fill="none" aria-hidden="true">
      <path d="M5 20V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16M3 20h16" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13.5" cy="12" r="0.8" fill={color} />
    </svg>
  );
}
function LobbyIcon({ color = T.color.text.deep }: { color?: string }) {
  return (
    <svg viewBox="0 0 22 22" className="block size-[20px]" fill="none" aria-hidden="true">
      <path d="M3 20V8l8-5 8 5v12M9 20v-5h4v5" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="11" cy="11" r="1.2" fill={color} />
    </svg>
  );
}

const HANDOFF_ICON: Record<HandoffPreference, React.ComponentType<{ color?: string }>> = {
  hand_to_me: HandIcon,
  leave_at_door: DoorIcon,
  meet_at_lobby: LobbyIcon,
};

/* ================================================================
 *  Handoff radio tile
 * ================================================================ */

function HandoffTile({
  value,
  selected,
  onSelect,
}: {
  value: HandoffPreference;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = HANDOFF_ICON[value];
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full flex items-center gap-[12px] px-[12px] py-[12px] cursor-pointer rounded-[12px]"
      style={{
        backgroundColor: selected ? "#f0fff7" : T.color.surface.canvas,
        border: `1px solid ${selected ? T.color.brand.green : T.color.border.subtle}`,
      }}
    >
      <div
        className="size-[40px] rounded-[10px] flex items-center justify-center shrink-0"
        style={{
          backgroundColor: selected ? "#e0f7ec" : T.color.surface.page,
        }}
      >
        <Icon color={selected ? T.color.brand.green : T.color.text.strong} />
      </div>
      <div className="flex-1 flex flex-col gap-[2px] min-w-0 text-left">
        <p
          className="font-noontree font-bold text-[14px] leading-[18px] tracking-[-0.14px]"
          style={{ color: T.color.text.deep }}
        >
          {HANDOFF_LABEL[value]}
        </p>
        <p
          className="font-noontree text-[12px] leading-[14px] tracking-[-0.1px]"
          style={{ color: T.color.text.muted }}
        >
          {HANDOFF_DESC[value]}
        </p>
      </div>
      {selected ? (
        <svg viewBox="0 0 24 24" className="block size-[22px] shrink-0" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill={T.color.brand.green} />
          <path d="M7 12.2L10.5 15.7L17 9.2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <div
          className="size-[20px] rounded-full border bg-white shrink-0"
          style={{ borderColor: T.color.border.strong }}
        />
      )}
    </button>
  );
}

/* ================================================================
 *  Contact preference segmented control
 * ================================================================ */

function ContactSegment({
  value,
  onChange,
}: {
  value: ContactPreference;
  onChange: (next: ContactPreference) => void;
}) {
  const options: ContactPreference[] = ["call", "message", "both"];
  const idx = options.indexOf(value);
  return (
    <div
      className="relative flex p-[4px] rounded-full w-full h-[40px]"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <div
        aria-hidden="true"
        className="absolute top-[4px] bottom-[4px] left-[4px] rounded-full"
        style={{
          width: `calc(${100 / options.length}% - 4px)`,
          backgroundColor: T.color.surface.canvas,
          boxShadow: "0 1px 2px rgba(15,15,25,0.06), 0 1px 3px rgba(15,15,25,0.04)",
          transform: `translateX(calc(${idx * 100}% + ${idx * 4}px))`,
          transition: "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="relative flex-1 rounded-full font-noontree font-semibold text-[13px] leading-[18px] tracking-[-0.1px] cursor-pointer z-10"
          style={{ color: value === opt ? T.color.text.deep : T.color.text.body }}
        >
          {CONTACT_LABEL[opt]}
        </button>
      ))}
    </div>
  );
}

/* ================================================================
 *  Sheet — main export
 * ================================================================ */

export default function DeliveryPreferenceSheet({
  open,
  onClose,
  initial,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  initial: DeliveryPreferences;
  onSave: (next: DeliveryPreferences) => void;
}) {
  const [handoff, setHandoff] = useState<HandoffPreference>(initial.handoff);
  const [instructions, setInstructions] = useState(initial.instructions);
  const [contact, setContact] = useState<ContactPreference>(initial.contact);

  // Reset local state when the sheet opens with a new order's prefs.
  useEffect(() => {
    if (open) {
      setHandoff(initial.handoff);
      setInstructions(initial.instructions);
      setContact(initial.contact);
    }
  }, [open, initial]);

  return (
    <SheetShell open={open} onClose={onClose}>
      <div className="px-[12px] pt-[2px] pb-[12px] flex flex-col gap-[12px]">
        {/* Title */}
        <div className="text-center">
          <p
            className="font-noontree font-bold text-[18px] leading-[24px] tracking-[-0.15px]"
            style={{ color: T.color.text.deep }}
          >
            Delivery preferences
          </p>
          <p
            className="mt-[2px] font-noontree text-[12px] leading-[16px] tracking-[-0.1px]"
            style={{ color: T.color.text.muted }}
          >
            Set how the courier should hand off your order
          </p>
        </div>

        {/* How to deliver */}
        <SmoothCorners radius={12} className="bg-white rounded-[12px] flex flex-col gap-[8px] p-[12px]">
          <p
            className="font-noontree font-bold text-[12px] leading-[14px] tracking-[0.4px] uppercase"
            style={{ color: T.color.text.muted }}
          >
            How to deliver
          </p>
          <div className="flex flex-col gap-[8px]">
            <HandoffTile value="hand_to_me" selected={handoff === "hand_to_me"} onSelect={() => setHandoff("hand_to_me")} />
            <HandoffTile value="leave_at_door" selected={handoff === "leave_at_door"} onSelect={() => setHandoff("leave_at_door")} />
            <HandoffTile value="meet_at_lobby" selected={handoff === "meet_at_lobby"} onSelect={() => setHandoff("meet_at_lobby")} />
          </div>
        </SmoothCorners>

        {/* Delivery instructions */}
        <SmoothCorners radius={12} className="bg-white rounded-[12px] flex flex-col gap-[8px] p-[12px]">
          <p
            className="font-noontree font-bold text-[12px] leading-[14px] tracking-[0.4px] uppercase"
            style={{ color: T.color.text.muted }}
          >
            Instructions for the courier
          </p>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Don't ring the bell, kids sleeping. Use the side gate."
            rows={3}
            maxLength={140}
            className="w-full bg-transparent outline-none border-0 font-noontree text-[14px] leading-[20px] tracking-[-0.14px] resize-none placeholder:text-[#98a0b0]"
            style={{ color: T.color.text.deep }}
          />
          <p
            className="font-noontree text-[11px] leading-[14px] tracking-[-0.1px] self-end"
            style={{ color: T.color.text.muted }}
          >
            {instructions.length}/140
          </p>
        </SmoothCorners>

        {/* Contact preference */}
        <SmoothCorners radius={12} className="bg-white rounded-[12px] flex flex-col gap-[10px] p-[12px]">
          <p
            className="font-noontree font-bold text-[12px] leading-[14px] tracking-[0.4px] uppercase"
            style={{ color: T.color.text.muted }}
          >
            How can we contact you?
          </p>
          <ContactSegment value={contact} onChange={setContact} />
        </SmoothCorners>

        {/* Footer — Cancel + Save */}
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
            onClick={() => {
              onSave({ handoff, instructions, contact });
              onClose();
            }}
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
