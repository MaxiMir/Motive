import { Chip } from '@mui/material'
import { useIntl } from 'react-intl'
import { GoalCharacteristicName } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { Emoji } from 'src/shared/config'

interface GoalScoreProps {
  name: GoalCharacteristicName
  value: number
}

export function GoalScore({ name, value }: GoalScoreProps) {
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const formattedValue = formatNumber(value)
  const title = formatMessage({ id: `component.characteristic-goal.${name}` })
  const emoji = Emoji[name]

  return (
    <TooltipArrow title={title}>
      <Chip avatar={<>{emoji}</>} label={formattedValue} sx={{ paddingLeft: 1 }} />
    </TooltipArrow>
  )
}
