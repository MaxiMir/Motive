import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { GoalDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import AppModal from '@ui/AppModal'
import AppFlyIcon from '@ui/AppFlyIcon'
import { useSendStage } from './hook'

export interface ModalStageProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalStage({ goal, onClose }: ModalStageProps) {
  const { stages, day } = goal
  const { formatMessage } = useIntl()
  const { isLoading, mutate } = useSendStage(onClose)
  const isFinal = stages.length === day.stage
  const nextStage = day.stage + 1
  const title = formatMessage({ id: 'page.user.modal-stage.title' })
  const behind = formatMessage({ id: 'page.user.modal-stage.behind' })
  const button = formatMessage({ id: 'common.complete' })
  const buttonLoading = formatMessage({ id: 'common.completing' })
  const nextTitle = formatMessage({ id: `page.user.modal-stage.title-${isFinal ? 'final' : 'next'}` })

  const onClick = () => mutate({ id: goal.id, stage: nextStage })

  return (
    <AppModal
      title={
        <>
          {title} <br />
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {stages[day.stage]}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          isLoading={isLoading}
          text={button}
          loadingText={buttonLoading}
          emoji="stage"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <AppFlyIcon name="stage" />
          <Typography variant="subtitle1" sx={{ color: 'support.main' }}>
            <b>{behind}</b>
          </Typography>
          <Typography>
            {nextTitle}:{' '}
            <Box component="b" sx={{ color: 'zen.wave' }}>
              {stages[nextStage]}
            </Box>
          </Typography>
        </Box>
      </Box>
    </AppModal>
  )
}
