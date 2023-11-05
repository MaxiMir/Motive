import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import { useViewerAct } from 'entities/viewer'
import { Profile } from 'shared/ui/icons'
import TooltipArrow from 'shared/ui/tooltip-arrow'

function Unauthorized() {
  const { formatMessage } = useIntl()
  const onClick = useViewerAct(undefined, '/')
  const title = formatMessage({ id: 'common.sign-in' })

  return (
    <TooltipArrow title={title}>
      <IconButton onClick={onClick}>
        <Profile sx={{ fontSize: 21, color: 'grey' }} />
      </IconButton>
    </TooltipArrow>
  )
}

export default Unauthorized
