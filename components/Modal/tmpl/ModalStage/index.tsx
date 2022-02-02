import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppFlyIcon from 'components/UI/AppFlyIcon'

export interface ModalStageProps {
  tmpl: 'stage'
  goal: GoalDto
  onClose: () => void
}

export default function ModalStage({ goal, onClose }: ModalStageProps): JSX.Element {
  const { stages, current } = goal
  const classes = useStyles()

  const isLoading = false
  const handleSubmit = () => false

  return (
    <AppModal
      title={
        <>
          Completion stage <br />
          <span className={classes.prevStage}>{stages[current || 0]}</span>
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
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <AppBox flexDirection="column" alignItems="center" spacing={1}>
        <AppFlyIcon name="stage" />
        <AppTypography variant="subtitle1" className={classes.congratulations}>
          Excellent! One step behind!
        </AppTypography>
        <AppTypography>
          {stages.length === current ? 'Final' : 'Next'} stage is{' '}
          <b className={classes.nextStage}>{stages[current || 1]}</b>
        </AppTypography>
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
