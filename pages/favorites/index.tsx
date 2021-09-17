import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import useSWR, { useSWRConfig } from 'swr'
import Axios from 'lib/axios'
import ROUTE from 'route'
import { PageSWR, FavoritesPage, User } from 'dto'
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

const fetcher = async () => (await Axios.get(ROUTE.FAVORITES)).data

export default function Favorites({ fallbackData }: PageSWR<FavoritesPage>): JSX.Element {
  const mutateSWR = useSWRConfig().mutate
  const { data, error } = useSWR(ROUTE.FAVORITES, fetcher, { fallbackData })
  const { meta, favorites, client } = (data as FavoritesPage) || {}
  const prevFavoritesRef = useRef(favorites)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { send } = useSend({
    onSuccess: (_, { id, favorite }) => {
      prevFavoritesRef.current = favorites
      !favorite &&
        enqueueSnackbar({
          message: 'Removed from favorites',
          severity: 'success',
          action: <Button onClick={() => onUndo(id)}>Undo</Button>,
        })
    },
    onError: () => {
      mutateFavoritesLocal(prevFavoritesRef.current)
      enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    },
  })

  const onRemove = (id: string) => {
    prevFavoritesRef.current = favorites

    mutateFavoritesLocal(favorites.filter((f) => f.id !== id))
    send({
      url: ROUTE.getUserFavorite(id),
      method: 'put',
      data: false,
    })
  }

  function onUndo(id: string) {
    mutateFavoritesLocal(prevFavoritesRef.current)
    closeSnackbar()
    send({
      url: ROUTE.getUserFavorite(id),
      method: 'put',
      data: true,
    })
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
  const data = await fetcher()

  return {
    props: {
      fallbackData: data,
    },
  }
}
