import { Typography } from '@mui/material'
import { TypographyProps } from '@mui/system'
import { ReactNode } from 'react'

interface FadeTypographyProps {
  fontSize?: TypographyProps['fontSize']
  children: ReactNode
}

function FadeTypography({ fontSize = 60, children }: FadeTypographyProps) {
  return (
    <Typography
      paragraph
      fontSize={fontSize}
      m={0}
      sx={{
        animation: 'fade 1.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        '@keyframes fade': {
          from: {
            filter: 'blur(12px)',
            opacity: 0,
          },
          to: {
            filter: 'blur(0px)',
            opacity: 1,
          },
        },
      }}
    >
      {children}
    </Typography>
  )
}

export default FadeTypography
