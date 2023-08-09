import { createContext, useContext } from 'react'
import { Device } from 'shared/api'

export const DeviceContext = createContext<Device | undefined>(undefined)

export function useDeviceContext() {
  return useContext(DeviceContext)
}

export function useCheckOnMobile(): boolean {
  const device = useDeviceContext()

  return ['feature phone', 'smartphone', 'phablet'].includes(device || '')
}
