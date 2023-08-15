import { Box, Grid, Stack, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useIntl } from 'react-intl'
import { UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import { UserCard } from './userCard'

interface RatingPageProps {
  users: UserDto[]
}

export function RatingPage({ users }: RatingPageProps) {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.rating.header' })
  const userText = formatMessage({ id: 'common.user' })
  const lvlText = formatMessage({ id: 'common.lvl' })

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {header}
      </Typography>
      <Box px={3} sx={{ background: blueGrey[900] }}>
        <Grid container alignItems="center" sx={{ height: 55 }}>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="center" width={22}>
              <Typography variant="subtitle1" component="p">
                <b>№</b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="subtitle1" component="p">
              <b>{userText}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" component="p" align="right" color="gold">
              <b>{lvlText}</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Stack flex={1}>
        {users.map((user, index) => (
          <UserCard user={user} index={index} key={user.id} />
        ))}
      </Stack>
    </Container>
  )
}
