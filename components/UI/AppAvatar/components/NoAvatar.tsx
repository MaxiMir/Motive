import { makeStyles } from '@material-ui/core/styles'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

interface NoAvatarProps {
  size: 80 | 55 | 35 | 32 | 26
}

export default function NoAvatar({ size }: NoAvatarProps): JSX.Element {
  const classes = useStyles({ size })

  return (
    <AppBox justifyContent="center" alignItems="center" className={classes.wrap}>
      <AppEmoji name="followers" className={classes.avatar} />
    </AppBox>
  )
}

const useStyles = makeStyles({
  wrap: {
    borderRadius: '50%',
    width: ({ size }: NoAvatarProps) => size,
  },
  avatar: {
    fontSize: ({ size }: NoAvatarProps) => {
      switch (size) {
        case 80:
          return 40
        case 55:
          return 35
        case 35:
        case 32:
          return 25
        default:
          return 15
      }
    },
  },
})
