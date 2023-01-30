import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { useGoalContext } from 'entities/goal'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

function Inheritance() {
  const { formatMessage } = useIntl()
  const { owner } = useGoalContext()
  const { name, nickname, avatar } = owner
  const href = joinToHref(nickname)
  const title = formatMessage({ id: 'common.together' })

  return (
    <>
      <Typography variant="subtitle1" component="p">
        <b>{title}</b>
      </Typography>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={26} />
      </Link>
    </>
  )
}

export default Inheritance
