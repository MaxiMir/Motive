import dynamic from 'next/dynamic'
import { Grid, Box } from '@mui/material'
import { HashtagDto } from '@features/page'
import { UserDto } from '@features/user'
import { GoalDto } from '@features/goal'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'
import { useMessages } from './hooks/useMessages'
import { GRADIENTS } from './helpers/color'
import SearchForm from './components/SearchForm'

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

function SearchModule({ q, hashtags, goals, users }: SearchModuleProps) {
  const messages = useMessages()
  const noResult = !users.length && !goals.length

  return (
    <AppContainer>
      <AppHeader name="search" mb={4}>
        {messages.header}
      </AppHeader>
      <Box display="flex" flexDirection="column" gap={4}>
        <SearchForm q={q} />
        {!!users.length && (
          <Box display="flex" flexDirection="column" gap={2}>
            <AppHeader variant="h4" component="h2" name="followers">
              {messages.userText}
            </AppHeader>
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
          <AppHeader variant="h4" component="h2" name="trending">
            {messages.trendText}
          </AppHeader>
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
            <AppHeader variant="h4" component="h2" name="goal">
              {messages.goalText}
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

export default SearchModule
