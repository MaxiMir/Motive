import { IconButton } from '@mui/material'
import { SupportRules } from 'entities/characteristic'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

function SupportInfo() {
  return (
    <TooltipArrow title={<SupportRules />}>
      <IconButton color="info">
        <Icon name="help_outline" />
      </IconButton>
    </TooltipArrow>
  )
}

export default SupportInfo
