import { createTheme } from '@mui/material';

export type ThemeMode = 'light' | 'dark';

export const createAppTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: 'rgb(var(--color-bg-main))',
        paper: 'rgb(var(--color-bg-elevated))',
      },
      primary: {
        main: 'rgb(var(--color-cyan))',
        dark: 'rgb(var(--color-cyan-dark))',
      },
      secondary: {
        main: 'rgb(var(--color-primary-yellow))',
      },
      text: {
        primary: 'rgb(var(--color-text-primary))',
        secondary: 'rgb(var(--color-text-secondary))',
      },
      grey: {
        100: 'rgb(var(--color-grey-lite))',
        300: 'rgb(var(--color-grey))',
        700: 'rgb(var(--color-grey-dark))',
      },
      error: {
        main: 'rgb(var(--color-red))',
      },
      success: {
        main: 'rgb(var(--color-green))',
      },
      divider: 'rgb(var(--color-border-subtle))',
    },
    typography: {
      fontFamily: 'var(--font-family-primary)',
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    shape: {
      borderRadius: 8,
    },
  });

export const theme = createAppTheme('dark');
