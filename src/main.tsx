import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { Providers } from './app/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>,
)
