import { Container, Typography, Grid } from '@mui/material'
import { UserDto, UserCharacteristicName } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'
import AppEmoji from 'components/UI/AppEmoji'

export interface UserRatingProps {
  tmpl: 'rating'
  user: UserDto
  characteristicName: UserCharacteristicName
  color: string
  index: number
}

export default function UserRating({ user, characteristicName, color, index }: UserRatingProps): JSX.Element {
  const { nickname, avatar, name, characteristic } = user
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
    <AppBox display={undefined} sx={{ background: isEven ? 'initial' : '#21262C' }}>
      <Container fixed>
        <Grid container alignItems="center" sx={{ height: 55 }}>
          <Grid item xs>
            <AppBox justifyContent="center" width={22}>
              <Typography variant={index <= 2 ? 'h5' : undefined}>{number}</Typography>
            </AppBox>
          </Grid>
          <Grid item xs={8}>
            <AppBox alignItems="center" gap={2}>
              <AppLink href={href} sx={{ marginRight: 1 }}>
                <AppAvatar src={avatar} size={35} />
              </AppLink>
              <AppLink href={href} variant="body1" sx={{ textDecoration: 'none' }}>
                {name}
              </AppLink>
            </AppBox>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" component="p" align="right" sx={{ color }}>
              <b>{ratingValue}</b>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </AppBox>
  )
}
