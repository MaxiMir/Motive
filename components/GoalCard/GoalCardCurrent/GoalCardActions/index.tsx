import dynamic from 'next/dynamic'
import { Role } from 'dto'

const GoalCardActionsMember = dynamic(() => import('./GoalCardActionsMember'))

interface GoalCardActionsProps {
  role: Role
}

export default function GoalCardActions({ role }: GoalCardActionsProps): JSX.Element {
  switch (role) {
    default:
      return <GoalCardActionsMember />
  }
}
