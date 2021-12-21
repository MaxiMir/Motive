import { useRef } from 'react'
import produce from 'immer'
import UserService from 'services/UserService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutatePage } from 'views/User/hook'

type UseUserFavorite = [boolean, () => void]

export default function useUserFavorite(clientId: number, following: number, favorite: boolean): UseUserFavorite {
  const lastLoadedRef = useRef(favorite)
  const [page, mutate] = useMutatePage()
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(UserService.setFollowing, {
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
    lastLoadedRef.current !== add && send({ clientId, following, add })
  })

  const onChange = () => {
    if (clientId) {
      mutateFavorite(!favorite)
      sendWithDebounce(!favorite)
    }

    // TODO for not auth
  }

  function mutateFavorite(value: boolean) {
    mutate(
      produce(page, (draft) => {
        draft.content.favorite = value
        draft.content.user.characteristic.followers += value ? 1 : -1
      }),
      false,
    )
  }

  return [favorite, onChange]
}
