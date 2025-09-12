import './app.css'

import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Navigate,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router'

import { ModalContainer } from '~/components/ModalContainer'
import { AuthProvider } from '~/context/AuthContext'
import { ModalProvider } from '~/context/ModalContext'
import { DeviceProvider } from '~/context/ScreenContext'
import { useAuth } from '~/hooks/useAuth'

import type { Route } from './+types/root'

const queryClient = new QueryClient()

function AppContent() {
  const { user, loading } = useAuth()
  const location = useLocation()

  const publicRoutes = ['/signup', '/forgot-password', '/login']
  const isPublicRoute = publicRoutes.includes(location.pathname)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    if (isPublicRoute) {
      return <Outlet />
    }

    return <Navigate to="/login" replace />
  }

  if (isPublicRoute) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <div id="modal-root"></div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/*<ModalProvider>*/}
        <ModalProvider>
          <DeviceProvider>
            {/*<ModalContainer />*/}
            <ModalContainer />
            <AppContent />
          </DeviceProvider>
        </ModalProvider>
        {/*</ModalProvider>*/}
      </AuthProvider>
    </QueryClientProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
