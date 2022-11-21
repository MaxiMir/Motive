import dynamic from 'next/dynamic'
import { Tabs } from '@mui/material'
import { ConfirmationDto, UserBaseDto } from '@dto'

const ConfirmationStory = dynamic(() => import('./components/ConfirmationStory'))
const AddGoal = dynamic(() => import('./components/AddGoal'))

interface ConfirmationListProps {
  user: UserBaseDto
  confirmations: ConfirmationDto[]
  clientPage: boolean
}

export default function ConfirmationList({ user, confirmations, clientPage }: ConfirmationListProps) {
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
      sx={{ mb: 3 }}
    >
      {clientPage && <AddGoal />}
      {confirmations.map((confirmation) => (
        <ConfirmationStory user={user} confirmation={confirmation} key={confirmation.id} />
      ))}
    </Tabs>
  )
}
