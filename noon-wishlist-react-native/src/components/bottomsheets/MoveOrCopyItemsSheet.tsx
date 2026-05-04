import plusIcon from "../../assets/bottomsheets/icons/plus.svg";
import collApple from "../../assets/bottomsheets/products/coll-apple.png";
import collLamps from "../../assets/bottomsheets/products/coll-lamps.png";
import collWatches from "../../assets/bottomsheets/products/coll-watches.png";
import BottomSheet from "./BottomSheet";
import HeaderBar from "./HeaderBar";
import { SaveButton } from "./Buttons";
import type { AvatarItem } from "./ProductAvatarStack";

export const MOVE_COPY_COLLECTIONS = [
  { id: "apple", name: "Apple", src: collApple },
  { id: "lamps", name: "Lamps", src: collLamps },
  { id: "watches", name: "Watches", src: collWatches },
];

function CheckCircle() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-surface-action-bold">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.5 6.5L4.75 8.75L9.5 3.75"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PlusCircle() {
  return (
    <span className="flex shrink-0 items-center rounded-full border border-surface-tertiary p-1">
      <span className="flex size-5 items-center justify-center overflow-hidden">
        <img src={plusIcon} alt="" aria-hidden className="block" />
      </span>
    </span>
  );
}

function CollectionRow({
  name,
  src,
  selected,
  onClick,
}: {
  name: string;
  src: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="flex w-full items-center justify-between text-left"
    >
      <span className="flex items-center gap-4">
        <span className="flex shrink-0 items-center rounded-[8px] bg-surface-tertiary p-1">
          <span className="relative size-8 shrink-0 overflow-hidden rounded-[6px]">
            <img src={src} alt="" className="block size-full object-cover" />
          </span>
        </span>
        <span className="whitespace-nowrap font-primary text-b16 font-normal text-text-primary">
          {name}
        </span>
      </span>
      {selected ? (
        <span className="flex shrink-0 items-center p-[3px]">
          <CheckCircle />
        </span>
      ) : (
        <PlusCircle />
      )}
    </button>
  );
}

export type MoveOrCopyItemsSheetProps = {
  action: "Move" | "Copy";
  items: AvatarItem[];
  selectedCollections: Set<string>;
  onToggleCollection: (id: string) => void;
  onBack?: () => void;
  onSave?: () => void;
};

export default function MoveOrCopyItemsSheet({
  action,
  items,
  selectedCollections,
  onToggleCollection,
  onBack,
  onSave,
}: MoveOrCopyItemsSheetProps) {
  const enabled = selectedCollections.size > 0;
  return (
    <BottomSheet>
      <div className="flex w-[343px] flex-col items-start gap-2 rounded-[16px] bg-surface-tertiary p-2">
        <HeaderBar
          showBack
          onBack={onBack}
          title={`${action} ${items.length} items to`}
          items={items}
        />

        <div className="flex w-full flex-col items-start gap-6 rounded-[12px] bg-surface-primary px-3 pb-3 pt-4">
          <div className="flex w-full flex-col items-start gap-5">
            {MOVE_COPY_COLLECTIONS.map((c) => (
              <CollectionRow
                key={c.id}
                name={c.name}
                src={c.src}
                selected={selectedCollections.has(c.id)}
                onClick={() => onToggleCollection(c.id)}
              />
            ))}
          </div>
          <SaveButton enabled={enabled} onClick={onSave}>
            Save Changes
          </SaveButton>
        </div>
      </div>
    </BottomSheet>
  );
}
