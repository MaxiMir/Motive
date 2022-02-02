import { makeStyles } from '@material-ui/core'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

interface AppSpinIconProps {
  name: AppEmojiName
}

export default function AppShakeIcon({ name }: AppSpinIconProps): JSX.Element {
  const classes = useStyles()

  return <AppEmoji name={name} variant="h2" className={classes.root} />
}

const useStyles = makeStyles({
  root: {
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    animation: '$shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
  },
  '@keyframes shake': {
    '10%, 90%': {
      transform: 'translate3d(-1px, 0, 0)',
    },

    '20%, 80%': {
      transform: 'translate3d(2px, 0, 0)',
    },

    '30%, 50%, 70%': {
      transform: 'translate3d(-4px, 0, 0)',
    },

    '40%, 60%': {
      transform: 'translate3d(4px, 0, 0)',
    },
  },
})
