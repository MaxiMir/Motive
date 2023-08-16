import { ReactNode } from 'react'
import { InView } from 'react-intersection-observer'
import { useIncreaseViews } from './model'

interface ViewTriggerProps {
  ownerId: number
  dayId: number
  children: ReactNode | ReactNode[]
}

export function ViewTrigger({ ownerId, dayId, children }: ViewTriggerProps) {
  const { mutate } = useIncreaseViews(ownerId, dayId)

  const onChange = (visible: boolean) => {
    if (!visible) return

    mutate()
  }

  return (
    <InView triggerOnce onChange={onChange}>
      {children}
    </InView>
  )
}
