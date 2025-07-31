import React, { createContext,useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

export interface DeviceContextType {
  isMobile: boolean,
  isTablet: boolean,
  isDesktop: boolean,
}

// eslint-disable-next-line react-refresh/only-export-components
export const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

export const DeviceProvider = ({ children }: {children: React.ReactNode}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 })
  const isDesktop = useMediaQuery({ minWidth: 1440 })

  const value = useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
    }),
    [isMobile, isTablet, isDesktop],
  )

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
};
