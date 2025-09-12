import { useContext } from 'react'

import { DeviceContext, type DeviceContextType } from '~/context/ScreenContext'

export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext)

  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }

  return context
}
