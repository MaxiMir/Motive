import { Details } from 'express-useragent'
import { createContext, useContext } from 'react'
import { Device } from 'shared/api'

export const DeviceContext = createContext<Device>({} as never)

export function useDeviceContext() {
  return useContext(DeviceContext)
}

export function toDevice(details: Details): Device {
  if (details.isMobile) {
    return { type: 'mobile', ...details }
  }

  if (details.isTablet) {
    return { type: 'tablet', ...details }
  }

  return { type: 'desktop', ...details }
}
