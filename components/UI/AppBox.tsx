import { Box, BoxProps } from '@material-ui/core'

export type Spacing = 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface AppBoxProps extends BoxProps {
  spacing?: Spacing
}

const AppBox = ({ spacing, ...props }: AppBoxProps) => (
  <Box display="flex" gridGap={spacing && spacing * 8} {...props} />
)

export default AppBox
