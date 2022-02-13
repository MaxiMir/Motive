import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import { makeStyles } from '@material-ui/core'

interface LikeTextProps {
  icon: 'like' | 'support'
}

export default function LikeText({ icon }: LikeTextProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox justifyContent="center" alignItems="center" width={24} height={24} className={classes.wrap}>
      <AppEmoji name={icon} onlyEmoji />
    </AppBox>
  )
}

const useStyles = makeStyles({
  wrap: {
    filter: 'grayscale(1)',
  },
})
