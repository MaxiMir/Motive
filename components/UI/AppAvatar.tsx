import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

interface AppAvatarProps {
  urn: string
  size: number
}

export default function AppAvatar({ urn, size }: AppAvatarProps): JSX.Element {
  const classes = useStyles()
  const src = process.env.NEXT_PUBLIC_SERVER_BASE_URL + urn

  return <Image src={src} alt="" width={size} height={size} objectFit="cover" className={classes.avatar} />
}

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%',
  },
})
