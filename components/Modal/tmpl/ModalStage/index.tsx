import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import ModalAction from 'components/ModalAction'
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
  const { stages, days } = goal
  const classes = useStyles()
  const { isLoading, send } = useSendStage(goal, onClose)
  const [{ stage }] = days
  const isFinal = stages.length === stage
  const nextStage = stage + 1

  return (
    <AppModal
      title={
        <>
          Completion stage <br />
          <span className={classes.prevStage}>{stages[stage]}</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Complete"
          nameLoading="Completing"
          emoji="stage"
          onClick={() => send({ id: goal.id, stage: nextStage })}
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
