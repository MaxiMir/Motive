import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { getImageUrl } from 'helpers/url'

interface AvatarProps {
  src: string
  size: 80 | 55 | 35 | 32 | 26
}

export default function Avatar({ src, size }: AvatarProps): JSX.Element {
  const classes = useStyles()
  const srcFull = src.includes('https://') ? src : getImageUrl(src)

  return <Image src={srcFull} alt="avatar" width={size} height={size} objectFit="cover" className={classes.avatar} />
}

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%',
  },
})
