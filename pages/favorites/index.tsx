import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import Axios from 'lib/axios'
import ROUTE from 'route'
import { FavoritesPage, User } from 'dto'
import Layout from 'layout'
import UserCard from 'components/UserCard'
import AppContainer from 'components/UI/AppContainer'
import AppHeader from 'components/UI/AppHeader'
import { AppListProps } from 'components/UI/AppList'

const EmptyList = dynamic(() => import('./EmptyList'))
const AppList = dynamic<AppListProps<User>>(() => import('components/UI/AppList'))

const queryFn = async () => (await Axios.get(ROUTE.FAVORITES)).data

export default function Favorites(): JSX.Element {
  const { data, status } = useQuery<FavoritesPage>('favorites', queryFn)
  const { meta, favorites } = (data as FavoritesPage) || {}

  return (
    <Layout status={status} {...meta}>
      <AppContainer withFlexColumn>
        <AppHeader name="favorite-active" mb={4}>
          Favorites
        </AppHeader>
        {!favorites.length ? (
          <EmptyList />
        ) : (
          <AppList
            elements={favorites}
            spacing={4}
            render={(el) => <UserCard type="favorite" {...el} />}
            keyGetter={(el) => el.id}
          />
        )}
      </AppContainer>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('favorites', queryFn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
