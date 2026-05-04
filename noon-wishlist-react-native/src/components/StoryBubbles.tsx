export type StoryBubbleId =
  | "live-sale"
  | "price-drop"
  | "low-stock"
  | "back-in-stock";

export type StoryBubble = {
  id: StoryBubbleId;
  label: string;
  thumb: string;
  ringColor: string;
  emoji: string;
};

export type StoryBubblesProps = {
  bubbles: StoryBubble[];
  onOpen?: (id: StoryBubbleId) => void;
};

export default function StoryBubbles({ bubbles, onOpen }: StoryBubblesProps) {
  if (bubbles.length === 0) return null;
  return (
    <div className="flex shrink-0 items-center gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {bubbles.map((b) => (
        <button
          key={b.id}
          type="button"
          onClick={() => onOpen?.(b.id)}
          className="flex w-16 shrink-0 flex-col items-center gap-1.5 bg-transparent"
        >
          <span
            className="relative flex size-[60px] items-center justify-center rounded-full p-[2.5px]"
            style={{
              background: `conic-gradient(from 90deg, ${b.ringColor}, #f7306f, ${b.ringColor})`,
            }}
          >
            <span className="flex size-full items-center justify-center overflow-hidden rounded-full border-[2px] border-white bg-surface-secondary">
              <img
                src={b.thumb}
                alt=""
                className="block size-full object-cover"
              />
            </span>
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-white text-[10px]"
            >
              {b.emoji}
            </span>
          </span>
          <p className="w-full truncate text-center font-primary text-l4 font-medium text-text-primary">
            {b.label}
          </p>
        </button>
      ))}
    </div>
  );
}
