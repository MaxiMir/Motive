import { ReactNode } from 'react'
import InView from 'shared/ui/InView'
import { useIncreaseViews } from './lib'

interface ViewTriggerProps {
  children: ReactNode
}

export function ViewTrigger({ children }: ViewTriggerProps) {
  const { mutate } = useIncreaseViews()

  return (
    <InView triggerOnce onView={() => mutate()}>
      {children}
    </InView>
  )
}
