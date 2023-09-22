import { Details } from 'express-useragent'
import { createContext, useContext } from 'react'
import { Device } from 'shared/api'

export const DeviceContext = createContext<Device>({})

export function useDeviceContext() {
  return useContext(DeviceContext)
}

export function toDevice(details?: Details) {
  if (!details) {
    return {}
  }

  if (details.isMobile) {
    return { type: 'mobile', ...details }
  }

  if (details.isTablet) {
    return { type: 'tablet', ...details }
  }

  return { type: 'desktop', ...details }
}
