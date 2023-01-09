import Link from 'next/link'
import { Container, Typography, Grid, Box, Button } from '@mui/material'
import { UserCharacteristicName, UserDto, getUserHref } from '@features/user'
import AppEmoji from '@ui/AppEmoji'
import UserLink from '@components/User/UserLink'

interface UserRowProps {
  user: UserDto
  characteristicName: UserCharacteristicName
  index: number
}

function UserRow({ user, characteristicName, index }: UserRowProps) {
  const { nickname, name, avatar, characteristic, online } = user
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
    <Box sx={{ background: isEven ? 'underlay' : '#21262C' }}>
      <Container
        fixed
        sx={({ breakpoints }) => ({
          [breakpoints.only('xl')]: {
            maxWidth: 900,
          },
        })}
      >
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
              <UserLink name={name} avatar={avatar} href={href} online={online} size={35} />
              <Button href={href} sx={{ color: 'inherit' }} component={Link}>
                {name}
              </Button>
            </Box>
          </Grid>
          <Grid item xs>
            <Typography
              variant="subtitle1"
              component="p"
              align="right"
              sx={{ color: `${characteristicName}.main` }}
            >
              <b>{ratingValue}</b>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default UserRow
