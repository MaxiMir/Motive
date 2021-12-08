import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import { getUserHref } from 'helpers/user'
import AppLink from 'components/UI/AppLink'

export interface UserCardAvatarProps extends UserBase {
  type: 'avatar'
  size: number
}

export default function UserCardAvatar({ id, name, avatar, size }: UserCardAvatarProps): JSX.Element {
  const classes = useStyles({ size })
  const href = getUserHref(id)

  return (
    <AppLink href={href} title={name} className={classes.avatarLink}>
      <Image src={avatar} alt="" width={size} height={size} objectFit="cover" className={classes.avatar} />
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
