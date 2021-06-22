import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'
import { UserProps } from '../index'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'

const UserCardRating = ({ avatar, link, name, index }: UserProps) => {
  const classes = useStyles()
  const number = getNumber()

  function getNumber() {
    const number = index + 1

    switch (number) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return number
    }
  }

  return (
    <AppBox alignItems="center" spacing={1}>
      <AppBox justifyContent="center" width={22}>
        <Typography variant={index <= 2 ? 'h5' : undefined} align="center">
          {number}
        </Typography>
      </AppBox>
      <AppLink href={link} className={classes.avatarLink}>
        <Image
          src={avatar}
          width={30}
          height={30}
          alt="avatar"
          className={classes.avatar}
        />
      </AppLink>
      <AppLink href={link}>
        <Typography>{name}</Typography>
      </AppLink>
    </AppBox>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    height: 30,
  },
  avatar: {
    borderRadius: '50%',
  },
})

export default UserCardRating
