import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Grid, Box } from '@mui/material'
import { GoalDto, HashtagDto, UserDto } from '@dto'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'
import SearchForm from './components/SearchForm'
import { getGradients } from './helper'

const GoalCard = dynamic(() => import('./components/GoalCard'))
const UserCard = dynamic(() => import('./components/UserCard'))
const Hashtag = dynamic(() => import('./components/Hashtag'))
const NoResult = dynamic(() => import('./components/NoResult'))

interface SearchModuleProps {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

export default function SearchModule({ q, hashtags, goals, users }: SearchModuleProps) {
  const { formatMessage } = useIntl()
  const gradients = getGradients()
  const noResult = !users.length && !goals.length
  const header = formatMessage({ id: 'page.search.header' })
  const trendText = formatMessage({ id: 'page.search.trend' })
  const userText = formatMessage({ id: 'page.search.user' })
  const goalText = formatMessage({ id: 'page.search.goal' })

  return (
    <AppContainer>
      <AppHeader name="search" mb={4}>
        {header}
      </AppHeader>
      <Box display="flex" flexDirection="column" gap={4}>
        <SearchForm q={q} />
        {!!users.length && (
          <Box display="flex" flexDirection="column" gap={2}>
            <AppHeader variant="h4" component="h2" name="followers">
              {userText}
            </AppHeader>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={user.id}>
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {noResult && <NoResult phrase={q} />}
        <Box display="flex" flexDirection="column" gap={2}>
          <AppHeader variant="h4" component="h2" name="trending">
            {trendText}
          </AppHeader>
          <Grid container spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Grid item xs={6} md={3} lg={2} key={name}>
                <Hashtag name={name} views={views} gradient={gradients[key]} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {!!goals.length && false && (
          <Box display="flex" flexDirection="column" gap={2}>
            <AppHeader variant="h4" component="h2" name="goal">
              {goalText}
            </AppHeader>
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
    </AppContainer>
  )
}
