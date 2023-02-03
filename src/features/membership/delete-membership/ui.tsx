import { Box, Stack, Typography } from '@mui/material'
import { MemberDto } from 'shared/api'
import CancelButton from 'shared/ui/CancelButton'
import FadeTypography from 'shared/ui/FadeTypography'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useMessages } from './lib'
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
  const messages = useMessages()
  const { isLoading, mutateAsync } = useRemoveMember(goalId, clientPage)

  const onClick = () => {
    if (!clientMember) return

    mutateAsync(clientMember?.id).then(onClose)
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
          emoji="📪"
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Stack justifyItems="center" alignItems="center" gap={1}>
        <Typography>
          {messages.subtitle}{' '}
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
