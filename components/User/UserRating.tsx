import { Container, Typography, Grid, Box } from '@mui/material'
import { UserDto, UserCharacteristic } from 'dto'
import { getUserHref } from 'helpers/url'
import AppLink from 'components/ui/AppLink'
import AppEmoji from 'components/ui/AppEmoji'
import UserAvatar from './UserAvatar'

export interface UserRatingProps {
  user: UserDto
  characteristicName: UserCharacteristic
  index: number
}

export default function UserRating({ user, characteristicName, index }: UserRatingProps) {
  const { nickname, name, avatar, characteristic } = user
  const number = getNumber()
  const href = getUserHref(nickname)
  const ratingValue = Math.floor(characteristic[characteristicName])
  const isEven = index % 2 === 0

  function getNumber() {
    const incrementedNumber = index + 1

    switch (incrementedNumber) {
      case 1:
        return <AppEmoji name="first" onlyEmoji />
      case 2:
        return <AppEmoji name="second" onlyEmoji />
      case 3:
        return <AppEmoji name="third" onlyEmoji />
      default:
        return incrementedNumber
    }
  }

  return (
    <Box sx={{ background: isEven ? 'initial' : '#21262C' }}>
      <Container fixed>
        <Grid container alignItems="center" sx={{ height: 55 }}>
          <Grid item xs>
            <Box display="flex" justifyContent="center" width={22}>
              <Typography variant={index <= 2 ? 'h5' : undefined} component="p">
                {number}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" alignItems="center" gap={2}>
              <UserAvatar name={name} avatar={avatar} href={href} size={35} />
              <AppLink href={href} variant="body1" sx={{ marginLeft: 1, textDecoration: 'none' }}>
                {name}
              </AppLink>
            </Box>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" component="p" align="right" sx={{ color: `${characteristicName}.main` }}>
              <b>{ratingValue}</b>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
