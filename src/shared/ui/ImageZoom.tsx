import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface ImageZoomProps {
  children: ReactNode
}

function ImageZoom({ children }: ImageZoomProps) {
  return (
    <Box
      width="100%"
      overflow="hidden"
      sx={{
        animation: 'zoom-in 10s ease-in infinite',
        transition: 'all .5s ease-in-out',
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
        overflow="hidden"
        sx={{
          animation: 'zoom-out 10s ease-in infinite',
          transition: 'all .5s ease-in-out',
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

export default ImageZoom
