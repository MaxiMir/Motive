import { Tabs } from '@mui/material'
import { UserDetailDto } from 'dto'
import ConfirmationPreview from './components/ConfirmationPreview'

interface ConfirmationListProps extends Pick<UserDetailDto, 'clientMembership' | 'confirmations'> {
  userId: number
}

export default function ConfirmationList({ userId, clientMembership, confirmations }: ConfirmationListProps) {
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
        <ConfirmationPreview
          userId={userId}
          clientMembership={clientMembership}
          confirmation={confirmation}
          key={confirmation.id}
        />
      ))}
    </Tabs>
  )
}
