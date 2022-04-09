import { UserBaseDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppAvatar from 'components/UI/AppAvatar'
import AppLink from 'components/UI/AppLink'

export interface UserAvatarProps {
  tmpl: 'avatar'
  user: UserBaseDto
}

export default function UserAvatar({ user }: UserAvatarProps): JSX.Element {
  const { nickname, name, avatar } = user
  const href = getUserHref(nickname)

  return (
    <AppLink href={href} title={name} sx={{ height: 26 }}>
      <AppAvatar src={avatar} size={26} />
    </AppLink>
  )
}
