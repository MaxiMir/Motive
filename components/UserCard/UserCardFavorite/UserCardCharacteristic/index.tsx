import dynamic from 'next/dynamic'
import { Typography } from '@material-ui/core/'
import { Characteristic } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'

const UserCharacteristicLvl = dynamic(() => import('./UserCharacteristicLvl'))

export interface UserCharacteristicProps {
  characteristic: Characteristic
  value: number
  color: string
}

const UserCardCharacteristic = ({
  characteristic,
  value,
  color,
}: UserCharacteristicProps) => (
  <AppTooltip title={characteristic}>
    <AppBox alignItems="center" spacing={0.5}>
      <AppEmoji name={characteristic} variant="subtitle1" />
      <AppBox width={32}>
        <Typography variant="subtitle1" component="p" style={{ color }}>
          {value}
          {!['completed', 'abandoned'].includes(characteristic) && (
            <UserCharacteristicLvl />
          )}
        </Typography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default UserCardCharacteristic
