import { Button, createStyles, makeStyles } from '@material-ui/core'

interface ReplyProps {
  onClick: () => void
}

export default function Reply({ onClick }: ReplyProps): JSX.Element {
  const classes = useStyles()

  return (
    <Button className={classes.root} aria-label="Reply" onClick={onClick}>
      reply
    </Button>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: theme.palette.info.main,
    },
  }),
)
