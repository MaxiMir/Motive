import { createStyles, makeStyles } from '@material-ui/core'

export default function Edited(): JSX.Element {
  const classes = useStyles()

  return <span className={classes.edited}>(edited)</span>
}

const useStyles = makeStyles((theme) =>
  createStyles({
    edited: {
      fontSize: '0.6875rem',
      color: theme.text.silent,
    },
  }),
)
