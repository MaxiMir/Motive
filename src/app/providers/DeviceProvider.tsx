import { ReactNode } from 'react'
import { Device, DeviceContext } from '@entities/device'

interface DeviceProviderProps {
  value?: Device
  children: ReactNode
}

function DeviceProvider({ value, children }: DeviceProviderProps) {
  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export default DeviceProvider
