import { IconButton } from '@mui/material'
import AppIcon from 'components/ui/AppIcon'

export default function CloseButton() {
  return (
    <IconButton
      disableFocusRipple
      sx={{
        '&:hover': {
          background: 'none',
        },
      }}
    >
      <AppIcon name="close" />
    </IconButton>
  )
}
