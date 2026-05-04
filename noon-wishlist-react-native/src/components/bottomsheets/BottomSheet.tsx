import type { ReactNode } from "react";

export function DragHandle() {
  return (
    <div className="flex w-full items-center justify-center py-3">
      <div className="h-1 w-9 rounded-full bg-border-bold" />
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div className="relative flex h-[34px] w-full items-center justify-center">
      <div className="absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-text-primary" />
    </div>
  );
}

export type BottomSheetProps = {
  children: ReactNode;
  /** If provided, replaces the default home indicator. */
  footer?: ReactNode;
  /** Vertical gap between drag handle and content. Default 4px. */
  contentGap?: number;
  /** Vertical gap between content and footer. Default 0px. */
  contentToFooterGap?: number;
};

export default function BottomSheet({
  children,
  footer,
  contentGap = 4,
  contentToFooterGap = 0,
}: BottomSheetProps) {
  return (
    <div
      className="flex w-[375px] flex-col items-center font-primary"
      style={{ gap: contentToFooterGap }}
    >
      <div
        className="flex w-full flex-col items-center"
        style={{ gap: contentGap }}
      >
        <DragHandle />
        {children}
      </div>
      {footer ?? <HomeIndicator />}
    </div>
  );
}
