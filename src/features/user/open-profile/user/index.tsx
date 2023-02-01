import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { ClientDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserProps {
  client: ClientDto
}

function User({ client }: UserProps) {
  const { asPath, push } = useRouter()
  const href = joinToHref(client.nickname)
  const selected = asPath.includes(href)

  const onClick = () => push(href)

  return (
    <Box sx={{ opacity: !selected ? 0.6 : 1 }}>
      <Avatar name={client.name} src={client.avatar} size={24} buttonProps={{ onClick }} />
    </Box>
  )
}

export default User
