import type { ReactNode } from "react";

export type ActionButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  /** Visual size variant. "sm" → h-44/text-15, "md" → h-48/text-16. */
  size?: "sm" | "md";
};

export function CancelButton({
  children,
  onClick,
  size = "md",
}: ActionButtonProps) {
  const heightCls = size === "sm" ? "h-11" : "h-12";
  const textCls = size === "sm" ? "text-[15px] tracking-[-0.26px]" : "text-[16px] tracking-[-0.15px]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center rounded-[12px] border border-border-primary bg-surface-secondary px-6 py-[14px] ${heightCls}`}
    >
      <span
        className={`whitespace-nowrap font-primary font-semibold text-text-primary leading-[18px] ${textCls}`}
        style={{ fontFeatureSettings: "'case' 1" }}
      >
        {children}
      </span>
    </button>
  );
}

export type DangerButtonProps = ActionButtonProps & {
  /** "deep" = #d92626 (Delete Collection), "bright" = #f04242 (Remove Items). */
  shade?: "deep" | "bright";
};

export function DangerButton({
  children,
  onClick,
  size = "md",
  shade = "deep",
}: DangerButtonProps) {
  const heightCls = size === "sm" ? "h-11" : "h-12";
  const textCls = size === "sm" ? "text-[15px] tracking-[-0.26px]" : "text-[16px] tracking-[-0.15px]";
  const bg = shade === "deep" ? "bg-[#d92626]" : "bg-[#f04242]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-[80px] flex-1 items-center justify-center gap-1.5 rounded-[12px] px-6 py-[14px] ${bg} ${heightCls}`}
    >
      <span
        className={`flex-1 whitespace-nowrap text-center font-primary font-semibold leading-[18px] text-white ${textCls}`}
        style={{ fontFeatureSettings: "'case' 1" }}
      >
        {children}
      </span>
    </button>
  );
}

export function SaveButton({
  children,
  enabled = false,
  onClick,
}: {
  children: ReactNode;
  enabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={onClick}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-[12px] px-6 py-4 ${
        enabled ? "bg-surface-action-bold" : "bg-surface-tertiary"
      }`}
    >
      <span
        className={`whitespace-nowrap font-primary text-[18px] font-semibold leading-6 tracking-[-0.18px] ${
          enabled ? "text-white" : "text-text-muted"
        }`}
        style={{ fontFeatureSettings: "'case' 1" }}
      >
        {children}
      </span>
    </button>
  );
}
