import React, { useRef } from 'react'
import { Button } from '@material-ui/core'
import { User } from 'dto'
import FavoriteService from 'services/FavoriteService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import UserCard from 'components/UserCard'
import AppList from 'components/UI/AppList'

interface FavoriteListProps {
  favorites: User[]
  mutateFavorites: (users: User[]) => void
}

export default function FavoriteList({ favorites, mutateFavorites }: FavoriteListProps): JSX.Element {
  const prevFavoritesRef = useRef(favorites)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
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
      mutateFavorites(prevFavoritesRef.current)
    },
  })

  const onRemove = (id: string) => {
    prevFavoritesRef.current = favorites

    mutateFavorites(favorites.filter((f) => f.id !== id))
    send({ id, favorite: true })
  }

  function onUndo(id: string) {
    mutateFavorites(prevFavoritesRef.current)
    closeSnackbar()
    send({ id, favorite: false })
  }

  return (
    <AppList
      elements={favorites}
      spacing={4}
      render={(user) => <UserCard type="favorite" {...user} onRemove={() => onRemove(user.id)} />}
      keyGetter={(user) => user.id}
    />
  )
}
