import { Typography, Grid, Box, Button, Stack } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { UserLevel } from 'entities/user'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserCardProps {
  user: UserDto
  index: number
}

export function UserCard({ user, index }: UserCardProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const theme = useTheme()
  const number = getNumber()
  const href = joinToHref(nickname)

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
      <Grid container alignItems="center" sx={{ height: 75 }}>
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
              <Avatar src={avatar} name={name} size={46} badge={online} />
            </Link>
            <Button href={href} color="inherit" component={Link}>
              <Stack>
                {nickname}
                <Typography fontSize={14} color="zen.silent">
                  {name}
                </Typography>
              </Stack>
            </Button>
          </Stack>
        </Grid>
        <Grid item xs>
          <Box display="flex" justifyContent="flex-end">
            <UserLevel level={characteristic.level} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
