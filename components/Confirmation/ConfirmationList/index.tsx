import { Box } from '@mui/material'
import { UserDetailDto } from 'dto'
import ConfirmationPreview from './components/ConfirmationPreview'

interface ConfirmationListProps extends Pick<UserDetailDto, 'clientMembership' | 'confirmations'> {
  userId: number
}

export default function ConfirmationList({ userId, clientMembership, confirmations }: ConfirmationListProps) {
  return (
    <Box display="flex" gap={1} overflow="scroll">
      {confirmations.map((confirmation) => (
        <ConfirmationPreview
          userId={userId}
          clientMembership={clientMembership}
          confirmation={confirmation}
          key={confirmation.id}
        />
      ))}
    </Box>
  )
}
