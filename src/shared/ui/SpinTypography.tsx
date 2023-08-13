import { Typography } from '@mui/material'
import { styled, TypographyProps } from '@mui/system'
import { ReactNode } from 'react'

interface SpinTypographyProps {
  fontSize?: TypographyProps['fontSize']
  children: ReactNode | ReactNode[]
}

function SpinTypography({ fontSize = 60, children }: SpinTypographyProps) {
  return (
    <StyledTypography paragraph fontSize={fontSize} m={0}>
      {children}
    </StyledTypography>
  )
}

const StyledTypography = styled(Typography)({
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
})

export default SpinTypography
