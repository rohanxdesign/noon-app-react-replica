import { useState } from "react";
import notchImg from "../assets/wishlist/status-bar/notch.svg";
import rightSideImg from "../assets/wishlist/status-bar/right-side.svg";
import uploadIcon from "../assets/collection/upload-action.svg";
import CollectionOptionsMenu from "./CollectionOptionsMenu";

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 9 16.5"
      fill="none"
      aria-hidden
      className="block h-[12.5px] w-[6.25px]"
    >
      <path
        d="M8.25 0.75L0.75 8.25L8.25 15.75"
        stroke="#1D2539"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThreeDotsIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="block size-4 opacity-80"
    >
      <circle cx="3" cy="8" r="1.5" fill="#1D2539" />
      <circle cx="8" cy="8" r="1.5" fill="#1D2539" />
      <circle cx="13" cy="8" r="1.5" fill="#1D2539" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="block size-5"
    >
      <path
        d="M4 4L16 16M16 4L4 16"
        stroke="#1D2539"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="relative h-[47px] w-full shrink-0 overflow-hidden">
      <img
        src={notchImg}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-[-2px] block h-8 w-[164px] -translate-x-1/2"
      />
      <span className="absolute left-[27px] top-[14px] block w-[54px] text-center font-['SF_Pro_Text','SF_Pro','-apple-system',system-ui] text-[17px] font-semibold leading-[22px] text-[#010101] tracking-[-0.408px]">
        9:41
      </span>
      <img
        src={rightSideImg}
        alt=""
        aria-hidden
        className="absolute right-[26.6px] top-[19px] block h-[13px] w-[77.4px]"
      />
    </div>
  );
}

export type CollectionHeaderProps = {
  title: string;
  itemCount: number;
  solid?: boolean;
  selectMode?: boolean;
  onBack?: () => void;
  onShare?: () => void;
  onSelect?: () => void;
  onRename?: () => void;
  onDeleteCollection?: () => void;
};

export default function CollectionHeader({
  title,
  itemCount,
  solid = false,
  selectMode = false,
  onBack,
  onShare,
  onSelect,
  onRename,
  onDeleteCollection,
}: CollectionHeaderProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  function handleRename() {
    setOptionsOpen(false);
    onRename?.();
  }

  function handleDelete() {
    setOptionsOpen(false);
    onDeleteCollection?.();
  }

  return (
    <div
      className={
        "absolute inset-x-0 top-0 z-20 flex w-full flex-col font-primary " +
        (solid
          ? "bg-surface-primary"
          : "bg-gradient-to-b from-white from-[20%] to-white/0")
      }
    >
      <StatusBar />
      <div className="flex h-14 w-full items-center gap-3 px-3 py-2">
        {/* Back */}
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-primary bg-surface-primary p-2.5"
        >
          <ChevronLeftIcon />
        </button>

        {/* Title block */}
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-primary text-h16 font-bold text-text-primary">
            {title}
          </p>
          <p className="font-primary text-b12 font-normal text-text-muted">
            {itemCount} {itemCount === 1 ? "Item" : "Items"}
          </p>
        </div>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          {/* Share — tinted action-subtle pill */}
          <button
            type="button"
            aria-label="Share"
            onClick={onShare}
            className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.111px] border-border-action p-2.5"
            style={{
              boxShadow:
                "inset 0px -4.444px 4.444px 0px rgba(255,255,255,0.25)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-surface-action-subtle"
            />
            <img
              src={uploadIcon}
              alt=""
              aria-hidden
              className="relative block size-4"
            />
          </button>

          {/* Select — label-only pill */}
          <button
            type="button"
            onClick={onSelect}
            className="flex h-9 shrink-0 items-center justify-center gap-0.5 rounded-full border border-border-primary bg-surface-primary px-3 py-2"
          >
            <span className="font-primary text-l3 font-semibold text-text-primary opacity-80">
              {selectMode ? "Cancel" : "Select"}
            </span>
          </button>

          {/* Three dots / cross — opens options menu */}
          <div className="relative">
            <button
              type="button"
              aria-label={optionsOpen ? "Close options" : "More"}
              onClick={() => setOptionsOpen((v) => !v)}
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-primary bg-surface-primary p-2.5"
            >
              {optionsOpen ? <CrossIcon /> : <ThreeDotsIcon />}
            </button>

            {optionsOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-30 animate-[options-fade-in_180ms_ease-out_forwards]">
                <CollectionOptionsMenu
                  onRename={handleRename}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
