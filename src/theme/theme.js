import { createTheme } from '@mui/material/styles';
import { COLORS } from '../utils/constants';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.gold,
      light: COLORS.goldLight,
      dark: COLORS.goldDark,
      contrastText: '#0a0a12',
    },
    secondary: {
      main: '#6c63ff',
      light: '#8b83ff',
      dark: '#4a42cc',
      contrastText: '#ffffff',
    },
    background: {
      default: COLORS.bg,
      paper: COLORS.surface,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
    error: {
      main: COLORS.red,
    },
    success: {
      main: COLORS.green,
    },
    divider: COLORS.border,
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    h6: {
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.3)',
    '0 2px 6px rgba(0,0,0,0.3)',
    '0 4px 12px rgba(0,0,0,0.3)',
    '0 6px 16px rgba(0,0,0,0.35)',
    '0 8px 24px rgba(0,0,0,0.35)',
    '0 12px 32px rgba(0,0,0,0.4)',
    '0 16px 48px rgba(0,0,0,0.4)',
    '0 20px 56px rgba(0,0,0,0.45)',
    '0 24px 64px rgba(0,0,0,0.45)',
    '0 28px 72px rgba(0,0,0,0.5)',
    '0 32px 80px rgba(0,0,0,0.5)',
    '0 36px 88px rgba(0,0,0,0.5)',
    '0 40px 96px rgba(0,0,0,0.55)',
    '0 44px 104px rgba(0,0,0,0.55)',
    '0 48px 112px rgba(0,0,0,0.55)',
    '0 52px 120px rgba(0,0,0,0.6)',
    '0 56px 128px rgba(0,0,0,0.6)',
    '0 60px 136px rgba(0,0,0,0.6)',
    '0 64px 144px rgba(0,0,0,0.6)',
    '0 68px 152px rgba(0,0,0,0.65)',
    '0 72px 160px rgba(0,0,0,0.65)',
    '0 76px 168px rgba(0,0,0,0.65)',
    '0 80px 176px rgba(0,0,0,0.65)',
    '0 84px 184px rgba(0,0,0,0.65)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`,
          color: '#0a0a12',
          '&:hover': {
            background: `linear-gradient(135deg, ${COLORS.goldLight} 0%, ${COLORS.gold} 100%)`,
            boxShadow: `0 4px 20px rgba(245, 188, 66, 0.3)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: `linear-gradient(145deg, ${COLORS.surface} 0%, #11111c 100%)`,
          border: `1px solid ${COLORS.border}`,
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});
