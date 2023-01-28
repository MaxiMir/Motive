import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import AvatarStatus from 'features/avatar-status'
import { toHref } from 'entities/user'
import { ClientDto } from 'shared/api'

interface UserProps {
  client: ClientDto
}

function User({ client }: UserProps) {
  const { asPath, push } = useRouter()
  const href = toHref(client.nickname)
  const selected = asPath.includes(href)

  const onClick = () => push(href)

  return (
    <Box sx={{ opacity: !selected ? 0.6 : 1 }}>
      <AvatarStatus name={client.name} src={client.avatar} size={24} buttonProps={{ onClick }} />
    </Box>
  )
}

export default User
