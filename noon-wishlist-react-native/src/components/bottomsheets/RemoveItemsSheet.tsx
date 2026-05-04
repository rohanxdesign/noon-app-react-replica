import BottomSheet from "./BottomSheet";
import HeaderBar from "./HeaderBar";
import { CancelButton, DangerButton } from "./Buttons";
import type { AvatarItem } from "./ProductAvatarStack";

function ProductRow({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex shrink-0 items-center rounded-[8px] bg-surface-tertiary p-1">
        <div className="relative size-10 shrink-0">
          <img src={src} alt="" className="block size-full object-cover" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start">
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-primary text-[16px] font-normal leading-5 tracking-[-0.15px] text-text-primary">
          {name}
        </p>
      </div>
    </div>
  );
}

export type RemoveItemsSheetProps = {
  items: AvatarItem[];
  onBack?: () => void;
  onCancel?: () => void;
  onRemove?: () => void;
};

export default function RemoveItemsSheet({
  items,
  onBack,
  onCancel,
  onRemove,
}: RemoveItemsSheetProps) {
  return (
    <BottomSheet>
      <div className="flex w-[343px] flex-col items-start gap-2 rounded-[16px] bg-surface-tertiary p-2">
        <HeaderBar
          showBack
          onBack={onBack}
          title={`Remove ${items.length} items`}
          items={items}
        />

        <div className="flex w-full flex-col items-start gap-6 rounded-[12px] bg-surface-primary px-3 pb-3 pt-4">
          <div className="flex w-full flex-col items-start gap-5">
            {items.map((item, i) => (
              <ProductRow
                key={i}
                name={item.alt ?? "Product"}
                src={item.src}
              />
            ))}
          </div>
          <div className="flex w-full items-start gap-3">
            <CancelButton size="md" onClick={onCancel}>
              Cancel
            </CancelButton>
            <DangerButton size="md" shade="bright" onClick={onRemove}>
              Remove
            </DangerButton>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
