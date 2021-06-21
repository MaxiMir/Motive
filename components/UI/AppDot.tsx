import { makeStyles } from '@material-ui/core/styles'
import AppBox from './AppBox'

interface AppDotProps {
  size?: number
}

const AppDot = ({ size = 3 }: AppDotProps) => {
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
