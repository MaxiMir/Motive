import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { Container } from '@material-ui/core'
import { ROUTE } from 'route'
import { FavoritesPage, User } from 'dto'
import Layout from 'layout'
import UserCardFavorite from 'components/UserCard/UserCardFavorite'
import AppHeader from 'components/UI/AppHeader'
import { AppListProps } from 'components/UI/AppList'

const EmptyList = dynamic(() => import('./EmptyList'))
const AppList = dynamic<AppListProps<User>>(
  () => import('components/UI/AppList'),
)

const Favorites = ({ meta, favorites }: FavoritesPage) => (
  <Layout {...meta}>
    <Container fixed>
      <AppHeader name="favorite-active" mb={4}>
        Favorites
      </AppHeader>
      {!favorites.length ? (
        <EmptyList />
      ) : (
        <AppList
          elements={favorites}
          spacing={4}
          render={(el) => <UserCardFavorite {...el} />}
        />
      )}
    </Container>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await Axios.get(ROUTE.FAVORITES)

  return { props: data }
}

export default Favorites
