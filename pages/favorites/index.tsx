import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { ROUTE } from 'route'
import { User } from 'dto'
import { AppListProps } from 'components/UI/AppList'
import Layout from 'layout'
import AppBox from 'components/UI/AppBox'
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
    <AppBox mb={3}>
      <AppHeader src="/images/svg/favorites.svg">Favorites</AppHeader>
    </AppBox>
    {!favorites.length ? (
      <EmptyList />
    ) : (
      <AppList
        elements={favorites}
        spacing={4}
        render={(el) => <UserCard {...el} view="favorite" />}
      />
    )}
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await Axios.get(ROUTE.FAVORITES)

  return { props: data }
}

export default Favorites
