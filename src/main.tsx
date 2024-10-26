import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme.ts'
import { ErrorBoundary } from './components/layout'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Provider } from 'react-redux'
import { store } from './store'
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <ErrorBoundary>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                  <App />
                </SnackbarProvider>
              </LocalizationProvider>
            </ErrorBoundary>
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    </Router>
  </StrictMode>,
)
