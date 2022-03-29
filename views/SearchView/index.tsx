import dynamic from 'next/dynamic'
import { Grid } from '@material-ui/core'
import { GoalDto, HashtagDto, UserDto } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import SearchForm from './components/SearchForm'
import { getGradients } from './helper'

const Hashtag = dynamic(() => import('components/Hashtag'))
const UsersList = dynamic(() => import('./components/UsersList'))
const GoalsList = dynamic(() => import('./components/GoalsList'))
const NoResult = dynamic(() => import('./components/NoResult'))

interface SearchViewProps {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

export default function SearchView({ q, hashtags, goals, users }: SearchViewProps): JSX.Element {
  const gradients = getGradients()
  const noResult = !users.length && !goals.length

  return (
    <AppContainer flexColumn>
      <AppTitle name="search" mb={4}>
        Search
      </AppTitle>
      <AppBox flexDirection="column" spacing={4}>
        <SearchForm q={q} />
        {!!users.length && <UsersList users={users} />}
        {noResult && <NoResult phrase={q} />}
        <AppBox flexDirection="column" spacing={2}>
          <AppTitle variant="h4" component="h2" name="trending">
            Trending
          </AppTitle>
          <Grid container spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Grid item xs={6} md={3} lg={2} key={name}>
                <Hashtag tmpl="search" name={name} views={views} gradient={gradients[key]} />
              </Grid>
            ))}
          </Grid>
        </AppBox>
        {!!goals.length && false && <GoalsList goals={goals} />}
      </AppBox>
    </AppContainer>
  )
}
