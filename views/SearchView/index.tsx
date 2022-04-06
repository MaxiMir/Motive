import dynamic from 'next/dynamic'
import { Grid } from '@mui/material'
import { GoalDto, HashtagDto, UserDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import SearchForm from './components/SearchForm'
import { getGradients } from './helper'
import i18n from './i18n'

const User = dynamic(() => import('components/User'))
const Goal = dynamic(() => import('components/Goal'))
const Hashtag = dynamic(() => import('components/Hashtag'))
const NoResult = dynamic(() => import('./components/NoResult'))

interface SearchViewProps {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
  locale: Locale
}

export default function SearchView({ q, hashtags, goals, users, locale }: SearchViewProps): JSX.Element {
  const { header, trendTitle, userTitle, goalTitle } = i18n[locale]
  const gradients = getGradients()
  const noResult = !users.length && !goals.length

  return (
    <AppContainer flexColumn>
      <AppTitle name="search" mb={4}>
        {header}
      </AppTitle>
      <AppBox flexDirection="column" gap={4}>
        <SearchForm q={q} />
        {!!users.length && (
          <AppBox flexDirection="column" gap={2}>
            <AppTitle variant="h4" component="h2" name="followers">
              {userTitle}
            </AppTitle>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={6} sm={6} md={3} lg={2} key={user.id}>
                  <User tmpl="search" user={user} />
                </Grid>
              ))}
            </Grid>
          </AppBox>
        )}
        {noResult && <NoResult phrase={q} />}
        <AppBox flexDirection="column" gap={2}>
          <AppTitle variant="h4" component="h2" name="trending">
            {trendTitle}
          </AppTitle>
          <Grid container spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Grid item xs={6} md={3} lg={2} key={name}>
                <Hashtag tmpl="search" name={name} views={views} gradient={gradients[key]} />
              </Grid>
            ))}
          </Grid>
        </AppBox>
        {!!goals.length && false && (
          <AppBox flexDirection="column" gap={2}>
            <AppTitle variant="h4" component="h2" name="goal">
              {goalTitle}
            </AppTitle>
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={goal.id}>
                  <Goal tmpl="search" goal={goal} />
                </Grid>
              ))}
            </Grid>
          </AppBox>
        )}
      </AppBox>
    </AppContainer>
  )
}
