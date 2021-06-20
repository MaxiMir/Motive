import { FC } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { User } from 'dto/User'
import Layout from 'layout'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'

const EmptyList = dynamic(() => import('./EmptyList'))
const UserCardList = dynamic(() => import('components/UserCardList'))

interface FavoritesProps {
  favorites: User[]
}

const Favorites: FC<FavoritesProps> = ({ favorites }) => (
  <Layout>
    <AppBox mb={3}>
      <AppHeader src="/images/svg/favorites.svg">Favorites</AppHeader>
    </AppBox>
    {!favorites.length ? (
      <EmptyList />
    ) : (
      <UserCardList list={favorites} view="compact" />
    )}
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await Axios.get('/favorites')

  return { props: data }
}

export default Favorites
