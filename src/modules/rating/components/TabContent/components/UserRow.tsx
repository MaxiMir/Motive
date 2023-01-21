import Link from 'next/link'
import { Typography, Grid, Box, Button } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import { UserCharacteristicName, UserDto, toHref } from '@features/user'
import AppEmoji from '@ui/AppEmoji'
import AvatarStatus from '@components/Avatar/AvatarStatus'

interface UserRowProps {
  user: UserDto
  characteristicName: UserCharacteristicName
  index: number
}

function UserRow({ user, characteristicName, index }: UserRowProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const theme = useTheme()
  const number = getNumber()
  const href = toHref(nickname)
  const ratingValue = Math.floor(characteristic[characteristicName])
  const backgroundColor = index % 2 === 0 ? theme.palette.underlay : blueGrey[900]

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
    <Box
      px={3}
      sx={{
        backgroundColor,
        boxShadow: `0 0 0 100vmax ${backgroundColor}`,
        clipPath: 'inset(0 -100vmax)',
      }}
    >
      <Grid container alignItems="center" sx={{ height: 55 }}>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="center" width={22}>
            <Typography variant={index <= 2 ? 'h5' : undefined} component="p">
              {number}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box display="flex" alignItems="center" gap={1}>
            <Link href={href} title={name}>
              <AvatarStatus src={avatar} name={name} online={online} size={35} />
            </Link>
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
    </Box>
  )
}

export default UserRow
