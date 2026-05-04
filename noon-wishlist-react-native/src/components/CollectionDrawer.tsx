import { useState } from "react";
import earphones from "../assets/earphones.png";
import lamp from "../assets/lamp.png";
import watch from "../assets/watch.png";
import allItemsSubtract from "../assets/all-items-subtract.svg";
import checkCircle from "../assets/check-circle.svg";
import sparkles from "../assets/sparkles.svg";
import plus from "../assets/plus.svg";
import chevronRight from "../assets/chevron-right.svg";
import ctaCard from "../assets/cta-card.png";
import ctaCardOverlay from "../assets/cta-card-overlay.png";
import ctaFrame from "../assets/cta-frame.svg";
import ctaLike from "../assets/cta-like.svg";
import ctaPaperplane from "../assets/cta-paperplane.svg";
import ellipseGlow from "../assets/ellipse-glow.svg";

export type Collection = {
  id: string;
  name: string;
  thumb: string;
  selected?: boolean;
  suggested?: boolean;
};

const defaultCollections: Collection[] = [
  { id: "all", name: "All Items", thumb: earphones, selected: true },
  { id: "earphones", name: "Earphones", thumb: earphones, suggested: true },
  { id: "lamps", name: "Lamps", thumb: lamp },
  { id: "watches", name: "Watches", thumb: watch },
];

function CollectionRow({
  collection,
  onToggle,
}: {
  collection: Collection;
  onToggle?: (id: string) => void;
}) {
  const { id, name, thumb, selected, suggested } = collection;
  const isAll = id === "all";
  return (
    <button
      type="button"
      onClick={() => onToggle?.(id)}
      aria-pressed={selected}
      className="flex w-full items-center justify-between bg-transparent text-left"
    >
      <div className="flex items-center gap-4">
        <div className="relative size-10 shrink-0">
          <div className="corner-smooth-lg flex size-10 items-center bg-surface-tertiary p-1">
            <img
              src={thumb}
              alt=""
              className="h-8 w-8 rounded-[6px] object-cover"
            />
          </div>
          {isAll && (
            <img
              src={allItemsSubtract}
              alt=""
              aria-hidden
              className="absolute left-[38.9px] top-[2.84px] h-[35.754px] w-[10.667px] -scale-y-100 rotate-180"
            />
          )}
        </div>
        <div className="flex flex-col justify-center gap-1">
          <p
            className={`whitespace-nowrap text-b16 text-text-primary ${
              selected ? "font-semibold" : "font-normal"
            }`}
          >
            {name}
          </p>
          {suggested && (
            <div className="flex items-center gap-1">
              <img src={sparkles} alt="" className="h-3 w-3" aria-hidden />
              <span
                className="whitespace-nowrap bg-clip-text text-l4 font-medium text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e33fb9, #9047e9)",
                }}
              >
                Suggested New Collection
              </span>
            </div>
          )}
        </div>
      </div>
      {selected ? (
        <img src={checkCircle} alt="selected" className="h-7 w-7" />
      ) : (
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-full border border-surface-tertiary"
        >
          <img src={plus} alt="" className="h-3 w-3" />
        </span>
      )}
    </button>
  );
}

