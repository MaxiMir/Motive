import { useRef, useState } from 'react'
import UserService from 'services/UserService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'

type UseUserFavorite = [boolean, () => void]

export default function useUserFavorite(clientId: number, userId: number, initial: boolean): UseUserFavorite {
  const lastLoadedRef = useRef(initial)
  const [favorite, setFavorite] = useState(initial)
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(UserService.setFollowing, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.add

      enqueueSnackbar({
        message: data.add ? 'Added to favorites' : 'Removed from favorites',
        severity: 'success',
        icon: data.add ? 'speaker' : 'ninja',
      })
    },
    onError(_, data) {
      setFavorite(!data.add)
    },
  })
  const mutateWithDebounce = useDebounceCb((add: boolean) => {
    lastLoadedRef.current !== add && send({ clientId, userId, add })
  })

  const onChange = () => {
    if (clientId) {
      setFavorite(!favorite)
      mutateWithDebounce(!favorite)
    }

    // todo for not auth
  }

  return [favorite, onChange]
}
