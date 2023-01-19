import { Typography } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { toHref } from '@features/user'
import UserLink from '@components/User/UserLink'
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
      <UserLink name={name} avatar={avatar} href={href} />
    </>
  )
}

export default Inheritance
