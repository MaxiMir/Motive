import { Typography } from '@mui/material'
import Link from 'next/link'
import { useGoalContext } from 'entities/goal'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import { useMessages } from './hooks/useMessages'

function Inheritance() {
  const messages = useMessages()
  const { owner } = useGoalContext()
  const { name, nickname, avatar } = owner
  const href = joinToHref(nickname)

  return (
    <>
      <Typography variant="subtitle1" component="p">
        <b>{messages.title}</b>
      </Typography>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={26} />
      </Link>
    </>
  )
}

export default Inheritance
