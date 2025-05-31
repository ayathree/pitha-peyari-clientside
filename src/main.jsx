import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import MainRouter from './routers/MainRouter.jsx'
import AuthProvider from './pages/authenticationPages/providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {  QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={MainRouter}></RouterProvider>
      </QueryClientProvider>
      <Toaster></Toaster>
    </AuthProvider>
  </StrictMode>,
)
