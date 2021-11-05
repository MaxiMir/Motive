import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import AppLink from 'components/UI/AppLink'

export interface UserCardAvatarProps extends UserBase {
  type: 'avatar'
  size: number
}

export default function UserCardAvatar({ fullName, avatar, href, size }: UserCardAvatarProps): JSX.Element {
  const classes = useStyles({ size })

  return (
    <AppLink href={href} title={fullName} className={classes.avatarLink}>
      <Image src={avatar} alt="avatar" width={size} height={size} objectFit="cover" className={classes.avatar} />
    </AppLink>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    height: (props: { size: number }) => props.size,
  },
  avatar: {
    borderRadius: '50%',
  },
})
