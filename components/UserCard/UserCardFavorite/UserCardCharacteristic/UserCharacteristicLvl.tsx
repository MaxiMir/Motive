import { makeStyles } from '@material-ui/core/styles'

const UserCharacteristicLvl = () => {
  const classes = useStyles()

  return <sup className={classes.root}>lvl</sup>
}

const useStyles = makeStyles({
  root: {
    marginLeft: 2,
    fontSize: '0.625rem',
    color: '#BDB5B5',
  },
})

export default UserCharacteristicLvl
