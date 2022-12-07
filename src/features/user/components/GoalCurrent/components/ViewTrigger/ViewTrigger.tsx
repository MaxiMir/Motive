import { ReactNode } from 'react'
import AppInView from '@ui/AppInView'
import { useIncreaseViews } from './hooks/useIncreaseViews'

interface ViewTriggerProps {
  children: ReactNode
}

function ViewTrigger({ children }: ViewTriggerProps) {
  const { mutate } = useIncreaseViews()

  return (
    <AppInView triggerOnce onView={() => mutate()}>
      {children}
    </AppInView>
  )
}

export default ViewTrigger
