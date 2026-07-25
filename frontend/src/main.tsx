import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from './contexts/ThemeContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { ReviewsProvider } from './contexts/ReviewsContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <ReviewsProvider>
          <RouterProvider router={router} />
        </ReviewsProvider>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
