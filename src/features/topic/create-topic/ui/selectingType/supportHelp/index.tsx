import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface SupportHelpProps {
  onClick: () => void
}

function SupportHelp({ onClick }: SupportHelpProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.about-support' })

  return (
    <TooltipArrow title={title}>
      <IconButton color="info" onClick={onClick}>
        <Icon name="help_outline" />
      </IconButton>
    </TooltipArrow>
  )
}

export default SupportHelp
