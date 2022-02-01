import { makeStyles } from '@material-ui/core'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

interface AppSpinIconProps {
  name: AppEmojiName
}

export default function AppFlyIcon({ name }: AppSpinIconProps): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.route}>
      <AppEmoji name={name} variant="h2" className={classes.plane} />
    </div>
  )
}

const useStyles = makeStyles({
  route: {
    height: 180,
    width: 150,
    position: 'relative',
  },
  plane: {
    position: 'absolute',
    transform: 'rotate(-45deg)',
    bottom: 0,
    left: 45,
    animation: '$path 6s linear infinite',
  },
  '@keyframes path': {
    '0%': {
      bottom: 0,
    },
    '50%': {
      bottom: '25%',
    },
    '75%': {
      bottom: '50%',
      opacity: 0.7,
    },
    '100%': {
      bottom: '60%',
      opacity: 0,
    },
  },
})
