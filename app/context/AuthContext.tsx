import type { User } from '@supabase/supabase-js'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import type { AuthContextType } from '~/types/AuthTypes'
import supabase from '~/utils/supabase'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    return { data, error }
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, options?: { data?: object }) => {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      })
      setLoading(false)
      return { data, error }
    },
    []
  )

  const signOut = useCallback(async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    return { error }
  }, [])

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
