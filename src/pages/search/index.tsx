import { Grid, Typography, Box } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { HashtagDto, GoalDto, UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import { GRADIENTS } from './consts'
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
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.search.header' })
  const trendText = formatMessage({ id: 'page.search.trend' })
  const userText = formatMessage({ id: 'page.search.user' })
  const goalText = formatMessage({ id: 'page.search.goal' })
  const noResult = !users.length && !goals.length

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {header}
      </Typography>
      <Box display="flex" flexDirection="column" gap={4}>
        <SearchForm q={q} />
        {!!users.length && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4" component="h2">
              🥷 {userText}
            </Typography>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={user.id}>
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {noResult && <NoResult phrase={q} />}
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h4" component="h2">
            👑 {trendText}
          </Typography>
          <Grid container spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Grid item xs={6} md={3} lg={2} key={name}>
                <Hashtag name={name} views={views} gradient={GRADIENTS[key]} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {!!goals.length && false && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4" component="h2">
              💎 {goalText}
            </Typography>
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={goal.id}>
                  <GoalCard goal={goal} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default SearchPage
