import dynamic from 'next/dynamic'
import { Grid, Typography, Stack } from '@mui/material'
import { HashtagDto } from '@modules/page'
import { UserDto } from '@modules/user'
import { GoalDto } from '@modules/goal'
import EmojiHeader from '@ui/EmojiHeader'
import Container from '@ui/Container'
import { useMessages } from './hooks/useMessages'
import { GRADIENTS } from './helpers/color'
import SearchForm from './components/SearchForm'

const GoalCard = dynamic(() => import('./components/GoalCard'))
const UserCard = dynamic(() => import('./components/UserCard'))
const Hashtag = dynamic(() => import('./components/Hashtag'))
const NoResult = dynamic(() => import('./components/NoResult'))

interface SearchViewProps {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

function SearchView({ q, hashtags, goals, users }: SearchViewProps) {
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
            <EmojiHeader variant="h4" component="h2" name="followers">
              {messages.userText}
            </EmojiHeader>
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
          <EmojiHeader variant="h4" component="h2" name="trending">
            {messages.trendText}
          </EmojiHeader>
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
            <EmojiHeader variant="h4" component="h2" name="goal">
              {messages.goalText}
            </EmojiHeader>
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

export default SearchView
