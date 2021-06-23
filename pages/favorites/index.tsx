import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { Container } from '@material-ui/core'
import { ROUTE } from 'route'
import { User } from 'dto'
import { AppListProps } from 'components/UI/AppList'
import Layout from 'layout'
import AppHeader from 'components/UI/AppHeader'
import UserCard from 'components/UserCard'

const EmptyList = dynamic(() => import('./EmptyList'))
const AppList = dynamic<AppListProps<User>>(
  () => import('components/UI/AppList'),
)

interface FavoritesProps {
  favorites: User[]
}

const Favorites = ({ favorites }: FavoritesProps) => (
  <Layout>
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
          render={(el, index) => (
            <UserCard {...el} index={index} view="favorite" />
          )}
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
