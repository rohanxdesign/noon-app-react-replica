import swatch1 from "../../assets/bottomsheets/master/swatch-1.png";
import swatch2 from "../../assets/bottomsheets/master/swatch-2.png";
import swatch3 from "../../assets/bottomsheets/master/swatch-3.png";
import swatch4 from "../../assets/bottomsheets/master/swatch-4.png";
import swatch5 from "../../assets/bottomsheets/master/swatch-5.png";
import swatch6 from "../../assets/bottomsheets/master/swatch-6.png";

type CardProps = {
  src: string;
  /** Card frame variant. "framed" = inner colored frame + smaller image (used at edges). */
  variant?: "framed" | "image";
};

function Card({ src, variant = "image" }: CardProps) {
  return (
    <div className="flex items-center rounded-[20px] border-[1.25px] border-[var(--colour-border-subtle)] bg-surface-primary p-1">
      {variant === "framed" ? (
        <div className="relative size-[70px] rounded-[16px] bg-surface-secondary">
          <div className="absolute left-1/2 top-1/2 size-[52.5px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px]">
            <img
              src={src}
              alt=""
              className="block size-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="relative size-[70px] overflow-hidden rounded-[14px]">
          <img
            src={src}
            alt=""
            className="block size-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

type Position = {
  src: string;
  variant?: "framed" | "image";
  rotate: number; // degrees
  size: number; // bounding box size for centering
  left: string; // calc expression around 50%
  top: string; // calc expression around 50%
};

const POSITIONS: Position[] = [
  { src: swatch1, variant: "framed", rotate: -15, size: 95.53, left: "calc(50% - 256.51px)", top: "calc(50% + 44.53px)" },
  { src: swatch2, rotate: -10, size: 90.36, left: "calc(50% - 175.26px)", top: "calc(50% + 17.45px)" },
  { src: swatch3, rotate: -5, size: 84.501, left: "calc(50% - 89.01px)", top: "calc(50% + 3.75px)" },
  { src: swatch4, rotate: 0, size: 80, left: "calc(50% - 1.51px)", top: "50%" },
  { src: swatch5, rotate: 5, size: 84.501, left: "calc(50% + 85.99px)", top: "calc(50% + 3.75px)" },
  { src: swatch6, rotate: 10, size: 90.36, left: "calc(50% + 172.24px)", top: "calc(50% + 17.59px)" },
  { src: swatch1, variant: "framed", rotate: 15, size: 95.53, left: "calc(50% + 255.99px)", top: "calc(50% + 45px)" },
];

export default function MasterSwatch() {
  return (
    <div className="relative h-20 w-[349px] shrink-0">
      {POSITIONS.map((p, i) => (
        <div
          key={i}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
        >
          <div style={{ transform: `rotate(${p.rotate}deg)` }}>
            <Card src={p.src} variant={p.variant} />
          </div>
        </div>
      ))}
    </div>
  );
}
