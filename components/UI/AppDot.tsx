import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBox from './AppBox'

interface AppDotProps {
  size?: number
}

const AppDot: FC<AppDotProps> = ({ size = 3 }) => {
  const classes = useStyles()

  return <AppBox width={size} height={size} className={classes.root} />
}

const useStyles = makeStyles({
  root: {
    borderRadius: '50%',
    backgroundColor: '#424242',
  },
})

export default AppDot
