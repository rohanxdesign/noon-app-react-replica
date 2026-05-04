import arrowsRightLeft from "../../assets/bottomsheets/icons/arrows-right-left.svg";
import copyIcon from "../../assets/bottomsheets/icons/copy.svg";
import folderPlusIcon from "../../assets/bottomsheets/icons/folder-plus.svg";
import trashIcon from "../../assets/bottomsheets/icons/trash.svg";
import arrowRightIcon from "../../assets/bottomsheets/icons/arrow-right.svg";
import BottomSheet from "./BottomSheet";
import ProductAvatarStack, { type AvatarItem } from "./ProductAvatarStack";

function ChevronRight() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center">
      <span className="rotate-90">
        <img src={arrowRightIcon} alt="" aria-hidden className="block" />
      </span>
    </span>
  );
}

function MenuRow({
  icon,
  label,
  destructive,
  onClick,
}: {
  icon: string;
  label: string;
  destructive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between text-left"
    >
      <span className="flex items-center gap-3">
        <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden">
          <img src={icon} alt="" aria-hidden className="block" />
        </span>
        <span
          className={`whitespace-nowrap font-primary text-[16px] font-normal leading-5 tracking-[-0.16px] ${
            destructive ? "text-text-error" : "text-text-primary"
          }`}
          style={
            destructive
              ? { fontFeatureSettings: "'case' 1, 'lnum' 1, 'pnum' 1" }
              : undefined
          }
        >
          {label}
        </span>
      </span>
      <ChevronRight />
    </button>
  );
}

export type BulkOptionsSheetProps = {
  items: AvatarItem[];
  onMoveItems?: () => void;
  onCopyItems?: () => void;
  onStartNewCollection?: () => void;
  onRemoveItems?: () => void;
};

export default function BulkOptionsSheet({
  items,
  onMoveItems,
  onCopyItems,
  onStartNewCollection,
  onRemoveItems,
}: BulkOptionsSheetProps) {
  return (
    <BottomSheet>
      <div className="flex w-[343px] flex-col items-start gap-2 rounded-[16px] bg-surface-tertiary p-2">
        {/* Header */}
        <div className="flex w-full items-center justify-between rounded-[12px] bg-surface-primary p-3">
          <p className="whitespace-nowrap font-primary text-b16 font-semibold text-text-primary">
            {items.length} items selected
          </p>
          <ProductAvatarStack items={items} />
        </div>

        {/* Organise card */}
        <div className="flex w-full flex-col items-start gap-6 rounded-[12px] bg-surface-primary px-3 py-4">
          <p className="whitespace-nowrap font-primary text-b16 font-semibold text-text-primary">
            Organise
          </p>
          <MenuRow icon={arrowsRightLeft} label="Move to a collection" onClick={onMoveItems} />
          <MenuRow icon={copyIcon} label="Copy to a collection" onClick={onCopyItems} />
          <MenuRow icon={folderPlusIcon} label="Start a new collection" onClick={onStartNewCollection} />
        </div>

        {/* Remove items card */}
        <button
          type="button"
          onClick={onRemoveItems}
          className="flex w-full items-center justify-between rounded-[12px] bg-surface-primary p-3 text-left"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden">
              <img src={trashIcon} alt="" aria-hidden className="block" />
            </span>
            <span
              className="whitespace-nowrap font-primary text-[16px] font-normal leading-5 tracking-[-0.16px] text-text-error"
              style={{ fontFeatureSettings: "'case' 1, 'lnum' 1, 'pnum' 1" }}
            >
              Remove items
            </span>
          </span>
          <ChevronRight />
        </button>
      </div>
    </BottomSheet>
  );
}
