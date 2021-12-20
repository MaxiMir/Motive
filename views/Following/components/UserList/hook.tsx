import { useRef } from 'react'
import { Button } from '@material-ui/core'
import { User } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import UserService from 'services/UserService'

type UseRemoveFollowingUser = (id: number) => void

export default function useRemoveFollowing(
  users: User[],
  clientId: number,
  mutate: (user: User[]) => void,
): UseRemoveFollowingUser {
  const prevUsersRef = useRef(users)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { send } = useSend(UserService.setFollowing, {
    onSuccess: (_, { userId, add }) => {
      prevUsersRef.current = users

      !add &&
        enqueueSnackbar({
          message: 'Removed from following',
          severity: 'success',
          action: <Button onClick={() => onUndo(userId)}>Undo</Button>,
          icon: 'speaker',
        })
    },
    onError: () => {
      mutate(prevUsersRef.current)
    },
  })

  function onUndo(userId: number) {
    mutate(prevUsersRef.current)
    closeSnackbar()
    send({ clientId, userId, add: true })
  }

  return (userId: number) => {
    prevUsersRef.current = users

    mutate(users.filter((f) => f.id !== userId))
    send({ clientId, userId, add: false })
  }
}
