import { createContext } from 'react'
import { Device } from 'shared/api'

export const DeviceContext = createContext<Device | undefined>(undefined)
