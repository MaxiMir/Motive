import { ClientDto, UserBaseDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'

export interface InputAvatarProps {
  user: ClientDto | UserBaseDto
}

export default function InputAvatar({ user }: InputAvatarProps): JSX.Element {
  const { name, nickname, avatar } = user
  const href = getUserHref(nickname)

  return (
    <AppLink title={name} href={href} sx={{ height: 32 }}>
      <AppAvatar src={avatar} size={32} />
    </AppLink>
  )
}
