import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Viewer } from 'entities/viewer'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserProps {
  user: Viewer
  primary: string
}

function User({ user, primary }: UserProps) {
  const { asPath } = useRouter()
  const { formatMessage } = useIntl()
  const href = joinToHref(user.nickname)
  const selected = asPath.includes(href)
  const title = formatMessage({ id: 'common.my-page' })

  return (
    <ListItem button href={href} title={title} component={Link}>
      <ListItemIcon sx={{ opacity: selected ? 1 : 0.6 }}>
        <Avatar name={user.name} src={user.avatar} size={24} />
      </ListItemIcon>
      <ListItemText primary={primary} color={selected ? 'inherit' : 'grey'} />
    </ListItem>
  )
}

export default User
