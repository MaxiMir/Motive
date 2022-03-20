import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
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
      <AppBox flexDirection="column" spacing={3}>
        <AppBox flexDirection="column" alignItems="center" spacing={1}>
          <AppFlyIcon name="stage" />
          <AppTypography variant="subtitle1" className={classes.congratulations}>
            Excellent! One step behind!
          </AppTypography>
          <AppTypography>
            {isFinal ? 'Final' : 'Next'} stage is <b className={classes.nextStage}>{stages[nextStage]}</b>
          </AppTypography>
        </AppBox>
      </AppBox>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    prevStage: {
      color: theme.text.sand,
    },
    nextStage: {
      color: theme.text.silent,
    },
    congratulations: {
      color: theme.palette.info.main,
    },
  }),
)
