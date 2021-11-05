import dynamic from 'next/dynamic'
import { UserCharacteristic } from 'dto'
import { toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

const Level = dynamic(() => import('./components/Level'))

export interface CharacteristicUserProps {
  type: 'user'
  characteristic: UserCharacteristic
  value: number
  color: string
}

export default function CharacteristicUser({ characteristic, value, color }: CharacteristicUserProps): JSX.Element {
  return (
    <AppTooltip title={toUpperFirstChar(characteristic)}>
      <AppBox alignItems="baseline" spacing={0.5}>
        <AppEmoji name={characteristic} variant="subtitle1" />
        <AppBox width={32}>
          <AppTypography variant="h6" component="p" style={{ color }}>
            {Math.floor(value)}
            {!['completed', 'abandoned'].includes(characteristic) && <Level />}
          </AppTypography>
        </AppBox>
      </AppBox>
    </AppTooltip>
  )
}
