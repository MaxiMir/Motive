import { Box, BoxProps } from '@mui/material'

interface AppIconProps extends BoxProps {
  name: string
}

export default function AppIcon({ name, ...props }: AppIconProps): JSX.Element {
  return (
    <Box component="span" className="material-icons" {...props}>
      {name}
    </Box>
  )
}
