import type { AuthError, User } from '@supabase/supabase-js'

export interface AuthContextType {
  user: User | null
  loading: boolean
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
}
