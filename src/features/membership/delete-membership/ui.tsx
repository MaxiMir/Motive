import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { MemberDto } from 'shared/api'
import CancelButton from 'shared/ui/CancelButton'
import FadeTypography from 'shared/ui/FadeTypography'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useRemoveMember } from './model'

interface DeleteMembershipProps {
  goalId: number
  goalName: string
  clientPage: boolean
  clientMember?: MemberDto
  onClose: () => void
}

function DeleteMembershipModal({
  goalId,
  goalName,
  clientPage,
  clientMember,
  onClose,
}: DeleteMembershipProps) {
  const { formatMessage } = useIntl()
  const { isLoading, mutateAsync } = useRemoveMember(goalId, clientPage)
  const title = formatMessage({ id: 'page.user.modal-leave.title' })
  const buttonText = formatMessage({ id: 'page.user.modal-leave.button' })
  const loadingText = formatMessage({ id: 'page.user.modal-leave.loading' })
  const subtitle = formatMessage({ id: 'page.user.modal-leave.subtitle' })

  const onClick = () => {
    if (!clientMember) return

    mutateAsync(clientMember?.id).then(onClose)
  }

  return (
    <Modal
      title={title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isLoading}
          text={buttonText}
          loadingText={loadingText}
          emoji="📪"
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Stack justifyItems="center" alignItems="center" gap={1}>
        <Typography>
          {subtitle}{' '}
          <Box component="span" color="motivation.light">
            {goalName}
          </Box>
        </Typography>
        <FadeTypography>🧳</FadeTypography>
      </Stack>
    </Modal>
  )
}

export default DeleteMembershipModal
