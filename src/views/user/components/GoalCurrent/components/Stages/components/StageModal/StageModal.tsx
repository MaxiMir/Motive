import { Box, Stack, Typography } from '@mui/material'
import { useGoalContext } from '@views/user/components/GoalCurrent/hooks/useGoalContext'
import Modal from '@ui/Modal'
import FlyEmoji from '@ui/FlyEmoji'
import SubmitButton from '@ui/SubmitButton'
import CancelButton from '@ui/CancelButton'
import { useMessages } from './hooks/useMessages'
import { useSendStage } from './hooks/useSendStage'

interface StageModalProps {
  onClose: () => void
}

function StageModal({ onClose }: StageModalProps) {
  const { id, stages, day } = useGoalContext()
  const messages = useMessages(stages.length === day.stage)
  const { isLoading, mutate } = useSendStage(onClose)
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
          emoji="stage"
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Stack alignItems="center" spacing={1}>
        <FlyEmoji name="stage" />
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
