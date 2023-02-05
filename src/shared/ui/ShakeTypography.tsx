import { Typography } from '@mui/material'
import { TypographyProps } from '@mui/system'
import { ReactNode } from 'react'

interface ShakeTypographyProps {
  fontSize?: TypographyProps['fontSize']
  children: ReactNode
}

function ShakeTypography({ fontSize = 60, children }: ShakeTypographyProps) {
  return (
    <Typography
      paragraph
      fontSize={fontSize}
      m={0}
      sx={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        '@keyframes shake': {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)',
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)',
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)',
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)',
          },
        },
      }}
    >
      {children}
    </Typography>
  )
}

export default ShakeTypography