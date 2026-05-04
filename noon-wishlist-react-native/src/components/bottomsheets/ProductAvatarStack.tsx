export type AvatarItem = { src: string; alt?: string };

export type ProductAvatarStackProps = {
  /** Full list of selected items. First 3 render as avatars; rest become a "+N" badge. */
  items: AvatarItem[];
};

const MAX_AVATARS = 3;
const AVATAR_SIZE = 32;
const OVERLAP = 16;
const RING = 0.889;

export default function ProductAvatarStack({ items }: ProductAvatarStackProps) {
  const visible = items.slice(0, MAX_AVATARS);
  const extra = Math.max(0, items.length - MAX_AVATARS);
  return (
    <div className="flex items-center">
      {visible.map((a, i) => (
        <div
          key={i}
          className="relative shrink-0 overflow-hidden rounded-full bg-white"
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            marginLeft: i === 0 ? 0 : -OVERLAP,
            border: `${RING}px solid var(--colour-surface-tertiary)`,
            zIndex: i,
          }}
        >
          <img
            src={a.src}
            alt={a.alt ?? ""}
            className="block size-full object-cover"
          />
        </div>
      ))}
      {extra > 0 && (
        <div
          className="relative flex shrink-0 items-center justify-center rounded-full bg-surface-tertiary"
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            marginLeft: -OVERLAP,
            border: `${RING}px solid var(--colour-border-primary)`,
            zIndex: MAX_AVATARS,
          }}
        >
          <span className="font-primary text-b14 font-medium text-text-secondary">
            +{extra}
          </span>
        </div>
      )}
    </div>
  );
}
