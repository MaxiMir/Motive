import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { PageSWR, FavoritesPage, User } from 'dto'
import PageService from 'services/PageService'
import FavoriteService from 'services/FavoriteService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import usePartialMutate from 'hooks/usePartialMutate'
import Layout from 'layout'
import UserCard from 'components/UserCard'
import AppContainer from 'components/UI/AppContainer'
import AppHeader from 'components/UI/AppHeader'
import { AppListProps } from 'components/UI/AppList'

const EmptyList = dynamic(() => import('./EmptyList'))
const AppList = dynamic<AppListProps<User>>(() => import('components/UI/AppList'))
const Button = dynamic(() => import('@material-ui/core/Button'))

export default function Favorites({ fallbackData }: PageSWR<FavoritesPage>): JSX.Element {
  const swrKey = 'favorites'
  const { data, error } = useSWR(swrKey, PageService.getFavorites, { fallbackData })
  const { meta, favorites, client } = (data as FavoritesPage) || {}
  const prevFavoritesRef = useRef(favorites)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const mutate = usePartialMutate(swrKey)
  const { send } = useSend(FavoriteService.setUser, {
    onSuccess: (_, { id, favorite }) => {
      prevFavoritesRef.current = favorites

      favorite &&
        enqueueSnackbar({
          message: 'Removed from favorites',
          severity: 'success',
          action: <Button onClick={() => onUndo(id)}>Undo</Button>,
          icon: 'ninja',
        })
    },
    onError: () => {
      mutateFavoritesLocal(prevFavoritesRef.current)
    },
  })

  const onRemove = (nickname: string) => {
    prevFavoritesRef.current = favorites

    mutateFavoritesLocal(favorites.filter((f) => f.nickname !== nickname))
    send({ nickname, favorite: true })
  }

  function onUndo(nickname: string) {
    mutateFavoritesLocal(prevFavoritesRef.current)
    closeSnackbar()
    send({ nickname, favorite: false })
  }

  function mutateFavoritesLocal(users: User[]) {
    return mutate({ ...data, favorites: users }, false)
  }

  return (
    <Layout client={client} error={error} {...meta}>
      <AppContainer withFlexColumn>
        <AppHeader name="favorite" mb={4}>
          Favorites
        </AppHeader>
        {!favorites.length ? (
          <EmptyList />
        ) : (
          <AppList
            elements={favorites}
            spacing={4}
            render={(user) => <UserCard type="favorite" {...user} onRemove={() => onRemove(user.nickname)} />}
            keyGetter={(user) => user.nickname}
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
