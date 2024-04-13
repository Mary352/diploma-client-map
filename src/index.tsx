import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    // neutral: {
    //   main: '#64748B',
    //   contrastText: '#fff',
    // },
    // primary: {
    //   main: "#007FFF",
    //   contrastText: '#313037'
    // },
    secondary: {
      main: "#313037"
    },
    system: {
      main: '#313037',
      dark: '#5B5A62',
      light: '#A8A8A8',
    },
    bgColor: {
      main: '#fff',
      dark: '#E7E7E7',
      light: '#F7F7F7',
    },
    contextual: {
      main: '#FC857F'
    },
    tertiary: {
      main: '#D7E4FD',
      light: '#F4EEFD',
    },
    tertiary2: {
      main: '#CAEFF0',
      light: '#FEE9E2',
    },
  },

  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      // sm: 600,
      md: 768,
      // lg: 1200,
      // xl: 1536
      xl: 1200
      // mobile: 768,
      // tablet: 1200
    }
  }
});

const { breakpoints } = theme

theme = createTheme(theme, {
  typography: {
    h1: {
      fontSize: 56,
      [breakpoints.down("md")]: {
        fontSize: 32
      },
      fontWeight: 700
    },
    h2: {
      fontSize: 40,
      fontWeight: 700
    },
    h3: {
      fontSize: 24,
      fontWeight: 700
    },
    subtitle1: {
      fontSize: 18,
      [breakpoints.down("md")]: {
        fontSize: 16
      },
      fontWeight: 700
    },
    body1: {
      fontSize: 16,
      fontWeight: 400
    },
    body2: {
      fontSize: 16,
      fontWeight: 700
    },
  },
})

declare module '@mui/material/styles' {
  interface Palette {
    // neutral: Palette['primary'];
    system: Palette['primary'];
    bgColor: Palette['primary'];
    contextual: Palette['primary'];
    tertiary: Palette['primary'];
    tertiary2: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    // neutral?: PaletteOptions['primary'];
    system?: PaletteOptions['primary'];
    bgColor?: PaletteOptions['primary'];
    contextual?: PaletteOptions['primary'];
    tertiary?: PaletteOptions['primary'];
    tertiary2?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
    // xs: false; // removes the `xs` breakpoint
    sm: false;
    // md: false;
    lg: false;
    // xl: false;
    // mobile: true; // adds the `mobile` breakpoint
    // tablet: true;
    // laptop: true;
    // desktop: true;
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
// declare module '@mui/material/Button' {
//   interface ButtonPropsColorOverrides {
//     neutral: true;
//   }
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
