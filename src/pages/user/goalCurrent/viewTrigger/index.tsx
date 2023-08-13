import { ReactNode } from 'react'
import InView from 'shared/ui/InView'
import { useIncreaseViews } from './model'

interface ViewTriggerProps {
  ownerId: number
  dayId: number
  children: ReactNode | ReactNode[]
}

export function ViewTrigger({ ownerId, dayId, children }: ViewTriggerProps) {
  const { mutate } = useIncreaseViews(ownerId, dayId)

  return (
    <InView triggerOnce onView={() => mutate()}>
      {children}
    </InView>
  )
}
