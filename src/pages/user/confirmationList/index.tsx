import { Tabs } from '@mui/material'
import dynamic from 'next/dynamic'
import { ConfirmationDto } from 'shared/api'

const ConfirmationStory = dynamic(() => import('./confirmationStory'))

interface ConfirmationListProps {
  confirmations: ConfirmationDto[]
}

function ConfirmationList({ confirmations }: ConfirmationListProps) {
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
      {confirmations.map((confirmation) => (
        <ConfirmationStory confirmation={confirmation} key={confirmation.id} />
      ))}
    </Tabs>
  )
}

export default ConfirmationList
