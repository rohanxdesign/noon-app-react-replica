import {
  type ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import airpodsImg from "../assets/create-collection/airpods.png";
import bookmarkSvg from "../assets/create-collection/bookmark.svg";
import exclamationSvg from "../assets/create-collection/exclamation.svg";

export type CreateCollectionVariant =
  | "default"
  | "filled"
  | "empty-default"
  | "empty-filled"
  | "error"
  | "two-line"
  | "character-limit";

type Props = {
  variant: CreateCollectionVariant;
  /** When true, fills parent width instead of the default 351px. */
  fullWidth?: boolean;
  /** Fires when the inner textarea gains focus. */
  onTextFocus?: () => void;
  /** Fires when the inner textarea loses focus. */
  onTextBlur?: () => void;
  /** Existing collection names (case-insensitive) — used for duplicate detection. */
  duplicateNames?: string[];
  /** Called when the user taps the Create Collection button with a valid name. */
  onSubmit?: (name: string) => void;
};

const TOTAL_GRID_CELLS = 88;
const TWO_LINE_HEIGHT_PX = 80; // 40px line-height × 2 lines

const RADIAL_GRADIENT_BG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 351 358' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23g)' opacity='1'/><defs><radialGradient id='g' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-0.049995 27.6 -27.06 -0.049018 175.5 82)'><stop stop-color='rgba(255,255,255,0)' offset='0'/><stop stop-color='rgba(255,255,255,1)' offset='1'/></radialGradient></defs></svg>\")";

function GridBackground() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-0 flex w-[356px] -translate-x-1/2 flex-wrap content-center items-center gap-[0.5px] bg-surface-primary"
    >
      {Array.from({ length: TOTAL_GRID_CELLS }).map((_, i) => (
        <div key={i} className="size-[44px] shrink-0 rounded-[4px] bg-surface-muted" />
      ))}
    </div>
  );
}

function GradientOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 h-[358px] w-[351px]"
      style={{ backgroundImage: RADIAL_GRADIENT_BG }}
    />
  );
}

function MasterSwatch({ kind }: { kind: "airpods" | "bookmark" }) {
  return (
    <div className="relative h-[80px] w-[126px] shrink-0">
      {/* Right card (rotated +12deg) */}
      <div
        className="absolute flex size-[80.652px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ left: "calc(50% + 23.69px)", top: "calc(50% - 0.04px)" }}
      >
        <div className="rotate-12">
          <div className="relative size-[68px] overflow-hidden rounded-[6.8px] bg-surface-primary shadow-[0_0_10.88px_0_rgba(0,0,0,0.06)]">
            <div className="absolute left-[2.72px] top-[2.72px] size-[62.56px] overflow-hidden rounded-[5.44px]">
              <div className="absolute inset-0 rounded-[5.44px] bg-surface-primary" />
              <div className="absolute left-0 top-0 size-[62.56px] rounded-bl-[2.72px] rounded-br-[2.72px] rounded-tl-[2.72px] bg-surface-tertiary" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_8.937px_0_rgba(0,0,0,0.06)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Left card (rotated -12deg) */}
      <div
        className="absolute flex size-[80.652px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ left: "calc(50% - 24.04px)", top: "calc(50% + 0.29px)" }}
      >
        <div className="-rotate-12">
          <div className="relative size-[68px] overflow-hidden rounded-[6.8px] bg-surface-primary shadow-[0_0_10.88px_0_rgba(0,0,0,0.06)]">
            <div className="absolute left-[2.72px] top-[2.72px] size-[62.56px] overflow-hidden rounded-[5.44px]">
              <div className="absolute inset-0 rounded-[5.44px] bg-surface-primary" />
              <div className="absolute left-0 top-0 size-[62.56px] bg-surface-tertiary" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_8.937px_0_rgba(0,0,0,0.06)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Center card */}
      <div className="absolute left-1/2 top-1/2 size-[80px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px] bg-surface-primary shadow-[0_0_12.8px_0_rgba(0,0,0,0.06)]">
        <div className="absolute left-[3.2px] top-[3.2px] size-[73.6px] overflow-hidden rounded-[8px]">
          <div className="absolute inset-0 rounded-[8px] bg-surface-primary" />
          {kind === "airpods" ? (
            <img
              src={airpodsImg}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <img
              src={bookmarkSvg}
              alt=""
              className="absolute left-1/2 top-1/2 size-[40px] -translate-x-1/2 -translate-y-1/2"
            />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_10.514px_0_rgba(0,0,0,0.06)]" />
        </div>
      </div>
    </div>
  );
}

function CreateButton({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={enabled ? onClick : undefined}
      className={`relative flex h-[56px] w-full shrink-0 items-center justify-center gap-[8px] rounded-[12px] border-0 px-[24px] py-[16px] font-primary text-h16 ${
        enabled
          ? "bg-surface-action-bold font-bold text-text-on-surface-bold"
          : "bg-surface-muted font-medium text-text-muted"
      }`}
    >
      Create Collection
    </button>
  );
}

