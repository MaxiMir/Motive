import { makeStyles } from '@material-ui/core/styles'
import AppImage from 'components/UI/AppImage'

interface AvatarProps {
  src: string
  size: number
}

export default function Avatar({ src, size }: AvatarProps): JSX.Element {
  const classes = useStyles()

  return <AppImage src={src} alt="avatar" width={size} height={size} objectFit="cover" className={classes.avatar} />
}

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%',
  },
})
