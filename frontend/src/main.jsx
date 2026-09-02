import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { store } from './store';
import App from './App';

// AI-assisted theme foundation, reviewed and adjusted to a restrained enterprise palette.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#173B57', dark: '#102A40', light: '#E8F0F5' },
    secondary: { main: '#287A78' },
    background: { default: '#F4F6F8', paper: '#FFFFFF' },
    text: { primary: '#17232D', secondary: '#5C6B76' },
    divider: '#DCE3E8'
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 650 }
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 650, boxShadow: 'none' } } },
    MuiCard: { styleOverrides: { root: { borderColor: '#DCE3E8', boxShadow: '0 1px 2px rgba(23,35,45,.04)' } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 650, borderRadius: 6 } } }
  }
});
createRoot(document.getElementById('root')).render(<Provider store={store}><ThemeProvider theme={theme}><CssBaseline/><App/></ThemeProvider></Provider>);
