import { Typography } from '@mui/material'
import { GoalCharacteristicName } from 'dto'
import useLocale from 'hooks/useLocale'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import i18n from './i18n'

export interface CharacteristicGoalProps {
  tmpl: 'goal'
  name: GoalCharacteristicName | 'runningDays'
  value: number
}

// TODO modal for runningDays:
export default function CharacteristicGoal({ name, value }: CharacteristicGoalProps): JSX.Element {
  const { locale } = useLocale()
  const shortValue = numberToShort(value)
  const localeTitle = i18n[locale][name]

  return (
    <AppBox flexDirection="column" alignItems="center" gap={1} width={40}>
      <AppTooltip title={localeTitle}>
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
