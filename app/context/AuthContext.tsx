import type { User } from '@supabase/supabase-js'
import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { DEMO_USER_ID, type DemoDataOverrides } from '~/constants/demoData'
import type { AuthContextType } from '~/types/AuthTypes'
import supabase from '~/utils/supabase'

const DEMO_STORAGE_KEY = 'demo_data_overrides'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Initializing demoOverrides from localStorage
  const [demoOverrides, setDemoOverrides] = useState<DemoDataOverrides>(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEY)

      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Failed to parse demo overrides from localStorage:', error)

      return {}
    }
  })

  // Saving demoOverrides in localStorage when they're changing
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoOverrides))
  }, [demoOverrides])

  const updateDemoData = useCallback(
    (key: keyof DemoDataOverrides, value: any) => {
      setDemoOverrides((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    []
  )

  const clearDemoData = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_STORAGE_KEY)
    }
    setDemoOverrides({})
  }, [])

  // Auth init and listening to changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Logged in
        setUser(session.user)

        setIsDemoMode(false)

        clearDemoData()
      } else {
        // Not logged in - demo mode
        setUser({
          id: DEMO_USER_ID,
          email: 'demo@example.com',
          user_metadata: {},
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        })

        setIsDemoMode(true)
      }

      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Logged in
        setUser(session.user)
        setIsDemoMode(false)
        clearDemoData()
      } else {
        // Logged out - recovering demo mode
        setUser({
          id: DEMO_USER_ID,
          email: 'demo@example.com',
          user_metadata: {},
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        })
        setIsDemoMode(true)
        // Recovering demo-data from localStorage if there were any
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [clearDemoData])

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

    await queryClient.invalidateQueries()
    clearDemoData()

    setLoading(false)

    return { error }
  }, [queryClient, clearDemoData])

  const value = {
    user,
    loading,
    isDemoMode,
    demoOverrides,
    updateDemoData,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
