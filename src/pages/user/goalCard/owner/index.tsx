import { Box } from '@mui/material'
import Link from 'next/link'
import { UserBaseDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useFormatDate } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'

interface OwnerProps {
  owner: UserBaseDto
  started: string
}

function Owner({ owner, started }: OwnerProps) {
  const { name, nickname, avatar } = owner
  const formatDate = useFormatDate()
  const href = joinToHref(nickname)
  const date = formatDate(started, { day: 'numeric', month: 'short' })

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={0.5}
      ml={1}
      mb={1}
      sx={(theme) => ({
        fontSize: 14,
        color: theme.palette.grey[300],
      })}
    >
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={20} />
      </Link>
      <Link href={href} title={name}>
        {owner.name}
      </Link>
      <Box component="span" color="zen.silent">
        • {date}
      </Box>
    </Box>
  )
}

export default Owner
