import { Box, IconButton } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'
import Description from './components/Description'

function Bottom() {
  const [open, toggle] = useToggle()
  const messages = useMessages()

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 8,
        zIndex: 9999,
      }}
    >
      <IconButton aria-label={messages.ariaLabel} onClick={toggle}>
        <AppIcon name="expand_less" />
      </IconButton>
      {open && <Description onClose={toggle} />}
    </Box>
  )
}

export default Bottom
