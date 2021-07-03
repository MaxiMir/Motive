import dynamic from 'next/dynamic'
import { Characteristic } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'

const UserCharacteristicLvl = dynamic(() => import('./UserCharacteristicLvl'))

export interface UserCharacteristicProps {
  characteristic: Characteristic
  value: number
  color: string
}

const UserCharacteristic = ({ characteristic, value, color }: UserCharacteristicProps): JSX.Element => (
  <AppTooltip title={characteristic[0].toUpperCase() + characteristic.slice(1)}>
    <AppBox alignItems="center" spacing={0.5}>
      <AppEmoji name={characteristic} variant="subtitle1" />
      <AppBox width={32}>
        <AppTypography variant="h6" component="p" style={{ color }}>
          {Math.floor(value)}
          {!['completed', 'abandoned'].includes(characteristic) && <UserCharacteristicLvl />}
        </AppTypography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default UserCharacteristic
