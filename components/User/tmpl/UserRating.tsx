import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'
import { UserDto, UserCharacteristicName } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'
import AppAvatar from 'components/UI/AppAvatar'

export interface UserRatingProps {
  tmpl: 'rating'
  user: UserDto
  characteristicName: UserCharacteristicName
  color: string
  index: number
}

export default function UserRating({ user, characteristicName, color, index }: UserRatingProps): JSX.Element {
  const { nickname, avatar, name, characteristic } = user
  const classes = useStyles({ color, isEven: index % 2 === 0 })
  const number = getNumber()
  const ratingValue = Math.floor(characteristic[characteristicName])
  const href = getUserHref(nickname)

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
                <AppAvatar src={avatar} size={35} />
              </AppLink>
              <AppLink href={href} variant="body1">
                {name}
              </AppLink>
            </AppBox>
          </Grid>
          <Grid item xs>
            <AppTypography variant="subtitle1" component="p" align="right" className={classes.ratingValue}>
              <b>{ratingValue}</b>
            </AppTypography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

type UseStylesProps = { color: string; isEven: boolean }

const useStyles = makeStyles({
  root: {
    background: (props: UseStylesProps) => (props.isEven ? 'initial' : '#21262C'),
  },
  container: {
    height: 55,
  },
  avatarLink: {
    marginRight: 8,
    height: 35,
  },
  ratingValue: {
    color: (props: UseStylesProps) => props.color,
  },
})