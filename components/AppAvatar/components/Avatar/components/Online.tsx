import { ReactNode } from 'react'
import { Badge } from '@mui/material'

interface OnlineProps {
  size: number
  children: ReactNode
}

export default function Online({ size, children }: OnlineProps) {
  const radius = size > 100 ? 12 : 8

  return (
    <Badge
      overlap="circular"
      variant="dot"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={(theme) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          width: radius,
          height: radius,
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          borderRadius: '50%',
          right: '18%',
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      })}
    >
      {children}
    </Badge>
  )
}
