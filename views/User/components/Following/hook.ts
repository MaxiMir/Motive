import { useRef } from 'react'
import produce from 'immer'
import SubscriptionService from 'services/SubscriptionService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutatePage } from 'views/User/hook'

export default function useSetFollowing(id: number, following: boolean, isAuthorized: boolean): () => void {
  const lastLoadedRef = useRef(following)
  const [page, mutate] = useMutatePage()
  const { enqueueSnackbar } = useSnackbar()

  const { send } = useSend(SubscriptionService.updateFollowing, {
    onSuccess(_, data) {
      const { add } = data
      lastLoadedRef.current = add

      enqueueSnackbar({
        message: add ? 'Added to favorites' : 'Removed from favorites',
        severity: 'success',
        icon: add ? 'speaker' : 'ninja',
      })
    },
    onError(_, data) {
      mutateFavorite(!data.add)
    },
  })

  const sendWithDebounce = useDebounceCb((add: boolean) => {
    lastLoadedRef.current !== add && send({ id, add })
  })

  function mutateFavorite(value: boolean) {
    mutate(
      produce(page, (draft) => {
        draft.content.isFollowing = value
        draft.content.user.characteristic.followers += value ? 1 : -1
      }),
      false,
    )
  }

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    mutateFavorite(!following)
    sendWithDebounce(!following)
  }
}
