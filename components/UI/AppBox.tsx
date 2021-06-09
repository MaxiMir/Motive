import { FC } from 'react'
import { Box, BoxProps } from '@material-ui/core'

interface AppBoxProps extends BoxProps {
  spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export const AppBox: FC<AppBoxProps> = ({ spacing, ...props }) => (
  <Box display="flex" gridGap={spacing && spacing * 8} {...props} />
)
