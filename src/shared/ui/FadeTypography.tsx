import { Typography } from '@mui/material'
import { TypographyProps } from '@mui/system'
import { ReactNode } from 'react'
import FadeBox from './FadeBox'

interface FadeTypographyProps {
  fontSize?: TypographyProps['fontSize']
  children: ReactNode | ReactNode[]
}

function FadeTypography({ fontSize = 60, children }: FadeTypographyProps) {
  return (
    <FadeBox>
      <Typography paragraph fontSize={fontSize} m={0}>
        {children}
      </Typography>
    </FadeBox>
  )
}

export default FadeTypography
