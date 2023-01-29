import { Tabs } from '@mui/material'
import dynamic from 'next/dynamic'
import { ConfirmationDto } from 'shared/api'

const ConfirmationStory = dynamic(() => import('./confirmationStory'))
const CreateGoal = dynamic(() => import('./createGoal'))

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
      {clientPage && <CreateGoal />}
      {confirmations.map((confirmation) => (
        <ConfirmationStory confirmation={confirmation} key={confirmation.id} />
      ))}
    </Tabs>
  )
}

export default ConfirmationList