function CreateNewCollectionCard({ onPress }: { onPress?: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="relative h-16 w-full overflow-hidden rounded-xl border border-border-primary bg-surface-tertiary px-4 py-3 text-left"
    >
      {/* Soft glow */}
      <img
        src={ellipseGlow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-[61.5px] left-[174px] h-[185px] w-[185px]"
      />
      {/* Phone frame illustration */}
      <img
        src={ctaFrame}
        alt=""
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "calc(50% + 113px - 47.5px)",
          top: "35px",
          width: 95,
          height: 66,
          transform: "translateX(-50%)",
        }}
      />

      {/* Text content */}
      <div className="relative flex w-[203px] flex-col gap-1">
        <div className="flex items-center gap-[2px]">
          <span className="whitespace-nowrap text-b16 font-semibold text-text-secondary">
            Create a New Collection
          </span>
          <img
            src={chevronRight}
            alt=""
            aria-hidden
            className="h-4 w-4"
          />
        </div>
        <p className="text-l4 font-normal text-text-tertiary">
          Organise &amp; save for later
        </p>
      </div>

      {/* Card stack with reactions */}
      <div
        className="pointer-events-none absolute"
        style={{ left: 232.98, top: 12, width: 55.034, height: 56 }}
      >
        <div
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: 39.003,
            height: 55.962,
            transform: "rotate(-5deg)",
          }}
        >
          <img
            src={ctaCard}
            alt=""
            className="h-full w-full rounded-[6.5px] object-cover"
          />
          <img
            src={ctaCardOverlay}
            alt=""
            aria-hidden
            className="absolute"
            style={{ left: 41.17, top: 3.12, width: 14.97, height: 48.827 }}
          />
        </div>
        {/* Like badge */}
        <div
          className="absolute"
          style={{
            right: 56.43,
            top: 21.42,
            width: 15.167,
            height: 15.167,
            transform: "rotate(-5deg)",
          }}
        >
          <div
            className="flex items-center p-[3.182px]"
            style={{
              background: "rgba(208,212,221,0.64)",
              borderRadius: "15.273px 15.273px 1.273px 15.273px",
            }}
          >
            <img src={ctaLike} alt="" className="h-[7.636px] w-[7.636px]" />
          </div>
        </div>
        {/* Paperplane badge */}
        <div
          className="absolute flex items-center p-[2.899px]"
          style={{
            right: -17.05,
            top: 32,
            background: "rgba(208,212,221,0.64)",
            borderRadius: "13.918px 13.918px 13.918px 1.16px",
          }}
        >
          <div className="flex h-[8.201px] w-[8.201px] items-center justify-center">
            <img
              src={ctaPaperplane}
              alt=""
              className="h-[5.799px] w-[5.799px] -rotate-45"
            />
          </div>
        </div>
        {/* Tiny dot */}
        <div
          className="absolute"
          style={{
            right: -7.05,
            top: -4,
            width: 6,
            height: 6,
            background: "rgba(208,212,221,0.64)",
            borderRadius: "5.965px 5.965px 5.965px 0.497px",
          }}
        />
      </div>
    </button>
  );
}

export type DrawerProduct = {
  image?: string;
};

export type CollectionDrawerProps = {
  collections?: Collection[];
  onToggle?: (id: string) => void;
  onCreate?: () => void;
  product?: DrawerProduct;
};

export default function CollectionDrawer({
  collections = defaultCollections,
  onToggle,
  onCreate,
  product,
}: CollectionDrawerProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(collections.filter((c) => c.selected).map((c) => c.id)),
  );

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    onToggle?.(id);
  };

  const withOverrides = (c: Collection): Collection => ({
    ...c,
    selected: selectedIds.has(c.id),
    thumb:
      product?.image && (c.id === "all" || c.suggested)
        ? product.image
        : c.thumb,
  });

  const allItems = collections.find((c) => c.id === "all");
  const others = collections.filter((c) => c.id !== "all");

  return (
    <div className="flex w-[375px] flex-col items-center">
      {/* Drag handle */}
      <div className="flex h-6 w-full items-center justify-center">
        <div className="h-[3px] w-9 rounded-full bg-border-bold" />
      </div>

      {/* Floating card */}
      <div className="flex w-[351px] flex-col gap-6 overflow-hidden rounded-3xl bg-neutral-white p-5 shadow-sheet">
        {allItems && (
          <CollectionRow
            collection={withOverrides(allItems)}
            onToggle={handleToggle}
          />
        )}

        {/* Dashed divider */}
        <div
          aria-hidden
          className="h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #d0d4dd 0 4px, transparent 4px 8px)",
          }}
        />

        <div className="flex w-full flex-col gap-5">
          {others.map((c) => (
            <CollectionRow
              key={c.id}
              collection={withOverrides(c)}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <CreateNewCollectionCard onPress={onCreate} />
      </div>

      {/* iOS home indicator */}
      <div className="relative h-[34px] w-full">
        <div className="absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-neutral-white" />
      </div>
    </div>
  );
}
