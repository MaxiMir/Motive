import { MessageWithQuestion, MessageWithSupport, Role, UserBase } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import UserCard from './UserCardAvatar'

export interface UserCardMessageProps {
  type: 'message'
  user: UserBase
  message: MessageWithQuestion | MessageWithSupport
  role: Role
}

export default function UserCardMessage({ user, message, role }: UserCardMessageProps): JSX.Element {
  const { href, firstName, lastName } = user
  const userName = `${firstName} ${lastName}`

  return (
    <AppBox spacing={1}>
      <UserCard type="avatar" size={40} {...user} />
      <AppBox flexDirection="column" spacing={1} flexGrow={1}>
        <AppLink href={href} title={userName}>
          <b>{userName}</b>
        </AppLink>
        <AppBox paddingX={2} paddingY={1} borderRadius="5px" border="1px solid #FF9800">
          {message.message}
        </AppBox>
      </AppBox>
    </AppBox>
  )
}
