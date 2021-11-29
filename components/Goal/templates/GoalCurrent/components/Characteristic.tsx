import { GoalCharacteristic } from 'dto'
import { numberToShort, toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

export interface CharacteristicProps {
  characteristic: GoalCharacteristic | 'runs for days'
  value: number
  color: string
}

export default function Characteristic({ characteristic, value, color }: CharacteristicProps): JSX.Element {
  return (
    <AppBox flexDirection="column" alignItems="center" spacing={1} width={40}>
      <AppTooltip title={toUpperFirstChar(characteristic)}>
        <AppEmoji name={characteristic} variant="h5" />
      </AppTooltip>
      <AppBox>
        <AppTypography component="p" style={{ color }}>
          {numberToShort(value)}
        </AppTypography>
      </AppBox>
    </AppBox>
  )
}
