import { GoalCharacteristicName } from 'dto'
import { numberToShort, toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

interface CharacteristicProps {
  name: GoalCharacteristicName | 'runs for days'
  value: number
  color: string
}

export default function Characteristic({ name, value, color }: CharacteristicProps): JSX.Element {
  const title = toUpperFirstChar(name)
  const shortValue = numberToShort(value)

  return (
    <AppBox flexDirection="column" alignItems="center" spacing={1} width={40}>
      <AppTooltip title={title}>
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
