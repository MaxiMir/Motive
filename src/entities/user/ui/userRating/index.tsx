import { Typography, Grid, Box, Button, Stack } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { UserCharacteristicName, UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserRatingProps {
  user: UserDto
  characteristicName: UserCharacteristicName
  index: number
}

export function UserRating({ user, characteristicName, index }: UserRatingProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const theme = useTheme()
  const number = getNumber()
  const href = joinToHref(nickname)
  const ratingValue = Math.floor(characteristic[characteristicName])

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
    <Box px={3} sx={{ backgroundColor: index % 2 === 0 ? theme.palette.underlay : blueGrey[900] }}>
      <Grid container alignItems="center" sx={{ height: 55 }}>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="center" width={22}>
            <Typography variant={index <= 2 ? 'h5' : undefined} component="p">
              {number}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Link href={href} title={name}>
              <Avatar src={avatar} name={name} online={online} size={35} />
            </Link>
            <Button href={href} color="inherit" component={Link}>
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
