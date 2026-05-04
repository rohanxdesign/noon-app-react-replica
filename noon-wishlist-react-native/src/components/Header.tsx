import notchImg from "../assets/wishlist/status-bar/notch.svg";
import rightSideImg from "../assets/wishlist/status-bar/right-side.svg";

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
        stroke="#0E0E0E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="none"
      aria-hidden
      className="block"
    >
      <path
        d="M6.75 0.75C6.75 0.335786 6.41421 0 6 0C5.58579 0 5.25 0.335786 5.25 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335786 6.75 0.75 6.75L5.25 6.75V11.25C5.25 11.6642 5.58579 12 6 12C6.41421 12 6.75 11.6642 6.75 11.25V6.75L11.25 6.75C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.75V0.75Z"
        fill="#FFFFFF"
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
      <span className="absolute left-[27px] top-[15px] block w-[54px] text-center font-['SF_Pro_Text','SF_Pro','-apple-system',system-ui] text-[17px] font-semibold leading-[22px] text-[#010101] tracking-[-0.408px]">
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

export type WishlistHeaderProps = {
  onBack?: () => void;
  onCreate?: () => void;
};

export default function Header({ onBack, onCreate }: WishlistHeaderProps) {
  return (
    <div className="relative flex w-full flex-col items-stretch bg-gradient-to-b from-white from-40% to-white/0 font-primary">
      <StatusBar />
      <div className="flex h-14 w-full items-center gap-5 px-4 py-2">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border-primary bg-white/90"
        >
          <span className="flex size-5 items-center justify-center">
            <ChevronLeftIcon />
          </span>
        </button>
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-primary text-b16 font-bold text-text-primary">
            Wishlist
          </p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex shrink-0 items-center justify-center gap-0.5 rounded-full bg-surface-action-bold px-3 py-1.5"
        >
          <span className="flex size-5 items-center justify-center">
            <PlusIcon />
          </span>
          <span className="font-primary text-l3 font-semibold text-text-on-surface-bold">
            Create
          </span>
        </button>
      </div>
    </div>
  );
}
