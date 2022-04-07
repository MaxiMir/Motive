import { Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppFlyIcon from 'components/UI/AppFlyIcon'
import { useSendStage } from './hook'

export interface ModalStageProps {
  tmpl: 'stage'
  goal: GoalDto
  onClose: () => void
}

export default function ModalStage({ goal, onClose }: ModalStageProps): JSX.Element {
  const { stages, day } = goal
  const classes = useStyles()
  const { isLoading, mutate } = useSendStage(onClose)
  const isFinal = stages.length === day.stage
  const nextStage = day.stage + 1

  const onClick = () => mutate({ id: goal.id, stage: nextStage })

  return (
    <AppModal
      title={
        <>
          Completion stage <br />
          <span className={classes.prevStage}>{stages[day.stage]}</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isLoading}
          name="Complete"
          nameLoading="Completing"
          emoji="stage"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <AppBox flexDirection="column" gap={3}>
        <AppBox flexDirection="column" alignItems="center" gap={1}>
          <AppFlyIcon name="stage" />
          <Typography variant="subtitle1" className={classes.congratulations}>
            Excellent! One stage behind!
          </Typography>
          <Typography>
            {isFinal ? 'Final' : 'Next'} stage is <b className={classes.nextStage}>{stages[nextStage]}</b>
          </Typography>
        </AppBox>
      </AppBox>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    prevStage: {
      color: theme.palette.zen.sand,
    },
    nextStage: {
      color: theme.palette.zen.silent,
    },
    congratulations: {
      color: theme.palette.support.main,
    },
  }),
)
