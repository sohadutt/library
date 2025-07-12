import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LibraryProvider } from "./components/libraryCont.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LibraryProvider>
    <App />
    </LibraryProvider>
  </StrictMode>,
)
