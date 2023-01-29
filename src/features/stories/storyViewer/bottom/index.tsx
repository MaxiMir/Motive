import { IconButton, Stack } from '@mui/material'
import { useMessage, useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { Description } from './description'

export function Bottom() {
  const [open, toggle] = useToggle()
  const ariaLabel = useMessage('common.open-menu')
  // getDuration lib/helpers/duration

  return (
    <Stack direction="row" position="absolute" left={0} right={0} bottom={8} zIndex={9999}>
      <IconButton aria-label={ariaLabel} disabled onClick={toggle}>
        <Icon name="expand_less" />
      </IconButton>
      {open && <Description onClose={toggle} />}
    </Stack>
  )
}
