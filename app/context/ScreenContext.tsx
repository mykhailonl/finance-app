import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export interface DeviceContextType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isHydrated: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isHydrated: false,
})

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  const isMobileQuery = useMediaQuery({ maxWidth: 767 })
  const isTabletQuery = useMediaQuery({ minWidth: 768, maxWidth: 1439 })
  const isDesktopQuery = useMediaQuery({ minWidth: 1440 })

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const isMobile = isHydrated ? isMobileQuery : false
  const isTablet = isHydrated ? isTabletQuery : false
  const isDesktop = isHydrated ? isDesktopQuery : true

  const value = useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
      isHydrated,
    }),
    [isMobile, isTablet, isDesktop, isHydrated]
  )

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  )
}
