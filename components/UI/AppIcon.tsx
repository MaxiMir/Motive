import { Box } from '@mui/material'

interface AppIconProps {
  name: string
}

export default function AppIcon({ name }: AppIconProps): JSX.Element {
  return (
    <Box component="span" className="material-icons">
      {name}
    </Box>
  )
}
