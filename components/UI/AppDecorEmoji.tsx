import { Button, makeStyles } from '@material-ui/core'
import AppEmoji, { AppEmojiName } from './AppEmoji'

interface AppDecorEmojiProps {
  name: AppEmojiName
}

export default function AppDecorEmoji({ name }: AppDecorEmojiProps): JSX.Element {
  const classes = useStyles()

  return (
    <Button className={classes.button}>
      <AppEmoji name={name} onlyEmoji />
    </Button>
  )
}

const useStyles = makeStyles({
  button: {
    width: 24,
    height: 24,
    minWidth: 'initial',
  },
})
