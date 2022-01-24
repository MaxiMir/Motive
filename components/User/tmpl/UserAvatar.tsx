import { makeStyles } from '@material-ui/core/styles'
import { UserBaseDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'

export interface UserAvatarProps {
  tmpl: 'avatar'
  user: UserBaseDto
  size: number
}

export default function UserAvatar({ user, size }: UserAvatarProps): JSX.Element {
  const { name, nickname, avatar } = user
  const classes = useStyles({ size })
  const href = getUserHref(nickname)

  return (
    <AppLink title={name} href={href} className={classes.avatarLink}>
      <AppAvatar src={avatar} size={size} />
    </AppLink>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    height: (props: { size: number }) => props.size,
  },
})
