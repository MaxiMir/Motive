import { Fragment } from 'react'
import Image from 'next/image'
import { Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { Characteristic } from 'dto'
import { UserCardProps } from '../index'
import UserCardCharacteristic from './UserCardCharacteristic'
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
  link,
  name,
  characteristic,
  colors,
}: UserCardProps<{}>) => {
  const classes = useStyles()

  return (
    <AppBox spacing={1}>
      <AppLink href={link} className={classes.avatarLink}>
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
          <UserCardMenu id={id} link={link} />
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((name, index) => (
            <Fragment key={index}>
              <UserCardCharacteristic
                characteristic={name}
                value={characteristic[name]}
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
