import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { ClientDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserProps {
  client: ClientDto
  primary: string
}

function User({ client, primary }: UserProps) {
  const { asPath, push } = useRouter()
  const href = joinToHref(client.nickname)
  const selected = asPath.includes(href)

  const onClick = () => push(href)

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon sx={{ opacity: selected ? 1 : 0.6 }}>
        <Avatar name={client.name} src={client.avatar} size={24} buttonProps={{ onClick }} />
      </ListItemIcon>
      <ListItemText primary={primary} sx={{ color: selected ? 'inherit' : 'grey' }} />
    </ListItem>
  )
}

export default User
