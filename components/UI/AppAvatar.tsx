import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import { getImageUrl } from 'helpers/url'

interface AppAvatarProps {
  src: string
  size: number
}

export default function AppAvatar({ src, size }: AppAvatarProps): JSX.Element {
  const classes = useStyles()
  const fullSrc = getImageUrl(src)

  return <Image src={fullSrc} alt="" width={size} height={size} objectFit="cover" className={classes.avatar} />
}

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%',
  },
})
