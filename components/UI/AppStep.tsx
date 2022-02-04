import clsx from 'clsx'
import { createStyles, makeStyles } from '@material-ui/core'
import AppBox from './AppBox'
import AppIcon from './AppIcon'
import AppTypography from './AppTypography'
import AppTooltip from './AppTooltip'

interface AppStepProps {
  step: string
  current: boolean
  completed: boolean
}

export default function AppStep({ step, current, completed }: AppStepProps): JSX.Element {
  const classes = useStyles()
  const stage = getStage()

  function getStage() {
    switch (true) {
      case current:
        return 'Current'
      case completed:
        return 'Completed'
      default:
        return 'Future'
    }
  }

  return (
    <AppTooltip title={`${stage} stage`}>
      <AppBox
        alignItems="center"
        spacing={1}
        ml="1px"
        className={clsx([current || completed ? classes.colored : classes.default])}
      >
        <AppIcon name={completed ? 'task_alt' : 'radio_button_unchecked'} />
        <AppTypography>{step}</AppTypography>
      </AppBox>
    </AppTooltip>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    default: {
      color: theme.text.silent,
    },
    colored: {
      color: theme.text.wave,
    },
  }),
)
