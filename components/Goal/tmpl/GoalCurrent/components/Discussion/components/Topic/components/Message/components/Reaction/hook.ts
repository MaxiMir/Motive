import { useRef } from 'react'
import { useMutation } from 'react-query'
import DiscussionService from 'services/DiscussionService'
import useDebounceCb from 'hooks/useDebounceCb'

export default function useSetReaction(id: number, count: number[]): [boolean, number, () => void] {
  const active = count.length >= 1 // TODO change
  const lastLoadedRef = useRef(false)

  const { mutate } = useMutation(DiscussionService.setLike, {
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
    lastLoadedRef.current !== value && mutate({ id, like: value })
  })

  const onClick = () => {
    // setCount(count + (!active ? 1 : -1))
    // setActive(!active)
    mutateWithDebounce(!active)
  }

  return [active, count.length, onClick]
}
