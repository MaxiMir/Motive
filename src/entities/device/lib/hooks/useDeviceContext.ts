import { useContext } from 'react'
import { DeviceContext } from '@entities/device/lib/context'

export const useDeviceContext = () => useContext(DeviceContext)
