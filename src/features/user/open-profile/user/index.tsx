import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { Viewer } from 'entities/viewer'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserProps {
  user: Viewer
}

function User({ user }: UserProps) {
  const { asPath, push } = useRouter()
  const href = joinToHref(user.nickname)
  const selected = asPath.includes(href)

  const onClick = () => push(href)

  return (
    <Box sx={{ opacity: !selected ? 0.6 : 1 }}>
      <Avatar name={user.name} src={user.avatar} size={24} onClick={onClick} />
    </Box>
  )
}

export default User
