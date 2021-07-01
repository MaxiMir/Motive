import { makeStyles } from '@material-ui/core/styles'
import AppBox from './AppBox'

interface AppDotProps {
  size?: number
}

export default function AppDot({ size = 3 }: AppDotProps): JSX.Element {
  const classes = useStyles()

  return <AppBox width={size} height={size} className={classes.root} />
}

const useStyles = makeStyles({
  root: {
    borderRadius: '50%',
    backgroundColor: '#424242',
  },
})
