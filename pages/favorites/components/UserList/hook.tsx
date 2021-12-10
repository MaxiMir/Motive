import { useRef } from 'react'
import { Button } from '@material-ui/core'
import { User } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import FavoriteService from 'services/FavoriteService'

type UseRemoveFavoriteUser = (id: string) => void

export default function useRemoveFavorite(users: User[], mutate: (newUsers: User[]) => void): UseRemoveFavoriteUser {
  const prevUsersRef = useRef(users)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { send } = useSend(FavoriteService.setUser, {
    onSuccess: (_, { id, favorite }) => {
      prevUsersRef.current = users

      favorite &&
        enqueueSnackbar({
          message: 'Removed from favorites',
          severity: 'success',
          action: <Button onClick={() => onUndo(id)}>Undo</Button>,
          icon: 'ninja',
        })
    },
    onError: () => {
      mutate(prevUsersRef.current)
    },
  })

  function onUndo(id: string) {
    mutate(prevUsersRef.current)
    closeSnackbar()
    send({ id, favorite: false })
  }

  return (id: string) => {
    prevUsersRef.current = users

    mutate(users.filter((f) => f.id !== id))
    send({ id, favorite: true })
  }
}
