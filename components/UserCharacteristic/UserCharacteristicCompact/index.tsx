import { FC } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Tooltip, Typography } from '@material-ui/core/'
import { UserCharacteristicProps } from '../index'
import AppBox from 'components/UI/AppBox'

const UserCharacteristicCompactLvl = dynamic(
  () => import('./UserCharacteristicCompactLvl'),
)

const UserCharacteristicCompact: FC<UserCharacteristicProps> = ({
  type,
  value,
  color,
}) => (
  <Tooltip title={type}>
    <AppBox alignItems="center" spacing={0.5}>
      <Image src={`/images/${type}.png`} alt={type} width={18} height={18} />
      <AppBox width={32}>
        <Typography variant="subtitle1" component="p" style={{ color }}>
          {value}
          {type !== 'completed' && <UserCharacteristicCompactLvl />}
        </Typography>
      </AppBox>
    </AppBox>
  </Tooltip>
)

export default UserCharacteristicCompact
