import { FC } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Typography } from '@material-ui/core/'
import { UserCharacteristicProps } from '../index'
import AppBox from 'components/UI/AppBox'
import AppTooltip from 'components/UI/AppTooltip'

const UserCharacteristicCompactLvl = dynamic(
  () => import('./UserCharacteristicCompactLvl'),
)

const UserCharacteristicCompact: FC<UserCharacteristicProps> = ({
  type,
  value,
  color,
}) => (
  <AppTooltip title={type}>
    <AppBox alignItems="center" spacing={0.5}>
      <Image src={`/images/${type}.png`} alt={type} width={18} height={18} />
      <AppBox width={32}>
        <Typography variant="subtitle1" component="p" style={{ color }}>
          {value}
          {!['completed', 'abandoned'].includes(type) && (
            <UserCharacteristicCompactLvl />
          )}
        </Typography>
      </AppBox>
    </AppBox>
  </AppTooltip>
)

export default UserCharacteristicCompact
