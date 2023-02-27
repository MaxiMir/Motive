import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ClientDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserProps {
  client: ClientDto
  primary: string
}

function User({ client, primary }: UserProps) {
  const { asPath } = useRouter()
  const href = joinToHref(client.nickname)
  const selected = asPath.includes(href)

  return (
    <ListItem button href={href} component={Link}>
      <ListItemIcon sx={{ opacity: selected ? 1 : 0.6 }}>
        <Avatar name={client.name} src={client.avatar} size={24} />
      </ListItemIcon>
      <ListItemText primary={primary} sx={{ color: selected ? 'inherit' : 'grey' }} />
    </ListItem>
  )
}

export default User
