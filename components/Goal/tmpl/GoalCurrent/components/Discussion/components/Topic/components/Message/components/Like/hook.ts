import { useRef, useState } from 'react'
import DiscussionService from 'services/DiscussionService'
import useSend from 'hooks/useSend'
import useDebounceCb from 'hooks/useDebounceCb'

export default function useSetLike(id: number, activeInit: boolean, countInit: number): [boolean, number, () => void] {
  const lastLoadedRef = useRef({ count: countInit, active: activeInit })
  const [active, setActive] = useState(activeInit)
  const [count, setCount] = useState(countInit)

  const { send } = useSend(DiscussionService.setLike, {
    onSuccess: (r) => {
      lastLoadedRef.current = { count, active }
      console.log(r)
      // TODO MUTATE
    },
    onError: (_, data) => {
      setCount(lastLoadedRef.current.count)
      setActive(!data.like)
    },
  })

  const mutateWithDebounce = useDebounceCb((value: boolean) => {
    lastLoadedRef.current.active !== value && send({ id, like: value })
  })

  const onClick = () => {
    setCount(count + (!active ? 1 : -1))
    setActive(!active)
    mutateWithDebounce(!active)
  }

  return [active, count, onClick]
}
