import { createContext, useContext } from 'react'
import { Device } from 'shared/api'

export const DeviceContext = createContext<Device | undefined>(undefined)

export const useDeviceContext = () => useContext(DeviceContext)
