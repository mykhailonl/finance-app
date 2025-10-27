import type { AuthError, User } from '@supabase/supabase-js'

import type { DemoDataOverrides } from '~/constants/demoData'

export type AuthModalTypes = { type: 'logout' }

export interface AuthContextType {
  user: User | null
  loading: boolean

  isDemoMode: boolean
  demoOverrides: DemoDataOverrides
  updateDemoData: (key: keyof DemoDataOverrides, value: any) => void
  clearDemoData: () => void
  demoInitialized: boolean

  signIn: (
    email: string,
    password: string
  ) => Promise<{
    data: { user: User | null; session: any } | null
    error: AuthError | null
  }>
  signUp: (
    email: string,
    password: string,
    options?: { data?: object }
  ) => Promise<{
    data: { user: User | null; session: any } | null
    error: AuthError | null
  }>
  signOut: () => Promise<{
    error: AuthError | null
  }>
  enterDemoMode: () => void
}