function ErrorRow({ message }: { message: string }) {
  return (
    <div className="relative flex shrink-0 items-center gap-[4px]">
      <img src={exclamationSvg} alt="" className="size-[14px] shrink-0" />
      <p className="text-center font-primary text-b14 font-normal text-text-error">
        {message}
      </p>
    </div>
  );
}

type VariantConfig = {
  swatch: "airpods" | "bookmark";
  initialValue: string;
  placeholder: string;
  duplicateName: boolean;
};

const VARIANT_CONFIG: Record<CreateCollectionVariant, VariantConfig> = {
  default: {
    swatch: "airpods",
    initialValue: "",
    placeholder: "Collection Name",
    duplicateName: false,
  },
  filled: {
    swatch: "bookmark",
    initialValue: "Earphone",
    placeholder: "Collection Name",
    duplicateName: false,
  },
  "empty-default": {
    swatch: "bookmark",
    initialValue: "",
    placeholder: "Collection Name",
    duplicateName: false,
  },
  "empty-filled": {
    swatch: "airpods",
    initialValue: "Audio Gadgets",
    placeholder: "Collection Name",
    duplicateName: false,
  },
  error: {
    swatch: "airpods",
    initialValue: "Audio Gadgets",
    placeholder: "Collection Name",
    duplicateName: true,
  },
  "two-line": {
    swatch: "airpods",
    initialValue: "Audio Gadgets that I want to own",
    placeholder: "Collection Name",
    duplicateName: false,
  },
  "character-limit": {
    swatch: "airpods",
    initialValue: "Audio gadgets that I really want to own b",
    placeholder: "Collection Name",
    duplicateName: false,
  },
};

export default function CreateCollectionCard({
  variant,
  fullWidth = false,
  onTextFocus,
  onTextBlur,
  duplicateNames,
  onSubmit,
}: Props) {
  const c = VARIANT_CONFIG[variant];
  const [value, setValue] = useState(c.initialValue);
  const [atLimit, setAtLimit] = useState(false);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const mirrorRef = useRef<HTMLDivElement | null>(null);

  const fitsInTwoLines = useCallback((text: string): boolean => {
    const m = mirrorRef.current;
    if (!m) return true;
    m.textContent = text || "​";
    return m.offsetHeight <= TWO_LINE_HEIGHT_PX;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (next.length <= value.length || fitsInTwoLines(next)) {
      setValue(next);
    }
    // else: rejection — value stays; the layout effect below recalculates atLimit
  };

  useLayoutEffect(() => {
    const ta = taRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${ta.scrollHeight}px`;
    }
    setAtLimit(!fitsInTwoLines(value + "M"));
  }, [value, fitsInTwoLines]);

  const trimmed = value.trim();
  const isLiveDuplicate =
    trimmed.length > 0 &&
    !!duplicateNames?.some(
      (n) => n.toLowerCase() === trimmed.toLowerCase(),
    );
  const errorMessage = c.duplicateName || isLiveDuplicate
    ? "Collection with this name already exists!"
    : atLimit
      ? "Character limit reached"
      : null;

  const buttonEnabled = trimmed.length > 0 && !isLiveDuplicate;

  return (
    <div
      className={`relative flex flex-col items-start gap-[32px] overflow-hidden rounded-[24px] bg-surface-primary px-[20px] pb-[20px] pt-[32px] ${
        fullWidth ? "w-full" : "w-[351px]"
      }`}
      data-variant={variant}
    >
      <GridBackground />
      <GradientOverlay />

      <div className="relative flex w-full shrink-0 flex-col items-center gap-[24px]">
        <MasterSwatch kind={c.swatch} />
        <div className="relative flex w-full shrink-0 flex-col items-center gap-[16px]">
          <textarea
            ref={taRef}
            value={value}
            placeholder={c.placeholder}
            rows={1}
            onChange={handleChange}
            onFocus={onTextFocus}
            onBlur={onTextBlur}
            className="block w-full resize-none overflow-hidden border-0 bg-transparent text-center font-primary text-h32 font-medium leading-[40px] text-text-primary caret-text-tertiary outline-none placeholder:text-text-muted focus:placeholder:text-transparent"
          />
          <div
            ref={mirrorRef}
            aria-hidden
            className="pointer-events-none invisible absolute left-0 top-0 w-full whitespace-pre-wrap break-words text-center font-primary text-h32 font-medium leading-[40px]"
          />
          {errorMessage && <ErrorRow message={errorMessage} />}
        </div>
      </div>

      <CreateButton
        enabled={buttonEnabled}
        onClick={() => onSubmit?.(trimmed)}
      />
    </div>
  );
}
