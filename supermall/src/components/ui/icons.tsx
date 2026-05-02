interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ChevronLeft({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.5" />
      <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HeartOutline({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartFilled({ size = 16, color = '#EF4444', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
    </svg>
  );
}

export function PlusIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TrashIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 17.5 19.5" fill={color} className={className}>
      <path d="M17.5 4.75C17.5 4.336 17.164 4 16.75 4C16.718 4 16.685 4.001 16.653 4.003L13.336 4.003L12.856 2.084C12.55 0.857 11.453 0 10.189 0L7.311 0C6.047 0 4.95 0.856 4.644 2.084L4.164 4.003L0.847 4.003C0.815 4.003 0.783 4 0.75 4C0.336 4 0 4.336 0 4.75C0 5.165 0.336 5.501 0.75 5.501L0.799 5.501C1.465 5.528 2 6.076 2 6.749L2 15.749C2 17.816 3.682 19.499 5.75 19.499L11.75 19.499C13.818 19.499 15.5 17.816 15.5 15.749L15.5 6.749C15.5 6.076 16.035 5.528 16.701 5.501L16.75 5.501C17.164 5.501 17.5 5.165 17.5 4.751ZM6.099 2.447C6.238 1.89 6.736 1.5 7.311 1.5L10.189 1.5C10.764 1.5 11.262 1.89 11.401 2.447L11.79 4.003L5.71 4.003ZM14 6.75L14 15.75C14 16.991 12.99 18 11.75 18L5.75 18C4.509 18 3.5 16.991 3.5 15.75L3.5 6.75C3.5 6.301 3.391 5.878 3.2 5.503L14.301 5.503C14.11 5.878 14.001 6.301 14.001 6.75Z" />
      <path d="M6.75 15.5C7.164 15.5 7.5 15.164 7.5 14.75L7.5 8.75C7.5 8.336 7.164 8 6.75 8C6.336 8 6 8.336 6 8.75L6 14.75C6 15.164 6.336 15.5 6.75 15.5Z" />
      <path d="M10.75 15.5C11.164 15.5 11.5 15.164 11.5 14.75L11.5 8.75C11.5 8.336 11.164 8 10.75 8C10.336 8 10 8.336 10 8.75L10 14.75C10 15.164 10.336 15.5 10.75 15.5Z" />
    </svg>
  );
}

export function StarFilled({ size = 12, color = '#329537', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={color} className={className}>
      <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" />
    </svg>
  );
}

export function FilterIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2 4H14M4 8H12M6 12H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SortIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M5 4V12M5 12L3 10M5 12L7 10" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 12V4M11 4L9 6M11 4L13 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown({ size = 12, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight({ size = 20, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M7.5 5L12.5 10L7.5 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V9.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeFilled({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V9.5Z" />
    </svg>
  );
}

export function GridIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function PersonIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
      <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CartIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 6H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon({ size = 20, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M7.5 3.5L6.5 5H3C2.45 5 2 5.45 2 6V15C2 15.55 2.45 16 3 16H17C17.55 16 18 15.55 18 15V6C18 5.45 17.55 5 17 5H13.5L12.5 3.5H7.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10.5" r="2.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function SparkleIcon({ size = 24, color = 'rgba(255,255,255,0.25)', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M24 12C13.1868 12.6593 12.6593 13.1868 12 24C11.3407 13.1868 10.8132 12.6593 0 12C10.8132 11.3407 11.3407 10.8132 12 0C12.6593 10.8132 13.1868 11.3407 24 12Z"
        fill={color}
      />
    </svg>
  );
}

export function MoonIcon({ size = 12, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M10 6.5C9.5 8.5 7.7 10 5.5 10C3 10 1 8 1 5.5C1 3.3 2.5 1.5 4.5 1C3.5 2 3 3.2 3 4.5C3 7 5 9 7.5 9C8.7 9 9.8 8.5 10.6 7.7C10.4 7.3 10.2 6.9 10 6.5Z" fill={color} />
    </svg>
  );
}

export function ShareIcon({ size = 20, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M13.958 6.04167C14.8785 6.04167 15.625 5.29514 15.625 4.37467C15.625 3.45419 14.8785 2.70767 13.958 2.70767C13.0375 2.70767 12.291 3.45419 12.291 4.37467C12.291 5.29514 13.0375 6.04167 13.958 6.04167Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M5.62598 11.6667C6.54646 11.6667 7.29298 10.9202 7.29298 9.99967C7.29298 9.0792 6.54646 8.33267 5.62598 8.33267C4.70551 8.33267 3.95898 9.0792 3.95898 9.99967C3.95898 10.9202 4.70551 11.6667 5.62598 11.6667Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M13.958 17.2917C14.8785 17.2917 15.625 16.5451 15.625 15.6247C15.625 14.7042 14.8785 13.9577 13.958 13.9577C13.0375 13.9577 12.291 14.7042 12.291 15.6247C12.291 16.5451 13.0375 17.2917 13.958 17.2917Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M7.12695 10.8398L12.4561 14.7848" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.4561 5.21484L7.12695 9.15984" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
