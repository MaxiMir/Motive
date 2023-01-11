import { createContext, useContext } from 'react'

export type Device = 'mobile' | 'tablet' | 'desktop'

export const DeviceContext = createContext<Device>('mobile')

export const useDeviceContext = () => useContext(DeviceContext)
