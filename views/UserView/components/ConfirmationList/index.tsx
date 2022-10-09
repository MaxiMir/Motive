import dynamic from 'next/dynamic'
import { Tabs } from '@mui/material'
import { UserDetailDto } from 'dto'
import ConfirmationStory from 'components/Confirmation/ConfirmationStory'

const AddGoal = dynamic(() => import('./components/AddGoal'))

interface ConfirmationListProps {
  user: UserDetailDto
  clientPage: boolean
}

export default function ConfirmationList({ user, clientPage }: ConfirmationListProps) {
  const { id, name, nickname, avatar, confirmations } = user
  const userBase = { id, name, nickname, avatar }

  return (
    <Tabs
      value={0}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        style: {
          display: 'none',
        },
      }}
    >
      {clientPage && <AddGoal />}
      {confirmations.map((confirmation) => (
        <ConfirmationStory user={userBase} confirmation={confirmation} key={confirmation.id} />
      ))}
    </Tabs>
  )
}
