import { Box, Typography } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import AppModal from '@ui/AppModal'
import AppFlyIcon from '@ui/AppFlyIcon'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
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
    <AppModal
      title={
        <>
          {messages.title} <br />
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {stages[day.stage]}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
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
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <AppFlyIcon name="stage" />
          <Typography variant="subtitle1" sx={{ color: 'support.main' }}>
            <b>{messages.behind}</b>
          </Typography>
          <Typography>
            {messages.nextTitle}:{' '}
            <Box component="b" sx={{ color: 'zen.wave' }}>
              {stages[nextStage]}
            </Box>
          </Typography>
        </Box>
      </Box>
    </AppModal>
  )
}

export default StageModal