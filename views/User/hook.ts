import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { scrollToElem } from 'helpers/dom'

export default function useScrollToGoal(): void {
  const { query } = useRouter()

  useEffect(() => {
    query.s && scrollToElem(`goal-${query.s}`)
  }, [query])
}
