import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'

export default function Level(): JSX.Element {
  const classes = useStyles()

  return <sup className={classes.root}>lvl</sup>
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: 2,
      fontSize: '0.625rem',
      color: theme.palette.text.disabled,
    },
  }),
)
