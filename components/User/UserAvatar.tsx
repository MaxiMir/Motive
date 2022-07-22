import { UserBaseDto } from 'dto'
import { getUserUrn } from 'helpers/url'
import AppAvatar from 'components/ui/AppAvatar'
import AppLink from 'components/ui/AppLink'

export interface UserAvatarProps {
  user: UserBaseDto
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const { nickname, name, avatar } = user
  const href = getUserUrn(nickname)

  return (
    <AppLink href={href} title={name} sx={{ height: 26 }}>
      <AppAvatar src={avatar} size={26} />
    </AppLink>
  )
}
