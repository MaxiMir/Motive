import { ReactNode } from 'react'
import InView from 'shared/ui/InView'
import { useIncreaseViews } from './hooks/useIncreaseViews'

interface ViewTriggerProps {
  children: ReactNode
}

function ViewTrigger({ children }: ViewTriggerProps) {
  const { mutate } = useIncreaseViews()

  return (
    <InView triggerOnce onView={() => mutate()}>
      {children}
    </InView>
  )
}

export default ViewTrigger
