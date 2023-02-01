import { Typography } from '@mui/material'
import { ReactNode } from 'react'

interface SpinTypographyProps {
  children: ReactNode
}

function SpinTypography({ children }: SpinTypographyProps) {
  return (
    <Typography
      variant="h2"
      paragraph
      m={0}
      sx={{
        animation: 'spin 3.6s linear infinite',
        '@keyframes spin': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(20deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(-20deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      }}
    >
      {children}
    </Typography>
  )
}

export default SpinTypography
