import { useRef, useState } from 'react'
import UserService from 'services/UserService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'

export default function useUserFavorite(userId: number, initial: boolean): [boolean, () => void] {
  const lastLoadedRef = useRef(initial)
  const [favorite, setFavorite] = useState(initial)
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(UserService.updateFavorite, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.favorite

      enqueueSnackbar({
        message: data.favorite ? 'Added to favorites' : 'Removed from favorites',
        severity: 'success',
        icon: data.favorite ? 'speaker' : 'ninja',
      })
    },
    onError(_, data) {
      setFavorite(!data.favorite)
    },
  })
  const mutateWithDebounce = useDebounceCb((value: boolean) => {
    lastLoadedRef.current !== value && send({ userId, favorite: value })
  })

  const onChange = () => {
    setFavorite(!favorite)
    mutateWithDebounce(!favorite)
  }

  return [favorite, onChange]
}
