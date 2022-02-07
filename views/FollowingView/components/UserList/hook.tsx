import { useRef } from 'react'
import { useQueryClient } from 'react-query'
import { Button } from '@material-ui/core'
import { UserDto } from 'dto'
import SubscriptionService from 'services/SubscriptionService'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import { QUERY_KEY } from 'views/FollowingView/hook'

type UseRemoveFollowingUser = (id: number) => void

export default function useRemoveFollowing(users: UserDto[], isAuthorized: boolean): UseRemoveFollowingUser {
  const backupRef = useRef(users)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const mutateContent = useMutateContent()
  const { send } = useSend(SubscriptionService.updateFollowing, {
    onSuccess: (_, { id, add }) => {
      !add &&
        enqueueSnackbar({
          message: 'Removed from following',
          severity: 'success',
          action: <Button onClick={() => onUndo(id)}>Undo</Button>,
          icon: 'speaker',
        })
    },
    onError: () => {
      mutateContent(backupRef.current)
    },
  })

  function onUndo(id: number) {
    mutateContent(backupRef.current)
    closeSnackbar()
    send({ id, add: true })
  }

  return (id: number) => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    backupRef.current = users
    mutateContent(users.filter((f) => f.id !== id))
    send({ id, add: false })
  }
}

const useMutateContent = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueriesData(QUERY_KEY)

  return (content: UserDto[]) => queryClient.setQueryData(QUERY_KEY, { ...data, content })
}
