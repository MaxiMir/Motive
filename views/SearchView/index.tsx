import dynamic from 'next/dynamic'
import { Grid } from '@material-ui/core'
import { GoalDto, HashtagDto, UserDto } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import SearchForm from './components/SearchForm'
import { getGradients } from './helper'

const User = dynamic(() => import('components/User'))
const Hashtag = dynamic(() => import('components/Hashtag'))
const NoResult = dynamic(() => import('./components/NoResult'))

interface SearchViewProps {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

export default function SearchView({ q, hashtags, goals, users }: SearchViewProps): JSX.Element {
  const gradients = getGradients()

  return (
    <AppContainer flexColumn>
      <AppTitle name="search" mb={4}>
        Search
      </AppTitle>
      <AppBox flexDirection="column" spacing={4}>
        <SearchForm q={q} />
        {!!goals.length && (
          <AppBox flexDirection="column" spacing={2}>
            <AppTitle variant="h4" component="h2" name="goal">
              Goals
            </AppTitle>
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={goal.id}>
                  GOAL
                </Grid>
              ))}
            </Grid>
          </AppBox>
        )}
        {!!users.length && (
          <AppBox flexDirection="column" spacing={2}>
            <AppTitle variant="h4" component="h2" name="followers">
              Users
            </AppTitle>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={user.id}>
                  <User tmpl="search" user={user} />
                </Grid>
              ))}
            </Grid>
          </AppBox>
        )}
        {!users.length && !goals.length && <NoResult phrase={q} />}
        <AppBox flexDirection="column" spacing={2}>
          <AppTitle variant="h4" component="h2" name="trending">
            Trending
          </AppTitle>
          <Grid container spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={name}>
                <Hashtag tmpl="gradient" name={name} views={views} gradient={gradients[key]} />
              </Grid>
            ))}
          </Grid>
        </AppBox>
      </AppBox>
    </AppContainer>
  )
}
