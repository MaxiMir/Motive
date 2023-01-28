import { Box, Stack, Typography } from '@mui/material'
import { useGoalContext } from 'entities/goal'
import { OwnershipDto } from 'shared/api'
import CancelButton from 'shared/ui/CancelButton'
import FadeEmoji from 'shared/ui/FadeEmoji'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useMessages } from './hooks/useMessages'
import { useSendRemoveMember } from './hooks/useSendRemoveMember'

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
