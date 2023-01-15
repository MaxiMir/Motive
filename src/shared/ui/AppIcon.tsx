import { Box, BoxProps } from '@mui/material'

interface AppIconProps extends BoxProps {
  name: string
}

function AppIcon({ name, ...props }: AppIconProps) {
  return (
    <Box component="span" className="material-symbols-sharp" {...props}>
      {name}
    </Box>
  )
}

export default AppIcon
