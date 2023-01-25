import { createContext } from 'react'
import { Device } from '@shared/api/device'

export const DeviceContext = createContext<Device | undefined>(undefined)
