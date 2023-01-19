import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { ClientDto, toHref } from '@features/user'
import AvatarStatus from '@components/Avatar/AvatarStatus'

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
