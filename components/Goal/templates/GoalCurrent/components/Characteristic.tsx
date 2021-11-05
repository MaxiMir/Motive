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
    <AppTooltip title={toUpperFirstChar(characteristic)}>
      <AppBox flexDirection="column" alignItems="center" spacing={1} width={40}>
        <AppEmoji name={characteristic} variant="h5" />
        <AppBox>
          <AppTypography component="p" style={{ color }}>
            {numberToShort(value)}
          </AppTypography>
        </AppBox>
      </AppBox>
    </AppTooltip>
  )
}
