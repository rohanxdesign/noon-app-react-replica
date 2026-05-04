const TILE = 46.875;
const COLS = 8;
const ROWS = 11;

export default function CollectionWallpaper({
  className = "",
}: {
  className?: string;
}) {
  const total = COLS * ROWS;
  return (
    <div
      className={
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-[515.625px] overflow-hidden " +
        className
      }
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${TILE}px)`,
          gridAutoRows: `${TILE}px`,
          width: COLS * TILE,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="border-[0.3px] border-white bg-surface-tertiary"
            style={{
              width: TILE,
              height: TILE,
              borderRadius: 6.392,
            }}
          />
        ))}
      </div>
      {/* Soft white fade — starts at 25% of the screen (y≈203 of 812) and fades to white */}
      <div className="absolute inset-x-0 bottom-0 h-[312px] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
