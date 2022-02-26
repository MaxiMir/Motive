import { makeStyles } from '@material-ui/core/styles'
import AppEmoji from './AppEmoji'

interface AppNoAvatarProps {
  size: 80 | 55 | 35 | 32
}

export default function AppNoAvatar({ size }: AppNoAvatarProps): JSX.Element {
  const classes = useStyles({ size })

  return <AppEmoji name="followers" className={classes.noAvatar} />
}

const useStyles = makeStyles({
  noAvatar: {
    fontSize: ({ size }: AppNoAvatarProps) => {
      switch (size) {
        case 80:
          return 40
        default:
          return 30
      }
    },
  },
})
