import { ReactNode } from 'react'
import { GoalDto } from '@dto'
import AppInView from '@ui/AppInView'
import useIncreaseViews from './hooks/useIncreaseViews'

interface ViewTriggerProps {
  goal: GoalDto
  children: ReactNode
}

function ViewTrigger({ goal, children }: ViewTriggerProps) {
  const { mutate } = useIncreaseViews(goal)

  return (
    <AppInView triggerOnce onView={() => mutate()}>
      {children}
    </AppInView>
  )
}

export default ViewTrigger
