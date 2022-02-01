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
  const { map, current } = goal
  const classes = useStyles()
  const nextStage = map[current || 1]

  const isLoading = false
  const handleSubmit = () => false

  return (
    <AppModal
      title="Moving to the next stage"
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Move"
          nameLoading="Moving"
          emoji="map"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <AppBox flexDirection="column" alignItems="center" spacing={1}>
        <AppFlyIcon name="stage" />
        <AppTypography variant="h6" className={classes.congratulations}>
          Ideal! One step behind!
        </AppTypography>
        <AppTypography>
          Next stage is &quot;<b className={classes.stage}>{nextStage}</b>&quot;
        </AppTypography>
      </AppBox>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    congratulations: {
      color: '#0386F4',
    },
    stage: {
      color: theme.text.wave,
    },
  }),
)
