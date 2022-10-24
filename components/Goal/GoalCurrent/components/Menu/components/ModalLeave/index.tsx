import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { GoalDto, OwnershipDto } from 'dto'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionCancel from 'components/Action/ActionCancel'
import AppModal from 'components/ui/AppModal'
import AppFadeIcon from 'components/ui/AppFadeIcon'
import { useSendRemoveMember } from './hook'
import i18n from './i18n'

export interface ModalLeaveProps {
  goal: GoalDto
  clientOwnership: OwnershipDto
  onClose: () => void
}

export default function ModalLeave({ goal, clientOwnership, onClose }: ModalLeaveProps) {
  const { id, name } = goal
  const { locale } = useIntl()
  const { isLoading, mutateAsync } = useSendRemoveMember(id, clientOwnership.page)
  const { title, button, buttonLoading, subtitle } = i18n[locale]

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
          name={button}
          nameLoading={buttonLoading}
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
