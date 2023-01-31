import { Grid, Typography, Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { HashtagDto, GoalDto, UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import { GRADIENTS } from './consts'
import { useMessages } from './lib'
import { SearchForm } from './searchForm'

const GoalCard = dynamic(() => import('./goalCard'))
const UserCard = dynamic(() => import('./userCard'))
const Hashtag = dynamic(() => import('./hashtag'))
const NoResult = dynamic(() => import('./noResult'))

interface SearchPageProps {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

export function SearchPage({ q, hashtags, goals, users }: SearchPageProps) {
  const messages = useMessages()
  const noResult = !users.length && !goals.length

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {messages.header}
      </Typography>
      <Stack spacing={4}>
        <SearchForm q={q} />
        {!!users.length && (
          <Stack spacing={2}>
            <Typography variant="h4" component="h2">
              🥷 {messages.userText}
            </Typography>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={user.id}>
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
        {noResult && <NoResult phrase={q} />}
        <Stack spacing={2}>
          <Typography variant="h4" component="h2">
            👑 {messages.trendText}
          </Typography>
          <Grid container spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Grid item xs={6} md={3} lg={2} key={name}>
                <Hashtag name={name} views={views} gradient={GRADIENTS[key]} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        {!!goals.length && false && (
          <Stack spacing={2}>
            <Typography variant="h4" component="h2">
              💎 {messages.goalText}
            </Typography>
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={goal.id}>
                  <GoalCard goal={goal} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}

export default SearchPage
