import { Typography } from '@mui/material'
import { TypographyProps } from '@mui/system'
import { ReactNode } from 'react'

interface SpinTypographyProps {
  fontSize?: TypographyProps['fontSize']
  children: ReactNode
}

function SpinTypography({ fontSize = 60, children }: SpinTypographyProps) {
  return (
    <Typography
      paragraph
      fontSize={fontSize}
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
