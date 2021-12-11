import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import AppLink from 'components/UI/AppLink'

export interface UserCardAvatarProps {
  tmpl: 'avatar'
  user: UserBase
  size: number
}

export default function UserCardAvatar({ user, size }: UserCardAvatarProps): JSX.Element {
  const { id, name, avatar } = user
  const classes = useStyles({ size })

  return (
    <AppLink href={`/${id}`} title={name} className={classes.avatarLink}>
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
