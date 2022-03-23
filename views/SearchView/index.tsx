import { HashtagDto, UserDto } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import Hashtag from 'components/Hashtag'
import User from 'components/User'
import SearchForm from './components/SearchForm'
import { getGradients } from './helper'

interface SearchViewProps {
  q: string
  hashtags: HashtagDto[]
  users: UserDto[]
}

export default function SearchView({ q, hashtags, users }: SearchViewProps): JSX.Element {
  const gradients = getGradients()

  return (
    <AppContainer flexColumn>
      <AppTitle name="search" mb={4}>
        Search
      </AppTitle>
      <AppBox flexDirection="column" spacing={4}>
        <SearchForm q={q} />
        <AppBox flexDirection="column" spacing={2}>
          <AppTitle variant="h4" component="h2" name="goal">
            Goals
          </AppTitle>
        </AppBox>
        <AppBox flexDirection="column" spacing={2}>
          <AppTitle variant="h4" component="h2" name="popular">
            Popular
          </AppTitle>
          <AppBox flexWrap="wrap" spacing={2}>
            {hashtags.map(({ name, views }, key) => (
              <Hashtag tmpl="gradient" name={name} views={views} gradient={gradients[key]} key={name} />
            ))}
          </AppBox>
        </AppBox>
        <AppBox flexDirection="column" spacing={2}>
          <AppTitle variant="h4" component="h2" name="followers">
            Users
          </AppTitle>
          <AppBox flexWrap="wrap" spacing={2}>
            {users.map((user) => (
              <User tmpl="search" user={user} key={user.id} />
            ))}
          </AppBox>
        </AppBox>
      </AppBox>
    </AppContainer>
  )
}
