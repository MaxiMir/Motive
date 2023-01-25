import { createContext } from 'react'
import { Device } from '@entities/device/model/types'

export const DeviceContext = createContext<Device | undefined>(undefined)
