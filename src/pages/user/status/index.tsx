import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const BadgeRipple = dynamic(() => import('shared/ui/badge-ripple'))
const Offline = dynamic(() => import('./offline'))

interface StatusProps extends BoxProps {
  online?: boolean | null
  lastSeen?: string | null
  device?: string | null
  children: ReactNode | ReactNode[]
}

function Status({ online, lastSeen, device, children, ...props }: StatusProps) {
  const flexDirection = online || !lastSeen ? 'row' : 'column'

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      alignItems={{ xs: 'center', lg: online ? 'center' : 'flex-start' }}
      {...props}
    >
      {children}
      {online ? (
        <BadgeRipple />
      ) : (
        <>{lastSeen && <Offline lastSeen={lastSeen} device={device} />}</>
      )}
    </Box>
  )
}

export default Status
