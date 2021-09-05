import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { QueryClient, useMutation, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import Axios from 'lib/axios'
import ROUTE from 'route'
import { FavoritesPage, User } from 'dto'
import { useSnackbar } from 'hooks/useSnackbar'
import Layout from 'layout'
import UserCard from 'components/UserCard'
import AppContainer from 'components/UI/AppContainer'
import AppHeader from 'components/UI/AppHeader'
import { AppListProps } from 'components/UI/AppList'

const EmptyList = dynamic(() => import('./EmptyList'))
const AppList = dynamic<AppListProps<User>>(() => import('components/UI/AppList'))

const queryFn = async () => (await Axios.get(ROUTE.FAVORITES)).data

export default function Favorites(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar()
  const { data, status } = useQuery<FavoritesPage>('favorites', queryFn)
  const { meta, favorites: initial, client } = (data as FavoritesPage) || {}
  const prevFavoritesRef = useRef(initial)
  const [favorites, setFavorites] = useState(initial)
  const { mutate } = useMutation((user: User) => Axios.put(ROUTE.getUserFavorite(user.id), false), {
    onSuccess() {
      prevFavoritesRef.current = favorites
      enqueueSnackbar({ message: 'Removed from favorites', severity: 'success' })
    },
    onError() {
      setFavorites(prevFavoritesRef.current)
      enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    },
  })

  const onRemove = (user: User) => {
    prevFavoritesRef.current = favorites
    mutate({ ...user })
    setFavorites(favorites.filter((f) => f.id !== user.id))
  }

  return (
    <Layout client={client} status={status} {...meta}>
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
            render={(user) => <UserCard type="favorite" {...user} onRemove={() => onRemove(user)} />}
            keyGetter={(user) => user.id}
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
