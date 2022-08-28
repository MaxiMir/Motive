import { Box } from '@mui/material'
import { ConfirmationDto, MemberDto } from 'dto'
import AppModal from 'components/ui/AppModal'
import GoalCompleted from 'components/Goal/GoalCompleted'

export interface ModalConfirmationProps {
  userId: number
  clientMembership: MemberDto[]
  confirmation: ConfirmationDto
  onClose: () => void
}

export default function ModalConfirmation({ userId, clientMembership, confirmation, onClose }: ModalConfirmationProps) {
  return (
    <AppModal
      title={
        <Box component="span" sx={{ color: 'zen.sand' }}>
          {confirmation.goal.name}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <GoalCompleted userId={userId} clientMembership={clientMembership} confirmation={confirmation} />
    </AppModal>
  )
}
