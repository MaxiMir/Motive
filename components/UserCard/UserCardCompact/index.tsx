import { FC } from 'react'
import Image from 'next/image'
import { Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { useCharacteristicColor } from 'hook/useCharacteristicColor'
import { CharacteristicType } from 'dto'
import { UserCardProps } from '../index'
import UserCharacteristic from 'components/UserCharacteristic'
import UserCardCompactMenu from './UserCardCompactMenu'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppDot from 'components/UI/AppDot'

const Types: CharacteristicType[] = [
  'motivation',
  'creativity',
  'support',
  'completed',
]

const UserCardCompact: FC<UserCardProps> = ({
  avatar,
  link,
  name,
  characteristic,
}) => {
  const classes = useStyles()
  const colors = useCharacteristicColor()

  return (
    <AppBox spacing={1}>
      <AppLink href={link}>
        <Image
          src={avatar}
          width={55}
          height={55}
          alt="avatar"
          className={classes.avatar}
        />
      </AppLink>
      <AppBox flexDirection="column" justifyContent="flex-between" flex={1}>
        <AppBox justifyContent="space-between" alignItems="center">
          <AppLink href={link}>
            <Typography variant="subtitle1" component="p">
              {name}
            </Typography>
          </AppLink>
          <UserCardCompactMenu />
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {Types.map((type, index) => (
            <>
              <UserCharacteristic
                type={type}
                value={characteristic[type]}
                color={colors[type].fontColor}
                view="compact"
                key={index}
              />
              {index !== Types.length - 1 && <AppDot />}
            </>
          ))}
        </AppBox>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%',
  },
})

export default UserCardCompact
