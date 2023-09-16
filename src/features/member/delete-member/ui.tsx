import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import CancelButton from 'shared/ui/CancelButton'
import FadeTypography from 'shared/ui/FadeTypography'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useDeleteMember } from './model'

interface DeleteMemberProps {
  goal: GoalDto
  viewerPart: ViewerPart
  onClose: () => void
}

function DeleteMemberModal({ goal, viewerPart, onClose }: DeleteMemberProps) {
  const { id, name } = goal
  const { formatMessage } = useIntl()
  const { isLoading, mutateAsync } = useDeleteMember(id, viewerPart.page)
  const title = formatMessage({ id: 'page.user.modal-leave.title' })
  const buttonText = formatMessage({ id: 'page.user.modal-leave.button' })
  const loadingText = formatMessage({ id: 'page.user.modal-leave.loading' })
  const subtitle = formatMessage({ id: 'page.user.modal-leave.subtitle' })

  const onClick = () => {
    if (!viewerPart.member) return

    mutateAsync(viewerPart.member?.id).then(onClose)
  }

  return (
    <Modal
      title={title}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={buttonText}
          loadingText={loadingText}
          isLoading={isLoading}
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
            {name}
          </Box>
        </Typography>
        <FadeTypography>🧳</FadeTypography>
      </Stack>
    </Modal>
  )
}

export default DeleteMemberModal
