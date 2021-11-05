import { UserBase } from 'dto'
import { toUserName } from 'helpers/prepare'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import Avatar from './components/Avatar'
import Reaction from './components/Reaction'
import Reply from './components/Reply'

interface MessageProps {
  user: UserBase
  message: string
  like: number
  dislike: number
  answer?: boolean
  support: boolean
  onClick?: () => void
}

export default function Message({ user, message, like, dislike, answer, support, onClick }: MessageProps): JSX.Element {
  const { href, firstName, lastName } = user
  const userName = toUserName(firstName, lastName)

  return (
    <AppBox flexDirection="column" spacing={1} marginLeft={answer && 7}>
      <AppBox spacing={2}>
        <Avatar user={user} support={support} />
        <AppBox flexDirection="column" spacing={1} minWidth={152}>
          <AppLink href={href} title={userName}>
            <b>{userName}</b>
          </AppLink>
          <AppTypography>{message}</AppTypography>
        </AppBox>
      </AppBox>
      <AppBox spacing={1} paddingLeft={6}>
        {onClick && <Reply onClick={onClick} />}
        <Reaction type="like" count={like} />
        <Reaction type="dislike" count={dislike} />
      </AppBox>
    </AppBox>
  )
}
