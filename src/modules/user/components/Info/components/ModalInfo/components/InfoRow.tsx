import AppIcon from '@ui/AppIcon'
import { Box, Typography } from '@mui/material'

interface InfoRowProps {
  icon: string
  text: string
}

export default function InfoRow({ icon, text }: InfoRowProps) {
  return (
    <Box display="flex" gap={1}>
      <AppIcon name={icon} sx={{ color: 'zen.sand' }} />
      <Typography>{text}</Typography>
    </Box>
  )
}
