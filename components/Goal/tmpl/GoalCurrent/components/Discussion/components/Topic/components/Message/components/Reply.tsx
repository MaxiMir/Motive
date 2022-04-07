import { Button, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.support.main,
    },
  }),
)
