const SHIMMER =
  "bg-gradient-to-r from-surface-tertiary via-surface-secondary to-surface-tertiary bg-[length:200%_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]";

function CollectionCardSkeleton({ width }: { width: number }) {
  return (
    <div className="flex shrink-0 flex-col items-start gap-2">
      <div
        className={`h-[120px] rounded-2xl ${SHIMMER}`}
        style={{ width }}
      />
      <div className={`h-3 w-20 rounded ${SHIMMER}`} />
      <div className={`h-3 w-12 rounded ${SHIMMER}`} />
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-1.5 overflow-hidden rounded-[12px] border-[0.75px] border-surface-tertiary bg-surface-primary p-1.5">
      <div className={`aspect-[3/4.1] w-full rounded-[10px] ${SHIMMER}`} />
      <div className={`h-3 w-full rounded ${SHIMMER}`} />
      <div className={`h-3 w-3/4 rounded ${SHIMMER}`} />
      <div className={`h-4 w-1/2 rounded ${SHIMMER}`} />
      <div className={`h-4 w-2/3 rounded ${SHIMMER}`} />
      <div className={`h-9 w-full rounded-lg ${SHIMMER}`} />
    </div>
  );
}

export default function WishlistSkeleton() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-surface-primary">
      {/* Status-bar gap */}
      <div className="h-[47px] shrink-0" />

      {/* Header skeleton: back, title, create CTA */}
      <div className="flex h-14 shrink-0 items-center gap-3 px-4 py-2">
        <div className={`size-10 rounded-full ${SHIMMER}`} />
        <div className={`h-5 w-24 rounded ${SHIMMER}`} />
        <div className="ml-auto" />
        <div className={`h-9 w-20 rounded-full ${SHIMMER}`} />
      </div>

      {/* Horizontal collections row */}
      <div className="flex shrink-0 items-end gap-[19px] overflow-hidden px-4 pt-4">
        <CollectionCardSkeleton width={200} />
        <CollectionCardSkeleton width={140} />
        <CollectionCardSkeleton width={120} />
      </div>

      {/* "All Saved Items" header row */}
      <div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-8">
        <div className={`h-5 w-32 rounded ${SHIMMER}`} />
        <div className={`h-7 w-16 rounded-full ${SHIMMER}`} />
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 gap-[15px] px-4 pt-3">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
