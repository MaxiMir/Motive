import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { QueryClient, useMutation, useQuery } from 'react-query'
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
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

const queryFn = async () => (await Axios.get(ROUTE.FAVORITES)).data

export default function Favorites(): JSX.Element {
  const { data, status } = useQuery<FavoritesPage>('favorites', queryFn)
  const { meta, favorites: initial } = (data as FavoritesPage) || {}
  const prevFavoritesRef = useRef(initial)
  const [favorites, setFavorites] = useState(initial)
  const [severity, setSeverity] = useState<'success' | 'error'>()
  const { mutate } = useMutation((id: string) => Axios.delete(ROUTE.getFavoriteUserId(id)), {
    onSuccess() {
      prevFavoritesRef.current = favorites
    },
    onError() {
      setFavorites(prevFavoritesRef.current)
    },
    onSettled(_, error) {
      setSeverity(!error ? 'success' : 'error')
    },
  })

  const onRemove = (id: string) => {
    prevFavoritesRef.current = favorites
    mutate(id)
    setFavorites(favorites.filter((f) => f.id !== id))
  }

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
            render={(el) => <UserCard type="favorite" {...el} onRemove={onRemove} />}
            keyGetter={(el) => el.id}
          />
        )}
      </AppContainer>
      {severity && (
        <AppSnackbar severity={severity} autoHideDuration={3000} onClose={() => setSeverity(undefined)}>
          {severity === 'success' ? 'Removed from favorites' : 'Something went wrong...'}
        </AppSnackbar>
      )}
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
