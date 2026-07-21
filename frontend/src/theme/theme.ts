import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0B0B0D',
      paper: '#15171C',
    },
    primary: {
      main: '#6E8BFF',
      contrastText: '#F5F5F7',
    },
    text: {
      primary: '#F5F5F7',
      secondary: '#8E8E93',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    success: {
      main: '#3BAA74',
    },
    warning: {
      main: '#D99B36',
    },
    error: {
      main: '#E55353',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Helvetica Neue", sans-serif',
    h1: { letterSpacing: '-0.04em', fontWeight: 700 },
    h2: { letterSpacing: '-0.035em', fontWeight: 700 },
    h3: { letterSpacing: '-0.03em', fontWeight: 700 },
    h4: { letterSpacing: '-0.03em', fontWeight: 700 },
    h5: { letterSpacing: '-0.025em', fontWeight: 600 },
    h6: { letterSpacing: '-0.02em', fontWeight: 600 },
    subtitle1: { letterSpacing: '-0.01em', color: '#F5F5F7' },
    subtitle2: { letterSpacing: '-0.01em', color: '#8E8E93' },
    body1: { color: '#F5F5F7', lineHeight: 1.6 },
    body2: { color: '#8E8E93', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0B0B0D',
          color: '#F5F5F7',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#15171C',
          backgroundImage: 'none',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#6E8BFF',
          color: '#F5F5F7',
          '&:hover': {
            backgroundColor: '#5873E6',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          color: '#F5F5F7',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          },
        },
        text: {
          color: '#8E8E93',
          '&:hover': {
            color: '#F5F5F7',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0B0B0D',
            borderRadius: 10,
            color: '#F5F5F7',
            fontSize: '0.9rem',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6E8BFF',
              borderWidth: 1,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#8E8E93',
            fontSize: '0.85rem',
            '&.Mui-focused': {
              color: '#6E8BFF',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
  },
});
