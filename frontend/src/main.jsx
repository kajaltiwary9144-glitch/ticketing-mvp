import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { store } from './store';
import App from './App';

const theme = createTheme({ palette:{primary:{main:'#4f46e5'},background:{default:'#f5f7fb'}}, shape:{borderRadius:12}, typography:{fontFamily:'Inter, system-ui, sans-serif'} });
createRoot(document.getElementById('root')).render(<Provider store={store}><ThemeProvider theme={theme}><CssBaseline/><App/></ThemeProvider></Provider>);
