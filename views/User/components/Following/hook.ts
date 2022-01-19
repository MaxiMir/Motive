import { useRef } from 'react'
import produce from 'immer'
import SubscriptionService from 'services/SubscriptionService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutatePage } from 'views/User/hook'

export default function useSetFollowing(id: number, following: boolean, isAuthorized: boolean): () => void {
  const [page, mutate] = useMutatePage()
  const lastFollowingRef = useRef(following)
  const backupRef = useRef(page)
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(SubscriptionService.updateFollowing, {
    onSuccess(_, { add }) {
      lastFollowingRef.current = add

      enqueueSnackbar({
        message: add ? 'Added to favorites' : 'Removed from favorites',
        severity: 'success',
        icon: add ? 'speaker' : 'ninja',
      })
    },
    onError() {
      rollbackFavorite()
    },
  })

  const sendWithDebounce = useDebounceCb((add: boolean) => {
    lastFollowingRef.current !== add && send({ id, add })
  })

  const mutateFavorite = (value: boolean) => {
    mutate(
      produce(page, (draft) => {
        draft.content.isFollowing = value
        draft.content.characteristic.followers += value ? 1 : -1
      }),
      false,
    )
  }

  const rollbackFavorite = () => {
    const { isFollowing, characteristic } = backupRef.current.content

    mutate(
      produce(page, (draft) => {
        draft.content.isFollowing = isFollowing
        draft.content.characteristic.followers = characteristic.followers
      }),
      false,
    )
  }

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    backupRef.current = page
    mutateFavorite(!following)
    sendWithDebounce(!following)
  }
}
