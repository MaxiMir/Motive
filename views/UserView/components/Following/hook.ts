import { useRef } from 'react'
import produce from 'immer'
import SubscriptionService from 'services/SubscriptionService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutatePage } from 'views/UserView/hook'

export default function useSetFollowing(id: number, following: boolean, isAuthorized: boolean): () => void {
  const lastFollowingRef = useRef(following)
  const [page, mutate] = useMutatePage()
  const backupRef = useRef(page)
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(SubscriptionService.updateFollowing, {
    onSuccess(_, { add }) {
      lastFollowingRef.current = add

      enqueueSnackbar({
        message: add ? 'Added following' : 'Removed following',
        severity: 'success',
        icon: 'speaker',
      })
    },
    onError() {
      rollbackFollowing()
    },
  })

  const sendWithDebounce = useDebounceCb((add: boolean) => {
    lastFollowingRef.current !== add && send({ id, add })
  })

  const mutateFollowing = (value: boolean) => {
    mutate(
      produce(page, (draft) => {
        draft.content.following = value
        draft.content.characteristic.followers += value ? 1 : -1
      }),
    )
  }

  const rollbackFollowing = () => {
    mutate(
      produce(page, (draft) => {
        draft.content.following = backupRef.current.content.following
        draft.content.characteristic.followers = backupRef.current.content.characteristic.followers
      }),
    )
  }

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    backupRef.current = page
    mutateFollowing(!following)
    sendWithDebounce(!following)
  }
}
