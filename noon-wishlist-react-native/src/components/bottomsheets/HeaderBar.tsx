import chevronLeftIcon from "../../assets/bottomsheets/icons/chevron-left.svg";
import ProductAvatarStack, { type AvatarItem } from "./ProductAvatarStack";

export type HeaderBarProps = {
  showBack?: boolean;
  onBack?: () => void;
  title: string;
  items: AvatarItem[];
};

export default function HeaderBar({
  showBack,
  onBack,
  title,
  items,
}: HeaderBarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-[12px] bg-surface-primary p-3">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex size-6 shrink-0 items-center justify-center rounded-[12px] bg-surface-tertiary p-1"
          >
            <span className="flex size-4 items-center justify-center overflow-hidden">
              <img src={chevronLeftIcon} alt="" aria-hidden className="block" />
            </span>
          </button>
        )}
        <p className="whitespace-nowrap font-primary text-b16 font-semibold text-text-primary">
          {title}
        </p>
      </div>
      <ProductAvatarStack items={items} />
    </div>
  );
}
