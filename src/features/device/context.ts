import { createContext, useContext } from 'react'
import { Device } from '@features/device/types'

export const DeviceContext = createContext<Device | undefined>(undefined)

export const useDeviceContext = () => useContext(DeviceContext)
