import dynamic from 'next/dynamic'
import { Characteristic } from 'dto'
import { toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

const CharacteristicUserLvl = dynamic(() => import('./CharacteristicUserLvl'))

export interface CharacteristicUserProps {
  characteristic: Characteristic
  value: number
  color: string
}

const CharacteristicUser = ({ characteristic, value, color }: CharacteristicUserProps): JSX.Element => (
  <AppTooltip title={toUpperFirstChar(characteristic)}>
    <AppBox alignItems="center" spacing={0.5}>
      <AppEmoji name={characteristic} variant="subtitle1" />
      <AppBox width={32}>
        <AppTypography variant="h6" component="p" style={{ color }}>
          {Math.floor(value)}
          {!['completed', 'abandoned'].includes(characteristic) && <CharacteristicUserLvl />}
        </AppTypography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default CharacteristicUser
