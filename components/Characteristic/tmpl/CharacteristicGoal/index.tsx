import { GoalCharacteristicName } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'
import { getTitle } from './helper'

export interface CharacteristicGoalProps {
  tmpl: 'goal'
  name: GoalCharacteristicName | 'runs for days'
  value: number
  color: string
}

export default function CharacteristicGoal({ name, value, color }: CharacteristicGoalProps): JSX.Element {
  const tooltipTitle = getTitle(name)
  const shortValue = numberToShort(value)

  return (
    <AppBox flexDirection="column" alignItems="center" spacing={1} width={40}>
      <AppTooltip title={tooltipTitle}>
        <AppEmoji name={name} variant="h5" />
      </AppTooltip>
      <AppBox>
        <AppTypography component="p" style={{ color }}>
          {shortValue}
        </AppTypography>
      </AppBox>
    </AppBox>
  )
}
