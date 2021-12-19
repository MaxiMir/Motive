import { useRef } from 'react'
import { Button } from '@material-ui/core'
import { User } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import UserService from 'services/UserService'

type UseRemoveFavoriteUser = (id: number) => void

export default function useRemoveFavorites(users: User[], mutate: (newUsers: User[]) => void): UseRemoveFavoriteUser {
  const prevUsersRef = useRef(users)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { send } = useSend(UserService.updateFavorite, {
    onSuccess: (_, { userId, favorite }) => {
      prevUsersRef.current = users

      favorite &&
        enqueueSnackbar({
          message: 'Removed from favorites',
          severity: 'success',
          action: <Button onClick={() => onUndo(userId)}>Undo</Button>,
          icon: 'ninja',
        })
    },
    onError: () => {
      mutate(prevUsersRef.current)
    },
  })

  function onUndo(userId: number) {
    mutate(prevUsersRef.current)
    closeSnackbar()
    send({ userId, favorite: false })
  }

  return (userId: number) => {
    prevUsersRef.current = users

    mutate(users.filter((f) => f.id !== userId))
    send({ userId, favorite: true })
  }
}
