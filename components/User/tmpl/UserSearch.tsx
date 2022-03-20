import { UserBaseDto } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'
import { getUserHref } from 'views/UserView/helper'

export interface UserSearchProps {
  tmpl: 'search'
  user: UserBaseDto
}

export default function UserSearch({ user }: UserSearchProps): JSX.Element {
  const { nickname, avatar, name, characteristic } = user
  const href = getUserHref(nickname)

  return (
    <>
      <AppLink href={href}>
        <AppAvatar src={avatar} size={80} />
      </AppLink>
      <AppLink href={href} variant="body1">
        {name}
      </AppLink>
    </>
  )
}
