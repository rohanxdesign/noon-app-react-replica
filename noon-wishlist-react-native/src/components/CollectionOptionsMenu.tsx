import editIcon from "../assets/collection/options/edit.svg";
import trashIcon from "../assets/collection/options/trash.svg";

export type CollectionOptionsMenuProps = {
  onRename?: () => void;
  onDelete?: () => void;
  className?: string;
};

export default function CollectionOptionsMenu({
  onRename,
  onDelete,
  className = "",
}: CollectionOptionsMenuProps) {
  return (
    <div
      className={
        "flex w-[190px] flex-col items-start gap-8 rounded-2xl bg-surface-primary pl-4 pr-5 py-6 font-primary shadow-[0px_4px_8px_rgba(0,0,0,0.08)] " +
        className
      }
    >
      <button
        type="button"
        onClick={onRename}
        className="flex w-full items-center gap-3"
      >
        <span className="flex size-5 shrink-0 items-center justify-center">
          <img
            src={editIcon}
            alt=""
            aria-hidden
            className="block h-[13px] w-[13px]"
          />
        </span>
        <span className="whitespace-nowrap font-primary text-b16 font-normal text-text-primary">
          Rename
        </span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-3"
      >
        <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden">
          <img
            src={trashIcon}
            alt=""
            aria-hidden
            className="block h-[17.5px] w-[15px]"
          />
        </span>
        <span className="whitespace-nowrap font-primary text-b16 font-normal text-text-error">
          Delete Collection
        </span>
      </button>
    </div>
  );
}
