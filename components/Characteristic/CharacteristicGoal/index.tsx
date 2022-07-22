import { Box, Typography, Tooltip } from '@mui/material'
import { GoalCharacteristicName } from 'dto'
import useLocale from 'hooks/useLocale'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/ui/AppEmoji'
import i18n from './i18n'

export interface CharacteristicGoalProps {
  name: GoalCharacteristicName | 'runningDays'
  value: number
}

export default function CharacteristicGoal({ name, value }: CharacteristicGoalProps) {
  const { locale } = useLocale()
  const shortValue = numberToShort(value)
  const localeTitle = i18n[locale][name]

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1} width={40}>
      <Tooltip arrow title={localeTitle}>
        <span>
          <AppEmoji name={name} variant="h5" />
        </span>
      </Tooltip>
      <Box>
        <Typography component="p" sx={{ color: `${name}.main` }}>
          {shortValue}
        </Typography>
      </Box>
    </Box>
  )
}
