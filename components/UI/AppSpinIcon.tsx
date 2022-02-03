import { makeStyles } from '@material-ui/core'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

interface AppSpinIconProps {
  name: AppEmojiName
}

export default function AppSpinIcon({ name }: AppSpinIconProps): JSX.Element {
  const classes = useStyles()

  return <AppEmoji name={name} variant="h2" className={classes.root} />
}

const useStyles = makeStyles({
  root: {
    animation: '$spin 3.6s linear infinite',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '25%': {
      transform: 'rotate(20deg)',
    },
    '50%': {
      transform: 'rotate(0deg)',
    },
    '75%': {
      transform: 'rotate(-20deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },
})