import { Box, Typography } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import { OwnershipDto } from '@features/member'
import AppModal from '@ui/AppModal/AppModal'
import AppFadeIcon from '@ui/AppFadeIcon'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import { useSendRemoveMember } from './hooks/useSendRemoveMember'
import { useMessages } from './hooks/useMessages'

interface ModalLeaveProps {
  clientOwnership: OwnershipDto
  onClose: () => void
}

function ModalLeave({ clientOwnership, onClose }: ModalLeaveProps) {
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
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isLoading}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="leave"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" gap={1}>
        <Typography>
          {messages.subtitle}{' '}
          <Box component="span" sx={{ color: 'motivation.light' }}>
            {name}
          </Box>
        </Typography>
        <AppFadeIcon name="luggage" />
      </Box>
    </AppModal>
  )
}

export default ModalLeave
