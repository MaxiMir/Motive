import { IconButton, Stack } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'
import Description from './components/Description'

function Bottom() {
  const [open, toggle] = useToggle()
  const messages = useMessages()

  return (
    <Stack direction="row" position="absolute" left={0} right={0} bottom={8} zIndex={9999}>
      <IconButton aria-label={messages.ariaLabel} disabled onClick={toggle}>
        <AppIcon name="expand_less" />
      </IconButton>
      {open && <Description onClose={toggle} />}
    </Stack>
  )
}

export default Bottom
