import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import Hashtag from 'components/Hashtag'
import SearchForm from './components/SearchForm'
import { getGradients } from './helper'

interface SearchViewProps {
  hashtags: { name: string; count: number }[]
}

export default function SearchView({ hashtags }: SearchViewProps): JSX.Element {
  const gradients = getGradients()

  return (
    <AppContainer flexColumn>
      <AppTitle name="search" mb={4}>
        Search
      </AppTitle>
      <AppBox flexDirection="column" spacing={4}>
        <SearchForm q="" />
        <AppBox flexDirection="column" spacing={2}>
          <AppTitle variant="h4" component="h2" name="popular">
            Popular
          </AppTitle>
          <AppBox flexWrap="wrap" spacing={2}>
            {hashtags.map(({ name, count }, key) => (
              <Hashtag tmpl="gradient" name={name} count={count} gradient={gradients[key]} key={name} />
            ))}
          </AppBox>
        </AppBox>
      </AppBox>
    </AppContainer>
  )
}
