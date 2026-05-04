import type { ReactNode } from "react";
import cartIcon from "../assets/multiselect/cart.svg";
import shareIcon from "../assets/multiselect/share.svg";
import dotsIcon from "../assets/multiselect/dots.svg";

export type MultiSelectAvatar = {
  src: string;
  alt?: string;
};

export type MultiSelectWidgetProps = {
  count: number;
  label?: string;
  /** Pass most-recent first; only the first 3 are shown. */
  avatars: MultiSelectAvatar[];
  onCart?: () => void;
  onShare?: () => void;
  onMore?: () => void;
  className?: string;
};

const MAX_AVATARS = 3;
const AVATAR_SIZE = 40;
const AVATAR_OVERLAP = 20;
const RING_WIDTH = 1.111;

function Avatar({
  src,
  alt = "",
  index,
}: MultiSelectAvatar & { index: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-surface-primary"
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        marginLeft: index === 0 ? 0 : -AVATAR_OVERLAP,
        border: `${RING_WIDTH}px solid var(--colour-surface-tertiary)`,
        zIndex: index,
      }}
    >
      <img src={src} alt={alt} className="block size-full object-cover" />
    </div>
  );
}

function PrimaryActionButton({
  alt,
  onClick,
  children,
}: {
  alt: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={alt}
      onClick={onClick}
      className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-action-bold p-2.5"
    >
      <span className="relative block size-5">{children}</span>
    </button>
  );
}

function MoreActionButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="More options"
      onClick={onClick}
      className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-[1.111px] border-border-action bg-surface-action-subtle p-[8.889px]"
    >
      <span className="relative block size-5">
        <img
          src={dotsIcon}
          alt=""
          aria-hidden
          className="absolute bottom-[18.75%] left-[43.76%] right-[43.76%] top-[18.77%] block"
        />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: "inset 0px -4.444px 4.444px 0px rgba(255,255,255,0.25)",
        }}
      />
    </button>
  );
}

export default function MultiSelectWidget({
  count,
  label = "selected",
  avatars,
  onCart,
  onShare,
  onMore,
  className = "",
}: MultiSelectWidgetProps) {
  const visible = avatars.slice(0, MAX_AVATARS);
  return (
    <div
      className={
        "inline-flex max-w-[359px] items-center gap-5 rounded-full bg-surface-primary p-2 font-primary " +
        className
      }
      style={{
        boxShadow:
          "0px 8px 20px rgba(33,39,51,0.08), 0px 4px 20px rgba(14,14,14,0.06)",
      }}
    >
      <div className="flex shrink-0 items-center gap-1">
        <div className="flex shrink-0 items-center">
          {visible.map((a, i) => (
            <Avatar key={i} {...a} index={i} />
          ))}
        </div>
        <div className="flex shrink-0 flex-col items-start whitespace-nowrap">
          <p className="text-b14 font-semibold text-text-primary">
            {count} items
          </p>
          <p className="text-b12 font-normal text-text-tertiary">{label}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <PrimaryActionButton alt="Add to cart" onClick={onCart}>
          <img
            src={cartIcon}
            alt=""
            aria-hidden
            className="absolute inset-0 block size-full"
          />
        </PrimaryActionButton>
        <PrimaryActionButton alt="Share" onClick={onShare}>
          <img
            src={shareIcon}
            alt=""
            aria-hidden
            className="absolute bottom-[17.71%] left-[13.54%] right-[13.55%] top-[13.54%] block"
          />
        </PrimaryActionButton>
        <MoreActionButton onClick={onMore} />
      </div>
    </div>
  );
}
