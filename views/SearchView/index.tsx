import dynamic from 'next/dynamic'
import { Grid, Box } from '@mui/material'
import { GoalDto, HashtagDto, UserDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'
import SearchForm from './components/SearchForm'
import { getGradients } from './helper'
import i18n from './i18n'

const UserSearch = dynamic(() => import('components/User/UserSearch'))
const GoalSearch = dynamic(() => import('components/Goal/GoalSearch'))
const HashtagSearch = dynamic(() => import('components/Hashtag/HashtagSearch'))
const NoResult = dynamic(() => import('./components/NoResult'))

interface SearchViewProps {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
  locale: Locale
}

export default function SearchView({ q, hashtags, goals, users, locale }: SearchViewProps): JSX.Element {
  const { title, trendTitle, userTitle, goalTitle } = i18n[locale]
  const gradients = getGradients()
  const noResult = !users.length && !goals.length

  return (
    <AppContainer>
      <AppTitle name="search" mb={4}>
        {title}
      </AppTitle>
      <Box display="flex" flexDirection="column" gap={4}>
        <SearchForm q={q} />
        {!!users.length && (
          <Box display="flex" flexDirection="column" gap={2}>
            <AppTitle variant="h4" component="h2" name="followers">
              {userTitle}
            </AppTitle>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={user.id}>
                  <UserSearch user={user} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {noResult && <NoResult phrase={q} />}
        <Box display="flex" flexDirection="column" gap={2}>
          <AppTitle variant="h4" component="h2" name="trending">
            {trendTitle}
          </AppTitle>
          <Grid container spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Grid item xs={6} md={3} lg={2} key={name}>
                <HashtagSearch name={name} views={views} gradient={gradients[key]} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {!!goals.length && false && (
          <Box display="flex" flexDirection="column" gap={2}>
            <AppTitle variant="h4" component="h2" name="goal">
              {goalTitle}
            </AppTitle>
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={goal.id}>
                  <GoalSearch goal={goal} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </AppContainer>
  )
}
