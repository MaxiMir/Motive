import { makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import { getUserHref } from 'helpers/user'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'

export interface UserCardAvatarProps {
  tmpl: 'avatar'
  user: UserBase
  size: number
}

export default function UserCardAvatar({ user, size }: UserCardAvatarProps): JSX.Element {
  const { name, nickname, avatar } = user
  const classes = useStyles({ size })
  const href = getUserHref(nickname)

  return (
    <AppLink title={name} href={href} className={classes.avatarLink}>
      <AppAvatar urn={avatar} size={size} />
    </AppLink>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    height: (props: { size: number }) => props.size,
  },
})
