import { createContext, useContext } from 'react'

export type Device = 'mobile' | 'tablet' | 'desktop'

export const DeviceContext = createContext<Device | undefined>(undefined)

export const useDeviceContext = () => useContext(DeviceContext)
