import { UserBase } from 'dto'
import { toUserName } from 'helpers/prepare'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import Avatar from './components/Avatar'

interface MssageProps {
  user: UserBase
  message: string
}

export default function IssueMessage({ user, message }: MssageProps): JSX.Element {
  const { href, firstName, lastName } = user
  const userName = toUserName(firstName, lastName)

  return (
    <AppBox spacing={2}>
      <Avatar user={user} />
      <AppBox flexDirection="column" spacing={1} minWidth={152}>
        <AppLink href={href} title={userName}>
          <b>{userName}</b>
        </AppLink>
        <AppTypography>{message}</AppTypography>
      </AppBox>
    </AppBox>
  )
}
