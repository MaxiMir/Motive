import { Fragment } from 'react'
import Image from 'next/image'
import { Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { useCharacteristicColors } from 'hook/useCharacteristicColors'
import { Characteristic, User } from 'dto'
import UserCharacteristic from 'components/UserCharacteristic'
import UserCardMenu from './UserCardMenu'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppDot from 'components/UI/AppDot'

const CHARACTERISTICS: Characteristic[] = [
  'motivation',
  'creativity',
  'support',
  'completed',
]

const UserCardFavorite = ({
  id,
  avatar,
  href,
  name,
  characteristics,
}: User) => {
  const colors = useCharacteristicColors()
  const classes = useStyles()

  return (
    <AppBox spacing={1}>
      <AppLink href={href} className={classes.avatarLink}>
        <Image
          src={avatar}
          width={55}
          height={55}
          alt="avatar"
          className={classes.avatar}
        />
      </AppLink>
      <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
        <AppBox justifyContent="space-between" alignItems="center">
          <AppLink href={href}>
            <Typography variant="subtitle1" component="p">
              {name}
            </Typography>
          </AppLink>
          <UserCardMenu id={id} name={name} href={href} />
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((name, index) => (
            <Fragment key={index}>
              <UserCharacteristic
                characteristic={name}
                value={characteristics[name]}
                color={colors[name].fontColor}
              />
              {index !== CHARACTERISTICS.length - 1 && <AppDot />}
            </Fragment>
          ))}
        </AppBox>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    height: 55,
  },
  avatar: {
    borderRadius: '50%',
  },
})

export default UserCardFavorite
