import dynamic from 'next/dynamic'
import { UserBase } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import UserCard from 'components/UserCard'
import Reaction from './components/Reaction'
import Reply from './components/Reply'

const SupportSign = dynamic(() => import('./components/SupportSign'))

interface MessageProps {
  user: UserBase
  owner: UserBase
  message: string
  like: number
  dislike: number
  answer?: boolean
  support: boolean
  onClick?: () => void
}

export default function Message({
  user,
  owner,
  message,
  like,
  dislike,
  answer,
  support,
  onClick,
}: MessageProps): JSX.Element {
  const { href, fullName } = user

  return (
    <AppBox flexDirection="column" spacing={1} marginLeft={answer && 7}>
      <AppBox spacing={2}>
        <AppBox position="relative" height={40}>
          <UserCard type="avatar" size={40} {...user} />
          {support && <SupportSign answer={answer} owner={owner} />}
        </AppBox>
        <AppBox flexDirection="column" spacing={1} minWidth={152}>
          <AppLink href={href} title={fullName}>
            <b>{fullName}</b>
          </AppLink>
          <AppTypography>{message}</AppTypography>
        </AppBox>
      </AppBox>
      <AppBox spacing={1} paddingLeft={7}>
        {onClick && <Reply onClick={onClick} />}
        <Reaction type="like" count={like} />
        <Reaction type="dislike" count={dislike} />
      </AppBox>
    </AppBox>
  )
}
