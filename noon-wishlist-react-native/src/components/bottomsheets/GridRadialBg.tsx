type Props = {
  /** Inner card height in px (used for the radial gradient overlay sizing). */
  height: number;
  /** Total cells; 88 fills the grid pattern in the figma. */
  cells?: number;
};

const GRID_SVG_TEMPLATE = (h: number) =>
  `url("data:image/svg+xml;utf8,<svg viewBox='0 0 351 ${h}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23g)' opacity='1'/><defs><radialGradient id='g' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 ${(h * 0.0795).toFixed(3)} -35.405 0 175.5 11.42)'><stop stop-color='rgba(255,255,255,0)' offset='0'/><stop stop-color='rgba(255,255,255,1)' offset='1'/></radialGradient></defs></svg>")`;

export default function GridRadialBg({ height, cells = 88 }: Props) {
  return (
    <>
      <div
        aria-hidden
        className="absolute -top-px left-1/2 flex w-[356px] -translate-x-1/2 flex-wrap content-center items-center gap-[0.5px] bg-surface-primary"
      >
        {Array.from({ length: cells }).map((_, i) => (
          <div
            key={i}
            className="size-[44px] shrink-0 rounded-[4px] bg-surface-muted"
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-px -top-px w-[351px]"
        style={{
          height,
          backgroundImage: GRID_SVG_TEMPLATE(height),
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
    </>
  );
}
