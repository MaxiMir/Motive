import { createContext, useContext } from 'react'
import { Device } from 'shared/api'

export const DeviceContext = createContext<Device>({})

export function useDeviceContext() {
  return useContext(DeviceContext)
}

export function useDetectMobile(): boolean {
  const device = useDeviceContext()

  return ['feature phone', 'smartphone', 'phablet'].includes(device?.type || '')
}

export function useDetectSafari(): boolean {
  const device = useDeviceContext()

  return ['Safari', 'Mobile Safari'].includes(device.browser || '')
}
