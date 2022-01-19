import { useRef } from 'react'
import { Button } from '@material-ui/core'
import { UserDto } from 'dto'
import SubscriptionService from 'services/SubscriptionService'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'

type UseRemoveFollowingUser = (id: number) => void

export default function useRemoveFollowing(
  users: UserDto[],
  isAuthorized: boolean,
  mutate: (user: UserDto[]) => void,
): UseRemoveFollowingUser {
  const backupRef = useRef(users)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { send } = useSend(SubscriptionService.updateFollowing, {
    onSuccess: (_, { id, add }) => {
      !add &&
        enqueueSnackbar({
          message: 'Removed from following',
          severity: 'success',
          action: <Button onClick={() => onUndo(id)}>Undo</Button>,
          icon: 'ninja',
        })
    },
    onError: () => {
      mutate(backupRef.current)
    },
  })

  function onUndo(id: number) {
    mutate(backupRef.current)
    closeSnackbar()
    send({ id, add: true })
  }

  return (id: number) => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    backupRef.current = users
    mutate(users.filter((f) => f.id !== id))
    send({ id, add: false })
  }
}
