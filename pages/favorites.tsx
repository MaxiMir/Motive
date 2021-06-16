import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { Layout } from 'layout'
import { AppHeader } from 'components/UI/AppHeader'
import { Box } from '@material-ui/core'

interface FavoritesProps {
  favorites: Array<unknown>
}

const Favorites: FC<FavoritesProps> = ({ favorites }) => {
  return (
    <Layout>
      <Box flexDirection="column">
        <AppHeader src="/images/svg/favorites.svg">Favorites</AppHeader>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const data = await Axios.get('/favorites')

  return { props: { favorites: [] } }
}

export default Favorites
