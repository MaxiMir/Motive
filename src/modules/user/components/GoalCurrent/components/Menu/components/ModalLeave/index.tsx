import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { GoalDto, OwnershipDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import AppModal from '@ui/AppModal'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useSendRemoveMember } from './hook'

export interface ModalLeaveProps {
  goal: GoalDto
  clientOwnership: OwnershipDto
  onClose: () => void
}

export default function ModalLeave({ goal, clientOwnership, onClose }: ModalLeaveProps) {
  const { id, name } = goal
  const { formatMessage } = useIntl()
  const { isLoading, mutateAsync } = useSendRemoveMember(id, clientOwnership.page)
  const title = formatMessage({ id: 'page.user.modal-leave.title' })
  const buttonText = formatMessage({ id: 'page.user.modal-leave.button' })
  const loadingText = formatMessage({ id: 'page.user.modal-leave.loading' })
  const subtitle = formatMessage({ id: 'page.user.modal-leave.subtitle' })

  const onClick = () => {
    if (!clientOwnership.member) return

    mutateAsync(clientOwnership.member?.id).then(onClose)
  }

  return (
    <AppModal
      title={title}
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          isLoading={isLoading}
          text={buttonText}
          loadingText={loadingText}
          emoji="leave"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" gap={1}>
        <Typography>
          {subtitle}{' '}
          <Box component="span" sx={{ color: 'motivation.light' }}>
            {name}
          </Box>
        </Typography>
        <AppFadeIcon name="luggage" />
      </Box>
    </AppModal>
  )
}
