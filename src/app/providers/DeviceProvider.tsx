import { ReactNode } from 'react'
import { DeviceContext } from '@entities/device'
import { Device } from '@shared/api/device'

interface DeviceProviderProps {
  value?: Device
  children: ReactNode
}

function DeviceProvider({ value, children }: DeviceProviderProps) {
  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export default DeviceProvider