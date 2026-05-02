export const typography = {
  fontFamily: {
    primary: '"Noontree", system-ui, sans-serif',
  },
  fontWeight: {
    light:     300,
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
    black:     900,
  },

  // ─── Headings ───────────────────────────────────────────────────────────────
  heading: {
    h40: { fontSize: '40px', lineHeight: '48px', letterSpacing: '-0.25px' },
    h32: { fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.25px' },
    h28: { fontSize: '28px', lineHeight: '36px', letterSpacing: '-0.25px' },
    h24: { fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.25px' },
    h20: { fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.25px' },
    h18: { fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.15px' },
    h16: { fontSize: '16px', lineHeight: '20px', letterSpacing: '-0.15px' },
  },

  // ─── Body ────────────────────────────────────────────────────────────────────
  body: {
    b16: { fontSize: '16px', lineHeight: '20px', letterSpacing: '-0.15px' },
    b14: { fontSize: '14px', lineHeight: '18px', letterSpacing: '-0.10px' },
    b12: { fontSize: '12px', lineHeight: '16px', letterSpacing: '-0.10px' },
    b11: { fontSize: '11px', lineHeight: '14px', letterSpacing: '-0.10px' },
  },

  // ─── Action (buttons, labels, CTAs) ─────────────────────────────────────────
  action: {
    a17: { fontSize: '17px', lineHeight: '24px', letterSpacing: '-0.25px' },
    a16: { fontSize: '16px', lineHeight: '24px', letterSpacing: '0px'    },
    a14: { fontSize: '14px', lineHeight: '20px', letterSpacing: '0px'    },
    a12: { fontSize: '12px', lineHeight: '16px', letterSpacing: '0px'    },
  },
} as const;
