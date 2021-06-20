import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const UserCharacteristicCompactLvl: FC = () => {
  const classes = useStyles()

  return <sup className={classes.lvl}>lvl</sup>
}

const useStyles = makeStyles({
  lvl: {
    marginLeft: 2,
    fontSize: '0.625rem',
    color: '#BDB5B5',
  },
})

export default UserCharacteristicCompactLvl
