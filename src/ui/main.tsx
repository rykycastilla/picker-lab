import Router from '@/Router'
import { AppProvider } from '@/contexts/app'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'

// Auto-apply dark mode based on system preference
const applySystemTheme = () => {
  const prefersDark = window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches
  document.documentElement.classList.toggle( 'dark', prefersDark )
}

applySystemTheme()
if( window.matchMedia ) {
  const mq = window.matchMedia( '(prefers-color-scheme: dark)' )
  mq.addEventListener?.( 'change', applySystemTheme )
}

const root: HTMLElement = document.getElementById( 'root' )!
createRoot( root ).render(
  <StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </StrictMode>,
)
