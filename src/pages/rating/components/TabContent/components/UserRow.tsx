import Link from 'next/link'
import { Typography, Grid, Box, Button, Stack } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import AvatarStatus from '@features/avatar-status'
import { toHref } from '@entities/user'
import { UserCharacteristicName, UserDto } from '@shared/api/user'
import Emoji from '@shared/ui/Emoji'

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
        return <Emoji name="first" onlyEmoji />
      case 2:
        return <Emoji name="second" onlyEmoji />
      case 3:
        return <Emoji name="third" onlyEmoji />
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
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link href={href} title={name}>
              <AvatarStatus src={avatar} name={name} online={online} size={35} />
            </Link>
            <Button href={href} sx={{ color: 'inherit' }} component={Link}>
              {name}
            </Button>
          </Stack>
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
