import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { PageSWR, FavoritesPage, User } from 'dto'
import usePartialMutate from 'hooks/usePartialMutate'
import PageService from 'services/PageService'
import Layout from 'layout'
import AppContainer from 'components/UI/AppContainer'
import AppHeader from 'components/UI/AppHeader'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const List = dynamic(() => import('./components/List'))

export default function Favorites({ fallbackData }: PageSWR<FavoritesPage>): JSX.Element {
  const { asPath } = useRouter()
  const { data, error } = useSWR(asPath, PageService.getFavorites, { fallbackData })
  const mutate = usePartialMutate(asPath)
  const { meta, favorites } = data || {}

  const mutateFavorites = (users: User[]) => {
    mutate({ ...data, favorites: users }, false)
  }

  return (
    <Layout {...meta} error={error}>
      {favorites && (
        <AppContainer withFlexColumn>
          <AppHeader name="favorite" mb={4}>
            Favorites
          </AppHeader>
          {!favorites.length ? <EmptyList /> : <List favorites={favorites} mutateFavorites={mutateFavorites} />}
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
