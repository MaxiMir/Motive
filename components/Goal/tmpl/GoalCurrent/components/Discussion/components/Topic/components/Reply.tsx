import { makeStyles } from '@material-ui/core'
import AppIcon from 'components/UI/AppIcon'

export default function Reply(): JSX.Element {
  const classes = useStyles()

  return <AppIcon className={classes.root}>reply</AppIcon>
}

const useStyles = makeStyles({
  root: {
    color: '#606061',
    marginRight: 8,
  },
})
