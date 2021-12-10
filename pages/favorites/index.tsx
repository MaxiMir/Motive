import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { PageSWR, FavoritesPage } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import AppContainer from 'components/UI/AppContainer'
import AppHeader from 'components/UI/AppHeader'
import useFavoritesPage from './hook'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

export default function Favorites({ fallbackData }: PageSWR<FavoritesPage>): JSX.Element {
  const [{ data, error }, mutate] = useFavoritesPage(fallbackData)

  return (
    <Layout {...data?.meta} error={error}>
      {data?.content && (
        <AppContainer withFlexColumn>
          <AppHeader name="favorite" mb={4}>
            Favorites
          </AppHeader>
          {!data.content.length ? <EmptyList /> : <UserList users={data.content} mutate={mutate} />}
        </AppContainer>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await PageService.getFavorites()

  return {
    props: {
      fallbackData: data,
    },
  }
}
