import { makeStyles } from '@material-ui/core'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

interface AppSpinIconProps {
  name: AppEmojiName
}

export default function AppFlyIcon({ name }: AppSpinIconProps): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppEmoji name={name} variant="h2" className={classes.emoji} />
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    height: 180,
    width: 150,
    position: 'relative',
  },
  emoji: {
    position: 'absolute',
    transform: 'rotate(-45deg)',
    bottom: 0,
    left: 45,
    animation: '$fly 6s linear infinite',
  },
  '@keyframes fly': {
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
