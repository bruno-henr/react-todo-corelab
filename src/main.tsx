import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.scss'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster 
      richColors 
      position="top-right" 
      toastOptions={{
        style: {
          fontSize: '1.25rem'
        }
      }}
    />
    <App />
  </React.StrictMode>,
)
