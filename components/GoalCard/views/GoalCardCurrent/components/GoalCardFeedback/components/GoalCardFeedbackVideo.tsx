import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppPlayer from 'components/UI/AppPlayer'

interface GoalCardFeedbackVideoProps {
  video: string
}

export default function GoalCardFeedbackVideo({ video }: GoalCardFeedbackVideoProps): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.playerWrapper}>
      <AppPlayer url={video} />
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    playerWrapper: {
      position: 'relative',
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginBottom: 4,
      overflow: 'hidden',
      [theme.breakpoints.up('md')]: {
        width: 'calc(50% - 2px)',
        height: 250,
      },
    },
  }),
)
