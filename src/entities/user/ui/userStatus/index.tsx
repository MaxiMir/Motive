import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Device } from 'shared/api'

const Online = dynamic(() => import('./online'))
const Offline = dynamic(() => import('./offline'))

interface UserStatusProps extends BoxProps {
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  children: ReactNode
}

export function UserStatus({ online, lastSeen, device, children, ...props }: UserStatusProps) {
  const flexDirection = online ? 'row' : 'column'

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      alignItems={{
        xs: 'center',
        xl: online ? 'center' : 'flex-start',
      }}
      {...props}
    >
      {children}
      {online ? <Online /> : <>{lastSeen && <Offline lastSeen={lastSeen} device={device} />}</>}
    </Box>
  )
}
