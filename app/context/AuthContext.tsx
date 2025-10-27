import type { User } from '@supabase/supabase-js'
import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { DEMO_USER_ID, type DemoDataOverrides } from '~/constants/demoData'
import type { AuthContextType } from '~/types/AuthTypes'
import supabase from '~/utils/supabase'

const DEMO_STORAGE_KEY = 'demo_data_overrides'
const SEEN_DEMO_KEY = 'has_seen_demo'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoInitialized, setDemoInitialized] = useState(false)

  // useRef for hasSeenDemo to avoid cycles
  const hasSeenDemoRef = useRef<boolean>(false)

  // useRef to track that we're logging out
  const isSigningOutRef = useRef<boolean>(false)

  // Init ref on loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      hasSeenDemoRef.current = localStorage.getItem(SEEN_DEMO_KEY) === 'true'
    }
  }, [])

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

  // Init auth on loading
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Logged in
        setUser(session.user)
        setIsDemoMode(false)
        clearDemoData()
        setDemoInitialized(true)
      } else {
        // Not logged in - init DEMO right away
        if (!hasSeenDemoRef.current) {
          setUser({
            id: DEMO_USER_ID,
            email: 'demo@example.com',
            user_metadata: {},
            app_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          })
          setIsDemoMode(true)
          if (typeof window !== 'undefined') {
            localStorage.setItem(SEEN_DEMO_KEY, 'true')
          }
          hasSeenDemoRef.current = true
        }
        setDemoInitialized(true)
      }

      setLoading(false)
    })
  }, [clearDemoData])

  // Listening to auth changes (login/logout)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Logged in
        setUser(session.user)
        setIsDemoMode(false)
        clearDemoData()
        setDemoInitialized(true)
        isSigningOutRef.current = false
      } else {
        // Logged out
        // Only init DEMO if this in unintentional logout
        if (!isSigningOutRef.current && !hasSeenDemoRef.current) {
          setUser({
            id: DEMO_USER_ID,
            email: 'demo@example.com',
            user_metadata: {},
            app_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          })
          setIsDemoMode(true)
          if (typeof window !== 'undefined') {
            localStorage.setItem(SEEN_DEMO_KEY, 'true')
          }
          hasSeenDemoRef.current = true
          setDemoInitialized(true)
        } else if (isSigningOutRef.current) {
          // Intentional logout - setting user to null
          setUser(null)
          setDemoInitialized(true)
        }
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
    // Flag that we're in process of intentional logging out
    isSigningOutRef.current = true

    setLoading(true)

    const { error } = await supabase.auth.signOut()

    await queryClient.invalidateQueries()
    clearDemoData()

    // Reset flag to turn on DEMO next visit
    hasSeenDemoRef.current = false
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SEEN_DEMO_KEY)
    }

    setLoading(false)

    return { error }
  }, [queryClient, clearDemoData])

  const enterDemoMode = useCallback(() => {
    // Reset flags to init DEMO
    hasSeenDemoRef.current = false
    isSigningOutRef.current = false

    if (typeof window !== 'undefined') {
      localStorage.removeItem(SEEN_DEMO_KEY)
    }

    setUser({
      id: DEMO_USER_ID,
      email: 'demo@example.com',
      user_metadata: {},
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    })

    setIsDemoMode(true)
    setDemoInitialized(true)

    if (typeof window !== 'undefined') {
      localStorage.setItem(SEEN_DEMO_KEY, 'true')
    }

    hasSeenDemoRef.current = true
  }, [])

  const value = {
    user,
    loading,
    isDemoMode,
    demoInitialized,
    demoOverrides,
    enterDemoMode,
    clearDemoData,
    updateDemoData,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
