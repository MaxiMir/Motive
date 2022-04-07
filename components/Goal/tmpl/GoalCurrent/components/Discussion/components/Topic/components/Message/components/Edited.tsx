import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

export default function Edited(): JSX.Element {
  const classes = useStyles()

  return <span className={classes.edited}>(edited)</span>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    edited: {
      fontSize: '0.6875rem',
      color: theme.palette.zen.silent,
    },
  }),
)
