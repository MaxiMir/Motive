import { useRef } from 'react'
import DiscussionService from 'services/DiscussionService'
import useSend from 'hooks/useSend'
import useDebounceCb from 'hooks/useDebounceCb'

export default function useSetLike(id: number, count: number[]): [boolean, number, () => void] {
  const active = false
  const lastLoadedRef = useRef(false)

  const { send } = useSend(DiscussionService.setLike, {
    onSuccess: (r) => {
      // lastLoadedRef.current = { count, active }
      console.log(r)
      // TODO MUTATE
    },
    onError: (_, data) => {
      console.log(data)
      // setCount(lastLoadedRef.current.count)
      // setActive(!data.like)
    },
  })

  const mutateWithDebounce = useDebounceCb((value: boolean) => {
    console.log('mutateWithDebounce')
    lastLoadedRef.current !== value && send({ id, like: value })
  })

  const onClick = () => {
    // setCount(count + (!active ? 1 : -1))
    // setActive(!active)
    mutateWithDebounce(!active)
  }

  return [false, count.length, onClick]
}
