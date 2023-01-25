import { Box, Stack, Typography } from '@mui/material'
import { OwnershipDto } from '@app/model/member'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import Modal from '@shared/ui/Modal'
import FadeEmoji from '@shared/ui/FadeEmoji'
import SubmitButton from '@shared/ui/SubmitButton'
import CancelButton from '@shared/ui/CancelButton'
import { useSendRemoveMember } from './hooks/useSendRemoveMember'
import { useMessages } from './hooks/useMessages'

interface LeaveModalProps {
  clientOwnership: OwnershipDto
  onClose: () => void
}

function LeaveModal({ clientOwnership, onClose }: LeaveModalProps) {
  const messages = useMessages()
  const { id, name } = useGoalContext()
  const { isLoading, mutateAsync } = useSendRemoveMember(id, clientOwnership.page)

  const onClick = () => {
    if (!clientOwnership.member) return

    mutateAsync(clientOwnership.member?.id).then(onClose)
  }

  return (
    <Modal
      title={messages.title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isLoading}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="leave"
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Stack justifyItems="center" alignItems="center" spacing={1}>
        <Typography>
          {messages.subtitle}{' '}
          <Box component="span" color="motivation.light">
            {name}
          </Box>
        </Typography>
        <FadeEmoji name="luggage" />
      </Stack>
    </Modal>
  )
}

export default LeaveModal
