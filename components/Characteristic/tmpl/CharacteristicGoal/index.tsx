import { Typography } from '@mui/material'
import { GoalCharacteristicName } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import { getTitle } from './helper'

export interface CharacteristicGoalProps {
  tmpl: 'goal'
  name: GoalCharacteristicName | 'runs for days'
  value: number
}

export default function CharacteristicGoal({ name, value }: CharacteristicGoalProps): JSX.Element {
  const tooltipTitle = getTitle(name)
  const shortValue = numberToShort(value)

  return (
    <AppBox flexDirection="column" alignItems="center" gap={1} width={40}>
      <AppTooltip title={tooltipTitle}>
        <AppEmoji name={name} variant="h5" />
      </AppTooltip>
      <AppBox>
        <Typography component="p" sx={{ color: `${name}.main` }}>
          {shortValue}
        </Typography>
      </AppBox>
    </AppBox>
  )
}
