import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import { GoalCharacteristicName } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { Emoji } from 'src/shared/config'

interface GoalIndexProps {
  name: GoalCharacteristicName
  value: number
}

export function GoalIndex({ name, value }: GoalIndexProps) {
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const formattedValue = formatNumber(value)
  const title = formatMessage({ id: `component.characteristic-goal.${name}` })
  const emoji = Emoji[name]

  return (
    <TooltipArrow title={title}>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={emoji}
        sx={{ borderColor: 'transparent' }}
      >
        {formattedValue}
      </Button>
    </TooltipArrow>
  )
}
