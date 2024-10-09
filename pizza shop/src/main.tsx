import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './app.tsx'
import { enableMSW } from './api/mocks/index.ts'

enableMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
