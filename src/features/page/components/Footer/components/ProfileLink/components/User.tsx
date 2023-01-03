import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { ClientDto, getUserHref } from '@features/user'
import AvatarStatus from '@components/Avatar/AvatarStatus'

interface UserProps {
  client: ClientDto
}

function User({ client }: UserProps) {
  const { asPath, push } = useRouter()
  const href = getUserHref(client.nickname)
  const selected = asPath.includes(href)

  const onClick = () => push(href)

  return (
    <Box sx={{ opacity: !selected ? 0.6 : 1 }}>
      <AvatarStatus name={client.name} src={client.avatar} size={24} onClick={onClick} />
    </Box>
  )
}

export default User
