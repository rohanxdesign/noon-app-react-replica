import blobImg from "../assets/collection/empty/blob.png";
import pebble1 from "../assets/collection/empty/pebble-1.png";
import pebble2 from "../assets/collection/empty/pebble-2.png";
import paperAirplane from "../assets/collection/empty/paper-airplane.svg";
import heartMini from "../assets/collection/empty/heart-mini.svg";
import trendingDown from "../assets/collection/empty/trending-down.svg";
import plusCircle from "../assets/collection/empty/plus-circle.svg";

function Illustration() {
  return (
    <div className="relative h-[132px] w-[167px] shrink-0">
      {/* Stones cluster (bottom-right) */}
      <div className="absolute right-[16.1px] top-[30.04px] h-[101.96px] w-[130.18px]">
        {/* Big blob (back) */}
        <img
          src={blobImg}
          alt=""
          aria-hidden
          className="absolute left-[18.21px] top-0 block h-[80.11px] w-[79.76px] object-contain"
        />
        {/* Small pebble (front-left) */}
        <div className="absolute left-0 top-[58.26px] size-[43.7px] overflow-hidden rounded-full">
          <img
            src={pebble1}
            alt=""
            aria-hidden
            className="block size-full object-cover"
          />
        </div>
        {/* Medium pebble (front-right) */}
        <div className="absolute left-[79.2px] top-[36.41px] size-[50.98px] overflow-hidden rounded-full">
          <img
            src={pebble2}
            alt=""
            aria-hidden
            className="block size-full object-cover"
          />
        </div>
      </div>

      {/* Paper-airplane chip (right side) */}
      <div
        className="absolute right-[-0.66px] top-[5.18px] flex items-center justify-center bg-border-bold p-2"
        style={{
          borderRadius: "39.765px 39.765px 39.765px 3.314px",
        }}
      >
        <span className="flex size-[23.43px] -rotate-45 items-center justify-center">
          <img
            src={paperAirplane}
            alt=""
            aria-hidden
            className="block h-[10.16px] w-[12.34px]"
          />
        </span>
      </div>

      {/* Heart chip (left, small) */}
      <div
        className="absolute right-[124.43px] top-[5.27px] flex items-center justify-center bg-border-bold p-1"
        style={{
          borderRadius: "18.08px 18.08px 18.08px 1.507px",
        }}
      >
        <span className="flex size-[9.04px] items-center justify-center">
          <img
            src={heartMini}
            alt=""
            aria-hidden
            className="block h-[5.81px] w-[6.6px]"
          />
        </span>
      </div>

      {/* Trending-down chip (left, larger) */}
      <div
        className="absolute right-[136.07px] top-[47.61px] flex items-center justify-center bg-border-bold p-2"
        style={{
          borderRadius: "29.776px 29.776px 29.776px 2.481px",
        }}
      >
        <span className="flex size-[19.59px] items-center justify-center">
          <img
            src={trendingDown}
            alt=""
            aria-hidden
            className="block h-[10.66px] w-[16.4px]"
          />
        </span>
      </div>
    </div>
  );
}

export type CollectionEmptyStateProps = {
  onStartAdding?: () => void;
};

export default function CollectionEmptyState({
  onStartAdding,
}: CollectionEmptyStateProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 font-primary">
      <Illustration />
      <p className="w-[239px] text-center font-primary text-b16 font-normal text-text-primary">
        Organise, share and get notified for price drops
      </p>
      <button
        type="button"
        onClick={onStartAdding}
        className="flex h-12 w-[211px] items-center justify-center gap-2 rounded-xl bg-surface-action-bold px-6 py-4"
      >
        <span className="flex size-5 items-center justify-center">
          <img
            src={plusCircle}
            alt=""
            aria-hidden
            className="block size-[16.25px]"
          />
        </span>
        <span className="font-primary text-b16 font-semibold text-text-on-surface-bold">
          Start adding items
        </span>
      </button>
    </div>
  );
}
