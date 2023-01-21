import { Box, Stack, Typography } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { OwnershipDto } from '@features/member'
import AppModal from '@ui/AppModal'
import AppFadeIcon from '@ui/AppFadeIcon'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
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
    <AppModal
      title={messages.title}
      maxWidth="xs"
      actions={[
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
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
          <Box component="span" sx={{ color: 'motivation.light' }}>
            {name}
          </Box>
        </Typography>
        <AppFadeIcon name="luggage" />
      </Stack>
    </AppModal>
  )
}

export default LeaveModal
