import dynamic from 'next/dynamic'
import { toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'
import { CharacteristicCardUserProps } from '../index'

const CharacteristicCardUserLvl = dynamic(() => import('./CharacteristicCardUserLvl'))

const CharacteristicCardUser = ({ characteristic, value, color }: CharacteristicCardUserProps): JSX.Element => (
  <AppTooltip title={toUpperFirstChar(characteristic)}>
    <AppBox alignItems="center" spacing={0.5}>
      <AppEmoji name={characteristic} variant="subtitle1" />
      <AppBox width={32}>
        <AppTypography variant="h6" component="p" style={{ color }}>
          {Math.floor(value)}
          {!['completed', 'abandoned'].includes(characteristic) && <CharacteristicCardUserLvl />}
        </AppTypography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default CharacteristicCardUser
