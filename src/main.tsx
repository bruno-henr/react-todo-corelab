import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.scss'
import { Toaster } from 'sonner'
import { AppProvider } from './context/AppContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    return
  }

  const { worker } = await import('./mocks/browser.ts')

  return worker.start()
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              fontSize: '1rem'
            }
          }}
        />
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
})