import { createContext } from 'react'
import { Device } from '@shared/api/dto'

export const DeviceContext = createContext<Device | undefined>(undefined)
