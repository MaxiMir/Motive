import { Box, Typography } from '@mui/material'
import { styled, TypographyProps } from '@mui/system'
import { ReactNode } from 'react'

interface FlyTypographyProps {
  fontSize?: TypographyProps['fontSize']
  children: ReactNode | ReactNode[]
}

function FlyTypography({ fontSize = 60, children }: FlyTypographyProps) {
  return (
    <Box position="relative" width={150} height={180}>
      <StyledTypography paragraph fontSize={fontSize} m={0}>
        {children}
      </StyledTypography>
    </Box>
  )
}

const StyledTypography = styled(Typography)({
  position: 'absolute',
  transform: 'rotate(-45deg)',
  bottom: 0,
  left: 45,
  animation: 'fly 6s linear infinite',
  '@keyframes fly': {
    '0%': {
      bottom: 0,
    },
    '50%': {
      bottom: '25%',
    },
    '75%': {
      bottom: '50%',
      opacity: 0.7,
    },
    '100%': {
      bottom: '60%',
      opacity: 0,
    },
  },
})

export default FlyTypography
