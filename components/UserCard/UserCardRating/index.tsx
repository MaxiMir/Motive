import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core/'
import { UserCardProps } from '../index'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'

const UserCardRating = ({
  avatar,
  link,
  name,
  index,
  characteristic,
  type,
  colors,
}: UserCardProps) => {
  const classes = useStyles({ isOdd: index % 2 === 0 })
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
    <div className={classes.root}>
      <Container fixed>
        <AppBox alignItems="center" spacing={1} className={classes.root}>
          <AppBox justifyContent="center" width={22} marginRight={6}>
            <Typography variant={index <= 2 ? 'h5' : undefined} align="center">
              {number}
            </Typography>
          </AppBox>
          <AppLink href={link} className={classes.avatarLink}>
            <Image
              src={avatar}
              width={35}
              height={35}
              alt="avatar"
              className={classes.avatar}
            />
          </AppLink>
          <AppLink href={link}>
            <Typography>{name}</Typography>
          </AppLink>
          {type && (
            <AppBox justifyContent="end" flexGrow={1}>
              <Typography
                variant="subtitle1"
                component="p"
                style={{ color: colors[type].fontColor }}
              >
                <b>{characteristic[type]}</b>
              </Typography>
            </AppBox>
          )}
        </AppBox>
      </Container>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    height: 55,
    background: (props: { isOdd: boolean }) =>
      props.isOdd ? '#21262C' : 'initial',
  },
  box: {
    height: 55,
  },
  avatarLink: {
    marginRight: 8,
    height: 35,
  },
  avatar: {
    borderRadius: '50%',
  },
})

export default UserCardRating
