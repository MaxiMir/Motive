import { Box, Typography } from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppFlyIcon from 'components/UI/AppFlyIcon'
import { useSendStage } from './hook'
import i18n from './i18n'

export interface ModalStageProps {
  tmpl: 'stage'
  goal: GoalDto
  onClose: () => void
}

export default function ModalStage({ goal, onClose }: ModalStageProps): JSX.Element {
  const { stages, day } = goal
  const { locale } = useLocale()
  const { isLoading, mutate } = useSendStage(onClose)
  const { title, behind, buttonName, buttonLoading, getNextTitle } = i18n[locale]
  const isFinal = stages.length === day.stage
  const nextTitle = getNextTitle(isFinal)
  const nextStage = day.stage + 1

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
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isLoading}
          name={buttonName}
          nameLoading={buttonLoading}
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
            {nextTitle}{' '}
            <Box component="b" sx={{ color: 'zen.wave' }}>
              {stages[nextStage]}
            </Box>
          </Typography>
        </Box>
      </Box>
    </AppModal>
  )
}
