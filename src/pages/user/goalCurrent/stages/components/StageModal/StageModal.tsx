import { Box, Stack, Typography } from '@mui/material'
import { useGoalContext } from 'entities/goal'
import CancelButton from 'shared/ui/CancelButton'
import FlyTypography from 'shared/ui/FlyTypography'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useMessages } from './hooks/useMessages'
import { useUpdateStage } from './hooks/useUpdateStage'

interface StageModalProps {
  onClose: () => void
}

function StageModal({ onClose }: StageModalProps) {
  const { id, stages, day } = useGoalContext()
  const messages = useMessages(stages.length === day.stage)
  const { isLoading, mutate } = useUpdateStage(onClose)
  const nextStage = day.stage + 1

  const onClick = () => mutate({ id, stage: nextStage })

  return (
    <Modal
      title={
        <>
          {messages.title} <br />
          <Box component="span" color="zen.sand">
            {stages[day.stage]}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isLoading}
          text={messages.button}
          loadingText={messages.buttonLoading}
          emoji="🚀"
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Stack alignItems="center" spacing={1}>
        <FlyTypography>🚀</FlyTypography>
        <Typography variant="subtitle1" sx={{ color: 'support.main' }}>
          <b>{messages.behind}</b>
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

export default StageModal
