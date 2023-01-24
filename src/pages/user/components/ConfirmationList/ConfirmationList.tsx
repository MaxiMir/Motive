import dynamic from 'next/dynamic'
import { Tabs } from '@mui/material'
import { ConfirmationDto } from '@entities/confirmation'

const ConfirmationStory = dynamic(() => import('./components/ConfirmationStory'))
const AddGoal = dynamic(() => import('./components/AddGoal'))

interface ConfirmationListProps {
  confirmations: ConfirmationDto[]
  clientPage: boolean
}

function ConfirmationList({ confirmations, clientPage }: ConfirmationListProps) {
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
        <ConfirmationStory confirmation={confirmation} key={confirmation.id} />
      ))}
    </Tabs>
  )
}

export default ConfirmationList
