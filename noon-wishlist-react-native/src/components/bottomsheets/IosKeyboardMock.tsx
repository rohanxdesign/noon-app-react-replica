const KEY_FONT = "ui-sans-serif, -apple-system, system-ui, sans-serif";

function LetterKey({ children, width = 32 }: { children: string; width?: number }) {
  return (
    <div
      className="flex h-[42px] items-center justify-center rounded-[4.6px] bg-white shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]"
      style={{ width }}
    >
      <span
        className="text-[22px] leading-7 text-black"
        style={{ fontFamily: KEY_FONT, letterSpacing: "0.35px" }}
      >
        {children}
      </span>
    </div>
  );
}

function MetaKey({
  children,
  width,
  bg = "#abb0bc",
  fontSize = 16,
}: {
  children: string;
  width: number;
  bg?: string;
  fontSize?: number;
}) {
  return (
    <div
      className="flex h-[42px] items-center justify-center rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]"
      style={{ width, background: bg }}
    >
      <span
        className="leading-[21px] text-black"
        style={{ fontFamily: KEY_FONT, fontSize, letterSpacing: "-0.32px" }}
      >
        {children}
      </span>
    </div>
  );
}

function ShiftKey() {
  return (
    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[4.6px] bg-white shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]">
      <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
        <path
          d="M9.5 1L17.5 9H13.5V15.5H5.5V9H1.5L9.5 1Z"
          stroke="black"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function DeleteKey() {
  return (
    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[4.6px] bg-[#abb0bc] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]">
      <svg width="22" height="17" viewBox="0 0 22 17" fill="none">
        <path
          d="M5.5 1H20C20.5523 1 21 1.44772 21 2V15C21 15.5523 20.5523 16 20 16H5.5L1 8.5L5.5 1Z"
          stroke="black"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M9 5.5L15 11.5M15 5.5L9 11.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const ROW_1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW_2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const ROW_3 = ["Z", "X", "C", "V", "B", "N", "M"];

export default function IosKeyboardMock() {
  return (
    <div
      className="relative h-[290px] w-[375px] overflow-hidden"
      style={{ background: "#d1d3d9", backdropFilter: "blur(54px)" }}
    >
      {/* Row 1 */}
      <div className="absolute left-[3px] right-[3px] top-2 flex justify-between">
        {ROW_1.map((k) => (
          <LetterKey key={k}>{k}</LetterKey>
        ))}
      </div>

      {/* Row 2 (insets ~19px each side) */}
      <div className="absolute left-[22px] right-[22px] top-[62px] flex justify-between">
        {ROW_2.map((k) => (
          <LetterKey key={k}>{k}</LetterKey>
        ))}
      </div>

      {/* Row 3: shift + 7 letters + delete */}
      <div className="absolute left-[3px] right-[3px] top-[116px] flex items-start justify-between">
        <ShiftKey />
        <div className="flex items-center gap-[6px]">
          {ROW_3.map((k) => (
            <LetterKey key={k}>{k}</LetterKey>
          ))}
        </div>
        <DeleteKey />
      </div>

      {/* Bottom row: 123 + space + return */}
      <div className="absolute left-[3px] right-[3px] top-[178px] flex items-start gap-[6px]">
        <MetaKey width={91}>123</MetaKey>
        <div className="flex h-[42px] flex-1 items-center justify-center rounded-[4.6px] bg-white shadow-[0px_1px_0px_0px_rgba(0,0,0,0.3)]">
          <span
            className="text-[16px] leading-[21px] text-black"
            style={{ fontFamily: KEY_FONT, letterSpacing: "-0.32px" }}
          >
            space
          </span>
        </div>
        <MetaKey width={91} bg="#abb0bc">
          return
        </MetaKey>
      </div>

      {/* Emoji + dictation */}
      <div className="absolute left-[31px] right-[31px] top-[238px] flex items-start justify-between">
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden>
          <circle cx="13.5" cy="13.5" r="12" stroke="black" strokeWidth="1.5" />
          <circle cx="9" cy="11" r="1.2" fill="black" />
          <circle cx="18" cy="11" r="1.2" fill="black" />
          <path
            d="M8 16C9.2 18 11.2 19 13.5 19C15.8 19 17.8 18 19 16"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <svg width="19" height="28" viewBox="0 0 19 28" fill="none" aria-hidden>
          <rect x="6" y="2" width="7" height="14" rx="3.5" stroke="black" strokeWidth="1.5" />
          <path
            d="M2 14C2 18.4 5.4 22 9.5 22C13.6 22 17 18.4 17 14"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <line x1="9.5" y1="22" x2="9.5" y2="27" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Home indicator (black on light keyboard bg) */}
      <div className="absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}
