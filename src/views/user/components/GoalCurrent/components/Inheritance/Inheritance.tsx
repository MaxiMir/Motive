import Link from 'next/link'
import { Typography } from '@mui/material'
import { useGoalContext } from '@views/user/components/GoalCurrent/hooks/useGoalContext'
import { toHref } from '@modules/user'
import AvatarStatus from '@components/AvatarStatus'
import { useMessages } from './hooks/useMessages'

function Inheritance() {
  const messages = useMessages()
  const { owner } = useGoalContext()
  const { name, nickname, avatar } = owner
  const href = toHref(nickname)

  return (
    <>
      <Typography variant="subtitle1" component="p">
        <b>{messages.title}</b>
      </Typography>
      <Link href={href} title={name}>
        <AvatarStatus src={avatar} name={name} size={26} />
      </Link>
    </>
  )
}

export default Inheritance
