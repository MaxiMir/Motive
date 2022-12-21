import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface AppImageZoomProps {
  children: ReactNode
}

function AppImageZoom({ children }: AppImageZoomProps) {
  return (
    <Box
      sx={{
        width: '100%',
        animation: 'zoom-in 10s ease-in infinite',
        transition: 'all .5s ease-in-out',
        overflow: 'hidden',
        '@keyframes zoom-in': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.8)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      }}
    >
      <Box
        sx={{
          animation: 'zoom-out 10s ease-in infinite',
          transition: 'all .5s ease-in-out',
          overflow: 'hidden',
          '@keyframes zoom-out': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(0.67)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AppImageZoom
