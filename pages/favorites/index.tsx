import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import useSWR, { useSWRConfig } from 'swr'
import ROUTE from 'route'
import { PageSWR, FavoritesPage, User } from 'dto'
import PageService from 'services/PageService'
import UserService from 'services/UserService'
import useSend from 'hooks/useSend'
import { useSnackbar } from 'hooks/useSnackbar'
import Layout from 'layout'
import UserCard from 'components/UserCard'
import AppContainer from 'components/UI/AppContainer'
import AppHeader from 'components/UI/AppHeader'
import { AppListProps } from 'components/UI/AppList'

const EmptyList = dynamic(() => import('./EmptyList'))
const AppList = dynamic<AppListProps<User>>(() => import('components/UI/AppList'))
const Button = dynamic(() => import('@material-ui/core/Button'))

export default function Favorites({ fallbackData }: PageSWR<FavoritesPage>): JSX.Element {
  const mutateSWR = useSWRConfig().mutate
  const { data, error } = useSWR(ROUTE.FAVORITES, PageService.getFavorites, { fallbackData })
  const { meta, favorites, client } = (data as FavoritesPage) || {}
  const prevFavoritesRef = useRef(favorites)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { send } = useSend(UserService.setFavorite, {
    onSuccess: (_, { favoriteId, isFavorite }) => {
      prevFavoritesRef.current = favorites
      isFavorite &&
        enqueueSnackbar({
          message: 'Removed from favorites',
          severity: 'success',
          action: <Button onClick={() => onUndo(favoriteId)}>Undo</Button>,
        })
    },
    onError: () => {
      mutateFavoritesLocal(prevFavoritesRef.current)
      enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    },
  })

  const onRemove = (favoriteId: string) => {
    prevFavoritesRef.current = favorites

    mutateFavoritesLocal(favorites.filter((f) => f.id !== favoriteId))
    send({ id: client.id, favoriteId, isFavorite: true })
  }

  function onUndo(favoriteId: string) {
    mutateFavoritesLocal(prevFavoritesRef.current)
    closeSnackbar()
    send({ id: client.id, favoriteId, isFavorite: false })
  }

  function mutateFavoritesLocal(users: User[]) {
    return mutateSWR(ROUTE.FAVORITES, { ...data, favorites: users }, false)
  }

  return (
    <Layout client={client} error={error} {...meta}>
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
            render={(user) => <UserCard type="favorite" {...user} onRemove={() => onRemove(user.id)} />}
            keyGetter={(user) => user.id}
          />
        )}
      </AppContainer>
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
