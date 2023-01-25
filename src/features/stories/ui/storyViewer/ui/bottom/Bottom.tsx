import { IconButton, Stack } from '@mui/material'
import useToggle from '@shared/lib/hooks/useToggle'
import Icon from '@shared/ui/Icon'
import { useMessages } from './lib/hooks/useMessages'
import Description from './ui/Description'

function Bottom() {
  const [open, toggle] = useToggle()
  const messages = useMessages()
  // getDuration lib/helpers/duration
  return (
    <Stack direction="row" position="absolute" left={0} right={0} bottom={8} zIndex={9999}>
      <IconButton aria-label={messages.ariaLabel} disabled onClick={toggle}>
        <Icon name="expand_less" />
      </IconButton>
      {open && <Description onClose={toggle} />}
    </Stack>
  )
}

export default Bottom
