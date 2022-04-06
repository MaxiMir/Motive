import { Box, BoxProps } from '@mui/material'

export default function AppBox({ gap, ...props }: BoxProps): JSX.Element {
  return <Box display="flex" gap={gap} {...props} />
}
