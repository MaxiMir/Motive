import { Box, Stack, Typography } from '@mui/material'
import CancelButton from 'shared/ui/cancel-button'
import FlyTypography from 'shared/ui/fly-typography'
import Modal from 'shared/ui/modal'
import SubmitButton from 'shared/ui/submit-button'
import { useMessages } from './lib'
import { useUpdateStage } from './model'

interface UpdateStageModalProps {
  goalId: number
  stages: string[]
  dayStage: number
  onClose: () => void
}

function UpdateStageModal({ goalId, stages, dayStage, onClose }: UpdateStageModalProps) {
  const messages = useMessages(stages, dayStage)
  const { isLoading, mutate } = useUpdateStage(onClose)
  const nextStage = dayStage + 1

  const onClick = () => mutate({ id: goalId, stage: nextStage })

  return (
    <Modal
      title={messages.title}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={messages.buttonText}
          loadingText={messages.loadingText}
          isLoading={isLoading}
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Stack alignItems="center" gap={1}>
        <FlyTypography>🚀</FlyTypography>
        <Typography variant="subtitle1" color="support.main" fontWeight="bold">
          {messages.behind}
        </Typography>
        <Typography>
          {messages.nextTitle}:{' '}
          <Box component="b" color="zen.wave">
            {stages[nextStage]}
          </Box>
        </Typography>
      </Stack>
    </Modal>
  )
}

export default UpdateStageModal
