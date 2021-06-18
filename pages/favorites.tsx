import { FC } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { User } from 'dto/User'
import { Layout } from 'layout'
import { AppHeader } from 'components/UI/AppHeader'
import { AppBox } from '../components/UI/AppBox'

const Typography = dynamic(() => import('@material-ui/core/Typography'))

interface FavoritesProps {
  favorites: Array<User>
}

const Favorites: FC<FavoritesProps> = ({ favorites }) => {
  return (
    <Layout>
      <AppBox flexDirection="column" spacing={2}>
        <AppHeader src="/images/svg/favorites.svg">Favorites</AppHeader>
        {!favorites.length && (
          <AppBox justifyContent="center" alignItems="center">
            <AppBox flexDirection="column" alignItems="center" spacing={1}>
              <Typography variant="h5" style={{ color: '#C8B1BB' }}>
                The list is empty.
              </Typography>
              <Typography>Add people you are interested in</Typography>
            </AppBox>
          </AppBox>
        )}
      </AppBox>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const favorites = await Axios.get('/favorites')

  return { props: { favorites: [] } }
}

export default Favorites
