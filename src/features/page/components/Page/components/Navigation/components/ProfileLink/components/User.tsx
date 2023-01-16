import { useRouter } from 'next/router'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { ClientDto, getUserHref } from '@features/user'
import AvatarStatus from '@components/Avatar/AvatarStatus'

interface UserProps {
  client: ClientDto
  primary: string
}

function User({ client, primary }: UserProps) {
  const { asPath, push } = useRouter()
  const href = getUserHref(client.nickname)
  const selected = asPath.includes(href)

  const onClick = () => push(href)

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon sx={{ opacity: selected ? 1 : 0.6 }}>
        <AvatarStatus name={client.name} src={client.avatar} size={24} buttonProps={{ onClick }} />
      </ListItemIcon>
      <ListItemText primary={primary} sx={{ color: selected ? 'inherit' : 'grey' }} />
    </ListItem>
  )
}

export default User