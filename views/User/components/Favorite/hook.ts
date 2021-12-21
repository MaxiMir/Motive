import { useRef, useState } from 'react'
import produce from 'immer'
import UserService from 'services/UserService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutatePage } from 'views/User/hook'

type UseUserFavorite = [boolean, () => void]

export default function useUserFavorite(clientId: number, following: number, initial: boolean): UseUserFavorite {
  const lastLoadedRef = useRef(initial)
  const [favorite, setFavorite] = useState(initial)
  const [page, mutate] = useMutatePage()
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(UserService.setFollowing, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.add

      enqueueSnackbar({
        message: data.add ? 'Added to favorites' : 'Removed from favorites',
        severity: 'success',
        icon: data.add ? 'speaker' : 'ninja',
      })

      mutate(
        produce(page, (draft) => {
          draft.content.user.characteristic.followers += data.add ? 1 : -1
        }),
        false,
      )
    },
    onError(_, data) {
      setFavorite(!data.add)
    },
  })
  const mutateWithDebounce = useDebounceCb((add: boolean) => {
    lastLoadedRef.current !== add && send({ clientId, following, add })
  })

  const onChange = () => {
    if (clientId) {
      setFavorite(!favorite)
      mutateWithDebounce(!favorite)
    }

    // TODO for not auth
  }

  return [favorite, onChange]
}
