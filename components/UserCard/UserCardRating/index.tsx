import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core/'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import { Characteristic, User } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'

interface UserCardRatingProps extends User {
  index: number
  type: Characteristic
}

const UserCardRating = ({ avatar, href, name, index, characteristics, type }: UserCardRatingProps): JSX.Element => {
  const colors = useCharacteristicColors()
  const classes = useStyles({ isEven: index % 2 === 0 })
  const number = getNumber()

  function getNumber() {
    const incrementedNumber = index + 1

    switch (incrementedNumber) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return incrementedNumber
    }
  }

  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs>
            <AppBox justifyContent="center" width={22}>
              <AppTypography variant={index <= 2 ? 'h5' : undefined}>{number}</AppTypography>
            </AppBox>
          </Grid>
          <Grid item xs={8}>
            <AppBox alignItems="center" spacing={2}>
              <AppLink href={href} className={classes.avatarLink}>
                <Image src={avatar} width={35} height={35} alt="avatar" className={classes.avatar} />
              </AppLink>
              <AppLink href={href}>
                <AppTypography>{name}</AppTypography>
              </AppLink>
            </AppBox>
          </Grid>
          <Grid item xs>
            <AppTypography variant="subtitle1" component="p" align="right" style={{ color: colors[type].fontColor }}>
              <b>{Math.floor(characteristics[type])}</b>
            </AppTypography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    background: (props: { isEven: boolean }) => (props.isEven ? 'initial' : '#21262C'),
  },
  container: {
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
