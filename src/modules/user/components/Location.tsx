import { Box, Typography } from '@mui/material'
import AppIcon from '@ui/AppIcon'

interface LocationProps {
  location: string
}

export default function Location({ location }: LocationProps) {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <AppIcon name="location_on" />
      <Typography>{location}</Typography>
    </Box>
  )
}
