import Router from '@/Router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'

const root: HTMLElement = document.getElementById( 'root' )!
createRoot( root ).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
